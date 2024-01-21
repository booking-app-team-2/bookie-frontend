# Bookie Frontend
Frontend app for Bookie.

# Contributors
- Darko Svilar SV50/2021
- Gojko Vučković SV49/2021
- Boris Markov SV73/2021

# Usage instructions
## Prerequisites
Clone the **[Bookie Backend](https://github.com/booking-app-team-2/bookie-backend)** project and run it.<br>

Clone the project from this repository<br>

In your preferred editor/shell, positioned inside the project, run `ng serve -o` for a dev server.
This will automatiaclly open `http://localhost:4200/` in your browser.<br>

## Usage
Use the app as regular.<br>

### Note
If you change any data that needs reverting during the testing of the app, just rerun the server. The server drops and recreates the DB schema every time it is rerun and has a test script setup that inserts the same test data upon running the app.

## Logging in
The landing page of the app is the main screen for an unauthenticated user.<br>
To log in, press the Login button on the navigation bar.

This is a list of valid users by role that should suffice for testing the project:
- Guest
  - Username: `darko@gmail.com`
  - Password: `darko123`
- Owner
  - Username: `owner@gmail.com`
  - Password: `owner123`
- Admin
  - Username: `bookie@gmail.com`
  - Password: `bookie123`
