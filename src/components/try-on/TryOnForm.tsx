import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { useTryOnStore } from '@/stores/tryOnStore';

interface TryOnFormProps {
  onSubmit: () => void;
}

export const TryOnForm = ({ onSubmit }: TryOnFormProps) => {
  const {
    personImagePreview,
    clothingImagePreview,
    setPersonImage,
    setClothingImage,
  } = useTryOnStore();

  const canSubmit = personImagePreview && clothingImagePreview;

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
          开始体验
        </span>
        <h2 className="fashion-heading-md">上传图片</h2>
      </div>

      {/* Upload Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <ImageUploader
          label="你的照片"
          hint="全身照，光线充足"
          preview={personImagePreview}
          onImageSelect={(file) => setPersonImage(file)}
          onRemove={() => setPersonImage(null)}
          aspectRatio="aspect-[3/4]"
        />

        <ImageUploader
          label="服装图片"
          hint="平铺或挂拍效果最佳"
          preview={clothingImagePreview}
          onImageSelect={(file) => setClothingImage(file)}
          onRemove={() => setClothingImage(null)}
          aspectRatio="aspect-[3/4]"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          variant="fashionFilled"
          size="xl"
          onClick={onSubmit}
          disabled={!canSubmit}
          className="min-w-[200px]"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          生成造型
        </Button>
      </div>

      {!canSubmit && (
        <p className="text-center text-xs text-muted-foreground">
          请上传两张图片后开始生成
        </p>
      )}
    </motion.div>
  );
};
