
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container-modern">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection('home')}
          >
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <Shield className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">Chaitra M</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors duration-200 relative group text-sm font-medium"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <Button 
              className="btn-primary ml-4"
              onClick={() => scrollToSection('contact')}
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-foreground hover:text-primary transition-colors duration-200 py-2 text-sm font-medium"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                className="w-full btn-primary mt-4"
                onClick={() => scrollToSection('contact')}
              >
                Hire Me
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
