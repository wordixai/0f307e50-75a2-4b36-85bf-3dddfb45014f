import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TryOnForm } from '@/components/try-on/TryOnForm';
import { ProcessingOverlay } from '@/components/try-on/ProcessingOverlay';
import { ResultDisplay } from '@/components/try-on/ResultDisplay';
import { useTryOnStore } from '@/stores/tryOnStore';
import { virtualTryOn } from '@/lib/supabase';

const TryOn = () => {
  const {
    personImage,
    personImagePreview,
    clothingImage,
    isProcessing,
    processingProgress,
    processingMessage,
    resultImage,
    setProcessingState,
    setResult,
    reset,
  } = useTryOnStore();

  const [showResult, setShowResult] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!personImage || !clothingImage) {
      toast.error('请上传两张图片');
      return;
    }

    setProcessingState(true, 10, '正在上传图片...');

    try {
      // Simulate progress for better UX
      setProcessingState(true, 30, '正在分析照片...');
      await new Promise((r) => setTimeout(r, 500));

      setProcessingState(true, 50, '正在匹配服装...');
      await new Promise((r) => setTimeout(r, 500));

      setProcessingState(true, 70, '正在生成造型...');

      const response = await virtualTryOn(personImage, clothingImage);

      if (response.success && response.resultImageUrl) {
        setProcessingState(true, 100, '完成！');
        await new Promise((r) => setTimeout(r, 300));
        setResult(response.resultImageUrl);
        setShowResult(true);
        toast.success('造型生成成功！');
      } else {
        throw new Error(response.error || '生成失败');
      }
    } catch (error) {
      setResult(null, error instanceof Error ? error.message : '处理失败，请重试');
      toast.error(error instanceof Error ? error.message : '处理失败，请重试');
    }
  }, [personImage, clothingImage, setProcessingState, setResult]);

  const handleDownload = useCallback(() => {
    if (!resultImage) return;

    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `vtryon-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('图片已下载');
  }, [resultImage]);

  const handleTryAgain = useCallback(() => {
    setShowResult(false);
    reset();
  }, [reset]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {showResult && resultImage && personImagePreview ? (
            <ResultDisplay
              originalImage={personImagePreview}
              resultImage={resultImage}
              onDownload={handleDownload}
              onTryAgain={handleTryAgain}
            />
          ) : (
            <TryOnForm onSubmit={handleSubmit} />
          )}
        </div>
      </main>

      <Footer />

      <ProcessingOverlay
        isVisible={isProcessing}
        progress={processingProgress}
        message={processingMessage}
      />
    </div>
  );
};

export default TryOn;
