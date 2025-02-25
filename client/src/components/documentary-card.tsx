import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Film, Clock, CalendarDays } from "lucide-react";
import type { Documentary } from "@shared/schema";
import { formatDuration } from "@/lib/documentaries";

interface Props {
  documentary: Documentary;
  onNewSuggestion: () => void;
  isLoading: boolean;
}

export function DocumentaryCard({ documentary, onNewSuggestion, isLoading }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl overflow-hidden bg-black/60 backdrop-blur-sm border-zinc-800">
        <div className="relative aspect-video">
          <img
            src={documentary.imageUrl}
            alt={documentary.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                {documentary.title}
              </h2>
              <p className="text-zinc-400 mt-2">{documentary.description}</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Film size={16} className="text-amber-400" />
                <span>{documentary.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-amber-400" />
                <span>{formatDuration(documentary.duration)}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-amber-400" />
                <span>{documentary.year}</span>
              </div>
            </div>

            <Button 
              onClick={onNewSuggestion}
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black"
            >
              {isLoading ? "Loading..." : "Get Another Suggestion"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
