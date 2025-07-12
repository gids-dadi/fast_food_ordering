// import { ID } from "react-native-appwrite";
// import { appwriteConfig, databases, storage } from "./appwrite";
// import dummyData from "./data";
//
// interface Category {
//     name: string;
//     description: string;
// }
//
// interface Customization {
//     name: string;
//     price: number;
//     type: "topping" | "side" | "size" | "crust" | string; // extend as needed
// }
//
// interface MenuItem {
//     name: string;
//     description: string;
//     image_url: string;
//     price: number;
//     rating: number;
//     calories: number;
//     protein: number;
//     category_name: string;
//     customizations: string[]; // list of customization names
// }
//
// interface DummyData {
//     categories: Category[];
//     customizations: Customization[];
//     menu: MenuItem[];
// }
//
// // ensure dummyData has the correct shape
// const data = dummyData as DummyData;
//
// async function clearAll(collectionId: string): Promise<void> {
//     const list = await databases.listDocuments(
//         appwriteConfig.databaseId,
//         collectionId
//     );
//
//     await Promise.all(
//         list.documents.map((doc) =>
//             databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
//         )
//     );
// }
//
// async function clearStorage(): Promise<void> {
//     const list = await storage.listFiles(appwriteConfig.bucketId);
//
//     await Promise.all(
//         list.files.map((file) =>
//             storage.deleteFile(appwriteConfig.bucketId, file.$id)
//         )
//     );
// }
//
// // async function uploadImageToStorage(imageUrl: string) {
// //     const response = await fetch(imageUrl);
// //     const blob = await response.blob();
// //
// //     const fileObj = {
// //         name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
// //         type: blob.type,
// //         size: blob.size,
// //         uri: imageUrl,
// //     };
// //     console.log("fileObj", fileObj);
// //
// //     const file = await storage.createFile(
// //         appwriteConfig.bucketId,
// //         ID.unique(),
// //         fileObj
// //     );
// //
// //     console.log("log after upload", file);
// //
// //     return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
// // }
//
// // async function uploadImageToStorage(imageUrl: string) {
// //     const response = await fetch(imageUrl);
// //     const blob = await response.blob();
// //
// //     // Create a File object from the blob
// //     const file = new File(
// //         [blob],
// //         imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
// //         { type: blob.type }
// //     );
// //
// //     // Upload the file to Appwrite
// //     const uploadedFile = await storage.createFile(
// //         appwriteConfig.bucketId,
// //         ID.unique(),
// //         file
// //     );
// //
// //     console.log("log after upload", uploadedFile);
// //
// //     return storage.getFileViewURL(appwriteConfig.bucketId, uploadedFile.$id);
// // }
//
// async function uploadImageToStorage(imageUrl: string) {
//     const response = await fetch(imageUrl);
//     const blob = await response.blob();
//
//     // Create a File object from the blob
//     const file = new File(
//         [blob],
//         imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
//         { type: blob.type }
//     );
//
//     // Upload the file to Appwrite
//     const uploadedFile = await storage.createFile(
//         appwriteConfig.bucketId,
//         ID.unique(),
//         file
//     );
//
//     console.log("log after upload", uploadedFile);
//
//     return storage.getFileViewURL(appwriteConfig.bucketId, uploadedFile.$id);
// }
//
//
// async function seed(): Promise<void> {
//     // 1. Clear all
//     await clearAll(appwriteConfig.categoriesCollectionId);
//     await clearAll(appwriteConfig.customizationsCollectionId);
//     await clearAll(appwriteConfig.menuCollectionId);
//     await clearAll(appwriteConfig.menuCustomizationCollectionId);
//     await clearStorage();
//
//     // 2. Create Categories
//     const categoryMap: Record<string, string> = {};
//     for (const cat of data.categories) {
//         const doc = await databases.createDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.categoriesCollectionId,
//             ID.unique(),
//             cat
//         );
//         categoryMap[cat.name] = doc.$id;
//     }
//
//     // 3. Create Customizations
//     const customizationMap: Record<string, string> = {};
//     for (const cus of data.customizations) {
//         const doc = await databases.createDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.customizationsCollectionId,
//             ID.unique(),
//             {
//                 name: cus.name,
//                 price: cus.price,
//                 type: cus.type,
//             }
//         );
//         customizationMap[cus.name] = doc.$id;
//     }
//
//     // 4. Create Menu Items
//     const menuMap: Record<string, string> = {};
//     for (const item of data.menu) {
//         const uploadedImage = await uploadImageToStorage(item.image_url);
//         console.log("about to create menu doc");
//         const doc = await databases.createDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.menuCollectionId,
//             ID.unique(),
//             {
//                 name: item.name,
//                 description: item.description,
//                 image_url: uploadedImage,
//                 price: item.price,
//                 rating: item.rating,
//                 calories: item.calories,
//                 protein: item.protein,
//                 categories: categoryMap[item.category_name],
//             }
//         );
//
//         console.log("doc", doc);
//
//         menuMap[item.name] = doc.$id;
//
//         // 5. Create menu_customizations
//         for (const cusName of item.customizations) {
//             await databases.createDocument(
//                 appwriteConfig.databaseId,
//                 appwriteConfig.menuCustomizationCollectionId,
//                 ID.unique(),
//                 {
//                     menu: doc.$id,
//                     customizations: customizationMap[cusName],
//                 }
//             );
//         }
//     }
//
//     console.log("✅ Seeding complete....");
// }
//
// export default seed;

import { ID } from "react-native-appwrite";
import { appwriteConfig, databases, storage } from "./appwrite";
import dummyData from "./data";

interface Category {
    name: string;
    description: string;
}

