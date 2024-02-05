![git-logo](https://github.com/DudzinskiR/Easy-Split/assets/130515506/b78abead-6bb2-42e3-8095-76355c4b9a82)
[Live demo](https://split-is-easy.vercel.app)

## Introduction

Split is Easy is an innovative tool for efficient management of shared bills. At any time, you can easily create a new account and invite your friends to collectively settle expenses.

With Split is Easy, not only will you avoid the confusion associated with splitting bills, but you will also gain control over shared finances. The user-friendly interface allows for quick addition of expenses, and the friend-inviting feature makes group settlement easy and convenient.

### Key features:

- Create new accounts with a single click
- Invite friends to settle bills together
- Add expenses and track balances
- Intuitive user interface for easy operation

## Deployment

### Frontend

Open your terminal and navigate to the frontend directory

```bash
    cd frontend
```

```bash
    cp .env.example .env
```

Here are the environment variables you need to configure in the .env file:

`VITE_API_ROOT`: The root URL for your API

`VITE_FIREBASE_API_KEY`: The API key for accessing Firebase services

`VITE_FIREBASE_AUTH_DOMAIN`: The authentication domain for your Firebase project

`VITE_FIREBASE_PROJECT_ID`: The Project ID for your Firebase project

`VITE_FIREBASE_STORAGE_BUCKET`: The storage bucket for your Firebase project

`VITE_FIREBASE_MESSAGING_SENDER_ID`: The messaging sender ID for Firebase Cloud Messaging

`VITE_FIREBASE_APP_ID`: The application ID for your Firebase project

`VITE_FIREBASE_MEASUREMENT_ID`: The measurement ID for Firebase Analytics

Install the required dependencies:

```bash
    npm install
```

Start the frontend server:

```bash
    npm run dev
```
