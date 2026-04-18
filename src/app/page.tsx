'use client';

import styles from "./page.module.css";
import recipes from "../data/recipes.json";
import { useState, useMemo } from "react";
import RecipeList from "./components/RecipeList/RecipeList";
import SearchBar from "./components/SearchBar/SearchBar";

export default function Home() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse());
  }

  // Récupérer tous les ingrédients uniques
  const allIngredients = useMemo(() => {
    const ingredients = new Set<string>();
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        ingredients.add(ingredient);
      });
    });
    return Array.from(ingredients).sort();
  }, []);

  // Gérer la sélection d'un ingrédient
  function handleSelectIngredient(ingredient: string) {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  }

  // Filtrer les recettes
  const filteredRecipes = orderedRecipes.filter(recipe => {
    
    if (selectedIngredients.length > 0) {
      // Vérifier si la recette contient TOUS les ingrédients sélectionnés
      const hasAllIngredients = selectedIngredients.every(ingredient =>
        recipe.ingredients.includes(ingredient)
      );
      if (!hasAllIngredients) {
        return false;
      }
    }
    
    // Filtre par recherche (dans le nom de la recette)
    if (searchQuery !== "") {
      return recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    return true;
  });

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Recipe Book</h1>
          <button
            type="button"
            className={styles.toggle}
            onClick={handleToggleOrder}
          >
            Reverse order
          </button>
        </div>
      </header>
      <main className={styles.main}>
        {/* Liste des ingrédients avec cases à cocher */}
        <div style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          background: '#f9f9f9',
          maxHeight: '250px',
          overflowY: 'auto'
        }}>
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Filtrer par ingrédients (tous doivent être présents) :
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '8px' }}>
            {allIngredients.map(ingredient => (
              <label key={ingredient} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(ingredient)}
                  onChange={() => handleSelectIngredient(ingredient)}
                />
                <span>{ingredient}</span>
              </label>
            ))}
          </div>
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            {selectedIngredients.length} ingrédient(s) sélectionné(s)
          </div>
        </div>

        <SearchBar onSearch={setSearchQuery} />
        
        {/* Afficher le nombre de résultats */}
        <p style={{ margin: '10px 0', color: '#666', fontSize: '14px' }}>
          {filteredRecipes.length} recette(s) trouvée(s)
        </p>
        
        <RecipeList recipes={filteredRecipes} />
      </main>
    </div>
  );
}