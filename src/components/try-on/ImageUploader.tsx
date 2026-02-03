import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  label: string;
  hint?: string;
  preview?: string | null;
  onRemove?: () => void;
  aspectRatio?: string;
  className?: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const ImageUploader = ({
  onImageSelect,
  label,
  hint,
  preview,
  onRemove,
  aspectRatio = 'aspect-[3/4]',
  className,
}: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('请上传 JPG、PNG 或 WebP 格式的图片');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('图片大小不能超过 10MB');
      return false;
    }

    return true;
  };

  const handleFile = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  return (
    <div className={cn('flex flex-col', className)}>
      <span className="fashion-caption text-muted-foreground mb-4">{label}</span>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative overflow-hidden',
          aspectRatio,
          !preview && 'upload-zone',
          isDragging && 'upload-zone-active'
        )}
      >
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {onRemove && (
                <button
                  onClick={onRemove}
                  className="absolute top-3 right-3 w-8 h-8 bg-background/90 hover:bg-background flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ) : (
            <motion.label
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
            >
              <input
                type="file"
                accept={ACCEPTED_TYPES.join(',')}
                onChange={handleInputChange}
                className="hidden"
              />
              <div className="w-12 h-12 border border-muted-foreground/30 flex items-center justify-center mb-4">
                {isDragging ? (
                  <ImageIcon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                ) : (
                  <Upload className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                )}
              </div>
              <span className="fashion-body text-muted-foreground text-center px-4">
                {isDragging ? '释放以上传' : '拖放或点击上传'}
              </span>
              {hint && (
                <span className="text-xs text-muted-foreground/60 mt-2 text-center px-4">
                  {hint}
                </span>
              )}
            </motion.label>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-destructive mt-2"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
