

---

# 📝 **update.md — Authentication + Account Updates**

This document describes the new updates added to both the **frontend** and **backend** of the *Meet Your Roommate* web application.
All changes follow the existing MDR theme, MERN architecture, and UI/UX consistency.

---

# ✅ **1. FRONTEND UPDATES (Login, Signup, Logout)**

## **New Pages Added**

### **1. Login Page**

* Fields:

  * Email
  * Password
* Actions:

  * Login button
  * “Don’t have an account? Sign Up” link
* Behavior:

  * Validates required fields and email format
  * Sends credentials to `/auth/login`
  * On success:

    * Stores JWT in `localStorage`
    * Redirects to **Home Page**
  * Shows error message on invalid credentials
* Theme:

  * Uses same color palette, typography, and component style as existing app

---

### **2. Signup Page**

* Fields:

  * Name
  * Email
  * Password
  * Phone Number
  * Branch
  * College
  * Course
  * Enrollment Number
  * Social Links: Instagram, LinkedIn
  * Profile Picture Upload
* Behavior:

  * Validates required fields
  * Sends data to `/auth/register`
  * On success:

    * Auto-login using returned JWT
    * Redirect to Home Page
* Theme:

  * Mirrors style of Login page and other app pages

---

### **3. Account Page Update**

* Should display:

  * User name
  * Profile picture
  * Branch, college, course
  * Enrollment number
  * Social links
* **Logout Button Added**

  * On click:

    * `localStorage.removeItem("token")`
    * Redirect to Login Page

---

### **4. Auth Navigation Rules**

* If no JWT token in `localStorage`:

  * Redirect to Login Page
* Protected pages:

  * Home
  * Messages
  * Account
* Top Bar:

  * App logo
* Bottom Bar:

  * Home | Messages | Account

---

# ✅ **2. BACKEND UPDATES (Auth System)**

## **Authentication Routes**

### **POST /auth/register**

* Accepts all user fields listed in signup
* Hashes password with **bcrypt**
* Saves user in MongoDB
* Returns:

  * JWT token
  * User object

### **POST /auth/login**

* Validates email & password
* Compares password using bcrypt
* Returns:

  * JWT token
  * User data

### **GET /auth/me**

* Protected route
* Requires `Authorization: Bearer <token>` header
* Returns authenticated user’s profile

---

## **JWT Implementation**

* Library: `jsonwebtoken`
* Payload:

  ```json
  {
    "id": "<userId>",
    "email": "<email>"
  }
  ```
* Expiration: 7 days
* Stored on frontend in `localStorage`

---

## **Auth Middleware**

File: `middlewares/authMiddleware.js`

Responsibilities:

* Extract JWT from headers
* Verify token
* Attach `req.user` with decoded info
* Throw `401 Unauthorized` on invalid token

---

## **User Schema Updates**

MongoDB schema includes:

```js
{
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  branch: String,
  college: String,
  course: String,
  enrollmentNumber: String,
  socialLinks: {
    instagram: String,
    linkedin: String
  },
  profilePic: String,
  createdAt: { type: Date, default: Date.now }
}
```

---

# 📦 **3. SECURITY**

* Passwords hashed using `bcrypt`
* JWT stored securely in browser `localStorage`
* Logout simply removes token — no backend route required

---




