import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Award, ExternalLink } from 'lucide-react';
const AboutSection = () => {
  const skills = ['Penetration Testing', 'Vulnerability Assessment', 'SIEM Management', 'Incident Response', 'Risk Assessment', 'Compliance Auditing', 'Network Security', 'Cloud Security', 'Python Scripting', 'Linux Administration'];
  const certifications = ['CISSP - Certified Information Systems Security Professional', 'CEH - Certified Ethical Hacker', 'CISM - Certified Information Security Manager', 'OSCP - Offensive Security Certified Professional'];
  const experience = [{
    title: 'Senior Security Analyst',
    company: 'Enterprise Security Solutions',
    period: '2022 - Present',
    description: 'Leading vulnerability assessments and penetration testing for Fortune 500 clients.'
  }, {
    title: 'Cybersecurity Consultant',
    company: 'Independent',
    period: '2020 - 2022',
    description: 'Providing specialized security consulting services across various industries.'
  }, {
    title: 'Security Engineer',
    company: 'TechCorp Security',
    period: '2019 - 2020',
    description: 'Implemented security frameworks and conducted regular security audits.'
  }];

  return (
    <section id="about" className="py-20 px-6 bg-secondary/20">
      <div className="container-modern">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cybersecurity professional with expertise in vulnerability assessment, penetration testing, and threat intelligence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills */}
          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              Core Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Certification */}
          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Badge className="w-6 h-6 text-primary" />
              Certification
            </h3>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;