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
  return;
};
export default AboutSection;