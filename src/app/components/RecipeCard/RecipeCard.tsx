'use client';

import { useState } from 'react';
import styles from './RecipeCard.module.css';

interface RecipeCardProps {
  recipe: {
    id: string;
    name: string;
    category: string;
    duration: number;
    image: string;
  };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [pinned, setPinned] = useState(false);

  return (
    <article className={`${styles.card} ${pinned ? styles.pinned : ''}`}>
      <img
        className={styles.image}
        src={recipe.image}
        alt={recipe.name}
      />
      <div className={styles.body}>
        <h2 className={styles.name}>{recipe.name}</h2>
        <span className={styles.badge}>{recipe.category}</span>
        <p className={styles.duration}>{recipe.duration} min</p>
        <button
          type="button"
          className={styles.pin}
          onClick={() => setPinned((p) => !p)}
        >
          {pinned ? 'Unpin' : 'Pin'}
        </button>
      </div>
    </article>
  );
}