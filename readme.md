# Stationery Shop API

## Overview
This project is an Express application developed using TypeScript and MongoDB with Mongoose to manage a Stationery Shop. It ensures data integrity using Mongoose schema validation and provides RESTful API endpoints for CRUD operations on stationery products and orders.

## Features
- **Stationery Product Management**: Create, read, update, and delete stationery products.
- **Order Management**: Place orders, update product inventory, and calculate revenue.
- **MongoDB Integration**: Uses Mongoose for schema definition and validation.
- **Error Handling**: Implements structured error responses.
- **Aggregation**: Calculates total revenue from orders using MongoDB aggregation.

## Project Setup
### 1. Clone the repository:
```sh
git clone <repository-url>
cd stationery-shop-api
```

### 2. Install dependencies:
```sh
npm install
```

### 3. Set up environment variables:
Create a `.env` file and add the following:
```env
MONGO_URI=<your-mongodb-uri>
PORT=5000
```

### 4. Start the application:
```sh
npm run dev
```

## API Endpoints
### 1. Create a Stationery Product
- **Endpoint**: `POST /api/products`
- **Request Body**:
```json
{
  "name": "Notebook",
  "brand": "Moleskine",
  "price": 15,
  "category": "Office Supplies",
  "description": "A high-quality notebook for professionals.",
  "quantity": 200,
  "inStock": true
}
```
- **Response**: Returns the created product details.

### 2. Get All Stationery Products
- **Endpoint**: `GET /api/products`
- **Query Parameter**: `searchTerm` (Optional: name, brand, category)
- **Response**: List of products.

### 3. Get a Specific Stationery Product
- **Endpoint**: `GET /api/products/:productId`
- **Response**: Returns product details.

### 4. Update a Stationery Product
- **Endpoint**: `PUT /api/products/:productId`
- **Request Body**:
```json
{
  "price": 18,
  "quantity": 180
}
```
- **Response**: Updated product details.

### 5. Delete a Stationery Product
- **Endpoint**: `DELETE /api/products/:productId`
- **Response**: Confirmation of deletion.

### 6. Order a Stationery Product
- **Endpoint**: `POST /api/orders`
- **Request Body**:
```json
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 36
}
```
- **Response**: Confirmation of order creation and inventory update.

### 7. Calculate Revenue from Orders
- **Endpoint**: `GET /api/orders/revenue`
- **Response**:
```json
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 720
  }
}
```

## Error Handling
### Generic Error Response
```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "price": {
        "message": "Price must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Price must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "price",
        "value": -5
      }
    }
  },
  "stack": "Error: Something went wrong..."
}
```

### Common Error Scenarios
- **Not Found Errors**: Returns a 404 error if a product or order is not found.
- **Validation Errors**: Returns specific error messages for invalid input.

## Code Quality
- Uses clean and well-documented code.
- Follows RESTful API best practices.
- Implements proper error handling and validation.

## Submission Requirements
- **GitHub Repository Link**: `https://github.com/faijulislambd/PH-Web-Dev-2-Assgignment-2`
- **Live Deployment Link**: `https://assignment-2-n4sbxwqdp-faijul144s-projects.vercel.app/`
- **Video Explanation**: `https://www.awesomescreenshot.com/video/36937398?key=941b647f348addea42987029b30b67ea`

