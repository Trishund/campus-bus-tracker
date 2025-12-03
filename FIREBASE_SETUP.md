# How to Get Your Firebase Configuration

1.  **Go to the Firebase Console**: [https://console.firebase.google.com/](https://console.firebase.google.com/)
2.  **Create a New Project** (or select your existing one).
3.  **Register Your App**:
    *   Click the **Web icon** (`</>`) on the project overview page.
    *   Give your app a nickname (e.g., "Campus Bus Tracker").
    *   Click **Register app**.
4.  **Copy the Config**:
    *   You will see a code block labeled `firebaseConfig`.
    *   Copy the values inside the object (apiKey, authDomain, etc.).
    *   Paste them into the `firebase_config_template.json` file I created for you.

## Enable Realtime Database
1.  In the Firebase Console sidebar, go to **Build** > **Realtime Database**.
2.  Click **Create Database**.
3.  Choose a location (e.g., United States or closest to you).
4.  Start in **Test Mode** (we will secure it later).

## Enable Authentication (Optional but Recommended)
1.  Go to **Build** > **Authentication**.
2.  Click **Get Started**.
3.  Enable **Anonymous** sign-in (this allows us to secure the app without forcing drivers to create accounts).
