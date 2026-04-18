interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={(e) => onSearch(e.target.value)}
      style={{
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginBottom: '20px'
      }}
    />
  );
}