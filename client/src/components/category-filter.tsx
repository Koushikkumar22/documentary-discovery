import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { categories, type Category } from "@/lib/documentaries";

interface Props {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: Props) {
  return (
    <motion.div 
      className="flex flex-wrap gap-2 justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className={
            selectedCategory === category 
              ? "bg-amber-500 hover:bg-amber-600 text-black border-transparent"
              : "border-zinc-700 text-zinc-400 hover:text-zinc-100"
          }
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </motion.div>
  );
}
