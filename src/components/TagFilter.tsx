import React from 'react';
import { useBlogStore } from '../store/useBlogStore';

export const TagFilter: React.FC = () => {
  const { getAllTags, selectedTag, setSelectedTag } = useBlogStore();
  const tags = getAllTags();

  return (
    <div className="flex flex-wrap gap-3 py-6">
      <button
        onClick={() => setSelectedTag(null)}
        className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
          selectedTag === null
            ? 'bg-primary text-background font-bold shadow-[0_0_15px_rgba(0,240,255,0.5)]'
            : 'bg-surface border border-border text-text-muted hover:border-primary/50 hover:text-primary'
        }`}
      >
        ALL_SYSTEMS
      </button>
      
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => setSelectedTag(tag)}
          className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
            selectedTag === tag
              ? 'bg-primary text-background font-bold shadow-[0_0_15px_rgba(0,240,255,0.5)]'
              : 'bg-surface border border-border text-text-muted hover:border-primary/50 hover:text-primary'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
