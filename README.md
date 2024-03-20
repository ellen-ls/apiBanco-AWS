

# AWS SQS Transaction Management
This repository contains code snippets and a web application for managing transactions using Amazon Simple Queue Service (SQS), Node.js, Next.js, and TypeScript.

https://github.com/ellen-ls/apiBanco-AWS/assets/97070293/8921d1ec-63fe-4ada-b1f5-0b16e3bbc3dd





## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Frontend](#frontend)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Description

This project demonstrates how to interact with SQS to send and receive transaction data. It includes backend API endpoints to send transactions to SQS and retrieve transaction data from SQS. The frontend, built with Next.js and TypeScript, allows users to input transaction details and view recent transactions.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- AWS account with SQS set up
- React development environment (for frontend)

## Installation

1. Clone the repository:

   bash
   git clone https://github.com/your-username/aws-sqs-transaction-management.git
   

2. Navigate to the project directory:

   bash
   cd aws-sqs-transaction-management
   

3. Install backend dependencies:

   bash
   npm install
   

4. Install frontend dependencies:

   bash
   cd client
   npm install
   

## Usage

1. Set up your AWS credentials and configure the AWS SDK accordingly.

2. Start the backend server:

   bash
   npm start
   

3. Start the frontend development server:

   bash
   cd client
   npm run dev
   

4. Access the application at http://localhost:3000 in your web browser.

## Endpoints

- GET /api/infoTransacoes: Retrieves transaction data from SQS.
- POST /transacoes: Sends a new transaction to SQS.

## Frontend

The frontend is a Next.js application built with TypeScript that allows users to input transaction details and view recent transactions. It communicates with the backend API to send and receive transaction data.

To access the frontend, run the development server as described in the [Installation](#installation) section and open http://localhost:3000 in your browser.

## Scripts

- npm start: Starts the backend server.
- npm test: Runs backend tests.
- npm run dev: Starts the Next.js frontend development server.
- npm run build: Builds the Next.js frontend for production.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

