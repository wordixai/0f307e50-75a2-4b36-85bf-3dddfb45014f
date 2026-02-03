// Supabase Edge Function for Virtual Try-On
// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TryOnRequest {
  personImageBase64: string;
  clothingImageBase64: string;
}

interface TryOnResponse {
  success: boolean;
  resultImageUrl?: string;
  error?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { personImageBase64, clothingImageBase64 }: TryOnRequest =
      await req.json();

    // Validate inputs
    if (!personImageBase64 || !clothingImageBase64) {
      throw new Error("请提供人物照片和服装图片");
    }

    // Get AI API configuration from environment
    const AI_API_URL = Deno.env.get("AI_TRYON_API_URL");
    const AI_API_KEY = Deno.env.get("AI_TRYON_API_KEY");

    if (!AI_API_URL || !AI_API_KEY) {
      throw new Error("AI服务未配置，请联系管理员");
    }

    // Call external AI API
    // This is a generic structure - adjust based on your chosen AI provider
    // Examples: Replicate (IDM-VTON), Fashn.ai, Kolors, etc.
    const aiResponse = await fetch(AI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Adjust these fields based on your AI API's requirements
        person_image: `data:image/jpeg;base64,${personImageBase64}`,
        garment_image: `data:image/jpeg;base64,${clothingImageBase64}`,
        // Additional parameters as needed
        category: "upper_body", // or full_body, lower_body, etc.
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API Error:", errorText);
      throw new Error(`AI处理失败: ${aiResponse.status}`);
    }

    const aiResult = await aiResponse.json();

    // Extract result URL based on API response structure
    // Adjust this based on your AI provider's response format
    const resultImageUrl =
      aiResult.output_image_url ||
      aiResult.output ||
      aiResult.result ||
      aiResult.image_url ||
      (Array.isArray(aiResult.output) ? aiResult.output[0] : null);

    if (!resultImageUrl) {
      throw new Error("AI未返回有效结果");
    }

    return new Response(
      JSON.stringify({
        success: true,
        resultImageUrl,
      } as TryOnResponse),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Virtual Try-On Error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "处理失败，请重试",
      } as TryOnResponse),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
