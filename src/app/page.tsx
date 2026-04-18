'use client';

import styles from "./page.module.css";
import recipes from "../data/recipes.json";
import { useState } from "react";
import RecipeList from "./components/RecipeList/RecipeList";
import SearchBar from "./components/SearchBar/SearchBar";

export default function Home() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes)
  const [searchQuery, setSearchQuery] = useState("");

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse())
  }

  const filteredRecipes = orderedRecipes.filter(recipe => {
    if (searchQuery === "") return true;
    return recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
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
        <SearchBar onSearch={setSearchQuery} />
        <RecipeList recipes={filteredRecipes} />
      </main>
    </div>
  )
}
