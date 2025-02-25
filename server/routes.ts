import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/documentaries/random", async (req, res) => {
    const category = req.query.category as string | undefined;
    const documentary = await storage.getRandomDocumentary(category);
    res.json(documentary);
  });

  app.get("/api/documentaries", async (_req, res) => {
    const documentaries = await storage.getAllDocumentaries();
    res.json(documentaries);
  });

  const httpServer = createServer(app);
  return httpServer;
}
