interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

const TagFilter = ({ tags, selectedTag, onSelectTag }: TagFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => onSelectTag(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all duration-300 border ${
          selectedTag === null
            ? 'bg-neon-blue/20 border-neon-blue text-neon-blue shadow-neon-blue'
            : 'bg-surface/50 border-surfaceBorder text-text-muted hover:border-neon-blue/50 hover:text-text-primary'
        }`}
      >
        All_Systems
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onSelectTag(tag)}
          className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all duration-300 border ${
            selectedTag === tag
              ? 'bg-neon-purple/20 border-neon-purple text-neon-purple shadow-neon-purple'
              : 'bg-surface/50 border-surfaceBorder text-text-muted hover:border-neon-purple/50 hover:text-text-primary'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
