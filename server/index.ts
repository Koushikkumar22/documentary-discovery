import express from "express";
import { storage } from "./storage";
import path from "path";

const app = express();

// Basic middleware
app.use(express.json());

// CORS headers
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// API Routes
app.get("/api/documentaries/random", async (req, res) => {
  try {
    const category = req.query.category as string | undefined;
    const documentary = await storage.getRandomDocumentary(category);
    res.json(documentary);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get("/api/documentaries", async (_req, res) => {
  try {
    const documentaries = await storage.getAllDocumentaries();
    res.json(documentaries);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Serve static files from the dist directory
app.use(express.static(path.join(process.cwd(), "dist")));

// Serve index.html for all other routes (SPA fallback)
app.get("*", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "dist", "index.html"));
});

export default app;