# Project README: Paystack Payments
This project is a web application that allows users to browse products, make purchases, and process payments using Paystack. It consists of a frontend built with Next.js (React) and a backend built with Node.js and Express, using MongoDB for data storage. Below is a detailed guide to set up and run the project on your computer.
Overview
The application includes:

Frontend: A Next.js app with redux for managing states, and axios for api function construction
# to run the front end lunch the project, 
#        and => cd client <=
#         => Then run npm install to set up up the node_modules <=
#       to start run => npm run dev <=
#  server runs on port 3000
Backend: An Express server handling API routes for product management, payment initialization, verification, and webhooks.
# to run the server  lunch the project, 
#        and => cd server <=
#         => Then run npm install to set up up the node_modules <=
#       to start run => npm run server <=
# server runs on port 8080

# note that payment verification, and webhook is not fully implemented, but all edge cases have been handled

Database: MongoDB to store products, orders, and user data.
Payment Integration: Paystack for processing payments, including initialization, verification, and webhook handling.

The payment flow works as follows:

# Users select a product and initiate payment via a modal.
# The backend initializes a Paystack transaction, returning an authorization_url.
# Users complete payment on Paystack’s checkout page.
# Paystack redirects back to the dashboard, where a modal shows the payment status.
# A webhook ensures payment confirmation even if the user closes the browser.

Prerequisites
Before running the project, ensure you have:

Node.js: Version 14 or higher, available at Node.js Download.
MongoDB: A running MongoDB instance, either locally or via MongoDB Atlas.
Paystack Account: Sign up at Paystack to get a test or live secret key.
Git: Installed to clone the repository, available at Git Download.

Setup Instructions
Follow these steps to get the project running:
1. Clone the Repository
Download the project files using Git:
git clone https://github.com/paymentSystem


2. Set Up MongoDB

Local MongoDB:
Install MongoDB if not already installed.
Start the MongoDB server:mongod


Ensure it’s running on the default port (27017).


MongoDB Atlas:
Create a cluster at MongoDB Atlas.
Get your connection string (e.g., mongodb+srv://username:password@cluster0.mongodb.net/your-database).



3. Install Dependencies
The project may have a single package.json or separate ones for frontend and backend. Install dependencies accordingly:

Single Project:npm install


4. Configure Environment Variables
Create a .env file in the project root (or in frontend and backend folders if separate). Add the following variables:



Variable
Description
PORT=8080
MONGO_URL=mongodb://127.0.0.1:27017/payment-system
PAYSTACK_SECRET_KEY=
NEXT_PUBLIC_API_URL="http://localhost:8080"
PAYSTACK_CALLBACK_URL=
JWT_SECRET
TOKEN_EXPIRATION


Get your Paystack secret key from the Paystack Dashboard.
Use a secure random string for JWT_SECRET.

5. Run the Application


