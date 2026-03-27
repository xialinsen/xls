import { useBlogStore } from '../store/useBlogStore';
import Navbar from '../components/Navbar';
import ArticleCard from '../components/ArticleCard';
import TagFilter from '../components/TagFilter';
import { Terminal } from 'lucide-react';

export default function Home() {
  const { getFilteredArticles, getTopLikedArticle, searchQuery, selectedTag } = useBlogStore();
  const filteredArticles = getFilteredArticles();
  const topArticle = getTopLikedArticle();
  
  const isFiltering = searchQuery !== '' || selectedTag !== null;

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Header Section */}
        <div className="mb-12 border-l-2 border-[#00F0FF] pl-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight text-slate-100">
            SYSTEM.<span className="text-[#00F0FF]">INITIALIZE()</span>
          </h1>
          <p className="text-slate-400 font-mono flex items-center gap-2">
            <Terminal size={16} className="text-[#8A2BE2]" />
            Loading knowledge base modules...
          </p>
        </div>

        {/* Featured Article - only show when not filtering */}
        {!isFiltering && topArticle && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-[#00F0FF] animate-pulse rounded-full"></div>
              <h2 className="text-xl font-mono text-slate-300"># HOT_EXECUTION (最高赞)</h2>
            </div>
            <ArticleCard article={topArticle} isFeatured={true} />
          </section>
        )}

        {/* Filter Section */}
        <section className="mb-10">
           <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-[#8A2BE2] rounded-full"></div>
              <h2 className="text-xl font-mono text-slate-300"># DATA_FILTERS</h2>
            </div>
          <TagFilter />
        </section>

        {/* Article Grid */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
            <h2 className="text-xl font-mono text-slate-300">
              # QUERY_RESULTS <span className="text-slate-500 text-sm">[{filteredArticles.length} records found]</span>
            </h2>
          </div>
          
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="glass-panel p-10 text-center rounded-lg border-dashed border-2 border-slate-700">
              <p className="text-slate-400 font-mono">404 - NO_DATA_FOUND</p>
              <p className="text-slate-500 mt-2 text-sm">请尝试其他查询指令或筛选条件</p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
