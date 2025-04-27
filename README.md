
# CRM Freelancer Dashboard

A full-stack CRM dashboard for freelancers to manage clients, projects, reminders, and interaction logs.

---

## 🚀 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, RTK Query, React Router, React Hot Toast, React Modal, Framer Motion, Lucide Icons
- **Backend:** Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, JWT Auth
- **API Docs:** Postman Collection (see below)
- **Other:** dbdiagram.io for ERD

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL

### 1. Clone the repository

```sh
git clone [https://github.com/yourusername/your-repo-name.git](https://github.com/Ashraf-ul-I/CRM_forFreelancer.git)
cd CRM_forFreelancer
```

### 2. Setup the Backend

```sh
cd backend
cp .env.example .env
# Edit .env to set the DATABASE_URL and JWT_SECRET if you needs i can share my .env file also

npm install
npx prisma migrate dev --name init
npm run dev
```

### 3. Setup the Frontend

```sh
cd frontend
cp .env.example .env
# Edit .env to set your VITE_API_URL (e.g. http://localhost:3000/api)

npm install
npm run dev
```

---

## ERD (Entity Relationship Diagram)

![image](https://github.com/user-attachments/assets/3b660811-6343-4227-8975-876ce1f061b5)


## 📝 Summary of Approach & Decisions

- **Monorepo**: Separate `frontend` and `backend` folders for clear separation of concerns.
- **Prisma ORM**: For type-safe, easy-to-manage database access and migrations.
- **RTK Query**: For efficient, cache-aware data fetching in React.
- **Responsive UI**: Sidebar and navbar are responsive and mobile-friendly.
- **Authentication**: JWT-based, with protected routes and user-specific data.
- **Reminders Modal**: Shows due reminders on login for better user experience.
- **API Documentation**: Provided via thunder client in vs code collection for easy testing.

---

##  API Documentation

- **Postman Collection:** upload the thunderclient and postman both json file in the repo
- **Base URL:** `http://localhost:3000/api`
- **Auth:** JWT Bearer Token (see login/signup endpoints)

---

##  Screenshots

![image](https://github.com/user-attachments/assets/808d9399-2d63-4fd5-99d1-8635b3a64756)
--clients page
![image](https://github.com/user-attachments/assets/77057811-f1fe-4f39-80ff-0a78d99a89a9)
--project page
![image](https://github.com/user-attachments/assets/b6940fec-d4fa-428d-98eb-a044587e0e59)
--interaction page
![image](https://github.com/user-attachments/assets/1fca50f6-63cd-4e6c-ad48-b5bcf72fe710)
--add new project
![image](https://github.com/user-attachments/assets/17328af0-cf50-4fc6-aba6-189c75eae718)
--reminders modal
![image](https://github.com/user-attachments/assets/f103b96b-4c23-47fa-b425-37823f428bfb)



---

