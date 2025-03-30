import { ID } from "react-native-appwrite";
import { databases, config } from "./appwrite";
import {
  agentImages,
  galleryImages,
  propertiesImages,
  reviewImages,
} from "./data";

const COLLECTIONS = {
  AGENT: config?.agentsCollectionId,
  REVIEWS: config?.reviewsCollectionId,
  GALLERY: config?.galleriesCollectionId,
  PROPERTY: config?.propertiesCollectionId,
};

// Property Types & Facilities
const propertyTypes = ["House", "Townhouse", "Condo", "Duplex", "Studio", "Villa", "Apartment", "Other"];
const facilities = ["Laundry", "Parking", "Gym", "Pet-friendly","y", "Wifi"];


// Function to Get a Random Subset of an Array
const getRandomSubset = <T,>(array: T[], min: number, max: number): T[] => {
  if (min > max) throw new Error("minItems cannot be greater than maxItems");
  const size = Math.floor(Math.random() * (max - min + 1)) + min;
  return array.sort(() => Math.random() - 0.5).slice(0, size);
};

// Retry Function for Appwrite Requests (Handles Rate Limits)
const retryRequest = async (fn: () => Promise<any>, retries = 3, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (error.code === 429 && i < retries - 1) { // Handle rate limits (Too Many Requests)
        console.warn(`Rate limit exceeded, retrying in ${delay / 1000}s...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        throw error;
      }
    }
  }
};

// Main Seed Function
const seed = async () => {
  try {
    if (!config?.databaseId) throw new Error("Database ID is missing.");
    
    // Clear all existing data
    console.log("Clearing existing data...");
    for (const key in COLLECTIONS) {
      const collectionId = COLLECTIONS[key as keyof typeof COLLECTIONS];
      if (!collectionId) continue;

      const { documents } = await databases.listDocuments(config.databaseId, collectionId);
      await Promise.all(
        documents.map((doc) =>
          retryRequest(() => databases.deleteDocument(config.databaseId!, collectionId!, doc.$id))
        )
      );
    }
    console.log("✅ Cleared all existing data.");

    // Seed Agents
    console.log("Seeding agents...");
    const agents = await Promise.all(
      Array.from({ length: 5 }, async (_, i) => {
        return retryRequest(() => databases.createDocument(
          config.databaseId!,
          COLLECTIONS.AGENT!,
          ID.unique(),
          {
            name: `Agent ${i + 1}`,
            email: `agent${i + 1}@example.com`,
            avatar: agentImages[Math.floor(Math.random() * agentImages.length)],
          }
        ));
      })
    );
    console.log(`✅ Seeded ${agents.length} agents.`);

    // Seed Reviews
    console.log("Seeding reviews...");
    const reviews = await Promise.all(
      Array.from({ length: 20 }, async (_, i) => {
        return retryRequest(() => databases.createDocument(
          config.databaseId!,
          COLLECTIONS.REVIEWS!,
          ID.unique(),
          {
            name: `Reviewer ${i + 1}`,
            avatar: reviewImages[Math.floor(Math.random() * reviewImages.length)],
            review: `This is a review by Reviewer ${i + 1}.`,
            rating: Math.floor(Math.random() * 5) + 1,
          }
        ));
      })
    );
    console.log(`✅ Seeded ${reviews.length} reviews.`);

    // Seed Galleries
    console.log("Seeding galleries...");
    const galleries = await Promise.all(
      galleryImages.map((image) =>
        retryRequest(() => databases.createDocument(
          config.databaseId!,
          COLLECTIONS.GALLERY!,
          ID.unique(),
          { image }
        ))
      )
    );
    console.log(`✅ Seeded ${galleries.length} galleries.`);

    // Seed Properties
    console.log("Seeding properties...");
    await Promise.all(
      Array.from({ length: 20 }, async (_, i) => {
        const assignedAgent = agents[Math.floor(Math.random() * agents.length)];
        const assignedReviews = getRandomSubset(reviews, 5, 7);
        const assignedGalleries = getRandomSubset(galleries, 3, 8);

        const selectedFacilities = getRandomSubset(facilities, 1, facilities.length);

        const image = propertiesImages[i] ?? propertiesImages[Math.floor(Math.random() * propertiesImages.length)];

        return retryRequest(() => databases.createDocument(
          config.databaseId!,
          COLLECTIONS.PROPERTY!,
          ID.unique(),
          {
            name: `Property ${i + 1}`,
            type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
            description: `This is the description for Property ${i + 1}.`,
            address: `123 Property Street, City ${i + 1}`,
            geolocation: `192.168.1.${i + 1}, 192.168.1.${i + 1}`,
            price: Math.floor(Math.random() * 9000) + 1000,
            area: Math.floor(Math.random() * 3000) + 500,
            bedrooms: Math.floor(Math.random() * 5) + 1,
            bathrooms: Math.floor(Math.random() * 5) + 1,
            rating: Math.floor(Math.random() * 5) + 1,
            facilities: selectedFacilities,
            image: image,
            agent: assignedAgent.$id,
            reviews: assignedReviews.map((r) => r.$id),
            gallery: assignedGalleries.map((g) => g.$id),
          }
        ));
      })
    );

    console.log("🎉 Data seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  }
};

export default seed;
