import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Quantum Finance',
    category: 'Web Design & Development',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    color: 'from-primary/80 to-blue-600/80',
  },
  {
    title: 'Nova Fitness',
    category: 'Brand Identity & App',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    color: 'from-accent/80 to-pink-600/80',
  },
  {
    title: 'Cosmic Gaming',
    category: '3D Experience',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
    color: 'from-purple-600/80 to-accent/80',
  },
  {
    title: 'EcoVerse',
    category: 'Web Platform',
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&h=600&fit=crop',
    color: 'from-green-500/80 to-primary/80',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className={`group relative overflow-hidden rounded-3xl ${
        index === 0 ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <div className="aspect-[4/3] relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <span className="text-white/80 text-sm font-medium mb-2">{project.category}</span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">{project.title}</h3>
          <button className="inline-flex items-center gap-2 text-white font-medium group/btn">
            View Project
            <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>

        {/* Default Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent group-hover:opacity-0 transition-opacity duration-300">
          <span className="text-muted-foreground text-sm">{project.category}</span>
          <h3 className="text-xl font-display font-semibold text-foreground">{project.title}</h3>
        </div>
      </div>
    </motion.div>
  );
}

export function WorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md mt-4 md:mt-0">
            Explore our latest work showcasing innovative solutions and creative excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
