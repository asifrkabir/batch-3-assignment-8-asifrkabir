# Library Management System Server

Welcome to the Library Management System Server! This application serves as the backend for managing books and borrow records. It allows users to add, update, delete books, and manage borrow records. Below are the instructions on how to set up and run the application locally.

## Key Features & Functionality

- Book Management:
  - Add, update, and delete books.
  - Manage book details such as title, genre, published year, total copies, and available copies.
- Borrow Record Management:
  - Track and manage borrowing of books.
  - Update borrow records with return dates.
  - Ensure that books cannot be borrowed if no copies are available.
- Overdue Book Tracking:
  - Keep track of books that are overdue based on a 14-day return policy.
  - Fetch a list of overdue borrow records along with the borrower and overdue days.
- User Validation:
  - Ensure valid data entries for books and borrow records using Zod for schema validation.
  - Ensure unique email validation for members when adding or updating their data.

## Technology Stack & Packages

 - Node.js
 - Express.js
 - PostgreSQL
 - Prisma ORM

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- PostgreSQL

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/asifrkabir/batch-3-assignment-8-asifrkabir

```

2. Navigate to the project directory:

```bash
cd batch-3-assignment-8-asifrkabir

```

3. Install dependencies::

```bash
npm install

```

## Configuration

1. Create a .env file in the root directory of the project.

2. Add the following environment variables to the .env file:

```plaintext
NODE_ENV=development
PORT=5000
DATABASE_URL={}
```

Adjust the values to match your application.

## Running the Application

To start the application, run the following command:

```bash
npm run start:dev

```

The application will be running at http://localhost:5000.

## Live Backend Deployment

You can access the live version of the backend at:
https://batch-3-assignment-8-asifrkabir.vercel.app
