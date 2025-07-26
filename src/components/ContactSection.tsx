
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Calendar, MapPin, Linkedin, ExternalLink, MessageCircle, Send } from 'lucide-react';

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email',
      value: 'chaitra.malladad@example.com',
      description: 'Best for detailed inquiries'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: 'Schedule a Call',
      value: 'calendly.com/chaitramalladad-proton/30min',
      description: 'Book a 30-minute consultation',
      link: 'https://calendly.com/chaitramalladad-proton/30min'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Location',
      value: 'Scotland, UK',
      description: 'Available for on-site consultations'
    }
  ];

  const services = [
    'Vulnerability Assessment',
    'Penetration Testing',
    'Security Auditing',
    'Incident Response',
    'Compliance Review',
    'Security Training'
  ];

  return (
    <section id="contact" className="section-padding bg-secondary/20">
      <div className="container-modern">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Let's Work Together
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Ready to strengthen your cybersecurity posture? Let's discuss how I can help 
            protect your organization from evolving threats.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6 animate-fade-in-up">
            <Card className="card-modern p-6">
              <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
              
              <div className="space-y-4">
                 {contactMethods.map((method, index) => (
                   <div 
                     key={index} 
                     className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                     onClick={() => method.link && window.open(method.link, '_blank')}
                   >
                     <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                       {method.icon}
                     </div>
                     <div className="flex-1 min-w-0">
                       <h4 className="font-medium text-sm">
                         {method.link ? (
                           <a href={method.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                             {method.title}
                           </a>
                         ) : (
                           method.title
                         )}
                       </h4>
                       <p className="text-sm text-foreground font-mono">{method.value}</p>
                       <p className="text-xs text-muted-foreground">{method.description}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </Card>

            <Card className="card-modern p-6">
              <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
              <div className="space-y-3">
                <a 
                  href="https://www.linkedin.com/in/chaitra-malladad/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors group"
                >
                  <Linkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm font-medium">LinkedIn</p>
                    <p className="text-xs text-muted-foreground">Professional Network</p>
                  </div>
                </a>
                
                <a 
                  href="https://chaitravm.wordpress.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors group"
                >
                  <ExternalLink className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm font-medium">WordPress Blog</p>
                    <p className="text-xs text-muted-foreground">Technical Articles</p>
                  </div>
                </a>
                
                <a 
                  href="https://discordapp.com/users/1116664469846761472" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors group"
                >
                  <MessageCircle className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm font-medium">Discord</p>
                    <p className="text-xs text-muted-foreground">Quick Chat</p>
                  </div>
                </a>
              </div>
            </Card>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="card-modern p-8">
              <h3 className="text-2xl font-semibold mb-6">Send a Secure Message</h3>
              <p className="text-sm text-muted-foreground mb-6">
                All messages are encrypted and handled securely. Please provide detailed information about your security requirements.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      required
                      className="bg-background border-border focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      required
                      className="bg-background border-border focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john.doe@company.com"
                    required
                    className="bg-background border-border focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">Company (Optional)</Label>
                  <Input 
                    id="company" 
                    placeholder="Your Company"
                    className="bg-background border-border focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="Security Consultation Request"
                    required
                    className="bg-background border-border focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell me about your security requirements, current challenges, or any specific services you're interested in..."
                    required
                    minLength={20}
                    className="min-h-32 bg-background border-border focus:border-primary transition-colors resize-none"
                  />
                </div>

                <Button type="submit" className="w-full btn-primary group">
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
