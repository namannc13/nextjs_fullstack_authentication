# Next.js Authentication

## Description
This project is a Next.js fullstack application that provides user authentication functionality including signup, login, email verification. For Email verification , nodemailer is used.

## Features
- User signup with email verification
- User login with JWT token generation
- User profile management
- Logout functionality

## Installation
```bash
npm install 

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
1. Install dependencies:
```
npm install
```
2. Configure environment variables in a `.env.local` ( add 'NEXT_PUBLIC_' in front of environmental variables in .env.local file ) file:
```
NEXT_PUBLIC_MONGO_URI = "..."
NEXT_PUBLIC_JWT_TOKEN = ...
NEXT_PUBLIC_DOMAIN = "..." 
```
3. Run the development server using `npm run dev`

## Usage
1. Sign up for a new account using your email.
2. Verify your email address by clicking on the verification link sent to your email.
3. Log in to your account using your email and password.
4. Open your web browser and navigate to `http://localhost:3000` to access the application.
5. Access your profile page to view your information.
6. Log out from your account when done.

## API Endpoints
- POST /api/users/signup: Create a new user account
- POST /api/users/login: Log in to an existing user account
- GET /api/users/me: Get the user's profile information
- POST /api/users/verifyemail: Verify the user's email address
- GET /api/users/logout: Log out the user

## Project Structure
- `/app/pages`: Contains the Next.js pages for different routes
- `/app/api`: Contains the API routes for handling user authentication
- `/models`: Contains the Mongoose models for user data
- `/utils`: Contains utility functions for sending emails and handling middleware

## Technologies Used
- Next.js
- MongoDB
- Axios
- bcryptjs
- jwt
- nodemailer

## Contributing
Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
