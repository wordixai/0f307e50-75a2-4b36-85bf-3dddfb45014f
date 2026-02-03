import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="fashion-caption text-foreground hover:opacity-70 transition-opacity">
          VTRYON
        </Link>

        {isHome ? (
          <Link
            to="/try-on"
            className="fashion-caption text-foreground hover:opacity-70 transition-opacity"
          >
            立即体验
          </Link>
        ) : (
          <Link
            to="/"
            className="fashion-caption text-foreground hover:opacity-70 transition-opacity"
          >
            首页
          </Link>
        )}
      </div>
    </motion.header>
  );
};
