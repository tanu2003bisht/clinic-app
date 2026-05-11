# Clinic App

A backend REST API built with Node.js, Express and MongoDB. I built this to practice backend development — things like setting up routes, connecting to a database, handling auth and structuring a real project from scratch.

## What this project does

It manages two things — doctors and medicines. You can add, view, update and delete both. Doctors are protected with JWT auth so only logged in users can access them.

I also added password hashing with bcrypt so passwords are never stored as plain text in the database.

## Tech used

- Node.js + Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt
- Passport.js
- dotenv

## How to run it locally

Clone the repo and install dependencies:

```bash
git clone https://github.com/tanu2003bisht/clinic-app.git
cd clinic-app
npm install
```

Create a `.env` file:

```
PORT=3000
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_secret_key
```

Start the server:

```bash
node server.js
```

---

## Endpoints

### Doctor

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | /doctor/signup | Register a doctor | No |
| POST | /doctor/login | Login, returns JWT token | No |
| GET | /doctor/profile | Get your profile | Yes |
| GET | /doctor | Get all doctors | Yes |
| GET | /doctor/:department | Filter by department | No |
| PUT | /doctor/:id | Update doctor | No |
| DELETE | /doctor/:id | Delete doctor | No |

Departments: `cardio` `surgeon` `gyne`

### Medicine

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /medicine | Add a medicine |
| GET | /medicine | Get all medicines |
| GET | /medicine/:category | Filter by category |
| PUT | /medicine/:id | Update medicine |
| DELETE | /medicine/:id | Delete medicine |

Categories: `antibiotic` `painkiller` `supplement`

---

## Sample requests

Signup:
```json
{
    "username": "drjohn",
    "email": "john@clinic.com",
    "phone": 9876543210,
    "password": "john123",
    "department": "cardio"
}
```

Login:
```json
{
    "username": "drjohn",
    "password": "john123"
}
```

After login you get a token. Add it to headers for protected routes:
```
Authorization: Bearer your_token_here
```

Medicine:
```json
{
    "name": "Paracetamol",
    "price": 10.99,
    "category": "painkiller",
    "is_tablet": true
}
```

---

## Folder structure

```
clinic-app/
├── models/
│   ├── doctor.js
│   └── medicine.js
├── routes/
│   ├── doctorRoutes.js
│   └── medicineRoutes.js
├── db.js
├── jwt.js
├── server.js
└── .env
```
