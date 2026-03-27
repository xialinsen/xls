import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

export const TagFilter: React.FC = () => {
  const { articles, selectedTag, setSelectedTag } = useStore();
  
  // Extract unique tags
  const allTags = Array.from(new Set(articles.flatMap(article => article.tags)));

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      <span className="text-gray-500 font-mono text-sm mr-2">FILTER_BY:</span>
      
      <button
        onClick={() => setSelectedTag(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all duration-300 ${
          selectedTag === null
            ? 'bg-neon-blue text-dark-900 shadow-[0_0_10px_rgba(0,243,255,0.5)]'
            : 'bg-dark-800 text-gray-400 border border-white/10 hover:border-neon-blue/50 hover:text-neon-blue'
        }`}
      >
        ALL
      </button>

      {allTags.map((tag, index) => (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          key={tag}
          onClick={() => setSelectedTag(tag)}
          className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all duration-300 ${
            selectedTag === tag
              ? 'bg-neon-purple text-white shadow-[0_0_10px_rgba(176,38,255,0.5)]'
              : 'bg-dark-800 text-gray-400 border border-white/10 hover:border-neon-purple/50 hover:text-neon-purple'
          }`}
        >
          #{tag}
        </motion.button>
      ))}
    </div>
  );
};
