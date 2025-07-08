
import { Account, Client, Databases, Avatars, ID} from "react-native-appwrite"
import {CreateUserPrams, SignInParams} from "@/type";

export  const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform: "com.food_ordering",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: "686d2ebc0008da872b0c",
    userCollectionId: "686d2ff9000c73db13f5"
}

export const client = new Client();

client.setEndpoint(appwriteConfig.endpoint!).setProject(appwriteConfig.projectId!).setPlatform(appwriteConfig.platform!);

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserPrams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if(!newAccount) throw new Error("Failed to create user");
        await signIn({ email, password});
        const avatUrl = avatars.getInitials(name);
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id, email, name, avatar: avatUrl
            }

        )

        return newUser;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const signIn = async({ email, password } : SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        if(!session) throw new Error("Failed to create session");

    } catch (error: any) {
        throw new Error(error.message);
    }
}

