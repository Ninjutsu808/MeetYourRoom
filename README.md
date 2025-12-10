
---

# **Meet Your Roommate — MERN Web App**

> A platform for students to discover roommates, browse nearby flats/PGs, and chat with owners — built with a Tinder-like swipe UI, a posting system, and a real-time messaging interface.

---

## 🚀 **Project Overview**

**Meet Your Roommate** is a full-stack MERN web application that allows students to:

* Browse available rooms, flats, or PGs using a swipe-based card UI
* View detailed information including Google Maps, photos, and owner details
* Create their own listings with images and descriptions
* Swipe right to connect with owners or message them directly
* Maintain conversations in an integrated messaging system
* Manage their account information with profile pictures and social links
* Login/Signup securely and logout anytime

The entire UI follows a clean, minimal theme with:

* A **top app bar** containing the logo
* A **bottom floating navigation bar** with:
  **Home**, **Messages**, **Account**

---

# 🛠 **Tech Stack**

### **Frontend**

* React.js
* React Router
* Axios
* Tailwind CSS (optional depending on theme)
* Google Maps Embed API
* Context API / LocalStorage for auth

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* Multer (for image upload)
* JWT Authentication
* CORS

---

# 🔐 **Authentication System**

### **Features**

* Login / Signup pages
* JWT-based authentication
* User profile:

  * Name
  * Phone Number
  * Email
  * Branch
  * College
  * Course
  * Enrollment Number
  * Social links (Instagram, LinkedIn)
  * Profile picture
* Logout button in Account Page

All user data is saved in MongoDB.

---

# 🏠 **Home Screen (Swipe UI)**

The Home Page displays **Tinder-style swipeable cards** showing:

* Apartment photos
* Owner name
* Rent
* Room type
* Basic details

### **Swipe Actions**

* **Left** → reject
* **Right** → auto-create conversation with owner → open chat window

The user can click the card to see *full listing details*.

---

# 🏡 **Listing Details Page**

When a user opens a listing:

* Google Maps embed of the location
* Full description
* Multiple photos
* Owner account details
* **Message Owner** button

  * Opens or creates conversation via backend

---

# ➕ **Posting Page (Create Listing)**

Students can post their own:

* Flats
* PGs
* Single rooms
* Shared rooms

### **Fields**

* Title
* Description
* Address
* Lat/Lng (optional)
* Rent
* Room Type
* Gender Preference
* Amenities
* Photos (multiple upload)

Saved via:

```
POST /api/listings
```

After posting, listing appears under the user's Account Page.

---

# 💬 **Messaging System**

The messaging system includes:

### **Messages Page**

* Shows all conversations
* Displays last message + timestamp
* Lists participants

### **Chat Window**

* Real-time conversation UI
* Send & receive messages
* Auto-scroll
* Connected to backend endpoints

  ```
  GET /api/messages/:userId
  GET /api/messages/conversation/:conversationId
  POST /api/messages/send
  ```

### **Swipe → Message Logic**

Swipe right on a listing:

```
POST /api/messages/start-conversation
→ redirect to /messages/:conversationId
```

---

# 🧪 **Testing the Backend**

### Use tools like:

* Postman
* Thunder Client
* VS Code REST client

You can test:

* Auth routes
* Listing CRUD
* Messaging flows
* Image upload

### Local Development

Start frontend:

```
cd client
npm install
npm run dev
```

Start backend:

```
cd server
npm install
npm run dev
```

Make sure `.env` contains:

```
MONGO_URI=
JWT_SECRET=
PORT=5000
CLOUDINARY_KEY= (optional)
```

---

# 📌 **Current Features Summary**

| Feature                | Status      |
| ---------------------- | ----------- |
| Login/Signup           | ✅ Completed |
| Swipe-based Home Feed  | ✅ Completed |
| Listing Details + Maps | ✅ Completed |
| Posting System         | ✅ Completed |
| Messaging System       | ✅ Completed |
| Conversations Page     | ✅ Completed |
| Chat Window            | ✅ Completed |
| Account Page + Logout  | ✅ Completed |

---

# ⭐ **Acknowledgements**

Built as part of the **Vibe Coding** initiative of the **club's tech team** to help students find compatible roommates and living arrangements.

---


