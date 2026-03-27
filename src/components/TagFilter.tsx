import { useBlogStore } from '../store/useBlogStore';

export default function TagFilter() {
  const { getAllTags, selectedTag, setSelectedTag } = useBlogStore();
  const tags = getAllTags();

  return (
    <div className="flex flex-wrap gap-3 mb-10">
      <button
        onClick={() => setSelectedTag(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all duration-300 ${
          selectedTag === null
            ? 'bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.3)]'
            : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-500'
        }`}
      >
        [ 全部数据 ]
      </button>
      
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => setSelectedTag(tag)}
          className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all duration-300 ${
            selectedTag === tag
              ? 'bg-[#8A2BE2]/10 text-[#8A2BE2] border border-[#8A2BE2] shadow-[0_0_10px_rgba(138,43,226,0.3)]'
              : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-500'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
