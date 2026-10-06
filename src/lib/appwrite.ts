import { Account, Client } from "react-native-appwrite";

const client = new Client();
client
  .setEndpoint("<ENDPOINT>")
  .setProject("<PROJECT_ID>") 
  .setPlatform("<PACKAGE_NAME>");

export const account = new Account(client);
