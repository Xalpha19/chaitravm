import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Code, Lock, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Cybersecurity Professional';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 border border-primary/30 rotate-45 float-animation" />
        <div className="absolute top-40 right-20 w-8 h-8 bg-primary/20 rotate-12 float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 border border-accent/30 rotate-45 float-animation" style={{ animationDelay: '4s' }} />
        <div className="absolute top-60 right-40 w-6 h-6 bg-accent/20 rotate-45 float-animation" style={{ animationDelay: '1s' }} />
      </div>

      <div className="text-center z-10 max-w-4xl mx-auto">
        {/* Main heading with glitch effect */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          <span className="glitch" data-text="SECURE">SECURE</span>
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            DIGITAL
          </span>
          <br />
          <span className="glitch" data-text="WORLD">WORLD</span>
        </h1>

        {/* Typing animation subtitle */}
        <div className="h-20 mb-8">
          <p className="text-2xl md:text-3xl text-muted-foreground">
            {displayText}
            <span className="animate-pulse text-primary">|</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Protecting organizations from cyber threats through innovative security solutions, 
          penetration testing, and strategic risk assessment based in the United Kingdom.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            className="btn-cyber group"
            onClick={() => scrollToSection('contact')}
          >
            <span className="flex items-center gap-2">
              <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Get In Touch
            </span>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            onClick={() => scrollToSection('projects')}
          >
            <span className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              View Projects
            </span>
          </Button>
        </div>

        {/* Skill indicators */}
        <div className="flex justify-center gap-8 mb-16">
          <div className="text-center group cursor-pointer">
            <div className="w-16 h-16 bg-card border border-primary/30 rounded-lg flex items-center justify-center mb-3 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Security</p>
          </div>
          
          <div className="text-center group cursor-pointer">
            <div className="w-16 h-16 bg-card border border-accent/30 rounded-lg flex items-center justify-center mb-3 group-hover:border-accent group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-300">
              <Lock className="w-8 h-8 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground">Penetration</p>
          </div>
          
          <div className="text-center group cursor-pointer">
            <div className="w-16 h-16 bg-card border border-primary/30 rounded-lg flex items-center justify-center mb-3 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
              <Code className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Development</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;