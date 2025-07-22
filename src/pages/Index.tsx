import MatrixBackground from '@/components/MatrixBackground';
import GeometricBackground from '@/components/GeometricBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background perspective-1000">
      {/* Animated Matrix Background */}
      <MatrixBackground />
      
      {/* 3D Geometric Background */}
      <GeometricBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <div id="home">
        <HeroSection />
      </div>
      
      {/* About Section */}
      <AboutSection />
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-border/30 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Chaitra Vishwanath Malladad. Vulnerability Specialist • Attack Surface Reduction Expert • Scotland, UK
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
