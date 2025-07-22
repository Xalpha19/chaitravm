import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to secure your digital infrastructure? Let's discuss how I can help 
            protect your organization from cyber threats.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">security@example.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    <Phone className="w-5 h-5 text-accent group-hover:text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+44 7700 900123</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <MapPin className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">United Kingdom</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                Connect With Me
              </h3>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-xl font-semibold mb-6">Why Choose Me?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">5+ Years of Experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm">Industry Certified Professional</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">24/7 Emergency Response</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm">Proven Track Record</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    className="bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    className="bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john.doe@example.com"
                  className="bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="Security Consultation Request"
                  className="bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell me about your security requirements..."
                  className="min-h-32 bg-background/50 border-border/50 focus:border-primary transition-all duration-300 resize-none"
                />
              </div>

              <Button type="submit" className="w-full btn-cyber">
                <span>Send Message</span>
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;