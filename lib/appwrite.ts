
import {Account, Client, Databases, Avatars, ID, Query, Storage} from "react-native-appwrite"
import {CreateUserPrams, SignInParams} from "@/type";

export  const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform: "com.food_ordering",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: "686d2ebc0008da872b0c",
    bucketId: "686fa1ca0010615287aa",
    userCollectionId: "686d2ff9000c73db13f5",
    categoriesCollectionId: "686e3ffb0003a8aab8cc",
    menuCollectionId: "686e41020018881d4b95",
    customizationsCollectionId: "686e47ff0035cdb2b386",
    menuCustomizationCollectionId: "686e4993001babc45f47"
}

export const client = new Client();

client.setEndpoint(appwriteConfig.endpoint!).setProject(appwriteConfig.projectId!).setPlatform(appwriteConfig.platform!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserPrams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if(!newAccount) throw new Error("Failed to create user");
        await signIn({ email, password});
        const avatarUrl = avatars.getInitialsURL(name);
          return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id, email, name, avatar: avatarUrl
            }
        )

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

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw new Error("Failed to get current user");

        const currentUser =  await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser) throw new Error("Failed to get current user");
        return currentUser.documents[0];
    } catch (error: any) {
        throw new Error(error.message);
    }
}