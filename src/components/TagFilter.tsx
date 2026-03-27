import React from 'react';
import { useBlogStore } from '../store';
import { availableTags } from '../data/mock';

export const TagFilter: React.FC = () => {
  const { activeTag, setActiveTag } = useBlogStore();

  return (
    <div className="flex flex-wrap gap-3 my-8">
      <button
        onClick={() => setActiveTag(null)}
        className={`px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
          activeTag === null
            ? 'bg-primary text-[#0A0A0F] shadow-[0_0_15px_rgba(0,240,255,0.6)] font-bold'
            : 'bg-surface border border-white/10 text-text-muted hover:border-primary/50 hover:text-primary'
        }`}
      >
        All_Tags
      </button>
      
      {availableTags.map(tag => (
        <button
          key={tag}
          onClick={() => setActiveTag(tag)}
          className={`px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
            activeTag === tag
              ? 'bg-primary text-[#0A0A0F] shadow-[0_0_15px_rgba(0,240,255,0.6)] font-bold'
              : 'bg-surface border border-white/10 text-text-muted hover:border-primary/50 hover:text-primary'
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};
