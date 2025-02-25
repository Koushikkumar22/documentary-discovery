import { storage } from "../server/storage";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    if (req.url?.includes('/random')) {
      const category = req.query.category as string | undefined;
      const documentary = await storage.getRandomDocumentary(category);
      return res.json(documentary);
    } else {
      const documentaries = await storage.getAllDocumentaries();
      return res.json(documentaries);
    }
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}
