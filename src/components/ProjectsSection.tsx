
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Shield, Bug, Lock, Database, ArrowRight } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Enterprise Security Assessment',
      description: 'Comprehensive security audit for a Fortune 500 company including network penetration testing, social engineering assessment, and compliance review.',
      technologies: ['Nmap', 'Metasploit', 'Burp Suite', 'OWASP ZAP'],
      category: 'Penetration Testing',
      icon: <Shield className="w-6 h-6" />,
      image: '/placeholder.svg',
      results: ['23 vulnerabilities identified', '5 critical findings', 'Completed in 2 weeks'],
      status: 'Completed'
    },
    {
      title: 'Custom SIEM Implementation',
      description: 'Designed and implemented a custom Security Information and Event Management system using ELK stack for real-time threat detection.',
      technologies: ['Elasticsearch', 'Logstash', 'Kibana', 'Python'],
      category: 'Security Operations',
      icon: <Database className="w-6 h-6" />,
      image: '/placeholder.svg',
      results: ['1M+ logs/day processed', '80% alert reduction', '<5min response time'],
      status: 'In Progress'
    },
    {
      title: 'Vulnerability Scanner Tool',
      description: 'Developed an automated vulnerability scanning tool that integrates multiple security scanners and provides unified reporting.',
      technologies: ['Python', 'Docker', 'PostgreSQL', 'REST API'],
      category: 'Security Tools',
      icon: <Bug className="w-6 h-6" />,
      image: '/placeholder.svg',
      results: ['500+ scans performed', '60% false positive reduction', '95% accuracy'],
      status: 'Completed'
    },
    {
      title: 'Incident Response Framework',
      description: 'Created a comprehensive incident response framework with playbooks, automation scripts, and forensic analysis procedures.',
      technologies: ['MITRE ATT&CK', 'YARA', 'Volatility', 'TheHive'],
      category: 'Incident Response',
      icon: <Lock className="w-6 h-6" />,
      image: '/placeholder.svg',
      results: ['<1hr response time', '50+ incidents handled', '99.9% containment'],
      status: 'Completed'
    }
  ];

  const categories = ['All', 'Penetration Testing', 'Security Operations', 'Security Tools', 'Incident Response'];

  return (
    <section id="projects" className="section-padding">
      <div className="container-modern">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            A showcase of my cybersecurity projects and assessments that demonstrate 
            expertise in protecting digital assets and infrastructure.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="card-modern card-hover group overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="aspect-video bg-secondary/50 border-b border-border/50 flex items-center justify-center">
                <div className="p-4 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {project.icon}
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Project Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className="border-primary text-primary"
                    >
                      {project.category}
                    </Badge>
                    <Badge 
                      variant={project.status === 'Completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Technologies:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="text-xs px-2 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Results */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Results:</h4>
                  <div className="space-y-1">
                    {project.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button size="sm" className="flex-1 btn-primary">
                    <ExternalLink className="w-3 h-3" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="btn-secondary">
                    <Github className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center animate-fade-in">
          <Button className="btn-primary group">
            View All Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
