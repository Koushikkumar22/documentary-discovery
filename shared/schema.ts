import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const documentaries = pgTable("documentaries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  duration: integer("duration").notNull(),
  year: integer("year").notNull(),
});

export const insertDocumentarySchema = createInsertSchema(documentaries).pick({
  title: true,
  description: true,
  imageUrl: true,
  category: true,
  duration: true,
  year: true,
});

export type InsertDocumentary = z.infer<typeof insertDocumentarySchema>;
export type Documentary = typeof documentaries.$inferSelect;
