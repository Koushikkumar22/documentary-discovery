import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DocumentaryCard } from "@/components/documentary-card";
import { CategoryFilter } from "@/components/category-filter";
import type { Category } from "@/lib/documentaries";
import { Film } from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [key, setKey] = useState(0);

  const { data: documentary, isLoading } = useQuery({
    queryKey: [
      "/api/documentaries/random",
      selectedCategory !== "All" ? `?category=${selectedCategory}` : "",
      key
    ],
    refetchOnWindowFocus: false
  });

  const handleNewSuggestion = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1485095329183-d0797cdc5676')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-black/80 backdrop-blur-sm px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Film size={32} className="text-amber-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                Documentary Discovery
              </h1>
            </div>
            <p className="text-zinc-400 max-w-lg mx-auto">
              Explore fascinating documentaries across different categories. Get personalized suggestions and expand your knowledge.
            </p>
          </div>

          <CategoryFilter 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {documentary && (
            <DocumentaryCard
              documentary={documentary}
              onNewSuggestion={handleNewSuggestion}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
