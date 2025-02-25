import { storage } from "../server/storage";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      if (req.url?.includes('/random')) {
        const category = req.query.category as string | undefined;
        const documentary = await storage.getRandomDocumentary(category);
        return res.json(documentary);
      } else {
        const documentaries = await storage.getAllDocumentaries();
        return res.json(documentaries);
      }
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}