import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { ArrowLeft, Calendar, ThumbsUp, MessageSquare, Terminal, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles, comments, addComment } = useStore();
  
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');

  const article = useMemo(() => articles.find(a => a.id === id), [articles, id]);
  const articleComments = useMemo(() => comments.filter(c => c.articleId === id), [comments, id]);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-4xl font-mono text-cyber-cyan mb-4 animate-glitch">404</div>
        <p className="text-gray-400 font-mono">ARTICLE_NOT_FOUND</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-8 px-6 py-2 border border-cyber-cyan text-cyber-cyan rounded hover:bg-cyber-cyan hover:text-cyber-black transition-all font-mono"
        >
          RETURN_HOME
        </button>
      </div>
    );
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !username.trim()) return;
    
    addComment({
      articleId: article.id,
      username: username.trim(),
      content: newComment.trim()
    });
    
    setNewComment('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-gray-400 hover:text-cyber-cyan transition-colors mb-8 font-mono group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>BACK_TO_HOME</span>
      </button>

      {/* Article Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 border-b border-white/10 pb-8 relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-purple/10 blur-[50px] rounded-full" />
        
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map(tag => (
            <span key={tag} className="text-sm font-mono px-3 py-1 bg-cyber-dark text-cyber-cyan border border-cyber-cyan/30 rounded shadow-[0_0_10px_rgba(0,240,255,0.1)]">
              #{tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
          {article.title}
        </h1>
        
        <div className="flex items-center space-x-6 text-gray-500 font-mono">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center space-x-2 text-cyber-purple">
            <ThumbsUp className="w-4 h-4" />
            <span>{article.likes} LIKES</span>
          </div>
        </div>
      </motion.div>

      {/* Article Content */}
      <motion.article 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="prose prose-invert prose-lg max-w-none mb-20 font-sans prose-headings:font-mono prose-headings:text-cyber-cyan prose-a:text-cyber-purple hover:prose-a:text-cyber-cyan prose-code:text-cyber-purple prose-code:bg-cyber-dark prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-white/10"
      >
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </motion.article>

      {/* Comments Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="border-t border-white/10 pt-12"
      >
        <div className="flex items-center space-x-2 mb-8">
          <MessageSquare className="w-6 h-6 text-cyber-cyan" />
          <h2 className="text-2xl font-mono font-bold text-white">SYSTEM_LOGS // COMMENTS</h2>
        </div>

        {/* Comment Form */}
        <div className="glass-panel p-6 rounded-xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple opacity-50" />
          
          <form onSubmit={handleCommentSubmit} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-mono text-cyber-cyan mb-2">USER_ID</label>
              <div className="flex items-center bg-cyber-black border border-white/10 rounded-md focus-within:border-cyber-cyan focus-within:shadow-neon-cyan transition-all">
                <Terminal className="w-4 h-4 text-gray-500 ml-3" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-white p-3 font-mono text-sm"
                  placeholder="Enter your alias..."
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-mono text-cyber-cyan mb-2">MESSAGE_PAYLOAD</label>
              <textarea
                required
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className="w-full bg-cyber-black border border-white/10 rounded-md focus:border-cyber-cyan focus:shadow-neon-cyan focus:ring-0 text-white p-3 font-mono text-sm resize-none transition-all"
                placeholder="Type your message here..."
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center space-x-2 bg-cyber-dark text-cyber-cyan border border-cyber-cyan px-6 py-2 rounded-md hover:bg-cyber-cyan hover:text-cyber-black transition-all font-mono text-sm shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-neon-cyan"
              >
                <span>TRANSMIT</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Comment List */}
        <div className="space-y-6">
          {articleComments.length === 0 ? (
            <p className="text-gray-500 font-mono text-center py-8">NO_LOGS_FOUND. BE_THE_FIRST_TO_TRANSMIT.</p>
          ) : (
            articleComments.map((comment, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                key={comment.id} 
                className="flex space-x-4 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-cyber-dark border border-cyber-purple/50 flex items-center justify-center text-cyber-purple font-mono font-bold group-hover:border-cyber-purple group-hover:shadow-neon-purple transition-all">
                    {comment.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 w-px bg-white/10 my-2 group-hover:bg-cyber-purple/50 transition-colors" />
                </div>
                
                <div className="flex-1 pb-8">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-mono text-cyber-cyan font-bold">{comment.username}</span>
                    <span className="text-xs font-mono text-gray-500">{comment.date}</span>
                  </div>
                  <div className="text-gray-300 bg-cyber-dark/30 p-4 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors">
                    {comment.content}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.section>
    </div>
  );
};
