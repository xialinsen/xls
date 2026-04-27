import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Flame, Tag, Calendar, ThumbsUp } from 'lucide-react';
import { posts } from '../data';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  // Most liked post
  const topPost = useMemo(() => {
    return [...posts].sort((a, b) => b.likes - a.likes)[0];
  }, []);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.abstract.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Post Banner */}
      {topPost && !searchTerm && !selectedTag && (
        <div className="mb-12 relative overflow-hidden rounded-xl border border-[#aa3bff]/50 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 shadow-[0_0_30px_rgba(170,59,255,0.15)] group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Flame className="w-48 h-48 text-[#aa3bff]" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center space-x-2 text-[#aa3bff] mb-4">
              <Flame className="w-5 h-5 animate-pulse" />
              <span className="font-mono text-sm tracking-widest font-bold">HOTTEST_NODE</span>
            </div>
            <Link to={`/post/${topPost.id}`}>
              <h1 className="text-4xl font-bold text-white mb-4 hover:text-[#00ffcc] transition-colors cursor-pointer">
                {topPost.title}
              </h1>
            </Link>
            <p className="text-gray-400 text-lg mb-6 max-w-3xl">
              {topPost.abstract}
            </p>
            <div className="flex items-center space-x-6 font-mono text-sm">
              <span className="flex items-center text-gray-500">
                <ThumbsUp className="w-4 h-4 mr-2" />
                {topPost.likes}
              </span>
              <span className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                {topPost.date}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="mb-10 space-y-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500 group-focus-within:text-[#00ffcc] transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-800 rounded-lg leading-5 bg-[#1a1a1a] text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] sm:text-sm transition-all shadow-inner"
            placeholder="搜索节点数据库 (Search database...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-1 rounded-full text-sm font-mono border transition-all ${
              selectedTag === null
                ? 'bg-[#00ffcc]/20 border-[#00ffcc] text-[#00ffcc] shadow-[0_0_10px_rgba(0,255,204,0.3)]'
                : 'bg-transparent border-gray-800 text-gray-500 hover:border-gray-600'
            }`}
          >
            ALL
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1 rounded-full text-sm font-mono border transition-all flex items-center ${
                selectedTag === tag
                  ? 'bg-[#00ffcc]/20 border-[#00ffcc] text-[#00ffcc] shadow-[0_0_10px_rgba(0,255,204,0.3)]'
                  : 'bg-transparent border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'
              }`}
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Post List */}
      <div className="grid gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <article key={post.id} className="p-6 rounded-lg border border-gray-800 bg-[#121212] hover:border-[#00ffcc]/50 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-2">
                <Link to={`/post/${post.id}`}>
                  <h2 className="text-2xl font-bold text-gray-100 group-hover:text-[#00ffcc] transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                </Link>
              </div>
              <p className="text-gray-400 mb-4 line-clamp-2">
                {post.abstract}
              </p>
              <div className="flex flex-wrap items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-2 py-1 bg-gray-800/50 text-gray-400 rounded border border-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4 font-mono text-sm text-gray-500 mt-2 sm:mt-0">
                  <span className="flex items-center">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    {post.likes}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.date}
                  </span>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-20 border border-gray-800 border-dashed rounded-lg">
            <p className="text-gray-500 font-mono">ERR_NO_RECORDS_FOUND</p>
          </div>
        )}
      </div>
    </div>
  );
}
