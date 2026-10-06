# Google OAuth in Expo with Appwrite

Example app for the [Google OAuth in Expo](https://appwrite.io/blog/post/google-oauth-expo) blog post. It signs users in with Google through Appwrite in an Expo Router app (Expo SDK 57).

## Set up Appwrite

1. Create a project in the [Appwrite Console](https://appwrite.io/console).
2. Enable the Google OAuth provider for the project. The [Google sign-in guide](https://appwrite.io/blog/post/setting-up-google-signin) walks through creating the Google OAuth client.
3. Add an **Android** and an **Apple** platform to the project with the package name and bundle ID `com.example.expo-google-oauth`, or the IDs you set in `app.json`.

## Run the app

1. Install dependencies.

   ```bash
   npm install
   ```

2. In `src/lib/appwrite.ts`, replace `<ENDPOINT>`, `<PROJECT_ID>`, and `<PACKAGE_NAME>` with your project's endpoint, project ID, and the package name you registered.

3. Start the app, then open it in [Expo Go](https://expo.dev/go), an Android emulator, or an iOS simulator.

   ```bash
   npx expo start
   ```

## Where the code lives

- `src/lib/appwrite.ts` creates the Appwrite client.
- `src/components/AppwriteProvider.tsx` handles sign in with `createOAuth2Token()`, the browser session, and sign out, and shares the user through the `useUser()` hook.
- `src/app/_layout.tsx` wraps the app in the provider.
- `src/app/index.tsx` shows the sign-in screen and the signed-in user.
