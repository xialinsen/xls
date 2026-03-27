import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { apiService, Post, Comment } from "../services/api";
import { ArrowLeft, Calendar, Eye, ThumbsUp, Terminal, MessageSquare, Send, Loader2 } from "lucide-react";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const fetchedPost = await apiService.getPostById(id);
        if (fetchedPost) {
          setPost(fetchedPost);
          const fetchedComments = await apiService.getCommentsByPostId(id);
          setComments(fetchedComments);
        }
      } catch (error) {
        console.error("Failed to fetch post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !id) return;
    
    setSubmitting(true);
    try {
      // 模拟一个随机用户名
      const randomName = `User_${Math.floor(Math.random() * 1000)}`;
      const comment = await apiService.addComment(id, randomName, newComment);
      setComments([comment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-neon-purple">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-mono text-glow animate-pulse">DECRYPTING_DATA...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-mono text-neon-blue">ERROR: 404_DATA_NOT_FOUND</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-text-muted hover:text-neon-blue transition-colors">
          &lt; RETURN_TO_PREVIOUS
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-12"
    >
      {/* 简洁导航 */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-text-muted hover:text-neon-blue transition-colors font-mono group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        RETURN
      </button>

      {/* 文章头部 */}
      <header className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-sm font-mono text-neon-purple bg-neon-purple/10 px-3 py-1 rounded border border-neon-purple/20">
              #{tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted font-mono border-y border-surfaceBorder py-4">
          <span className="flex items-center text-neon-blue">
            <Terminal className="w-4 h-4 mr-2" />
            {post.author}
          </span>
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {post.createdAt}
          </span>
          <span className="flex items-center">
            <ThumbsUp className="w-4 h-4 mr-2" />
            {post.likes} LIKES
          </span>
          <span className="flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            {post.views} VIEWS
          </span>
        </div>
      </header>

      {/* 封面图 */}
      <div className="relative rounded-xl overflow-hidden border border-surfaceBorder shadow-neon-blue/20 shadow-lg">
        <img src={post.coverImage} alt="Cover" className="w-full h-[400px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
      </div>

      {/* 文章正文 (简单模拟Markdown渲染) */}
      <article className="prose prose-invert prose-lg max-w-none font-sans text-text-secondary">
        {post.content.split('\n\n').map((paragraph, i) => {
          if (paragraph.startsWith('## ')) {
            return <h2 key={i} className="text-2xl font-display text-text-primary border-b border-surfaceBorder pb-2 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
          }
          if (paragraph.startsWith('```')) {
            return (
              <div key={i} className="my-6 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue to-neon-purple rounded opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 blur"></div>
                <pre className="relative bg-background p-4 rounded font-mono text-sm overflow-x-auto border border-surfaceBorder">
                  <code className="text-neon-green">{paragraph.replace(/```\w*\n/, '').replace(/```$/, '')}</code>
                </pre>
              </div>
            );
          }
          return <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>;
        })}
      </article>

      {/* 评论互动区 */}
      <section className="pt-12 border-t border-surfaceBorder">
        <div className="flex items-center space-x-3 mb-8">
          <MessageSquare className="text-neon-blue w-6 h-6" />
          <h2 className="font-display text-2xl font-bold">USER_COMMENTS</h2>
          <span className="text-text-muted font-mono text-sm">[{comments.length}]</span>
        </div>

        <form onSubmit={handleCommentSubmit} className="mb-10 relative">
          <div className="glass-panel p-4 rounded-xl border border-surfaceBorder focus-within:border-neon-blue focus-within:shadow-neon-blue transition-all duration-300">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Transmit your message to the network..."
              className="w-full bg-transparent text-text-primary placeholder-text-muted focus:outline-none resize-none min-h-[100px] font-mono text-sm"
              required
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center px-4 py-2 bg-neon-blue/20 text-neon-blue font-mono text-sm rounded hover:bg-neon-blue hover:text-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {submitting ? 'TRANSMITTING...' : 'TRANSMIT'}
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-text-muted font-mono text-center py-8">No transmissions found.</p>
          ) : (
            comments.map((comment, index) => (
              <motion.div 
                key={comment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass-panel p-5 rounded-lg border-l-2 border-l-neon-purple border-y-surfaceBorder border-r-surfaceBorder"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono font-bold text-neon-purple">@{comment.authorName}</span>
                  <span className="text-xs text-text-muted font-mono">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-text-secondary text-sm">{comment.content}</p>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default PostDetail;
