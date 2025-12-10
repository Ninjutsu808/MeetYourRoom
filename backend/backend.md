
---

# 🔥 **Backend MDR — Meet Your Roommate (With Frontend in Mind)**

### Stack: **MERN (MongoDB + Express + React + Node)**

### Purpose: Backend that matches all the data needs of the frontend pages

### Output Style: Clean JSON responses

---

# 🎯 **Core Backend Responsibilities**

The backend must support the frontend requirements:

### 1. **Home Page (Tinder-like Swipe Feed)**

Frontend needs:

* List of posts (cards)
* Each post includes:

  * Photos
  * Owner name
  * Basic apartment details
* Ability to store “like” or “dislike”

### 2. **Post Details Page**

Frontend needs:

* Full post details
* Google Maps coordinates
* Photo gallery
* Poster account details
* Description

### 3. **Messaging Page**

Frontend needs:

* List of users they’ve messaged
* View conversations
* Send messages

### 4. **Account Page**

Frontend needs:

* Complete logged-in user profile
* Update profile
* Profile picture
* Social links

---

# 🚀 **Backend Tech Stack**

```
Node.js
Express.js
MongoDB (Atlas)
Mongoose
jsonwebtoken
bcryptjs
multer (for images) or Cloudinary SDK
cors
dotenv
```

Optional but helpful:

```
socket.io (for real-time chat later)
zod/joi (input validation)
```

---

# 📁 **Backend Folder Structure**

```
/backend
  server.js
  /config
    db.js
  /models
    User.js
    Post.js
    Message.js
    Swipe.js
  /controllers
    authController.js
    userController.js
    postController.js
    messageController.js
    swipeController.js
  /routes
    authRoutes.js
    userRoutes.js
    postRoutes.js
    messageRoutes.js
    swipeRoutes.js
  /middleware
    authMiddleware.js
    errorMiddleware.js
  /utils
    upload.js
```

---

# 🗄️ **Database Setup (MongoDB)**

### Step-by-step (Windsurf-friendly):

1. Go to **MongoDB Atlas** → Create free cluster
2. Create DB named:

```
meet-your-roommate
```

3. Create a DB user and whitelist your IP
4. Copy connection string and paste into backend `.env`:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/meet-your-roommate
JWT_SECRET=yoursecret
```

### In `/config/db.js`:

Use `mongoose.connect(MONGO_URI)`.

---

# 🔧 **Data Models (Mapped to Frontend Needs)**

---

## 1️⃣ User Model

Matches frontend’s account page requirements.

```
name: String
email: String (unique)
phone: String
password: String (hashed)
branch: String
college: String
course: String
enrolmentNumber: String

profilePic: String  // URL
socialLinks: {
  instagram: String,
  linkedin: String
}

createdPosts: [ObjectId: Post]  // useful for linking
createdAt: Date
```

---

## 2️⃣ Post Model

Matches frontend’s card + details page.

```
userId: ObjectId (ref: User)

title: String
description: String

location: {
  lat: Number,
  lng: Number,
  address: String
}

photos: [String]  // URLs

createdAt: Date
```

---

## 3️⃣ Swipe Model

Matches frontend’s Tinder-like actions.

```
userId: ObjectId (ref: User)   // the student swiping
postId: ObjectId (ref: Post)
action: "like" | "dislike"
createdAt: Date
```

---

## 4️⃣ Message Model

Matches messaging page.

```
senderId: ObjectId (ref: User)
receiverId: ObjectId (ref: User)
message: String
timestamp: Date
```

---

# 🛣️ **API Endpoints (Mapped to Frontend Requirements)**

---

## 🔐 Auth Routes

```
POST /api/auth/register     → Create new user
POST /api/auth/login        → Return JWT + user profile
```

---

## 👤 User Routes

Match frontend’s Account Page.

```
GET /api/user/me            → Get my profile
PUT /api/user/me            → Update profile
GET /api/user/:id           → Get another user
```

Response must include:

```
name
phone
email
branch
college
course
enrolmentNumber
profilePic
socialLinks
```

---

## 🏠 Post Routes

Match Home Page + Post Details Page.

```
POST /api/posts             → Create new post
GET /api/posts              → Home feed (all posts)
GET /api/posts/:id          → Full details (for post details page)
PUT /api/posts/:id
DELETE /api/posts/:id
```

Post details response MUST include:

* Google Map location object
* Description
* Photos
* Poster user profile

---

## ❤️ Swipe Routes

Match swipe functionality.

```
POST /api/swipe/:postId/like
POST /api/swipe/:postId/dislike
GET  /api/swipe/matches    → Posts user liked
```

---

## 💬 Message Routes

Match messaging page.

```
GET /api/messages          → List all users I’ve messaged
GET /api/messages/:id      → Chat with specific user
POST /api/messages/:id     → Send message
```

---

# 🔐 Auth Middleware (Required for Frontend)

* Protect routes like `/posts`, `/messages`, `/user/me`
* Attach `req.user` from JWT token

---

# 🔁 **Data Flow Matching Frontend**

### Home Page:

Frontend calls:

```
GET /api/posts
```

Backend must send:

```
{
  _id,
  photos,
  user: { name, profilePic },
  location.address,
  description (summary)
}
```

### Post Details Page:

Frontend calls:

```
GET /api/posts/:id
```

Backend must send:

```
post,
poster: {
  name,
  phone,
  email,
  branch,
  college,
  course,
  enrolmentNumber,
  socialLinks,
  profilePic
}
```

### Messages Page:

Frontend needs:

* List of users they’ve interacted with
* Last message preview (optional)

Endpoint returns:

```
[
  {
    userId,
    name,
    profilePic,
    lastMessage
  }
]
```

---

# 📦 **Uploads**

Images (post photos + profile pics):

* Use **multer** (local) OR
* **Cloudinary** (recommended)

Backend must return **public image URLs**.

---

# ✔ MVP Definition of Done

Backend is complete when:

* Database connected
* JWT auth fully working
* Users can create/update profiles
* Posts can be created and fetched
* Swipe actions saved
* Messaging API works
* Post details returned in full (maps + gallery + owner profile)

---

