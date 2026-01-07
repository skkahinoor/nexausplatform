import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Users, Zap, Globe } from 'lucide-react';

const values = [
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'We push boundaries and embrace cutting-edge technologies to deliver exceptional results.',
  },
  {
    icon: Users,
    title: 'Collaborative Spirit',
    description: 'Your vision drives our process. We work alongside you every step of the way.',
  },
  {
    icon: Trophy,
    title: 'Excellence Always',
    description: 'We never settle for good enough. Every pixel, every line of code matters.',
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Creating digital experiences that connect brands with audiences worldwide.',
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
              Crafting Digital <span className="gradient-text">Masterpieces</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We're a team of passionate designers, developers, and strategists dedicated to 
              creating exceptional digital experiences. With over a decade of experience, 
              we've helped 150+ brands transform their digital presence and achieve remarkable growth.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our approach combines creative vision with technical excellence, ensuring every 
              project we deliver not only looks stunning but performs flawlessly.
            </p>

            {/* Team Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {[
                { value: '35+', label: 'Team Members' },
                { value: '8', label: 'Countries' },
              ].map((stat, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="text-3xl font-display font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="glass-card p-6 flex gap-5 hover:bg-white/5 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
