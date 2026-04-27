import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MessageSquare, Send, Calendar, ThumbsUp } from 'lucide-react';
import { articles, comments as initialComments } from '../data/mockData';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const foundArticle = articles.find(a => a.id === parseInt(id));
    if (foundArticle) {
      setArticle(foundArticle);
      const articleComments = initialComments.filter(c => c.articleId === parseInt(id));
      setComments(articleComments);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      articleId: article.id,
      user: userName,
      content: newComment,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  if (!article) return <div className="text-center py-20 text-[#0ff] cyber-glow animate-pulse">正在解密数据区块...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
      <Link to="/" className="inline-flex items-center text-gray-400 hover:text-[#0ff] transition-colors mb-6 group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        返回主节点
      </Link>

      {/* Article Content */}
      <article className="cyber-border bg-[#111]/80 backdrop-blur rounded-lg p-6 md:p-10">
        <header className="mb-8 border-b border-gray-800 pb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight cyber-glow">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {article.date}</span>
            <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4 text-[#0ff]" /> {article.likes} 点赞</span>
            <div className="flex gap-2 ml-auto">
              {article.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-xs text-[#0ff] bg-[#0ff]/10 border border-[#0ff]/30 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>
        
        <div className="prose prose-invert prose-p:text-gray-300 prose-p:leading-relaxed max-w-none whitespace-pre-wrap text-lg">
          {article.content}
        </div>
      </article>

      {/* Comments Section */}
      <section className="bg-[#111] border border-gray-800 rounded-lg p-6 md:p-8 mt-12 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 mb-8 text-xl font-bold text-white">
          <MessageSquare className="w-6 h-6 text-[#0ff]" />
          <h3>通信频道 ({comments.length})</h3>
        </div>

        <div className="space-y-6 mb-10">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="border-l-2 border-[#0ff]/30 pl-4 py-1">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-[#0ff]" />
                  <span className="font-semibold text-gray-200">{comment.user}</span>
                  <span className="text-xs text-gray-500 ml-2">{comment.date}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic text-sm">当前频段无通信记录，成为第一个发送信号的人。</p>
          )}
        </div>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-4 bg-black/50 p-6 rounded border border-gray-800">
          <h4 className="text-sm font-semibold text-[#0ff] mb-4">发送新信号</h4>
          <div>
            <input
              type="text"
              placeholder="代号 (用户名)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-[#0ff]/70 transition-colors"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="输入信息内容..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 text-white h-24 resize-none focus:outline-none focus:border-[#0ff]/70 transition-colors"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#0ff]/10 hover:bg-[#0ff]/20 text-[#0ff] border border-[#0ff]/50 px-6 py-2 rounded font-medium transition-all hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]"
            >
              <Send className="w-4 h-4" /> 发送
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ArticleDetail;
