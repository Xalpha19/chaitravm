import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Code, Lock, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Vulnerability Specialist & Attack Surface Reduction';

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
    <section className="relative min-h-screen flex items-center justify-center px-6 matrix-purple">
      {/* 3D Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-primary/40 rotate-45 float-animation-3d geometric-3d neon-border" />
        <div className="absolute top-40 right-20 w-12 h-12 bg-primary/20 rotate-12 float-animation-3d geometric-3d" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-16 h-16 border-2 border-accent/40 rotate-45 float-animation-3d geometric-3d neon-border" style={{ animationDelay: '4s' }} />
        <div className="absolute top-60 right-40 w-8 h-8 bg-accent/30 rotate-45 pulse-glow-3d" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-60 right-10 w-14 h-14 border border-primary/30 rounded-full float-animation-3d geometric-3d" style={{ animationDelay: '3s' }} />
        <div className="absolute top-32 right-60 w-6 h-6 bg-primary rotate-3d" style={{ animationDelay: '5s' }} />
      </div>

      <div className="text-center z-10 max-w-4xl mx-auto">
        {/* Main heading with glitch effect */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 perspective-1000">
          <span className="glitch-3d neon-purple" data-text="SECURE">SECURE</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent hologram-effect">
            DIGITAL
          </span>
          <br />
          <span className="glitch-3d neon-purple" data-text="WORLD">WORLD</span>
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
          Specialized in vulnerability assessment and attack surface reduction with 5+ years 
          of experience securing enterprise infrastructure and applications across Scotland.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            className="bg-black border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-background transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group"
            onClick={() => scrollToSection('contact')}
          >
            <span className="flex items-center gap-2">
              <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Get In Touch
            </span>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-background transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
            onClick={() => scrollToSection('projects')}
          >
            <span className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              View Projects
            </span>
          </Button>
        </div>

        {/* Skill indicators with 3D effects */}
        <div className="flex justify-center gap-8 mb-16">
          <div className="text-center group cursor-pointer">
            <div className="card-3d w-16 h-16 rounded-lg flex items-center justify-center mb-3 border border-primary/30 group-hover:border-primary transition-all duration-500">
              <Shield className="w-8 h-8 text-primary neon-purple" />
            </div>
            <p className="text-sm text-muted-foreground">Security</p>
          </div>
          
          <div className="text-center group cursor-pointer">
            <div className="card-3d w-16 h-16 rounded-lg flex items-center justify-center mb-3 border border-accent/30 group-hover:border-accent transition-all duration-500">
              <Lock className="w-8 h-8 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground">Penetration</p>
          </div>
          
          <div className="text-center group cursor-pointer">
            <div className="card-3d w-16 h-16 rounded-lg flex items-center justify-center mb-3 border border-primary/30 group-hover:border-primary transition-all duration-500">
              <Code className="w-8 h-8 text-primary neon-purple" />
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