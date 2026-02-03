import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create client if credentials are configured
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Helper to convert File to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix to get pure base64
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

// Virtual try-on API call
export const virtualTryOn = async (
  personImage: File,
  clothingImage: File
): Promise<{ success: boolean; resultImageUrl?: string; error?: string }> => {
  // Check if Supabase is configured
  if (!supabase) {
    // Demo mode: return the person image as result for preview
    return new Promise((resolve) => {
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            success: true,
            resultImageUrl: reader.result as string,
          });
        };
        reader.readAsDataURL(personImage);
      }, 2000); // Simulate processing time
    });
  }

  try {
    const [personBase64, clothingBase64] = await Promise.all([
      fileToBase64(personImage),
      fileToBase64(clothingImage),
    ]);

    const { data, error } = await supabase.functions.invoke('virtual-try-on', {
      body: {
        personImageBase64: personBase64,
        clothingImageBase64: clothingBase64,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '处理失败，请重试',
    };
  }
};
