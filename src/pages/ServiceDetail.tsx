import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Layout } from '@/components/Layout';
import { ServiceScene3D } from '@/components/ServiceScene3D';
import { ArrowRight, CheckCircle2, Sparkles, Rocket, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams, Link } from 'react-router-dom';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: any;
  color: string;
  gradient: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  shapes: ('sphere' | 'torus' | 'box' | 'ring')[];
  features: string[];
  process: {
    title: string;
    description: string;
  }[];
  benefits: string[];
}

const services: Service[] = [
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    subtitle: 'Create Memorable Experiences',
    description: 'Create memorable brand experiences with strategic design that resonates with your audience.',
    longDescription: 'We craft comprehensive brand identities that tell your story, connect with your audience, and leave a lasting impression. From logo design to brand guidelines, we ensure every touchpoint reflects your unique vision and values.',
    icon: 'Palette',
    color: 'from-primary to-blue-500',
    gradient: 'from-blue-500 to-primary',
    colors: {
      primary: '#3b82f6',
      secondary: '#00d4ff',
      accent: '#8b5cf6',
    },
    shapes: ['sphere', 'torus', 'box'],
    features: [
      'Logo Design & Variations',
      'Brand Guidelines & Style Guide',
      'Color Palette & Typography',
      'Visual Identity System',
      'Brand Strategy & Positioning',
      'Brand Asset Creation',
    ],
    process: [
      {
        title: 'Discovery',
        description: 'We dive deep into your brand, understanding your values, audience, and market position.',
      },
      {
        title: 'Strategy',
        description: 'We develop a comprehensive brand strategy that aligns with your business goals.',
      },
      {
        title: 'Design',
        description: 'Our team creates unique visual identities that capture your essence.',
      },
      {
        title: 'Implementation',
        description: 'We ensure consistent brand application across all touchpoints.',
      },
    ],
    benefits: [
      'Increased brand recognition',
      'Stronger market positioning',
      'Cohesive visual presence',
      'Enhanced customer trust',
      'Better brand recall',
    ],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    subtitle: 'Blazing-Fast, Responsive Websites',
    description: 'Build blazing-fast, responsive websites with cutting-edge technologies and flawless UX.',
    longDescription: 'We develop high-performance websites using the latest technologies. From responsive design to advanced functionality, we create digital experiences that engage users and drive conversions.',
    icon: 'Code',
    color: 'from-purple-500 to-accent',
    gradient: 'from-purple-500 to-pink-500',
    colors: {
      primary: '#a855f7',
      secondary: '#ec4899',
      accent: '#8b5cf6',
    },
    shapes: ['box', 'torus', 'ring'],
    features: [
      'Responsive Web Design',
      'Frontend & Backend Development',
      'Performance Optimization',
      'SEO Implementation',
      'Content Management Systems',
      'E-commerce Solutions',
    ],
    process: [
      {
        title: 'Planning',
        description: 'We analyze your requirements and create a detailed development roadmap.',
      },
      {
        title: 'Design',
        description: 'Our designers create intuitive UI/UX that prioritizes user experience.',
      },
      {
        title: 'Development',
        description: 'We build using modern frameworks and best practices for optimal performance.',
      },
      {
        title: 'Launch & Support',
        description: 'We deploy your site and provide ongoing maintenance and updates.',
      },
    ],
    benefits: [
      'Faster page load times',
      'Mobile-first responsive design',
      'Improved search rankings',
      'Enhanced user experience',
      'Scalable architecture',
    ],
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    subtitle: 'Seamless User Experiences',
    description: 'Native and cross-platform applications that deliver seamless user experiences.',
    longDescription: 'We create mobile applications that users love. Whether native iOS, Android, or cross-platform solutions, we deliver apps that are intuitive, performant, and aligned with your business objectives.',
    icon: 'Smartphone',
    color: 'from-primary to-cyan-400',
    gradient: 'from-cyan-400 to-blue-500',
    colors: {
      primary: '#00d4ff',
      secondary: '#3b82f6',
      accent: '#06b6d4',
    },
    shapes: ['sphere', 'box', 'torus'],
    features: [
      'iOS & Android Development',
      'Cross-Platform Solutions',
      'UI/UX Design',
      'App Store Optimization',
      'API Integration',
      'Push Notifications',
    ],
    process: [
      {
        title: 'Research',
        description: 'We study your target audience and market to inform app strategy.',
      },
      {
        title: 'Wireframing',
        description: 'We create detailed wireframes and prototypes for user validation.',
      },
      {
        title: 'Development',
        description: 'We build robust apps with clean code and modern architectures.',
      },
      {
        title: 'Testing & Launch',
        description: 'Rigorous testing ensures quality before app store deployment.',
      },
    ],
    benefits: [
      'Native performance',
      'Offline capabilities',
      'Access to device features',
      'Enhanced user engagement',
      'Regular feature updates',
    ],
  },
  {
    id: '3d-motion',
    title: '3D & Motion',
    subtitle: 'Immersive Experiences',
    description: 'Immersive 3D experiences and motion graphics that bring your vision to life.',
    longDescription: 'We specialize in creating stunning 3D visuals and motion graphics that captivate audiences. From product showcases to animated explainers, we bring your ideas to life with cutting-edge 3D technology.',
    icon: 'Layers',
    color: 'from-accent to-pink-500',
    gradient: 'from-pink-500 to-purple-500',
    colors: {
      primary: '#ec4899',
      secondary: '#a855f7',
      accent: '#f472b6',
    },
    shapes: ['sphere', 'ring', 'torus'],
    features: [
      '3D Modeling & Rendering',
      'Motion Graphics & Animation',
      'AR/VR Experiences',
      'Product Visualization',
      'Architectural Visualization',
      'Interactive 3D Web',
    ],
    process: [
      {
        title: 'Concept',
        description: 'We visualize your ideas and create detailed 3D concepts.',
      },
      {
        title: 'Modeling',
        description: 'Our artists create detailed 3D models with precision and care.',
      },
      {
        title: 'Animation',
        description: 'We bring models to life with smooth, engaging animations.',
      },
      {
        title: 'Integration',
        description: 'We seamlessly integrate 3D content into your platforms.',
      },
    ],
    benefits: [
      'Immersive user experiences',
      'Better product visualization',
      'Increased engagement',
      'Standout marketing content',
      'Future-ready technology',
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    subtitle: 'Data-Driven Strategies',
    description: 'Data-driven strategies that amplify your reach and drive measurable results.',
    longDescription: 'We develop comprehensive digital marketing strategies that grow your audience and drive conversions. From SEO to social media, we use data-driven approaches to maximize your ROI.',
    icon: 'Megaphone',
    color: 'from-green-400 to-primary',
    gradient: 'from-green-400 to-emerald-500',
    colors: {
      primary: '#10b981',
      secondary: '#00d4ff',
      accent: '#34d399',
    },
    shapes: ['torus', 'ring', 'box'],
    features: [
      'SEO & Content Marketing',
      'Social Media Management',
      'PPC & Paid Advertising',
      'Email Marketing Campaigns',
      'Analytics & Reporting',
      'Conversion Optimization',
    ],
    process: [
      {
        title: 'Analysis',
        description: 'We analyze your market, competitors, and audience to identify opportunities.',
      },
      {
        title: 'Strategy',
        description: 'We create customized marketing strategies aligned with your goals.',
      },
      {
        title: 'Execution',
        description: 'We implement campaigns across multiple channels for maximum reach.',
      },
      {
        title: 'Optimization',
        description: 'We continuously monitor and optimize campaigns for better results.',
      },
    ],
    benefits: [
      'Increased brand visibility',
      'Higher conversion rates',
      'Better ROI tracking',
      'Targeted audience reach',
      'Comprehensive analytics',
    ],
  },
  {
    id: 'video-production',
    title: 'Video Production',
    subtitle: 'Cinematic Storytelling',
    description: 'Cinematic storytelling that captures attention and communicates your message.',
    longDescription: 'We produce high-quality video content that tells your story and engages your audience. From commercials to explainer videos, we create compelling visuals that drive results.',
    icon: 'Video',
    color: 'from-orange-400 to-red-500',
    gradient: 'from-orange-500 to-red-600',
    colors: {
      primary: '#f97316',
      secondary: '#ef4444',
      accent: '#fb923c',
    },
    shapes: ['box', 'sphere', 'ring'],
    features: [
      'Commercial & Brand Videos',
      'Explainer & Animated Videos',
      'Corporate Videos',
      'Social Media Content',
      'Video Editing & Post-Production',
      'Motion Graphics',
    ],
    process: [
      {
        title: 'Pre-Production',
        description: 'We plan every detail from script to storyboard and shot list.',
      },
      {
        title: 'Production',
        description: 'Our team captures high-quality footage with professional equipment.',
      },
      {
        title: 'Post-Production',
        description: 'We edit, color grade, and add effects to create the final product.',
      },
      {
        title: 'Delivery',
        description: 'We deliver optimized videos for all your distribution channels.',
      },
    ],
    benefits: [
      'Higher engagement rates',
      'Better brand storytelling',
      'Increased conversions',
      'Social media ready content',
      'Professional quality',
    ],
  },
];

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = services.find(s => s.id === serviceId);
  
  const sectionRefs = {
    hero: useRef(null),
    features: useRef(null),
    process: useRef(null),
    benefits: useRef(null),
  };

  const isHeroInView = useInView(sectionRefs.hero, { once: true });
  const isFeaturesInView = useInView(sectionRefs.features, { once: true, margin: "-100px" });
  const isProcessInView = useInView(sectionRefs.process, { once: true, margin: "-100px" });
  const isBenefitsInView = useInView(sectionRefs.benefits, { once: true, margin: "-100px" });

  if (!service) {
    return (
      <Layout>
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <Link to="/services" className="text-primary hover:underline">
              Back to Services
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={sectionRefs.hero} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-24">
        <ServiceScene3D colors={service.colors} shapes={service.shapes} />
        
        <div className={`absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-[1]`} />
        <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-5 z-[1]`} />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6`}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4"
            >
              {service.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-2xl md:text-3xl font-medium mb-6 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
            >
              {service.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              {service.longDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/contact">
                <Button variant="hero" size="xl" className="group">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="glass" size="xl">
                  View All Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={sectionRefs.features} className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              What's <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>Included</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 30 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 hover:bg-white/5 transition-all duration-300 hover:scale-[1.02]"
              >
                <CheckCircle2 className={`w-6 h-6 mb-4 text-transparent bg-gradient-to-r ${service.gradient} bg-clip-text`} />
                <h3 className="font-semibold mb-2">{feature}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={sectionRefs.process} className="py-32 relative">
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent`} />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Our <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>Process</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that delivers results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className="glass-card p-8 h-full">
                  <div className={`inline-flex w-12 h-12 rounded-full bg-gradient-to-br ${service.color} items-center justify-center mb-4 text-white font-bold text-xl`}>
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={sectionRefs.benefits} className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Key <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>Benefits</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -30 }}
                animate={isBenefitsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 glass-card mb-4 hover:bg-white/5 transition-all duration-300"
              >
                <Target className={`w-6 h-6 mt-1 flex-shrink-0 text-transparent bg-gradient-to-r ${service.gradient} bg-clip-text`} />
                <p className="text-lg">{benefit}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/contact">
              <Button variant="hero" size="xl" className="group">
                <Rocket className="w-5 h-5 mr-2" />
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