interface Customization {
    name: string;
    price: number;
    type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    customizations: string[]; // list of customization names
}

interface DummyData {
    categories: Category[];
    customizations: Customization[];
    menu: MenuItem[];
}


const data = dummyData as DummyData;

async function clearAll(collectionId: string): Promise<void> {
    try {
        const list = await databases.listDocuments(
            appwriteConfig.databaseId,
            collectionId
        );

        await Promise.all(
            list.documents.map((doc) =>
                databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
            )
        );
        console.log(`✅ Cleared collection: ${collectionId}`);
    } catch (error) {
        console.error(`❌ Error clearing collection ${collectionId}:`, error);
        throw error;
    }
}

async function clearStorage(): Promise<void> {
    try {
        const list = await storage.listFiles(appwriteConfig.bucketId);

        await Promise.all(
            list.files.map((file) =>
                storage.deleteFile(appwriteConfig.bucketId, file.$id)
            )
        );
        console.log('✅ Cleared storage');
    } catch (error) {
        console.error('❌ Error clearing storage:', error);
        throw error;
    }
}

async function uploadImageToStorage(imageUrl: string): Promise<string> {
    try {
        console.log(`📤 Uploading image: ${imageUrl}`);
        const response = await fetch(imageUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
        const fileName = imageUrl.split("/").pop() || `file-${Date.now()}.jpg`;

        const uploadedFile = await storage.createFile(
            appwriteConfig.bucketId,
            ID.unique(),
            blob
        );

        const viewURL = storage.getFileViewURL(appwriteConfig.bucketId, uploadedFile.$id);
        console.log(`✅ Image uploaded successfully: ${fileName}`);
        return viewURL;
    } catch (error) {
        console.error(`❌ Error uploading image ${imageUrl}:`, error);
        throw error;
    }
}

async function seed(): Promise<void> {
    try {
        console.log("🌱 Starting seed process...");

        // 1. Clear all collections and storage
        console.log("🧹 Clearing existing data...");
        await clearAll(appwriteConfig.categoriesCollectionId);
        await clearAll(appwriteConfig.customizationsCollectionId);
        await clearAll(appwriteConfig.menuCollectionId);
        await clearAll(appwriteConfig.menuCustomizationCollectionId);
        await clearStorage();
        console.log("✅ All data cleared");

        // 2. Create Categories
        console.log("📝 Creating categories...");
        const categoryMap: Record<string, string> = {};
        for (let i = 0; i < data.categories.length; i++) {
            const cat = data.categories[i];
            try {
                const doc = await databases.createDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.categoriesCollectionId,
                    ID.unique(),
                    cat
                );
                categoryMap[cat.name] = doc.$id;
                console.log(`✅ Created category: ${cat.name} (${i + 1}/${data.categories.length})`);
            } catch (error) {
                console.error(`❌ Error creating category ${cat.name}:`, error);
                throw error;
            }
        }

        // 3. Create Customizations
        console.log("🎨 Creating customizations...");
        const customizationMap: Record<string, string> = {};
        for (let i = 0; i < data.customizations.length; i++) {
            const cus = data.customizations[i];
            try {
                const doc = await databases.createDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.customizationsCollectionId,
                    ID.unique(),
                    {
                        name: cus.name,
                        price: cus.price,
                        type: cus.type,
                    }
                );
                customizationMap[cus.name] = doc.$id;
                console.log(`✅ Created customization: ${cus.name} (${i + 1}/${data.customizations.length})`);
            } catch (error) {
                console.error(`❌ Error creating customization ${cus.name}:`, error);
                throw error;
            }
        }

        // 4. Create Menu Items (with delay to avoid rate limiting)
        console.log("🍔 Creating menu items...");
        const menuMap: Record<string, string> = {};

        for (let i = 0; i < data.menu.length; i++) {
            const item = data.menu[i];
            try {
                console.log(`📋 Processing menu item: ${item.name} (${i + 1}/${data.menu.length})`);

                // Upload image
                const uploadedImage = await uploadImageToStorage(item.image_url);

                // Create menu document
                const doc = await databases.createDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.menuCollectionId,
                    ID.unique(),
                    {
                        name: item.name,
                        description: item.description,
                        image_url: uploadedImage,
                        price: item.price,
                        rating: item.rating,
                        calories: item.calories,
                        protein: item.protein,
                        categories: categoryMap[item.category_name],
                    }
                );

                menuMap[item.name] = doc.$id;
                console.log(`✅ Created menu item: ${item.name}`);

                // 5. Create menu_customizations for this item
                console.log(`🔗 Creating customizations for: ${item.name}`);
                for (let j = 0; j < item.customizations.length; j++) {
                    const cusName = item.customizations[j];
                    try {
                        await databases.createDocument(
                            appwriteConfig.databaseId,
                            appwriteConfig.menuCustomizationCollectionId,
                            ID.unique(),
                            {
                                menu: doc.$id,
                                customizations: customizationMap[cusName],
                            }
                        );
                        console.log(`  ✅ Added customization: ${cusName} (${j + 1}/${item.customizations.length})`);
                    } catch (error) {
                        console.error(`  ❌ Error adding customization ${cusName} to ${item.name}:`, error);
                        throw error;
                    }
                }

                // Add a small delay to avoid rate limiting
                if (i < data.menu.length - 1) {
                    console.log("⏳ Waiting 1 second before next item...");
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }

            } catch (error) {
                console.error(`❌ Error processing menu item ${item.name}:`, error);
                throw error;
            }
        }

        console.log("🎉 Seeding completed successfully!");

    } catch (error) {
        console.error("💥 Seeding failed:", error);
        throw error;
    }
}

export default seed;