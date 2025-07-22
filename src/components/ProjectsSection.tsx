import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Shield, Bug, Lock, Database } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Enterprise Security Assessment',
      description: 'Comprehensive security audit for a Fortune 500 company including network penetration testing, social engineering assessment, and compliance review.',
      technologies: ['Nmap', 'Metasploit', 'Burp Suite', 'OWASP ZAP'],
      category: 'Penetration Testing',
      icon: <Shield className="w-6 h-6" />,
      stats: { vulnerabilities: '23', criticalFindings: '5', timeToComplete: '2 weeks' }
    },
    {
      title: 'Custom SIEM Implementation',
      description: 'Designed and implemented a custom Security Information and Event Management system using ELK stack for real-time threat detection.',
      technologies: ['Elasticsearch', 'Logstash', 'Kibana', 'Python'],
      category: 'Security Operations',
      icon: <Database className="w-6 h-6" />,
      stats: { logsProcessed: '1M+/day', alertsReduced: '80%', responseTime: '< 5min' }
    },
    {
      title: 'Vulnerability Scanner Tool',
      description: 'Developed an automated vulnerability scanning tool that integrates multiple security scanners and provides unified reporting.',
      technologies: ['Python', 'Docker', 'PostgreSQL', 'REST API'],
      category: 'Security Tools',
      icon: <Bug className="w-6 h-6" />,
      stats: { scansPerformed: '500+', falsePosReduction: '60%', accuracy: '95%' }
    },
    {
      title: 'Incident Response Framework',
      description: 'Created a comprehensive incident response framework with playbooks, automation scripts, and forensic analysis procedures.',
      technologies: ['MITRE ATT&CK', 'YARA', 'Volatility', 'TheHive'],
      category: 'Incident Response',
      icon: <Lock className="w-6 h-6" />,
      stats: { responseTime: '< 1hr', incidents: '50+ handled', containment: '99.9%' }
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my cybersecurity projects, tools, and assessments that demonstrate 
            my expertise in protecting digital assets and infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="space-y-6">
                {/* Project header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <Badge variant="outline" className="mt-1 border-accent text-accent">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="px-3 py-1 bg-secondary/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
                  {Object.entries(project.stats).map(([key, value], statIndex) => (
                    <div key={statIndex} className="text-center">
                      <div className="text-lg font-semibold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="flex-1 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View all projects button */}
        <div className="text-center mt-12">
          <Button className="btn-cyber">
            <span>View All Projects</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;