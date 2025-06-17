# Ecofy Backend API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Routes (`/api/auth`)

### Register User
- **POST** `/api/auth/register`
- **Access**: Public
- **Description**: Register a new user
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "location": {
    "coordinates": [-74.006, 40.7128],
    "address": "New York, NY"
  }
}
```
- **Response**: User object with JWT token

### Login User
- **POST** `/api/auth/login`
- **Access**: Public
- **Description**: Login user and get JWT token
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**: User object with JWT token

### Get Current User
- **GET** `/api/auth/me`
- **Access**: Private
- **Description**: Get current authenticated user's information
- **Response**: User object (without password)

### Forgot Password
- **POST** `/api/auth/forgot-password`
- **Access**: Public
- **Description**: Send password reset email (placeholder implementation)
- **Body**:
```json
{
  "email": "john@example.com"
}
```

### Reset Password
- **POST** `/api/auth/reset-password`
- **Access**: Public
- **Description**: Reset password with token (placeholder implementation)
- **Body**:
```json
{
  "token": "reset_token_here",
  "password": "newpassword123"
}
```

---

## User Routes (`/api/users`)

### Get User Profile
- **GET** `/api/users/profile`
- **Access**: Private
- **Description**: Get current user's profile
- **Response**: User profile data

### Update User Profile
- **PUT** `/api/users/profile`
- **Access**: Private
- **Description**: Update user profile
- **Body**:
```json
{
  "name": "John Updated",
  "phone": "9876543210",
  "profileImage": "image_url_here",
  "preferences": {
    "notifications": false,
    "language": "es"
  }
}
```

### Get Dashboard Data
- **GET** `/api/users/dashboard`
- **Access**: Private
- **Description**: Get user dashboard statistics (placeholder)
- **Response**: Dashboard summary data

### Update User Location
- **PUT** `/api/users/location`
- **Access**: Private
- **Description**: Update user's location
- **Body**:
```json
{
  "coordinates": [-74.006, 40.7128],
  "address": "New York, NY"
}
```

---

## Waste Management Routes (`/api/waste`)

### Add Waste Item
- **POST** `/api/waste/add`
- **Access**: Private
- **Description**: Add a new waste item for recycling
- **Body**:
```json
{
  "category": "plastic",
  "description": "Plastic bottles",
  "quantity": 5,
  "unit": "kg",
  "images": ["image1.jpg", "image2.jpg"],
  "location": {
    "coordinates": [-74.006, 40.7128],
    "address": "New York, NY"
  },
  "estimatedValue": 25.50
}
```

### Get My Waste Items
- **GET** `/api/waste/my-items`
- **Access**: Private
- **Description**: Get current user's waste items
- **Query Parameters**:
  - `status`: Filter by status (available, sold, collected)
- **Response**: Array of waste items

### Update Waste Item
- **PUT** `/api/waste/:id`
- **Access**: Private (Owner only)
- **Description**: Update a waste item
- **Body**: Same as add waste item (partial updates allowed)

### Delete Waste Item
- **DELETE** `/api/waste/:id`
- **Access**: Private (Owner only)
- **Description**: Delete a waste item

### Get Nearby Recyclers
- **GET** `/api/waste/recyclers`
- **Access**: Private
- **Description**: Get nearby recyclers (placeholder)
- **Query Parameters**:
  - `lat`: Latitude
  - `lng`: Longitude
  - `radius`: Search radius in km

### Sell Waste to Recycler
- **POST** `/api/waste/sell`
- **Access**: Private
- **Description**: Sell waste to a recycler (placeholder)
- **Body**:
```json
{
  "wasteItemId": "waste_item_id",
  "recyclerId": "recycler_id",
  "price": 30.00
}
```

### Get Waste Transactions
- **GET** `/api/waste/transactions`
- **Access**: Private
- **Description**: Get user's waste-related transactions
- **Response**: Array of transactions

---

## Carbon Tracking Routes (`/api/carbon`)

### Add Carbon Activity
- **POST** `/api/carbon/add-activity`
- **Access**: Private
- **Description**: Log a carbon footprint activity
- **Body**:
```json
{
  "category": "transport",
  "activityType": "car",
  "quantity": 50,
  "unit": "km",
  "carbonEmission": 12.5,
  "date": "2025-06-17T00:00:00.000Z",
  "notes": "Daily commute"
}
```

### Get Carbon Activities
- **GET** `/api/carbon/activities`
- **Access**: Private
- **Description**: Get user's carbon activities
- **Query Parameters**:
  - `category`: Filter by category
  - `startDate`: Start date filter
  - `endDate`: End date filter
- **Response**: Array of carbon activities

### Update Carbon Activity
- **PUT** `/api/carbon/:id`
- **Access**: Private (Owner only)
- **Description**: Update a carbon activity
- **Body**: Same as add carbon activity (partial updates allowed)

### Delete Carbon Activity
- **DELETE** `/api/carbon/:id`
- **Access**: Private (Owner only)
- **Description**: Delete a carbon activity

### Get Carbon Summary
- **GET** `/api/carbon/summary`
- **Access**: Private
- **Description**: Get user's carbon footprint summary
- **Response**: Total emissions, average, by category breakdown

### Get Carbon Trends
- **GET** `/api/carbon/trends`
- **Access**: Private
- **Description**: Get monthly carbon emission trends
- **Query Parameters**:
  - `months`: Number of months to include (default: 6)
- **Response**: Monthly aggregated carbon data

---

## Community Routes (`/api/community`)

### Report Issue
- **POST** `/api/community/report`
- **Access**: Private
- **Description**: Report a community issue
- **Body**:
```json
{
  "title": "Broken streetlight",
  "description": "The streetlight on Main St is not working",
  "category": "streetlight",
  "priority": "medium",
  "images": ["image1.jpg"],
  "location": {
    "coordinates": [-74.006, 40.7128],
    "address": "Main St, New York, NY"
  }
}
```

### Get All Issues
- **GET** `/api/community/issues`
- **Access**: Private
- **Description**: Get all community issues
- **Query Parameters**:
  - `category`: Filter by category
  - `status`: Filter by status
  - `priority`: Filter by priority
- **Response**: Array of community issues

### Get Issue by ID
- **GET** `/api/community/issues/:id`
- **Access**: Private
- **Description**: Get a specific community issue
- **Response**: Community issue with comments and votes

### Update Issue
- **PUT** `/api/community/issues/:id`
- **Access**: Private (Owner only)
- **Description**: Update a community issue
- **Body**: Same as report issue (partial updates allowed)

### Delete Issue
- **DELETE** `/api/community/issues/:id`
- **Access**: Private (Owner only)
- **Description**: Delete a community issue

### Vote on Issue
- **POST** `/api/community/vote/:id`
- **Access**: Private
- **Description**: Vote on a community issue
- **Response**: Updated vote count

### Comment on Issue
- **POST** `/api/community/comment/:id`
- **Access**: Private
- **Description**: Add a comment to a community issue
- **Body**:
```json
{
  "text": "I have the same problem in my area"
}
```

### Get Nearby Issues
- **GET** `/api/community/nearby`
- **Access**: Private
- **Description**: Get community issues near user's location
- **Query Parameters**:
  - `lat`: Latitude
  - `lng`: Longitude
  - `radius`: Search radius in km (default: 5)
- **Response**: Array of nearby community issues

---

## Sharing Economy Routes (`/api/sharing`)

### Add Shared Item
- **POST** `/api/sharing`
- **Access**: Private
- **Description**: Add an item for sharing
- **Body**:
```json
{
  "title": "Electric Drill",
  "description": "Powerful electric drill for home projects",
  "category": "tools",
  "images": ["drill1.jpg", "drill2.jpg"],
  "location": {
    "coordinates": [-74.006, 40.7128],
    "address": "New York, NY"
  },
  "condition": "good"
}
```

### Get All Shared Items
- **GET** `/api/sharing`
- **Access**: Public
- **Description**: Get all available shared items
- **Query Parameters**:
  - `category`: Filter by category
  - `lat`: Latitude for location-based search
  - `lng`: Longitude for location-based search
  - `radius`: Search radius in km (default: 10)
- **Response**: Array of shared items

### Get Shared Item by ID
- **GET** `/api/sharing/:id`
- **Access**: Public
- **Description**: Get a specific shared item with full details
- **Response**: Shared item with owner info, requests, and history

### Update Shared Item
- **PUT** `/api/sharing/:id`
- **Access**: Private (Owner only)
- **Description**: Update a shared item
- **Body**: Same as add shared item (partial updates allowed)

### Delete Shared Item
- **DELETE** `/api/sharing/:id`
- **Access**: Private (Owner only)
- **Description**: Delete a shared item

### Request to Borrow Item
- **POST** `/api/sharing/:id/request`
- **Access**: Private
- **Description**: Request to borrow an item
- **Body**:
```json
{
  "message": "I would like to borrow this for a weekend project"
}
```

### Respond to Borrow Request
- **PUT** `/api/sharing/:itemId/request/:requestId`
- **Access**: Private (Owner only)
- **Description**: Approve or reject a borrow request
- **Body**:
```json
{
  "status": "approved"
}
```

### Return Item
- **PUT** `/api/sharing/:id/return`
- **Access**: Private (Borrower or Owner)
- **Description**: Mark an item as returned
- **Body**:
```json
{
  "rating": 5,
  "review": "Great tool, worked perfectly for my project"
}
```

### Get My Borrowed Items
- **GET** `/api/sharing/myborrowed`
- **Access**: Private
- **Description**: Get items currently borrowed by the user
- **Response**: Array of borrowed items

### Get My Shared Items
- **GET** `/api/sharing/myshared`
- **Access**: Private
- **Description**: Get items shared by the user
- **Response**: Array of user's shared items with request info

### Get My Item Requests
- **GET** `/api/sharing/myrequests`
- **Access**: Private
- **Description**: Get pending borrow requests for user's items
- **Response**: Array of pending requests

---

## Analytics Routes (`/api/analytics`)

### Get Platform Stats
- **GET** `/api/analytics/stats`
- **Access**: Public
- **Description**: Get overall platform statistics
- **Response**: Platform-wide metrics (users, items, transactions, etc.)

### Get User Analytics
- **GET** `/api/analytics/user/:userId`
- **Access**: Private (User or Admin only)
- **Description**: Get detailed analytics for a specific user
- **Response**: User's contribution summary across all features

### Get Leaderboard
- **GET** `/api/analytics/leaderboard`
- **Access**: Public
- **Description**: Get leaderboards for various categories
- **Query Parameters**:
  - `type`: Leaderboard type (ecoPoints, recyclers, sharers, communityContributors)
  - `limit`: Number of results (default: 10)
- **Response**: Array of top users in the specified category

### Get Trends
- **GET** `/api/analytics/trends`
- **Access**: Public
- **Description**: Get trends over time for various metrics
- **Query Parameters**:
  - `type`: Trend type (waste, carbon, issues, sharing)
  - `period`: Time period (daily, weekly, monthly)
- **Response**: Time-series data for the specified metric

---

## Data Models

### User
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "profileImage": "image_url",
  "location": {
    "type": "Point",
    "coordinates": [-74.006, 40.7128],
    "address": "New York, NY"
  },
  "ecoPoints": 150,
  "carbonScore": 0,
  "isVerified": false,
  "preferences": {
    "notifications": true,
    "language": "en"
  },
  "createdAt": "2025-06-17T00:00:00.000Z",
  "updatedAt": "2025-06-17T00:00:00.000Z"
}
```

