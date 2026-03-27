import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Heart, Share2, Terminal } from 'lucide-react';
import Navbar from '../components/Navbar';
import CommentSection from '../components/CommentSection';
import { mockArticles, mockComments } from '../data/mockData';
import { Article, Comment } from '../types';
import { motion } from 'framer-motion';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    const foundArticle = mockArticles.find(a => a.id === id);
    if (foundArticle) {
      setArticle(foundArticle);
      setLikes(foundArticle.likes);
    }
    
    const articleComments = mockComments.filter(c => c.articleId === id);
    setComments(articleComments);
    
    window.scrollTo(0, 0);
  }, [id]);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: `new-${Date.now()}`,
      articleId: id!,
      username: 'GuestUser',
      content,
      date: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center font-mono text-cyan">
        <Terminal className="w-12 h-12 mb-4 animate-pulse" />
        <p>SYSTEM.LOADING...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative selection:bg-cyan selection:text-dark">
      {/* Background grid effect */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        backgroundPosition: 'center center',
      }}>
        <div className="absolute inset-0 bg-dark/90" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan font-mono text-sm mb-12 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            RETURN_TO_MAIN
          </Link>

          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <header className="mb-12">
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-cyan bg-cyan/10 border border-cyan/30 px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 leading-tight">
                {article.title}
              </h1>

              <div className="flex items-center justify-between py-6 border-y border-glass-border">
                <div className="flex items-center gap-6 text-sm font-mono text-gray-400">
                  <span className="text-purple">@{article.author}</span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-sm transition-all ${
                  hasLiked 
                    ? 'text-purple bg-purple/10 border border-purple' 
                    : 'text-gray-400 border border-glass-border hover:text-purple hover:border-purple'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                    {likes}
                  </button>
                  <button className="p-2 text-gray-400 border border-glass-border hover:text-cyan hover:border-cyan transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </header>

            {article.coverImage && (
              <div className="mb-12 relative h-64 md:h-96 w-full overflow-hidden border border-glass-border">
                <div className="absolute inset-0 bg-cyan/10 mix-blend-overlay z-10" />
                <img 
                  src={article.coverImage} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-dark to-transparent z-20" />
              </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none mb-16
              prose-headings:font-bold prose-headings:text-gray-100 
              prose-h2:text-3xl prose-h2:border-b prose-h2:border-glass-border prose-h2:pb-2 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:text-cyan
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-purple prose-a:no-underline hover:prose-a:underline
              prose-strong:text-cyan
              prose-code:text-purple prose-code:bg-purple/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-none prose-code:font-mono
              prose-pre:bg-dark/80 prose-pre:border prose-pre:border-glass-border prose-pre:rounded-none
            ">
              {/* In a real app, we'd use a markdown parser like react-markdown here */}
              {/* For demo, we just render the raw text or map over paragraphs */}
              <div dangerouslySetInnerHTML={{ 
                // A very basic simulated markdown rendering for the mock data
                __html: article.content
                  .replace(/## (.*)/g, '<h2>$1</h2>')
                  .replace(/### (.*)/g, '<h3>$1</h3>')
                  .replace(/```[\s\S]*?```/g, match => {
                    return `<pre><code>${match.replace(/```/g, '').replace(/^\w+\n/, '')}</code></pre>`;
                  })
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\d\.\s\*\*(.*?)\*\*：(.*)/g, '<li><strong>$1</strong>: $2</li>')
                  .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
              }} />
            </div>

            <CommentSection 
              comments={comments} 
              onAddComment={handleAddComment} 
            />
          </motion.article>
        </main>
      </div>
    </div>
  );
}
