import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: '上传个人照片',
    description: '选择一张全身照，确保光线充足、姿态自然。支持 JPG、PNG 格式。',
  },
  {
    number: '02',
    title: '添加服装图片',
    description: '上传想要试穿的服装图片，平铺或挂拍效果最佳。',
  },
  {
    number: '03',
    title: '生成并下载',
    description: '点击生成，AI 将为你呈现换装效果。满意后可直接下载保存。',
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-32 bg-secondary/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="fashion-caption text-muted-foreground mb-4 block">
            使用指南
          </span>
          <h2 className="fashion-heading-lg">如何使用</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex gap-8 mb-16 last:mb-0"
            >
              <div className="flex-shrink-0">
                <span className="fashion-heading-lg text-muted-foreground/30">
                  {step.number}
                </span>
              </div>
              <div className="pt-2">
                <h3 className="fashion-heading-md mb-3">{step.title}</h3>
                <p className="fashion-body text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
