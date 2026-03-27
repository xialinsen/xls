import { useState } from 'react';
import { useBlogStore } from '../store/useBlogStore';
import { MessageSquare, Send, User } from 'lucide-react';
import { format } from 'date-fns';

export default function CommentSection({ articleId }: { articleId: string }) {
  const comments = useBlogStore(state => state.getCommentsByArticleId(articleId));
  const addComment = useBlogStore(state => state.addComment);
  
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;
    
    addComment({
      articleId,
      author: author.trim(),
      content: content.trim()
    });
    
    setAuthor('');
    setContent('');
  };

  return (
    <div className="mt-16 border-t border-slate-800 pt-10">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="text-[#00F0FF]" />
        <h3 className="text-2xl font-bold text-slate-100 neon-text">USER_FEEDBACK</h3>
        <span className="text-slate-500 font-mono text-sm">[{comments.length} entries]</span>
      </div>

      <div className="glass-panel p-6 rounded-lg mb-10 border-[#8A2BE2]/30 focus-within:border-[#8A2BE2] transition-colors duration-300">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-slate-400 font-mono text-sm mb-2" htmlFor="author">
              {'>'} IDENTIFIER
            </label>
            <div className="flex items-center bg-slate-900/50 border border-slate-700 rounded-md focus-within:border-[#00F0FF] focus-within:ring-1 focus-within:ring-[#00F0FF] transition-all">
              <div className="pl-3">
                <User size={16} className="text-slate-500" />
              </div>
              <input
                id="author"
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="Guest_User"
                className="w-full bg-transparent border-none focus:ring-0 text-slate-200 p-3 placeholder-slate-600 outline-none"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-slate-400 font-mono text-sm mb-2" htmlFor="content">
              {'>'} PAYLOAD
            </label>
            <textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Enter your message here..."
              rows={4}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-md focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all text-slate-200 p-3 placeholder-slate-600 outline-none resize-none"
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="tech-button flex items-center gap-2"
              disabled={!author.trim() || !content.trim()}
            >
              <Send size={16} />
              <span>TRANSMIT</span>
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="border-l-2 border-slate-700 pl-4 py-2 relative group">
            <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-[#00F0FF] transition-colors"></div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-bold text-[#00F0FF] font-mono">{comment.author}</span>
              <span className="text-xs text-slate-500 font-mono">
                {format(new Date(comment.date), 'yyyy-MM-dd HH:mm')}
              </span>
            </div>
            <p className="text-slate-300 whitespace-pre-wrap">{comment.content}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-slate-500 font-mono text-center py-8 italic">
            // No feedback records found
          </div>
        )}
      </div>
    </div>
  );
}
