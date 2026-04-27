import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ThumbsUp, MessageSquare, Send } from 'lucide-react';
import { posts } from '../data';
import type { Comment } from '../data';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [commentText, setCommentText] = useState('');
  
  const postIndex = useMemo(() => posts.findIndex(p => p.id === Number(id)), [id]);
  const [post, setPost] = useState(postIndex !== -1 ? posts[postIndex] : null);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4 font-mono">ERR_404</h1>
        <p className="text-gray-400 mb-8">节点数据丢失 (Node data lost)</p>
        <Link to="/" className="text-[#00ffcc] hover:underline font-mono inline-flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> 返回主节点 (Return to main node)
        </Link>
      </div>
    );
  }

  const handleLike = () => {
    setPost({ ...post, likes: post.likes + 1 });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      user: "Guest_" + Math.floor(Math.random() * 1000),
      text: commentText,
      date: new Date().toISOString().split('T')[0]
    };

    setPost({
      ...post,
      comments: [...post.comments, newComment]
    });
    setCommentText('');
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-[#00ffcc] transition-colors mb-8 font-mono text-sm">
        <ArrowLeft className="w-4 h-4 mr-2" /> 返回 (BACK)
      </Link>

      <header className="mb-12 border-b border-gray-800 pb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-gray-500 font-mono text-sm">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {post.date}
          </span>
          <button 
            onClick={handleLike}
            className="flex items-center hover:text-[#aa3bff] transition-colors cursor-pointer group"
          >
            <ThumbsUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            {post.likes} LIKES
          </button>
        </div>
        <div className="flex gap-2 mt-6">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-mono px-3 py-1 bg-[#aa3bff]/10 text-[#aa3bff] rounded border border-[#aa3bff]/30">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-invert prose-lg max-w-none mb-16 text-gray-300 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>

      {/* Comments Section */}
      <section className="border-t border-gray-800 pt-12">
        <div className="flex items-center space-x-2 mb-8 text-gray-100">
          <MessageSquare className="w-6 h-6 text-[#00ffcc]" />
          <h2 className="text-2xl font-bold">评论区 (COMMENTS)</h2>
          <span className="text-gray-500 font-mono text-sm ml-4">
            [{post.comments.length}]
          </span>
        </div>

        <form onSubmit={handleCommentSubmit} className="mb-10 relative">
          <textarea
            rows={3}
            className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 text-gray-300 focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-all resize-none shadow-inner"
            placeholder="输入指令以注入评论... (Enter comment...)"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="absolute bottom-4 right-4 bg-[#00ffcc] text-[#0a0a0a] px-4 py-2 rounded font-bold font-mono hover:bg-[#00ccaa] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Send className="w-4 h-4 mr-2" />
            SEND
          </button>
        </form>

        <div className="space-y-6">
          {post.comments.map(comment => (
            <div key={comment.id} className="bg-[#121212] p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-[#aa3bff] font-mono">@{comment.user}</span>
                <span className="text-xs text-gray-500 font-mono">{comment.date}</span>
              </div>
              <p className="text-gray-300">{comment.text}</p>
            </div>
          ))}
          {post.comments.length === 0 && (
            <p className="text-gray-500 font-mono text-center py-8">NO_COMMENTS_FOUND</p>
          )}
        </div>
      </section>
    </article>
  );
}
