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
git clone https://github.com/your-repo-url.git

Replace https://github.com/your-repo-url.git with the actual repository URL. Then, navigate to the project folder:
cd your-repo-name

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


Separate Frontend and Backend:
For frontend:cd frontend
npm install


For backend:cd backend
npm install





This installs libraries like next, react, express, mongoose, paystack-api, and others listed in package.json.
4. Configure Environment Variables
Create a .env file in the project root (or in frontend and backend folders if separate). Add the following variables:



Variable
Description



MONGO_URI
MongoDB connection string (e.g., mongodb://localhost:27017/your-database)


PAYSTACK_SECRET_KEY
Paystack secret key (e.g., sk_test_xxx for testing)


JWT_SECRET
Random secret for JWT authentication (e.g., your-secret-key)


TOKEN_EXPIRATION
JWT token expiration time (e.g., 1d for one day)


Example .env:
MONGO_URI=mongodb://localhost:27017/ecommerce
PAYSTACK_SECRET_KEY=sk_test_xxx
JWT_SECRET=your-secret-key
TOKEN_EXPIRATION=1d


Get your Paystack secret key from the Paystack Dashboard.
Use a secure random string for JWT_SECRET.

5. Run the Application

Single Project (Next.js with API Routes):
Run the development server:npm run dev


This starts both the frontend and backend (if using Next.js API routes).


Separate Frontend and Backend:
Start the backend server (e.g., on port 5000):cd backend
npm start


Start the frontend server (e.g., on port 3000):cd frontend
npm run dev





6. Access the Website

Open your browser and go to http://localhost:3000 (or the port specified in your Next.js setup).
Navigate to the dashboard or product page to test the application.
To test payments, use a Paystack test card:
Card Number: 4084084084084081
CVV: 408
Expiry: 12/34
PIN: 1234



7. Set Up Webhooks (Optional for Testing)
To handle Paystack webhooks for payment confirmation:

Use ngrok to expose your local server:ngrok http 5000

Copy the public URL (e.g., https://abc123.ngrok.io).
In the Paystack Dashboard, set the webhook URL to https://abc123.ngrok.io/api/payments/webhook.
Test webhook delivery using Paystack’s dashboard.

Testing the Payment Flow

Initiate Payment:
On the dashboard, select a product and open the payment modal.
Click “Confirm Payment” and then “Pay Now” to open the Paystack checkout in a new tab.


Complete Payment:
Use the test card details above.
After payment, Paystack redirects to the dashboard with a reference (e.g., /dashboard?reference=order_683a10b823bf771a098d772d_1748641942366).


Verify Payment:
A modal on the dashboard shows “Verifying payment...” and updates to “Payment successful!” or an error.


Check Database:
Verify the order in MongoDB:db.orders.findOne({ paymentReference: "order_683a10b823bf771a098d772d_1748641942366" })

Expect paymentStatus: "completed" after verification.



Troubleshooting



Issue
Solution



Database connection fails
Check MONGO_URI in .env and ensure MongoDB is running.


Payment errors
Verify PAYSTACK_SECRET_KEY and use test card details.


Frontend not loading
Run npm run dev and check terminal for errors.


Webhook not received
Ensure ngrok is running and the webhook URL is set in Paystack dashboard.


Additional Notes

Ensure MongoDB has collections for products, orders, and users.
For production, deploy the frontend and backend to services like Vercel (for Next.js) and Heroku (for Express), and use a secure domain for webhooks.
Check terminal or browser console logs for errors during setup or testing.

