import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 3D Background Element for Testimonials
function Testimonial3DBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#00d4ff" />
        <pointLight position={[-5, -5, 5]} intensity={0.4} color="#a855f7" />
        
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
          <mesh position={[-2, 1, -1]}>
            <Sphere args={[0.3, 32, 32]}>
              <MeshDistortMaterial
                color="#00d4ff"
                attach="material"
                distort={0.3}
                speed={1.5}
                roughness={0.2}
                metalness={0.7}
              />
            </Sphere>
          </mesh>
        </Float>
        
        <Float speed={0.8} rotationIntensity={0.4} floatIntensity={1}>
          <mesh position={[2, -1, -1]}>
            <Sphere args={[0.25, 32, 32]}>
              <MeshDistortMaterial
                color="#a855f7"
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.2}
                metalness={0.7}
              />
            </Sphere>
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO, TechFlow Inc.',
    company: 'TechFlow',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "Nexus transformed our digital presence completely. Their innovative approach and attention to detail exceeded all our expectations. The 3D elements they created for our website are absolutely stunning.",
    highlight: 'Transformed our digital presence',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Founder, Nova Design',
    company: 'Nova Design',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "Working with Nexus was a game-changer. They delivered a website that not only looks incredible but performs flawlessly. Our conversion rates increased by 300% after the launch.",
    highlight: '300% increase in conversions',
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Marketing Director, Quantum Finance',
    company: 'Quantum Finance',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "The team at Nexus is incredibly talented. They understood our vision and brought it to life with cutting-edge design and seamless functionality. Highly recommend their services!",
    highlight: 'Brought our vision to life',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Product Manager, Cosmic Gaming',
    company: 'Cosmic Gaming',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "Nexus created an immersive 3D experience that captivated our audience from day one. Their technical expertise and creative vision are unmatched in the industry.",
    highlight: 'Immersive 3D experience',
  },
];

function TestimonialCard({ testimonial, index, isActive }: { 
  testimonial: typeof testimonials[0]; 
  index: number;
  isActive: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { 
        opacity: isActive ? 1 : 0.6, 
        y: 0, 
        scale: isActive ? 1 : 0.95 
      } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`glass-card p-8 h-full transition-all duration-500 ${
        isActive ? 'border-primary/30 shadow-lg shadow-primary/10' : ''
      }`}
    >
      {/* Quote Icon */}
      <div className="mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Quote className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-primary text-primary"
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
        "{testimonial.text}"
      </p>

      {/* Highlight */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          {testimonial.highlight}
        </span>
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-4 pt-6 border-t border-border/50">
        <div className="relative">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
        </div>
        <div>
          <div className="font-display font-semibold text-foreground">
            {testimonial.name}
          </div>
          <div className="text-sm text-muted-foreground">
            {testimonial.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials on mobile only
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      {/* 3D Background */}
      <Testimonial3DBackground />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent z-[1]" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 z-[1]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 z-[1]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our clients have to say about 
            working with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="max-w-7xl mx-auto">
          {/* Desktop: Show all testimonials in grid */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6 mb-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                isActive={true}
              />
            ))}
          </div>

          {/* Tablet: Show 2 testimonials */}
          <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6 mb-8">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                isActive={true}
              />
            ))}
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${activeIndex * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                    <TestimonialCard
                      testimonial={testimonial}
                      index={index}
                      isActive={true}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? 'bg-primary w-8'
                        : 'bg-muted-foreground/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            { value: '150+', label: 'Happy Clients' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '12+', label: 'Years Experience' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

