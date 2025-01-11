"use client";

import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
}

const Categories = ({ categories, selectedCategory }: CategoriesProps) => {
  const router = useRouter();

  // Predefined order for categories
  const predefinedOrder = [
    "5th Class",
    "6th Class",
    "7th Class",
    "8th Class",
    "9th Class",
    "10th Class",
    "11th Class",
    "12th Class",
    "Engineering",
  ];

  // Sort categories based on predefined order
  const sortedCategories = categories.sort((a, b) => {
    const aIndex = predefinedOrder.indexOf(a.name);
    const bIndex = predefinedOrder.indexOf(b.name);

    if (aIndex === -1 && bIndex === -1) {
      return a.name.localeCompare(b.name); // Fallback to alphabetical order
    }

    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });

  const onClick = (categoryId: string | null) => {
    router.push(categoryId ? `/categories/${categoryId}` : "/");
  };

  return (
    <div className="flex flex-wrap px-4 gap-7 justify-center my-10">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onClick(null)}
      >
        All Categories
      </Button>
      {sortedCategories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onClick(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default Categories;
