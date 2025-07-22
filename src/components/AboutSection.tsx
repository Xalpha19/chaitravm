import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Award } from 'lucide-react';

const AboutSection = () => {
  const skills = [
    'Penetration Testing',
    'Vulnerability Assessment',
    'SIEM Management',
    'Incident Response',
    'Risk Assessment',
    'Compliance Auditing',
    'Network Security',
    'Cloud Security',
    'Python Scripting',
    'Linux Administration',
    'Digital Forensics',
    'Threat Intelligence'
  ];

  const certifications = [
    'CISSP - Certified Information Systems Security Professional',
    'CEH - Certified Ethical Hacker',
    'CISM - Certified Information Security Manager',
    'OSCP - Offensive Security Certified Professional'
  ];

  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column - Bio */}
          <div className="space-y-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Based in United Kingdom</span>
                </div>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>5+ Years Experience</span>
                </div>

                <p className="text-lg leading-relaxed">
                  I'm a dedicated cybersecurity professional with extensive experience in 
                  protecting digital infrastructure and assets. My expertise spans across 
                  penetration testing, vulnerability assessment, and incident response.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  With a passion for staying ahead of emerging threats, I continuously 
                  evolve my skillset to provide cutting-edge security solutions. My approach 
                  combines technical excellence with strategic thinking to deliver comprehensive 
                  security frameworks that protect organizations from evolving cyber threats.
                </p>
              </div>
            </Card>

            {/* Certifications */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-semibold">Certifications</h3>
              </div>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right column - Skills */}
          <div className="space-y-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                Technical Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="px-4 py-2 bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Security Audits</div>
              </Card>
              
              <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-300">
                <div className="text-3xl font-bold text-accent mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Vulnerabilities Found</div>
              </Card>
              
              <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </Card>
              
              <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-300">
                <div className="text-3xl font-bold text-accent mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;