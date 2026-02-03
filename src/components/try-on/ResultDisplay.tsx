import { motion } from 'framer-motion';
import { Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultDisplayProps {
  originalImage: string;
  resultImage: string;
  onDownload: () => void;
  onTryAgain: () => void;
}

export const ResultDisplay = ({
  originalImage,
  resultImage,
  onDownload,
  onTryAgain,
}: ResultDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Title */}
      <div className="text-center">
        <span className="fashion-caption text-muted-foreground mb-2 block">
          生成完成
        </span>
        <h2 className="fashion-heading-md">你的新造型</h2>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <span className="fashion-caption text-muted-foreground">原图</span>
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={originalImage}
              alt="Original"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-3">
          <span className="fashion-caption text-muted-foreground">效果图</span>
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={resultImage}
              alt="Result"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Button
          variant="fashionFilled"
          size="lg"
          onClick={onDownload}
          className="w-full sm:w-auto"
        >
          <Download className="w-4 h-4 mr-2" />
          下载效果图
        </Button>

        <Button
          variant="fashion"
          size="lg"
          onClick={onTryAgain}
          className="w-full sm:w-auto"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          再试一次
        </Button>
      </div>
    </motion.div>
  );
};
