import { create } from 'zustand';

interface TryOnState {
  // Upload state
  personImage: File | null;
  personImagePreview: string | null;
  clothingImage: File | null;
  clothingImagePreview: string | null;

  // Processing state
  isProcessing: boolean;
  processingProgress: number;
  processingMessage: string;

  // Result state
  resultImage: string | null;
  error: string | null;

  // Actions
  setPersonImage: (file: File | null) => void;
  setClothingImage: (file: File | null) => void;
  setProcessingState: (isProcessing: boolean, progress?: number, message?: string) => void;
  setResult: (resultImage: string | null, error?: string | null) => void;
  reset: () => void;
}

export const useTryOnStore = create<TryOnState>((set, get) => ({
  // Initial state
  personImage: null,
  personImagePreview: null,
  clothingImage: null,
  clothingImagePreview: null,
  isProcessing: false,
  processingProgress: 0,
  processingMessage: '',
  resultImage: null,
  error: null,

  // Actions
  setPersonImage: (file) => {
    const { personImagePreview } = get();
    if (personImagePreview) {
      URL.revokeObjectURL(personImagePreview);
    }
    set({
      personImage: file,
      personImagePreview: file ? URL.createObjectURL(file) : null,
      error: null,
    });
  },

  setClothingImage: (file) => {
    const { clothingImagePreview } = get();
    if (clothingImagePreview) {
      URL.revokeObjectURL(clothingImagePreview);
    }
    set({
      clothingImage: file,
      clothingImagePreview: file ? URL.createObjectURL(file) : null,
      error: null,
    });
  },

  setProcessingState: (isProcessing, progress = 0, message = '') => {
    set({
      isProcessing,
      processingProgress: progress,
      processingMessage: message,
    });
  },

  setResult: (resultImage, error = null) => {
    set({
      resultImage,
      error,
      isProcessing: false,
      processingProgress: 0,
      processingMessage: '',
    });
  },

  reset: () => {
    const { personImagePreview, clothingImagePreview } = get();
    if (personImagePreview) URL.revokeObjectURL(personImagePreview);
    if (clothingImagePreview) URL.revokeObjectURL(clothingImagePreview);
    set({
      personImage: null,
      personImagePreview: null,
      clothingImage: null,
      clothingImagePreview: null,
      isProcessing: false,
      processingProgress: 0,
      processingMessage: '',
      resultImage: null,
      error: null,
    });
  },
}));
