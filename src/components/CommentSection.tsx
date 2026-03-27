import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, User } from 'lucide-react';
import { useStore } from '../store/useStore';

interface Props {
  articleId: string;
}

export const CommentSection: React.FC<Props> = ({ articleId }) => {
  const { comments, addComment } = useStore();
  const articleComments = comments.filter(c => c.articleId === articleId);
  
  const [user, setUser] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.trim() || !content.trim()) return;

    addComment({
      articleId,
      user: user.trim(),
      content: content.trim()
    });
    
    setContent('');
  };

  return (
    <div className="mt-16 pt-12 border-t border-white/10">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-6 h-6 text-neon-blue" />
        <h3 className="text-2xl font-bold font-mono">COMMENTS ({articleComments.length})</h3>
      </div>

      <form onSubmit={handleSubmit} className="mb-12 glass-panel p-6 rounded-xl border border-white/5">
        <div className="mb-4">
          <label className="block text-xs font-mono text-gray-400 mb-2">USER_ID</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Enter your nickname..."
              className="w-full pl-10 pr-4 py-2 bg-dark-900 border border-white/10 rounded focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all text-gray-200"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-xs font-mono text-gray-400 mb-2">MESSAGE</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your comment here..."
            rows={4}
            className="w-full p-4 bg-dark-900 border border-white/10 rounded focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all text-gray-200 resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!user.trim() || !content.trim()}
            className="flex items-center gap-2 bg-neon-blue text-dark-900 px-6 py-2 rounded font-medium hover:bg-white hover:shadow-neon-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span>TRANSMIT</span>
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {articleComments.map((comment, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            key={comment.id}
            className="glass-panel p-5 rounded-lg border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-blue to-neon-purple opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-3">
              <span className="font-bold text-neon-blue font-mono">{comment.user}</span>
              <span className="text-xs text-gray-500 font-mono">
                {new Date(comment.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {comment.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
