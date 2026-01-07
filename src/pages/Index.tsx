import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { WorkSection } from '@/components/WorkSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { TestimonialSection } from '@/components/TestimonialSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />
      <TestimonialSection />
    </Layout>
  );
};

export default Index;
