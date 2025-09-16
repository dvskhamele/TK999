# TK999 Mini-Demo Web Application (Frontend Only)

This is a lightweight, frontend-only demo for a betting platform called TK999. All backend actions are mocked directly within the React application using in-memory JavaScript objects. This allows for a fully functional end-to-end user experience directly in your browser without needing a separate backend server.

## Tech Stack

- **Frontend:** React.js (with Vite), React Router
- **State Management:** React Context API
- **Styling:** Tailwind CSS
- **Database:** In-memory JavaScript objects (mocked within the frontend)
- **Authentication:** Mocked JWT and OTP
- **Notifications:** Browser toast notifications

## Features

- User Registration and Login (mocked OTP)
- User Dashboard with Wallet and Transaction History
- Match Listing and Betting
- Mock Admin Panel to manage matches and view data
- Toast notifications for user actions

## Prerequisites

- Node.js (v14 or later)
- npm

## Installation

1.  **Navigate to the client directory:**
    ```bash
    cd TK999/client
    ```
2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

## Running the Application

1.  **Start the frontend development server:**

    From the `TK999/client` directory, run:
    ```bash
    npm run dev
    ```

2.  **Access the application:**

    Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173/`).

## How to Use the Demo

### Regular User Flow

1.  **Register:** Create a new account using the registration form.
2.  **Login:** Log in using the email you registered with and the mock OTP **`123456`**.
3.  **Dashboard:** View your profile, mock wallet balance (initially 1000 BDT), and transaction history.
4.  **Deposit/Withdraw:** The buttons will simulate actions and update your balance and transaction list in memory.
5.  **Place a Bet:** Navigate to the "Matches" page, choose a team, and enter a bet amount when prompted. Your wallet balance will update instantly.

### Admin Flow

1.  **Login as Admin:** Use the main login form with the following mock credentials:
    -   **Email:** `admin@example.com`
    -   **OTP:** `admin123`

2.  **Access Admin Panel:** After logging in as an admin, an "Admin" link will appear in the header. Click it to go to the admin dashboard.
3.  **Manage Matches:** In the admin panel, you can set a winner for any pending match. This will update the match result and automatically update the status of all bets placed on that match (to 'Won' or 'Lost') and adjust user wallets accordingly.