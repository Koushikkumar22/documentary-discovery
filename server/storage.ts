import { documentaries, type Documentary } from "@shared/schema";

export interface IStorage {
  getRandomDocumentary(category?: string): Promise<Documentary>;
  getAllDocumentaries(): Promise<Documentary[]>;
}

class MemStorage implements IStorage {
  private static instance: MemStorage;
  private documentaries: Documentary[];

  private constructor() {
    this.documentaries = [
      {
        id: 1,
        title: "Planet Earth: Our Home",
        description: "An immersive journey through Earth's most spectacular habitats",
        imageUrl: "https://images.unsplash.com/photo-1538600375473-cdc68cf8bf81",
        category: "Nature",
        duration: 120,
        year: 2023
      },
      {
        id: 2,
        title: "Digital Revolution",
        description: "The untold story of how technology changed our world",
        imageUrl: "https://images.unsplash.com/photo-1646512382002-62c0fdd302a3",
        category: "Technology",
        duration: 95,
        year: 2022
      },
      {
        id: 3,
        title: "The Art of Street Food",
        description: "Exploring global cuisine through street vendors",
        imageUrl: "https://images.unsplash.com/photo-1718204343278-4c8fa561d5ff",
        category: "Food",
        duration: 85,
        year: 2023
      },
      {
        id: 4,
        title: "Ocean Mysteries",
        description: "Diving deep into the unknown depths of our oceans",
        imageUrl: "https://images.unsplash.com/photo-1677061856969-5a46f91a30c3",
        category: "Nature",
        duration: 110,
        year: 2023
      },
      {
        id: 5,
        title: "Urban Explorers",
        description: "Discovering abandoned places around the world",
        imageUrl: "https://images.unsplash.com/photo-1711990726315-e260d166b79b",
        category: "Adventure",
        duration: 100,
        year: 2024
      },
      {
        id: 6,
        title: "Musical Journey",
        description: "The evolution of music through centuries",
        imageUrl: "https://images.unsplash.com/photo-1718295039542-fdecaa122a02",
        category: "Arts",
        duration: 90,
        year: 2023
      },
      {
        id: 7,
        title: "Space Frontiers",
        description: "Latest discoveries in space exploration",
        imageUrl: "https://images.unsplash.com/photo-1726341182534-fb05b4b5bbdf",
        category: "Science",
        duration: 115,
        year: 2024
      },
      {
        id: 8,
        title: "Cultural Traditions",
        description: "Ancient customs that survive in modern times",
        imageUrl: "https://images.unsplash.com/photo-1719154885088-9410a010492a",
        category: "Culture",
        duration: 105,
        year: 2023
      }
    ];
  }

  public static getInstance(): MemStorage {
    if (!MemStorage.instance) {
      MemStorage.instance = new MemStorage();
    }
    return MemStorage.instance;
  }

  async getRandomDocumentary(category?: string): Promise<Documentary> {
    const filtered = category 
      ? this.documentaries.filter(d => d.category === category)
      : this.documentaries;

    if (filtered.length === 0) {
      throw new Error(`No documentaries found${category ? ` for category: ${category}` : ''}`);
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
  }

  async getAllDocumentaries(): Promise<Documentary[]> {
    return this.documentaries;
  }
}

// Export a singleton instance
export const storage = MemStorage.getInstance();