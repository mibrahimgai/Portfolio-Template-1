# Email Setup Instructions

The contact form currently logs emails to the server console (where you run `npm run dev`) because it doesn't have permission to access your Gmail account yet.

To send actual emails to your Gmail app, follow these steps:

1.  **Create a Configuration File**:
    Create a new file named `.env.local` in the root of your project (`/Users/ibrahimimran/Documents/Portfolio Template 1/`).

2.  **Generate an App Password**:
    - Go to your [Google Account Security page](https://myaccount.google.com/security).
    - Enable "2-Step Verification" if it is off.
    - Search for "App Passwords" in the search bar at the top (or look under "How you sign in to Google").
    - Create a new App Password (name it "Portfolio Website").
    - Copy the generated 16-character password (e.g., `abcd efgh ijkl mnop`).

3.  **Add Credentials to File**:
    Paste the following into your new `.env.local` file:

    ```env
    EMAIL_USER=gaimran414@gmail.com
    EMAIL_PASS=paste-your-16-char-password-here
    ```

4.  **Restart Server**:
    Stop the running server (Ctrl+C) and run `npm run dev` again to load the new settings.
