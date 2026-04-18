'use client';

import styles from "./page.module.css";
import recipes from "../data/recipes.json";
import { useState } from "react";
import RecipeList from "./components/RecipeList/RecipeList";

export default function Home() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes)

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse())
  }

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
        <RecipeList recipes={orderedRecipes} />
      </main>
    </div>
  )
}
