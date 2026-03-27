import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useBlogStore } from '../store';

interface Props {
  articleId: string;
}

export const CommentSection: React.FC<Props> = ({ articleId }) => {
  const { comments, addComment } = useBlogStore();
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');

  const articleComments = comments.filter(c => c.articleId === articleId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    addComment({
      articleId,
      author: authorName,
      content: newComment,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${authorName}`,
    });

    setNewComment('');
  };

  return (
    <div className="mt-16 pt-8 border-t border-white/10">
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="w-6 h-6 text-primary" />
        <h3 className="text-2xl font-display font-bold">评论互动 / COMMENTS</h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl mb-10">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="你的代号 (Nickname)..."
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full md:w-1/3 bg-surface border border-white/10 rounded-lg px-4 py-2 text-text-main placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            required
          />
          <textarea
            placeholder="输入你的评论..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full h-24 bg-surface border border-white/10 rounded-lg px-4 py-3 text-text-main placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
            required
          />
          <button
            type="submit"
            className="self-end flex items-center gap-2 bg-primary/10 text-primary border border-primary/50 px-6 py-2 rounded-lg hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all font-mono"
          >
            <Send className="w-4 h-4" />
            发送 / SEND
          </button>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-6">
        {articleComments.length > 0 ? (
          articleComments.map(comment => (
            <div key={comment.id} className="flex gap-4 animate-slide-up">
              <img src={comment.avatar} alt={comment.author} className="w-12 h-12 rounded-full bg-surface border border-white/10 p-1" />
              <div className="flex-1 glass-panel p-4 rounded-2xl rounded-tl-none">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-primary font-mono">{comment.author}</span>
                  <span className="text-xs text-text-muted font-mono">{comment.date}</span>
                </div>
                <p className="text-text-main text-sm leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-text-muted font-mono py-8">
            &gt; No comments yet. Be the first to initiate connection.
          </p>
        )}
      </div>
    </div>
  );
};
