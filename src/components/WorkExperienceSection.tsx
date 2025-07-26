import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, ExternalLink, ArrowRight, Building, Shield, Search, Bug } from 'lucide-react';
const WorkExperienceSection = () => {
  const experiences = [{
    title: 'Security Analyst',
    subtitle: '(Threat Intelligence)',
    company: 'Redinent Innovation Pvt Ltd',
    location: 'Bengaluru, India',
    duration: 'Jul 2023 – Jan 2025',
    icon: <Building className="w-6 h-6" />,
    responsibilities: ['Implemented signature analysis in ICS environments to enhance threat detection by identifying and documenting malicious patterns.', 'Created Python scripts for automated vulnerability scanning and web crawling, improving data collection speed and accuracy.', 'Identified zero-day vulnerabilities and coordinated mitigation strategies using advanced research and tools.', 'Provided risk-based security assessments and actionable insights to support stakeholder remediation efforts.', 'Utilised OSINT tools to gather contextual threat intelligence and enhance vulnerability assessments with real-world data.'],
    technologies: ['Python', 'ICS Security', 'OSINT', 'Vulnerability Assessment', 'Threat Intelligence']
  }, {
    title: 'Cyber Security Analyst',
    company: 'Dar Al-Handasah Consultants',
    location: 'Pune, India',
    duration: 'May 2021 – Jul 2022',
    icon: <Building className="w-6 h-6" />,
    responsibilities: ['Served as primary security contact, managing threat monitoring, EDR triage, and policy implementation to strengthen systems.', 'Led DLP incident response, conducted root cause analysis, and maintained audit-ready documentation.', 'Improved detection by 50% with Microsoft Defender and reduced phishing cases by 75% through awareness training.', 'Improved scanning tools and coverage, and implemented a RACI matrix to reduce the organization\'s risk score by half.', 'Lead Implementor of ISO 27001 with no non-conformities and Worked as Auditor of CIS benchmark reviews to ensure policy compliance.'],
    technologies: ['Microsoft Defender', 'ISO 27001', 'DLP', 'EDR', 'CIS Benchmark'],
    achievements: ['50% detection improvement', '75% phishing reduction', '50% risk score reduction', 'Zero non-conformities']
  }, {
    title: 'Information Security Analyst',
    company: 'GlobalsITES Pvt Ltd',
    location: 'Bengaluru, India',
    duration: 'Jun 2020 – Apr 2021',
    icon: <Building className="w-6 h-6" />,
    responsibilities: ['Conducted system configuration reviews and technical controls to identify vulnerabilities and harden virtual servers.', 'Utilised open-source tools to collect, profile, and archive threat intelligence data through a custom Python tool.', 'Conducted web application penetration testing using proxy environments and created detailed remediation documentation.'],
    technologies: ['Python', 'Penetration Testing', 'Vulnerability Assessment', 'Server Hardening', 'Web Application Security']
  }];
  const education = [{
    degree: 'MSc Computer Forensics and Cyber Security',
    institution: 'University of Greenwich',
    location: 'London, United Kingdom',
    duration: 'Graduated: Aug 2023',
    grade: 'Distinction',
    description: 'Focused on digital forensics, incident response, and advanced vulnerability analysis using both theoretical and hands-on lab approaches. Designed implementation plan for PCI-DSS Standards framework.',
    activities: ['Advanced Digital Forensics and Evidence Analysis', 'Incident Response and Threat Hunting Methodologies', 'Vulnerability Assessment and Penetration Testing', 'Cyber Law and Legal Framework Studies', 'Research on ICS/SCADA Security Implementations']
  }, {
    degree: 'Post Graduation Diploma in Digital Forensics and Cyber Security',
    institution: 'Rashtriya Raksha University',
    location: 'India',
    duration: 'Jun 2018 - May 2019',
    grade: '84%',
    description: 'Comprehensive program covering advanced cybersecurity concepts and practical implementation of security frameworks.',
    activities: ['Participated in Cyber Awareness programs and security workshops', 'Trained on Reverse Engineering and Malware Analysis techniques', 'Conducted Vulnerability Assessment and Penetration Testing (VAPT)', 'Engaged in vulnerability discovery challenges and CTF competitions', 'Developed enterprise cybersecurity policies and risk assessment frameworks', 'Studied ethical, legal, and economic aspects of cybersecurity']
  }, {
    degree: 'Bachelor of Computer Application',
    institution: 'KLE Technological University',
    location: 'Hubballi, India',
    duration: 'Jun 2015 - May 2018',
    grade: '94%',
    description: 'Comprehensive computer programming curriculum with focus on software development and system analysis.',
    activities: ['Participated in Inter and Intra College Coding Competitions', 'Won multiple prizes and certificates in programming contests', 'Developed various software applications using multiple programming languages', 'Engaged in collaborative projects and team-based development', 'Studied data structures, algorithms, and software engineering principles']
  }];
  const certifications = [{
    name: 'Certified Ethical Hacker (CEH)',
    issuer: 'EC-Council',
    status: 'Active',
    description: 'Industry-recognized certification in ethical hacking and penetration testing methodologies.'
  }];
  const projects = [{
    title: 'Vulnerability Automation Framework',
    description: 'Developed Python-based automation scripts to perform recurring vulnerability scans, crawl web resources, and collect real-time asset data, thereby streamlining threat discovery.',
    icon: <Bug className="w-5 h-5" />
  }, {
    title: 'ICS Signature Detection Module',
    description: 'Developed and tested a pattern recognition tool for detecting malicious signatures in ICS environments, improving anomaly detection accuracy.',
    icon: <Shield className="w-5 h-5" />
  }, {
    title: 'EDR Deployment and Awareness Training',
    description: 'Led the business wide Microsoft Defender deployment and trained employees on phishing mitigation, reducing user-reported incidents, and increasing endpoint resilience.',
    icon: <Building className="w-5 h-5" />
  }];
  return <section id="experience" className="section-padding bg-secondary/30">
      <div className="container-modern">
        {/* Work Experience Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Professional Experience
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            5+ years of cybersecurity expertise across threat intelligence, vulnerability assessment, 
            and enterprise security implementation.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8 mb-20">
          {experiences.map((exp, index) => <Card key={index} className="card-modern card-hover group overflow-hidden animate-fade-in-up" style={{
          animationDelay: `${index * 0.2}s`
        }}>
              <div className="p-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Icon and Company Info */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        {exp.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {exp.title}
                          {exp.subtitle && <span className="block text-base font-normal text-muted-foreground">{exp.subtitle}</span>}
                        </h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Experience Details */}
                  <div className="flex-1 space-y-6">
                    {/* Responsibilities */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Key Responsibilities:</h4>
                      <div className="space-y-2">
                        {exp.responsibilities.map((resp, respIndex) => <div key={respIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span>{resp}</span>
                          </div>)}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Technologies & Tools:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => <Badge key={techIndex} variant="secondary" className="text-xs px-3 py-1">
                            {tech}
                          </Badge>)}
                      </div>
                    </div>

                    {/* Achievements */}
                    {exp.achievements && <div>
                        <h4 className="text-sm font-medium mb-3">Key Achievements:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.achievements.map((achievement, achIndex) => <Badge key={achIndex} variant="outline" className="text-xs px-3 py-1 border-primary text-primary">
                              {achievement}
                            </Badge>)}
                        </div>
                      </div>}
                  </div>
                </div>
              </div>
            </Card>)}
        </div>

        {/* Education Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h3 className="text-3xl font-bold mb-4">Education</h3>
          <div className="w-12 h-0.5 bg-primary mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {education.map((edu, index) => <Card key={index} className="card-modern card-hover p-6 animate-fade-in-up" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary mb-1">{edu.degree}</h4>
                  <p className="text-sm font-medium">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground">{edu.location}</p>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">{edu.duration}</span>
                  <Badge variant="outline" className="text-xs">{edu.grade}</Badge>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {edu.description}
                </p>
                
                {edu.activities && <div>
                    <h5 className="text-xs font-medium mb-2">Key Activities:</h5>
                    <div className="space-y-1">
                      {edu.activities.map((activity, actIndex) => <div key={actIndex} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>{activity}</span>
                        </div>)}
                    </div>
                  </div>}
              </div>
            </Card>)}
        </div>

        {/* Certifications Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h3 className="text-3xl font-bold mb-4">Certifications</h3>
          <div className="w-12 h-0.5 bg-primary mx-auto mb-8"></div>
        </div>

        <div className="flex justify-center mb-20">
          {certifications.map((cert, index) => <Card key={index} className="card-modern card-hover p-6 animate-fade-in-up max-w-md" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <div className="text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mx-auto">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">{cert.name}</h4>
                  <p className="text-sm font-medium">{cert.issuer}</p>
                  <Badge variant="outline" className="text-xs mt-2">{cert.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </Card>)}
        </div>

        {/* Projects Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h3 className="text-3xl font-bold mb-4">Key Projects</h3>
          <div className="w-12 h-0.5 bg-primary mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => <Card key={index} className="card-modern card-hover p-6 animate-fade-in-up group" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {project.icon}
                  </div>
                  <h4 className="font-semibold group-hover:text-primary transition-colors">{project.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </Card>)}
        </div>

        {/* Connect Button */}
        <div className="text-center animate-fade-in">
          
        </div>
      </div>
    </section>;
};
export default WorkExperienceSection;