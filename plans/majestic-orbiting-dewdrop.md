# AI换衣应用 - 实现计划

## 概述
创建一个时尚简约风格的AI虚拟试衣应用，用户可上传个人照片和服装图片，通过Supabase Edge Function调用AI服务生成换装效果。

## 设计风格
- **配色**：黑白为主，高端时装品牌风格（类似Zara、COS）
- **字体**：Playfair Display（标题）+ Inter（正文）
- **特点**：直角边框、大量留白、优雅动画、高对比度

## 文件结构

```
src/
├── index.css                    # 完整设计系统（HSL颜色、排版、工具类）
├── pages/
│   ├── Index.tsx               # 着陆页（Hero + Features + HowItWorks）
│   └── TryOn.tsx               # 主试衣页面
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # 极简导航
│   │   └── Footer.tsx          # 简约页脚
│   ├── landing/
│   │   ├── HeroSection.tsx     # 全屏Hero区域
│   │   ├── FeaturesSection.tsx # 3个功能亮点
│   │   └── HowItWorks.tsx      # 使用步骤
│   └── try-on/
│       ├── ImageUploader.tsx   # 拖拽上传组件（复用）
│       ├── ProcessingOverlay.tsx # 处理中遮罩
│       └── ResultDisplay.tsx   # 结果对比展示
├── stores/
│   └── tryOnStore.ts           # Zustand状态管理
├── hooks/
│   └── useTryOn.ts             # AI处理hook
├── lib/
│   └── supabase.ts             # Supabase客户端
└── types/
    └── index.ts                # 类型定义

supabase/functions/
└── virtual-try-on/index.ts     # Edge Function
```

## 核心功能

### 1. 着陆页 (/)
- 全屏Hero：大标题"重塑你的衣橱" + CTA按钮
- 功能展示：上传照片 → 选择服装 → AI生成
- 使用步骤：3步可视化引导

### 2. 试衣页 (/try-on)
- 双栏布局：左侧上传人物照片，右侧上传服装图片
- 拖拽上传：支持拖放和点击上传
- 图片预览：上传后即时预览，可删除重选
- 生成按钮：两张图片都上传后激活

### 3. 处理流程
- 优雅的全屏加载动画
- 进度提示：上传中 → 分析中 → 生成中
- 错误处理和重试机制

### 4. 结果展示
- 前后对比：并排展示原图和效果图
- 滑动对比：可拖动分割线对比
- 下载功能：保存生成结果
- 重新尝试：快速开始新的换装

## 设计系统要点

```css
/* 核心颜色 */
--background: 0 0% 100%;        /* 纯白 */
--foreground: 0 0% 4%;          /* 近黑 */
--primary: 0 0% 4%;             /* 黑色主色 */
--muted-foreground: 0 0% 45%;   /* 灰色辅助文字 */
--border: 0 0% 90%;             /* 浅灰边框 */
--radius: 0px;                  /* 直角（时尚感）*/

/* 自定义工具类 */
.fashion-heading-xl   /* 超大标题 */
.fashion-button       /* 边框按钮 */
.fashion-button-filled /* 填充按钮 */
.upload-zone          /* 上传区域 */
```

## Supabase Edge Function

```typescript
// 接收：personImageBase64, clothingImageBase64
// 调用：外部AI换衣API（如Replicate、Fashn.ai）
// 返回：{ success: boolean, resultImageUrl?: string, error?: string }

// 需要配置的环境变量：
// AI_TRYON_API_URL - AI服务地址
// AI_TRYON_API_KEY - API密钥
```

## 用户流程

```
着陆页 → 点击"立即体验" → 试衣页
    ↓
上传人物照片（全身、清晰）
    ↓
上传服装图片（平铺或挂拍）
    ↓
点击"生成造型" → 处理动画
    ↓
查看结果 → 下载/重试
```

## 验证方式

1. **启动开发服务器**：`pnpm run dev`
2. **检查页面**：
   - 着陆页加载正常，动画流畅
   - 点击CTA跳转到试衣页
   - 上传组件拖拽和点击都能工作
3. **测试上传**：上传两张图片，预览正常显示
4. **测试Edge Function**：配置API后，生成功能正常工作
5. **响应式测试**：移动端布局正确

## 关键文件

| 文件 | 作用 |
|------|------|
| `src/index.css` | 设计系统基础 |
| `src/components/try-on/ImageUploader.tsx` | 核心上传组件 |
| `src/stores/tryOnStore.ts` | 全局状态管理 |
| `src/pages/TryOn.tsx` | 主功能页面 |
| `supabase/functions/virtual-try-on/index.ts` | AI处理函数 |
