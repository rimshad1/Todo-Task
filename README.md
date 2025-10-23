# React + Express + MySQL Task App (Dockerized)

This project is a simple **Login and Task Management System** built using **React (Next.js)** for the frontend, **Express.js** for the backend, and **MySQL** as the database.  
The entire app runs easily using **Docker Compose**.

- Frontend: React (Next.js)
- Backend: Express.js + Node.js
- Database: MySQL
- Deployment: Docker + Docker Compose

---

# Project Structure
  |__Todo-Task
  |   |__Backend/
  |   |   |__server.js
  |   |   |
  |   |   |__config/
  |   |   |  |__db.js
  |   |   |
  |   |   |__controllers/
  |   |   |  |__taskController.js
  |   |   |
  |   |   |__routes/
  |   |   |  |__taskRoutes.js
  |   |   |
  |   |   |__dockerfile
  |   |   |
  |   |   |__package.json
  |   |   |
  |   |   |__package-lock.json
  |   |   |
  |   |   |__.env   
  |   |
  |   |__frontend/
  |   |   |__public/
  |   |   |
  |   |   |__src/
  |   |   |  |__app/
  |   |   |    |
  |   |   |    |__home/
  |   |   |    |  |__page.js
  |   |   |    |
  |   |   |    |__signIn/
  |   |   |    |  |__page.js
  |   |   |    |
  |   |   |    |__favicon.ico
  |   |   |    |
  |   |   |    |__globals.css
  |   |   |    |
  |   |   |    |__layout.js
  |   |   |    |
  |   |   |    |__page.js
  |   |   |
  |   |   |
  |   |   |__.env.local
  |   |   |
  |   |   |__dockerfile
  |   |   |
  |   |   |__jsconfig.json
  |   |   |
  |   |   |__next.config.mjs
  |   |   |
  |   |   |__postcss.config.mjs
  |   |   |
  |   |   |__package.json
  |   |   |
  |   |   |__package-lock.json   
  |   |   
  |   |__db
  |   |  |__init.sql
  |   |
  |   |__.gitignore
  |   |
  |   |__docker-compose.yml
  |   |
  |   |__LICENSE
  |   |
  |___|__README.md

  
  


## Features

- Simple front-end login validation  
- Add, view, and update tasks  
- Each task has a **title**, **description**, and a **completed (TINYINT)** flag  
- Fully Dockerized for easy setup and running  
- MySQL database connection via Express.js backend  

---

## Default Login Credentials

Use the following to log in to the app:

- **Username:** `admin`  
- **Password:** `Admin@1234`  

> Only users with these credentials can access the `/home` page in this front-end-only version.

---

## Run with Docker

### 1. Build and start the containers
```bash
docker-compose up --build
```

### 2. Access the app
- Frontend → http://localhost:3000  
- Backend → http://localhost:4000  
- MySQL → localhost:3306

---

## Create MySQL Tables

After your containers are running, open a terminal in the MySQL container:

```bash
docker exec -it mysql_db mysql -u root -p    
```

Then run the following SQL query to create the `task` table:

```sql
CREATE DATABASE IF NOT EXISTS task_db;
USE task_db;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed TINYINT(1) DEFAULT 0
);
```

 Explanation:
- `title` → Task title  
- `description` → Task details  
- `completed` → 0 = not done, 1 = done  

---

## Environment Variables

Create a `.env` file in the server folder:

```
DB_HOST=db
DB_USER=root
DB_PASS=
DB_NAME=projects
PORT=4000
```

> Note: The `DB_HOST=db` must match the name of your MySQL service in `docker-compose.yml`.

## Setup Before Docker Build (Optional)

If you plan to run the app **locally without Docker**, install dependencies first:

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install

---

## Development Commands

| Command | Description |
|----------|--------------|
| `docker-compose up --build` | Build and run all containers |
| `docker-compose down` | Stop all containers |
| `docker exec -it mysql-container mysql -u root -p` | Access MySQL shell |
| `npm run dev` | Run Next.js frontend locally (if not using Docker) |

---

## Example Task Object

```json
{
  "id": 1,
  "title": "Finish Docker setup",
  "description": "Add SQL table creation and run containers",
  "completed": 0
}
```

---

## Author

**Rimshad Ahamed**  
React.js & React Native Developer  
[GitHub Profile](https://github.com/rimshad1)