### Waste Item
```json
{
  "_id": "waste_id",
  "userId": "user_id",
  "category": "plastic",
  "description": "Plastic bottles",
  "quantity": 5,
  "unit": "kg",
  "images": ["image1.jpg"],
  "location": {
    "type": "Point",
    "coordinates": [-74.006, 40.7128],
    "address": "New York, NY"
  },
  "status": "available",
  "estimatedValue": 25.50,
  "actualValue": 30.00,
  "recyclerId": "recycler_id",
  "createdAt": "2025-06-17T00:00:00.000Z",
  "updatedAt": "2025-06-17T00:00:00.000Z"
}
```

### Carbon Activity
```json
{
  "_id": "activity_id",
  "userId": "user_id",
  "category": "transport",
  "activityType": "car",
  "quantity": 50,
  "unit": "km",
  "carbonEmission": 12.5,
  "date": "2025-06-17T00:00:00.000Z",
  "notes": "Daily commute",
  "createdAt": "2025-06-17T00:00:00.000Z",
  "updatedAt": "2025-06-17T00:00:00.000Z"
}
```

### Community Issue
```json
{
  "_id": "issue_id",
  "userId": "user_id",
  "title": "Broken streetlight",
  "description": "The streetlight on Main St is not working",
  "category": "streetlight",
  "priority": "medium",
  "status": "open",
  "images": ["image1.jpg"],
  "location": {
    "type": "Point",
    "coordinates": [-74.006, 40.7128],
    "address": "Main St, New York, NY"
  },
  "votes": 5,
  "votedBy": ["user_id1", "user_id2"],
  "comments": [
    {
      "userId": "user_id",
      "text": "I have the same problem",
      "createdAt": "2025-06-17T00:00:00.000Z"
    }
  ],
  "createdAt": "2025-06-17T00:00:00.000Z",
  "updatedAt": "2025-06-17T00:00:00.000Z"
}
```

