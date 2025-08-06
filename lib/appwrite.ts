import { Account, Client } from "react-native-appwrite";

const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("688b6e6d001916ecadfd") // Replace with your project ID
  .setPlatform("com.example.expo-google-oauth");

export const account = new Account(client);
