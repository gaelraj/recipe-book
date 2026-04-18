import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipeList.module.css';

interface RecipeListProps {
  recipes: {
    id: string;
    name: string;
    category: string;
    duration: number;
    image: string;
    ingredients: string[];
  }[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <ul className={styles.list}>
      {recipes.map((recipe) => (
        <li key={recipe.id} className={styles.item}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}