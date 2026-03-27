import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ArrowLeft, Calendar, Clock, Flame, MessageSquare, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getArticleById, getCommentsByArticleId, addComment, likeArticle } = useStore();
  
  const article = id ? getArticleById(id) : undefined;
  const comments = id ? getCommentsByArticleId(id) : [];
  
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6">
        <div className="text-4xl text-neon-purple animate-pulse">404</div>
        <p className="text-xl text-slate-400">未找到该文章</p>
        <button onClick={() => navigate('/')} className="btn-neon">
          返回首页
        </button>
      </div>
    );
  }

  const handleLike = () => {
    if (!isLiked && id) {
      likeArticle(id);
      setIsLiked(true);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim() || !id) return;
    
    addComment({
      articleId: id,
      author: authorName.trim(),
      content: newComment.trim(),
    });
    
    setNewComment('');
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-neon-blue transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        返回
      </button>

      {/* Article Header */}
      <header className="mb-12 space-y-6">
        <div className="flex gap-2 flex-wrap">
          {article.tags.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/30 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-md">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-6 text-slate-400 text-sm border-b border-white/10 pb-8">
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.date}</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime}</span>
          <span className="flex items-center gap-2 text-neon-purple"><Flame className="w-4 h-4" /> {article.likes} 热度</span>
        </div>
      </header>

      {/* Hero Image */}
      {article.imageUrl && (
        <div className="w-full h-[400px] rounded-2xl overflow-hidden mb-12 shadow-glass border border-white/5 relative group">
          <div className="absolute inset-0 bg-dark-900/30 group-hover:bg-transparent transition-colors z-10 duration-500" />
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-neon-blue hover:prose-a:text-neon-purple prose-code:text-neon-green prose-code:bg-dark-900/50 prose-code:px-1 prose-code:rounded prose-pre:bg-dark-900 prose-pre:border prose-pre:border-white/10 prose-pre:shadow-lg mb-16">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </article>

      {/* Interactive Actions */}
      <div className="flex justify-center mb-20 border-t border-b border-white/10 py-8">
        <button 
          onClick={handleLike}
          className={`flex flex-col items-center gap-2 p-6 rounded-full transition-all duration-300 ${
            isLiked 
              ? 'text-neon-purple shadow-[0_0_30px_rgba(192,132,252,0.3)] bg-neon-purple/10' 
              : 'text-slate-400 hover:text-neon-purple hover:bg-white/5'
          }`}
        >
          <Flame className={`w-10 h-10 ${isLiked ? 'animate-pulse fill-neon-purple' : ''}`} />
          <span className="font-bold text-lg">{article.likes}</span>
          <span className="text-xs uppercase tracking-widest opacity-80">点赞支持</span>
        </button>
      </div>

      {/* Comments Section */}
      <section className="space-y-8" id="comments">
        <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
          <MessageSquare className="w-6 h-6 text-neon-blue" />
          评论互动 ({comments.length})
        </h2>

        {/* Comment Form */}
        <div className="glass-card p-6 md:p-8">
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="您的昵称"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all text-slate-200 placeholder-slate-500"
                required
              />
            </div>
            <textarea
              placeholder="分享您的观点..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-all text-slate-200 placeholder-slate-500 resize-none"
              required
            />
            <div className="flex justify-end">
              <button 
                type="submit"
                className="btn-neon flex items-center gap-2 px-8"
              >
                <Send className="w-4 h-4" /> 发表评论
              </button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div className="space-y-6 mt-12">
          {comments.length === 0 ? (
            <p className="text-center text-slate-500 py-8">暂无评论，来做第一个留言的人吧！</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-neon-blue">{comment.author}</h4>
                  <span className="text-xs text-slate-500">
                    {format(new Date(comment.date), 'yyyy-MM-dd HH:mm')}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;