### Shared Item
```json
{
  "_id": "item_id",
  "ownerId": "user_id",
  "title": "Electric Drill",
  "description": "Powerful electric drill",
  "category": "tools",
  "images": ["drill1.jpg"],
  "location": {
    "type": "Point",
    "coordinates": [-74.006, 40.7128],
    "address": "New York, NY"
  },
  "availability": true,
  "condition": "good",
  "borrowRequests": [
    {
      "userId": "borrower_id",
      "message": "Need for weekend project",
      "requestDate": "2025-06-17T00:00:00.000Z",
      "status": "pending"
    }
  ],
  "currentBorrower": null,
  "borrowHistory": [
    {
      "userId": "past_borrower_id",
      "borrowDate": "2025-06-10T00:00:00.000Z",
      "returnDate": "2025-06-12T00:00:00.000Z",
      "rating": 5,
      "review": "Great tool!"
    }
  ],
  "createdAt": "2025-06-17T00:00:00.000Z",
  "updatedAt": "2025-06-17T00:00:00.000Z"
}
```

### Transaction
```json
{
  "_id": "transaction_id",
  "userId": "user_id",
  "type": "waste_sale",
  "amount": 30.00,
  "description": "Sale of plastic waste",
  "relatedId": "waste_item_id",
  "status": "completed",
  "createdAt": "2025-06-17T00:00:00.000Z",
  "updatedAt": "2025-06-17T00:00:00.000Z"
}
```

---

## Error Responses

All error responses follow this format:
```json
{
  "message": "Error description"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

---

## Notes

1. All coordinates use GeoJSON format: `[longitude, latitude]`
2. Dates are in ISO 8601 format
3. File uploads for images are not implemented yet - currently using string URLs
4. Email functionality for password reset is placeholder implementation
5. Some recycler and location-based features have placeholder implementations
6. The API uses MongoDB ObjectId format for all IDs
7. Eco-points are awarded automatically for certain actions (sharing items, etc.)
8. The admin middleware checks for an `isAdmin` field on the user model (not implemented yet)
