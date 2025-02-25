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
    console.log(`Fetching random documentary${category ? ` for category: ${category}` : ''}`);
    const documentary = await storage.getRandomDocumentary(category);
    res.json(documentary);
  } catch (error) {
    console.error('Random documentary API Error:', error);
    res.status(500).json({ message: 'Internal Server Error', details: (error as Error).message });
  }
});

app.get("/api/documentaries", async (_req, res) => {
  try {
    console.log('Fetching all documentaries');
    const documentaries = await storage.getAllDocumentaries();
    res.json(documentaries);
  } catch (error) {
    console.error('All documentaries API Error:', error);
    res.status(500).json({ message: 'Internal Server Error', details: (error as Error).message });
  }
});

// Serve static files for production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(process.cwd(), "dist");
  console.log('Serving static files from:', distPath);
  app.use(express.static(distPath));

  // SPA fallback
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
    // Serve static files from the dist directory (for development)
    app.use(express.static(path.join(process.cwd(), "dist")));

    // Serve index.html for all other routes (SPA fallback)
    app.get("*", (_req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
}

export default app;