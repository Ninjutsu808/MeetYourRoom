

---

# **update2.md — Additional MDR Update (Posting Page + Messaging System + Message Page Integration)**

## **1. Posting Page (User Creates Listing)**

### **Goal**

Enable users to post their **own flat/room/PG listings**, which will then appear as **postcards** on the Home Page for others to swipe.

---

## **1.1 Frontend — Posting Page**

### **Route**

```
/post
```

### **UI**

Use the same app theme:

* Top bar with logo
* Bottom floating bar with:

  * Home
  * Messages
  * Account

### **Form Fields**

* title
* description
* address
* latitude (optional)
* longitude (optional)
* rent
* roomType (dropdown: 1RK / 1BHK / sharing / single)
* genderPreference (dropdown: Boys / Girls / Anyone)
* amenities (checkbox list)
* photos (multiple images)

### **User Flow**

1. User fills form
2. Submit triggers:

```
POST /api/listings
```

3. On success → redirect to Account page with “Your Listings”

---

## **1.2 Backend — Posting**

### **Listing Model**

```
{
  title: String,
  description: String,
  address: String,
  latitude: Number,
  longitude: Number,
  rent: Number,
  photos: [String],
  roomType: String,
  genderPreference: String,
  amenities: [String],
  ownerUserId: ObjectId (ref: User),
  createdAt: Date
}
```

### **Listing Endpoints**

```
POST /api/listings
GET /api/listings
GET /api/listings/:id
GET /api/listings/user/:id
DELETE /api/listings/:id
```

### **Photo Upload**

Use Multer or Cloudinary integration.

---

---

# **2. Messaging Owner After Swipe-Right**

### **Goal**

When a user swipes right on a listing, they should IMMEDIATELY be able to message the owner.

This includes:

* Swipe-right auto-opens or auto-creates a conversation
* “Message Owner” button on the detail page
* Messages page shows all conversations
* Chat window allows sending/receiving messages

---

## **2.1 Frontend — Swipe Right Messaging Integration**

### **Swipe Right Action**

When user swipes right on a listing postcard, call:

```
POST /api/messages/start-conversation
```

Body:

```
{
  currentUserId,
  listingOwnerId
}
```

### **Backend Response**

Returns:

```
{ conversationId }
```

### **Frontend Behavior**

After receiving `conversationId`, navigate to:

```
/messages/:conversationId
```

---

## **2.2 Property Detail Page**

Add **“Message Owner”** button.

On click:

* Call `POST /api/messages/start-conversation`
* Redirect to `/messages/:conversationId`

---

---

# **3. Complete Messaging System (Linked With Message Page)**

### **Goal**

Make the messaging system fully functional, including:

* Conversation list on **Messages Page**
* Chat window for each conversation
* Ability to message owners after swipe-right or from listing detail screen

---

## **3.1 Frontend — Messages Page**

### **Route**

```
/messages
```

### **UI**

* Top bar
* Bottom floating nav
* A list of all conversations the user is part of
  Each item shows:

  * Owner’s or user’s profile picture
  * Name
  * Last message
  * Timestamp

### **Data Fetching**

Call:

```
GET /api/messages/:userId
```

### **Clicking a conversation item**

Navigate to:

```
/messages/:conversationId
```

---

## **3.2 Frontend — Chat Window Page**

### **Route**

```
/messages/:conversationId
```

### **UI**

* Chat bubbles
* Scrollable message list
* Text input + Send button
* Owner and user info at top
* Minimal WhatsApp-like theme

### **Fetching conversation messages**

```
GET /api/messages/conversation/:conversationId
```

### **Sending a message**

```
POST /api/messages/send
{
  conversationId,
  senderId,
  receiverId,
  text
}
```

Messages update the conversation list.

---

---

# **3.3 Backend — Messaging Models**

### **Conversation Model**

```
{
  participants: [ObjectId],  // 2 users
  lastMessage: String,
  updatedAt: Date
}
```

### **Message Model**

```
{
  conversationId: ObjectId,
  senderId: ObjectId,
  receiverId: ObjectId,
  text: String,
  timestamp: Date
}
```

---

## **3.4 Backend — Messaging Routes**

### **Start a conversation (swipe-right or message owner)**

```
POST /api/messages/start-conversation
```

### **Get user’s conversations (Message Page)**

```
GET /api/messages/:userId
```

### **Get messages of a specific conversation**

```
GET /api/messages/conversation/:conversationId
```

### **Send a new message**

```
POST /api/messages/send
```

---

# **4. Linking Posting + Messaging + Message Page**

### **Flow Summary**

#### **User sees listing on Home Page → Swipes Right**

1. Call `/api/messages/start-conversation`
2. Returns `conversationId`
3. Redirect to `/messages/:conversationId`

#### **User opens Property Detail Page → Clicks “Message Owner”**

Same flow as above.

#### **Messages Page**

Shows all conversations created by:

* Swiping right
* Messaging from detail page
* Owner messaging a matched user

#### **Chat Window**

Fully functional messaging.

---


