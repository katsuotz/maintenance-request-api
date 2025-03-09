# NestJS Project - Maintenance Request API

This is a **NestJS** project using **Sequelize** and **GraphQL**.

## 🚀 Getting Started

### **1️⃣ Setup Environment Variables**
Copy the **`.env.example`** file and rename it to **`.env`**:
```sh
cp .env.example .env
```
Then, configure your **database connection** in the `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nestjs_graphql
```

---

### **2️⃣ Install Dependencies**
Use **pnpm** to install all required packages:
```sh
pnpm install
```

---

### **3️⃣ Run Database Migrations and Seeders**
Before starting the project, **run the database migrations** and **seed the data**:
```sh
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

This will set up the database schema and populate the initial data.

---

### **4️⃣ Start the Development Server**
Run the project in development mode:
```sh
pnpm start:dev
```
---

## 🛠 Tech Stack
- **NestJS** (Backend Framework)
- **Sequelize** (ORM for PostgreSQL)
- **GraphQL (Apollo Server)**
- **pnpm** (Package Manager)
- **Server-Sent Events (SSE) to Update Metrics in Realtime**

---

## 📌 Notes
- Ensure **PostgreSQL** is running before running migrations.
- Modify `.env` if using a different database setup.

---

