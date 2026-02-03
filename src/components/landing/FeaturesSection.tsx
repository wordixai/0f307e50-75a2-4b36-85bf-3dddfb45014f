import { motion } from 'framer-motion';
import { Upload, Shirt, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: '上传照片',
    description: '选择一张清晰的全身照片',
  },
  {
    icon: Shirt,
    title: '选择服装',
    description: '上传想要试穿的衣服图片',
  },
  {
    icon: Sparkles,
    title: 'AI 生成',
    description: '智能合成，即刻呈现效果',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const FeaturesSection = () => {
  return (
    <section className="py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="fashion-caption text-muted-foreground mb-4 block">
            功能特点
          </span>
          <h2 className="fashion-heading-lg">简单三步</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="mb-8 inline-flex items-center justify-center w-16 h-16 border border-border group-hover:border-foreground transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              </div>
              <span className="fashion-caption text-muted-foreground mb-3 block">
                0{index + 1}
              </span>
              <h3 className="fashion-heading-md mb-4">{feature.title}</h3>
              <p className="fashion-body text-muted-foreground max-w-xs mx-auto">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
