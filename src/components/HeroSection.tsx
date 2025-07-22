
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark Purple Space Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-950 to-black" />
      
      {/* Glowing and Flickering Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.5)',
            }}
          />
        ))}
        {/* Larger glowing stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i + 50}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.3)',
            }}
          />
        ))}
        {/* Bright twinkling stars */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i + 70}
            className="absolute w-3 h-3 bg-white rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              boxShadow: '0 0 15px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 45px rgba(255, 255, 255, 0.5)',
            }}
          />
        ))}
      </div>
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Container with Glassmorphism */}
      <div className="relative z-10 container-modern section-padding">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Glass Content Card */}
          <div className="backdrop-blur-md bg-card/30 border border-border/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="space-y-6 animate-fade-in-up">
              {/* Professional introduction */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/80 mb-6">
                  <MapPin className="w-4 h-4" />
                  <span>Scotland, United Kingdom</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
                  Hello, I'm{' '}
                  <span className="text-primary drop-shadow-lg">Chaitra</span>
                </h1>
                
                <div className="h-16 flex items-center justify-center">
                  <p className="text-2xl md:text-3xl text-foreground/90 font-medium">
                    {displayText}
                    <span className="animate-pulse text-primary ml-1">|</span>
                  </p>
                </div>
              </div>

              {/* Professional description */}
              <p className="text-lg md:text-xl text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed text-balance">
                Specialized in vulnerability assessment and attack surface reduction with 5+ years 
                of experience securing enterprise infrastructure across Scotland. I help organizations 
                identify, assess, and mitigate cybersecurity threats.
              </p>

              {/* Modern call-to-action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Button 
                  size="lg"
                  className="bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm group"
                  onClick={() => scrollToSection('contact')}
                >
                  Get In Touch
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-border/30 bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-all duration-300"
                  onClick={() => scrollToSection('projects')}
                >
                  <Download className="w-4 h-4" />
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>

          {/* Professional highlights with glass effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
            {[
              { number: '5+', label: 'Years Experience' },
              { number: '50+', label: 'Security Audits' },
              { number: '100+', label: 'Vulnerabilities Found' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="backdrop-blur-md bg-card/20 border border-border/10 rounded-2xl p-6 text-center space-y-2 hover:bg-card/30 transition-all duration-300 hover:scale-105"
              >
                <div className="text-2xl font-bold text-primary drop-shadow-sm">{stat.number}</div>
                <div className="text-sm text-muted-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
