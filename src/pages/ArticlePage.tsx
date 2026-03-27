import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockArticles, mockComments } from '../data/mock';
import { Comment } from '../types';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { Clock, Calendar, ThumbsUp, User, ArrowLeft, MessageSquare } from 'lucide-react';

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState(mockArticles.find(a => a.id === id));
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('Guest_User');
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API
    if (id) {
      setComments(mockComments.filter(c => c.articleId === id));
    }
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-mono text-accent glitch-text mb-4" data-text="404_NOT_FOUND">404_NOT_FOUND</h1>
        <Button onClick={() => navigate('/')} variant="outline">RETURN_TO_BASE</Button>
      </div>
    );
  }

  const handleLike = () => {
    if (!hasLiked) {
      setArticle({ ...article, likes: article.likes + 1 });
      setHasLiked(true);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      articleId: article.id,
      author: authorName,
      content: newComment,
      date: new Date().toISOString().split('T')[0],
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-gray-400 hover:text-primary transition-colors font-mono text-sm mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          BACK_TO_DATA_STREAMS
        </button>

        {/* Article Header */}
        <header className="mb-12 border-b border-gray-800 pb-8 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-1 bg-primary/10 text-primary border border-primary/30">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-gray-400">
            <span className="flex items-center text-gray-300"><User className="w-4 h-4 mr-2" /> {article.author}</span>
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {article.date}</span>
            <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {article.readTime} min read</span>
            <button 
              onClick={handleLike}
              className={`flex items-center transition-colors ${hasLiked ? 'text-secondary' : 'hover:text-secondary'}`}
            >
              <ThumbsUp className="w-4 h-4 mr-2" /> {article.likes}
            </button>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none prose-pre:bg-surface prose-pre:border prose-pre:border-gray-800 prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:font-mono prose-headings:text-gray-100 mb-16">
          {/* For mock purposes, rendering plain text. In real app, use react-markdown */}
          <div className="whitespace-pre-wrap font-sans text-gray-300 leading-relaxed">
            {article.content}
          </div>
        </article>

        {/* Interaction Actions */}
        <div className="flex justify-center border-t border-b border-gray-800 py-8 mb-16">
          <Button 
            variant={hasLiked ? "secondary" : "outline"} 
            onClick={handleLike}
            className="flex items-center"
          >
            <ThumbsUp className="w-5 h-5 mr-2" />
            {hasLiked ? 'SYSTEM_ACKNOWLEDGED' : 'ACKNOWLEDGE_DATA'}
          </Button>
        </div>

        {/* Comments Section */}
        <section id="comments">
          <h3 className="text-2xl font-mono mb-8 flex items-center text-white">
            <MessageSquare className="w-6 h-6 mr-3 text-primary" />
            USER_COMMENTS <span className="text-gray-500 text-sm ml-4">[{comments.length}]</span>
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-12 bg-surface/50 p-6 tech-border">
            <div className="mb-4">
              <label className="block text-xs font-mono text-gray-400 mb-2">IDENTIFIER</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-background border border-gray-700 text-white px-4 py-2 font-mono focus:outline-none focus:border-primary focus:shadow-neon-primary transition-all"
              />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-mono text-gray-400 mb-2">MESSAGE_PAYLOAD</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
                rows={4}
                className="w-full bg-background border border-gray-700 text-white px-4 py-2 font-sans focus:outline-none focus:border-primary focus:shadow-neon-primary transition-all resize-none"
                placeholder="Enter your message..."
              ></textarea>
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="primary">TRANSMIT</Button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="bg-background border-l-2 border-gray-800 hover:border-primary p-6 transition-colors duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-mono text-primary font-bold">{comment.author}</div>
                    <div className="text-xs font-mono text-gray-500">{comment.date}</div>
                  </div>
                  <p className="text-gray-300 font-sans">{comment.content}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 font-mono">
                NO_MESSAGES_IN_QUEUE
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}
