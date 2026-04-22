🦵 Super Knee – B2C E-commerce Web Application

Super Knee is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) based B2C e-commerce platform designed to provide a seamless shopping experience for users.

The application allows users to browse products, add them to cart, and complete the purchase process after authentication.

🚀 Live Demo

👉 https://superkneewebsite.vercel.app/

screenshots
![Alt Text](https://github.com/kranthi7581/super_knee/blob/main/GIF_home.png)
![Alt Text](https://github.com/kranthi7581/super_knee/blob/main/shop.png)
![Alt Text](https://github.com/kranthi7581/super_knee/blob/main/cart.png)

📌 Features
🛍️ Browse products with a clean UI
🛒 Add products to cart
🔐 User authentication (Login required before checkout)
📦 Collect user details for delivery
🔄 Dynamic frontend with React
🎨 Material UI for modern UI design
🌐 RESTful APIs for backend communication
🧪 API testing using Postman
🧑‍💻 Tech Stack

##Frontend
React.js
Material UI
JavaScript (ES6+)
CSS

##Backend
Node.js
Express.js
Database
MongoDB Atlas
Tools & Testing
Postman
Git & GitHub
Vercel (Deployment)

⚙️ How It Works
User visits the website
Browses available products
Clicks on a product → Adds to cart
Tries to proceed → Redirected to login
After login → User details are collected
Order is processed for delivery

📂 Project Structure
super_knee/
│
├── frontend/        # React + Material UI
├── backend/         # Node.js + Express APIs
├── screenshots     # Business logic
└── README.md

🔧 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/kranthi7581/super_knee.git
cd super_knee
2️⃣ Backend Setup
cd backend
npm install
npm start
3️⃣ Frontend Setup
cd frontend
npm install
npm start

🔑 Environment Variables

Create a .env file in the backend folder and add:

MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
JWT_SECRET=your_secret_key


📸 API Testing
All backend APIs are tested using Postman
Includes authentication, cart, and product APIs

🎯 Key Highlights
Real-world B2C flow implementation
Authentication before checkout
Clean separation of frontend & backend
Scalable REST API design
📈 Future Improvements
💳 Payment Gateway Integration
📦 Order history tracking
⭐ Product reviews & ratings
🛠️ Admin dashboard
👨‍💼 Author

Kranthi Kumar Akula

MERN Stack Developer
Passionate about building scalable web applications
⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
