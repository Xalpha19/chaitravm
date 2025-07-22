
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, MapPin } from 'lucide-react';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Cybersecurity Specialist';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center section-padding">
      <div className="container-modern">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Professional introduction */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <MapPin className="w-4 h-4" />
              <span>Scotland, United Kingdom</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              Hello, I'm{' '}
              <span className="text-primary">Chaitra</span>
            </h1>
            
            <div className="h-16 flex items-center justify-center">
              <p className="text-2xl md:text-3xl text-muted-foreground">
                {displayText}
                <span className="animate-pulse text-primary ml-1">|</span>
              </p>
            </div>
          </div>

          {/* Professional description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
            Specialized in vulnerability assessment and attack surface reduction with 5+ years 
            of experience securing enterprise infrastructure across Scotland. I help organizations 
            identify, assess, and mitigate cybersecurity threats.
          </p>

          {/* Modern call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              className="btn-primary group"
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              className="btn-secondary"
              onClick={() => scrollToSection('projects')}
            >
              <Download className="w-4 h-4" />
              View Portfolio
            </Button>
          </div>

          {/* Professional highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Security Audits</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Vulnerabilities Found</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
