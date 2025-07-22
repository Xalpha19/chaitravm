import MatrixBackground from '@/components/MatrixBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Animated Matrix Background */}
      <MatrixBackground />
      
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
            © 2024 CyberSec Professional. Securing the digital world, one system at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
