import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { apiService, Post } from "../services/api";
import PostCard from "../components/PostCard";
import TagFilter from "../components/TagFilter";
import { Terminal, Loader2 } from "lucide-react";

const Home = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";

  const [posts, setPosts] = useState<Post[]>([]);
  const [topPost, setTopPost] = useState<Post | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [fetchedPosts, fetchedTopPost, fetchedTags] = await Promise.all([
          apiService.getPosts(searchKeyword, selectedTag || undefined),
          apiService.getTopLikedPost(),
          apiService.getAllTags()
        ]);
        
        // 如果有搜索或标签过滤，且最高赞文章不在结果中，我们可以选择不展示它，或者只在首页默认状态下展示。
        // 这里设定为：只有在无搜索且无标签过滤时，才展示最高赞的 featured 文章。
        if (!searchKeyword && !selectedTag) {
          setTopPost(fetchedTopPost);
          // 将 topPost 从列表中移除，避免重复展示
          setPosts(fetchedPosts.filter(p => p.id !== fetchedTopPost.id));
        } else {
          setTopPost(null);
          setPosts(fetchedPosts);
        }
        
        setTags(fetchedTags);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchKeyword, selectedTag]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-neon-blue">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-mono text-glow animate-pulse">SYSTEM_LOADING...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      {/* Header Info */}
      <div className="flex items-center space-x-3 text-text-primary border-b border-surfaceBorder pb-4">
        <Terminal className="text-neon-green w-6 h-6" />
        <h1 className="font-display text-2xl font-bold tracking-widest">
          {searchKeyword ? `SEARCH_RESULTS: [${searchKeyword}]` : 'MAIN_TERMINAL'}
        </h1>
      </div>

      {/* Featured Post (Top Liked) */}
      {topPost && (
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PostCard post={topPost} featured={true} />
        </motion.section>
      )}

      {/* Filter and List */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-text-primary">
            <span className="text-neon-blue mr-2">&gt;</span>
            DATA_STREAM
          </h2>
        </div>
        
        <TagFilter 
          tags={tags} 
          selectedTag={selectedTag} 
          onSelectTag={setSelectedTag} 
        />

        {posts.length === 0 ? (
          <div className="glass-panel p-12 text-center border-dashed border-2 border-surfaceBorder">
            <p className="text-text-muted font-mono">No records found in database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default Home;
