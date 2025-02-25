import express, { type Request, Response, NextFunction } from "express";
import { storage } from "./storage";

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Export for serverless
export default app;

// Only listen if running directly (not in serverless)
if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
}