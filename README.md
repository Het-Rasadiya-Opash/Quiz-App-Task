## Quiz App

## Tech Stack

**Frontend**
- React 19
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- cookie-parser

### Backend Setup


cd Backend
npm install


Create a `.env` file:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the server:

npm run dev

### Frontend Setup

cd Frontend
npm install

Create a `.env` file:

VITE_API_ENDPOINT=http://localhost:3000/api


Start the dev server:

npm run dev


