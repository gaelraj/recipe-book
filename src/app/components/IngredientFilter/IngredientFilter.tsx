'use client';

interface IngredientFilterProps {
    allIngredients: string[];
    selectedIngredients: string[];
    onSelectIngredient: (ingredients: string[]) => void;
}

export default function IngredientFilter({
    allIngredients,
    selectedIngredients,
    onSelectIngredient
}: IngredientFilterProps) {

    function handleSelectIngredient(ingredient: string) {
        if (selectedIngredients.includes(ingredient)) {
            onSelectIngredient(selectedIngredients.filter(i => i !== ingredient));
        } else {
            onSelectIngredient([...selectedIngredients, ingredient]);
        }
    }

    return (
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
    );
}