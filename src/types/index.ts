// API Response types
export interface TryOnApiResponse {
  success: boolean;
  resultImageUrl?: string;
  error?: string;
}

// Component prop types
export interface UploadedImage {
  file: File;
  preview: string;
  uploadedAt: Date;
}

// Processing states
export type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

export interface ProcessingState {
  status: ProcessingStatus;
  progress: number;
  message: string;
}

// Try-on store types
export interface TryOnState {
  personImage: File | null;
  personImagePreview: string | null;
  clothingImage: File | null;
  clothingImagePreview: string | null;
  isProcessing: boolean;
  processingProgress: number;
  processingMessage: string;
  resultImage: string | null;
  error: string | null;
}
