
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Award, ExternalLink } from 'lucide-react';

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
    'Linux Administration'
  ];

  const certifications = [
    'CISSP - Certified Information Systems Security Professional',
    'CEH - Certified Ethical Hacker',
    'CISM - Certified Information Security Manager',
    'OSCP - Offensive Security Certified Professional'
  ];

  const experience = [
    {
      title: 'Senior Security Analyst',
      company: 'Enterprise Security Solutions',
      period: '2022 - Present',
      description: 'Leading vulnerability assessments and penetration testing for Fortune 500 clients.'
    },
    {
      title: 'Cybersecurity Consultant',
      company: 'Independent',
      period: '2020 - 2022',
      description: 'Providing specialized security consulting services across various industries.'
    },
    {
      title: 'Security Engineer',
      company: 'TechCorp Security',
      period: '2019 - 2020',
      description: 'Implemented security frameworks and conducted regular security audits.'
    }
  ];

  return (
    <section id="about" className="section-padding bg-secondary/20">
      <div className="container-modern">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            About Me
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Passionate about securing digital infrastructure and helping organizations 
            stay ahead of evolving cyber threats.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Professional Summary */}
          <div className="space-y-8 animate-fade-in-up">
            <Card className="card-modern p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">CM</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Chaitra Vishwanath Malladad</h3>
                    <p className="text-muted-foreground">Vulnerability Specialist</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Scotland, United Kingdom</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>5+ Years Experience</span>
                  </div>
                </div>

                <p className="text-lg leading-relaxed">
                  I'm a dedicated cybersecurity professional specializing in vulnerability 
                  assessment and attack surface reduction. My expertise spans enterprise 
                  security frameworks, penetration testing, and strategic security consulting.
                </p>

                <Button className="btn-primary w-full">
                  <ExternalLink className="w-4 h-4" />
                  Download Resume
                </Button>
              </div>
            </Card>

            {/* Experience */}
            <Card className="card-modern p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                Experience
              </h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-4 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h4 className="font-semibold">{exp.title}</h4>
                      <span className="text-sm text-muted-foreground">{exp.period}</span>
                    </div>
                    <p className="text-primary font-medium mb-2">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Skills & Certifications */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="card-modern p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                Technical Skills
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="justify-center py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="card-modern p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Certifications</h3>
              </div>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/50">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm leading-relaxed">{cert}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="card-modern p-6 text-center hover-glow">
                <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                <div className="text-xs text-muted-foreground">Response Time</div>
              </Card>
              
              <Card className="card-modern p-6 text-center hover-glow">
                <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
