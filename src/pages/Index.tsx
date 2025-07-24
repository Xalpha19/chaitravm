import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WorkExperienceSection from '@/components/WorkExperienceSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
const Index = () => {
  return <div className="min-h-screen bg-background">
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
      
      {/* Blog Section */}
      <BlogSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/30 bg-secondary/30">
        <div className="container-modern">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">© 2025 Chaitra Vishwanath Malladad. All rights reserved.</p>
            
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;