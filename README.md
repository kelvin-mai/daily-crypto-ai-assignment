# Book Tracker Application

This is a full-stack Book Tracker application that allows users to manage their book collection effectively. Users can add, edit, delete, and track their reading progress for books. The application also includes user authentication and authorization. It uses the starting repo by [Daily-Crypto-AI](https://github.com/Daily-Crypto-AI) which can be found [here](https://github.com/Daily-Crypto-AI/hiring-task/tree/main).

The original project sraffold already included a mongodb backed Typescript express server with JWT authentication so I decided to expand on it by continuing to use the MERN stack.

## Features

- **User Authentication**: Secure login and registration functionality.
- **Book Management**: Add, edit, delete, and view books in a collection.
- **Reading Progress Tracking**: Track the number of pages read and overall progress for each book.
- **Dark Mode Support**: Toggle between light and dark themes.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tools and Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Vite**: A fast build tool for modern web projects.
- **Zustand**: A state management library for React.
- **Radix UI**: Accessible and customizable UI components.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Framer Motion**: A library for animations and gestures.
- **Sonner**: A toast notification library for React.

### Backend

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing user and book data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
- **bcryptjs**: A library for hashing passwords.
- **jsonwebtoken**: A library for generating and verifying JSON Web Tokens (JWT).
- **jest**: A library for testing and mocking.

### DevOps

- **Docker**: Used for containerizing the MongoDB database and Mongo Express.
- **Docker Compose**: Simplifies multi-container Docker applications.

## Project Structure

### Client

The frontend is located in the `client/` directory and is built with React, TypeScript, and Vite. It includes components for user authentication, book management, and UI elements.

### Server

The backend is located in the `server/` directory and is built with Node.js and Express. It includes routes, controllers, middleware, and models for user authentication and book management.

## How to Run the Project

### Prerequisites

- Node.js and npm installed on your system.
- Docker installed for running the MongoDB database.

### Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-directory>
```

2. Install dependencies:

```bash
# inside of ./server
bun install

# inside of ./client
bun install
```

3. Run the project:

```bash
# at the root of the project, start the docker container for mongodb
docker compose up -d

# start the server and client in separate terminals
bun run dev # inside of ./server
bun run dev # inside of ./client
```

The frontend will be running on http://localhost:5173 and the backend api will be running on http://localhost:5000.
