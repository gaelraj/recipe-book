import recipes from "../data/recipes.json";
import InteractiveWrapper from "./components/InteractiveWrapper/InteractiveWrapper.tsx";
import styles from "./page.module.css";

const allIngredients = [...new Set(
  recipes.flatMap(recipe => recipe.ingredients)
)].sort();

export default function Home() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Recipe Book</h1>
        </div>
      </header>
      <main className={styles.main}>
        <InteractiveWrapper 
          initialRecipes={recipes}
          allIngredients={allIngredients}
        />
      </main>
    </div>
  );
}