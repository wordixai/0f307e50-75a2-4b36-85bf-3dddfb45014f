import { motion, AnimatePresence } from 'framer-motion';

interface ProcessingOverlayProps {
  isVisible: boolean;
  progress?: number;
  message?: string;
}

export const ProcessingOverlay = ({
  isVisible,
  progress = 0,
  message = '处理中...',
}: ProcessingOverlayProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="text-center">
            <div className="processing-spinner mx-auto mb-8" />

            <motion.p
              key={message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="fashion-body text-foreground mb-4"
            >
              {message}
            </motion.p>

            {progress > 0 && (
              <div className="w-48 mx-auto">
                <div className="h-px bg-border overflow-hidden">
                  <motion.div
                    className="h-full bg-foreground"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-2 block">
                  {progress}%
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
