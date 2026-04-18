'use client';

import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import RecipeList from "../RecipeList/RecipeList";
import IngredientFilter from "../IngredientFilter/IngredientFilter";

interface InteractiveWrapperProps {
  initialRecipes: any[];
  allIngredients: string[];
}

export default function InteractiveWrapper({
  initialRecipes,
  allIngredients
}: InteractiveWrapperProps) {
  const [orderedRecipes, setOrderedRecipes] = useState(initialRecipes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse());
  }

  const filteredRecipes = orderedRecipes.filter(recipe => {
    if (selectedIngredients.length > 0) {
      const hasAllIngredients = selectedIngredients.every(ingredient =>
        recipe.ingredients.includes(ingredient)
      );
      if (!hasAllIngredients) return false;
    }

    if (searchQuery !== "") {
      return recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return true;
  });

  return (
    <>
      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <button
          type="button"
          style={{
            font: 'inherit',
            fontSize: '0.9rem',
            fontWeight: '600',
            padding: '0.45rem 0.85rem',
            borderRadius: '8px',
            border: '1px solid #c9c2b6',
            background: '#fff',
            cursor: 'pointer'
          }}
          onClick={handleToggleOrder}
        >
          Reverse order
        </button>
      </div>

      <IngredientFilter
        allIngredients={allIngredients}
        selectedIngredients={selectedIngredients}
        onSelectIngredient={setSelectedIngredients}
      />

      <SearchBar onSearch={setSearchQuery} />

      <p style={{ margin: '10px 0', color: '#666', fontSize: '14px' }}>
        {filteredRecipes.length} recette(s) trouvée(s)
      </p>

      <RecipeList recipes={filteredRecipes} />
    </>
  );
}