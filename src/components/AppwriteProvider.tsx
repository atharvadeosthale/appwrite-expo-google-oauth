import * as Linking from "expo-linking";
import { Href, router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { Models, OAuthProvider } from "react-native-appwrite";
import { account } from "../lib/appwrite";

const UserContext = createContext<{
  current: Models.User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}>({
  current: null,
  login: async () => {},
  logout: async () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function AppwriteProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User | null>(null);

  async function login(redirectPath: string = "") {
    try {
      const redirectUri = Linking.createURL(redirectPath);

      const response = await account.createOAuth2Token(
        {
          provider: OAuthProvider.Google,
          success: redirectUri,
          failure: redirectUri
      }
      );

      if (!response) {
        console.error("No OAuth URL returned from Appwrite");
        return;
      }

      const result = await WebBrowser.openAuthSessionAsync(
        response.toString(),
        redirectUri
      );

      if (result.type === "success" && result.url) {
        const url = new URL(result.url);

        const secret = url.searchParams.get("secret");
        const userId = url.searchParams.get("userId");

        await account.createSession({
            userId: userId!,
            secret: secret!
        });
        const user = await account.get();

        if (Platform.OS === "ios") {
          router.replace(redirectPath as Href);
        }

        setUser(user);
      }
    } catch (error) {
      console.error("OAuth error:", error);
    }
  }

  async function logout() {
    await account.deleteSession({
        sessionId: "current"
    });
    setUser(null);
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, [user]);

  return (
    <UserContext.Provider value={{ current: user, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
}
