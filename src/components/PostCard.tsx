import { Link } from "react-router-dom";
import { Post } from "../services/api";
import { Calendar, Eye, ThumbsUp } from "lucide-react";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PostCard = ({ post, featured = false }: PostCardProps) => {
  return (
    <Link to={`/post/${post.id}`} className="block group h-full">
      <div className={`h-full flex flex-col glass-panel-interactive rounded-xl overflow-hidden ${featured ? 'border-neon-purple/30 hover:border-neon-purple/80 hover:shadow-neon-purple' : ''}`}>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10 opacity-60" />
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ height: featured ? '300px' : '200px' }}
          />
          {featured && (
            <div className="absolute top-4 right-4 z-20 bg-neon-purple/20 border border-neon-purple text-neon-purple px-3 py-1 rounded-full text-xs font-bold tracking-wider backdrop-blur-md flex items-center space-x-1">
              <ThumbsUp className="w-3 h-3" />
              <span>TOP LIKED</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col flex-grow p-6 relative z-20 -mt-8 bg-gradient-to-b from-transparent to-surface">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs font-mono text-neon-blue bg-neon-blue/10 px-2 py-0.5 rounded border border-neon-blue/20">
                #{tag}
              </span>
            ))}
          </div>
          
          <h3 className={`font-display font-bold text-text-primary group-hover:text-neon-blue transition-colors mb-3 ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
            {post.title}
          </h3>
          
          <p className="text-text-muted text-sm line-clamp-3 mb-6 flex-grow">
            {post.abstract}
          </p>
          
          <div className="flex items-center justify-between text-xs text-text-muted font-mono mt-auto pt-4 border-t border-surfaceBorder">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {post.createdAt}
              </span>
              <span className="flex items-center text-neon-purple group-hover:text-neon-blue transition-colors">
                <ThumbsUp className="w-3 h-3 mr-1" />
                {post.likes}
              </span>
              <span className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {post.views}
              </span>
            </div>
            <span className="text-neon-blue group-hover:text-neon-purple transition-colors font-bold">
              READ &gt;_
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
