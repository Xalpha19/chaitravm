
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WorkExperienceSection from '@/components/WorkExperienceSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <div id="home">
        <HeroSection />
      </div>
      
      {/* About Section */}
      <AboutSection />
      
      {/* Work Experience Section */}
      <WorkExperienceSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/30 bg-secondary/30">
        <div className="container-modern">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              © 2024 Chaitra Vishwanath Malladad. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Cybersecurity Specialist • Vulnerability Assessment • Scotland, UK
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
