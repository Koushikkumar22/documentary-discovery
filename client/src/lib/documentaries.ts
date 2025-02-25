import type { Documentary } from "@shared/schema";

export const categories = [
  "All",
  "Nature",
  "Technology",
  "Food",
  "Adventure",
  "Arts",
  "Science",
  "Culture"
] as const;

export type Category = (typeof categories)[number];

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}
