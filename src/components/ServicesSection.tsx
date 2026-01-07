import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Code, Smartphone, Megaphone, Video, Layers } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Create memorable brand experiences with strategic design that resonates with your audience.',
    color: 'from-primary to-blue-500',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Build blazing-fast, responsive websites with cutting-edge technologies and flawless UX.',
    color: 'from-purple-500 to-accent',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform applications that deliver seamless user experiences.',
    color: 'from-primary to-cyan-400',
  },
  {
    icon: Layers,
    title: '3D & Motion',
    description: 'Immersive 3D experiences and motion graphics that bring your vision to life.',
    color: 'from-accent to-pink-500',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Data-driven strategies that amplify your reach and drive measurable results.',
    color: 'from-green-400 to-primary',
  },
  {
    icon: Video,
    title: 'Video Production',
    description: 'Cinematic storytelling that captures attention and communicates your message.',
    color: 'from-orange-400 to-red-500',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass-card p-8 h-full hover:bg-white/5 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
        {/* Icon */}
        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6`}>
          <service.icon className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{service.description}</p>

        {/* Hover Arrow */}
        <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center`}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Services That <span className="gradient-text">Transform</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From concept to launch, we deliver comprehensive digital solutions 
            that elevate your brand and drive business growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
