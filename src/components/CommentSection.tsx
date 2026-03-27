import { useState } from 'react';
import { Terminal, Send, User } from 'lucide-react';
import { Comment } from '../types';
import { motion } from 'framer-motion';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export default function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-16 pt-8 border-t border-glass-border">
      <h3 className="text-xl font-mono text-cyan flex items-center gap-2 mb-8">
        <Terminal className="w-5 h-5" />
        SYSTEM.COMMENTS
      </h3>

      <div className="space-y-6 mb-12">
        {comments.map((comment, index) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={comment.id}
            className="flex gap-4 p-4 glass-panel hover:border-purple/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-none bg-dark border border-glass-border flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-sm text-purple">{comment.username}</span>
                <span className="font-mono text-xs text-gray-500">
                  {new Date(comment.date).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {comment.content}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute top-3 left-3 text-cyan">
          <span className="font-mono">{'>'}</span>
        </div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="ENTER_YOUR_MESSAGE_HERE..."
          className="w-full bg-dark/50 border border-glass-border p-3 pl-8 min-h-[100px] text-gray-200 font-mono text-sm focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan resize-y transition-colors"
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-transparent border border-cyan text-cyan hover:bg-cyan hover:text-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] font-mono text-sm"
          >
            EXECUTE <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
