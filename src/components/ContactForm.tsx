import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          newErrors[name] = 'This field is required';
        } else if (value.length < 2) {
          newErrors[name] = 'Must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors[name] = 'Only letters and spaces allowed';
        } else {
          delete newErrors[name];
        }
        break;
      case 'email':
        if (!value.trim()) {
          newErrors[name] = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[name] = 'Please enter a valid email address';
        } else {
          delete newErrors[name];
        }
        break;
      case 'subject':
        if (!value.trim()) {
          newErrors[name] = 'Subject is required';
        } else if (value.length < 5) {
          newErrors[name] = 'Subject must be at least 5 characters';
        } else {
          delete newErrors[name];
        }
        break;
      case 'message':
        if (!value.trim()) {
          newErrors[name] = 'Message is required';
        } else if (value.length < 20) {
          newErrors[name] = 'Message must be at least 20 characters';
        } else if (value.length > 1000) {
          newErrors[name] = 'Message must be less than 1000 characters';
        } else {
          delete newErrors[name];
        }
        break;
      case 'company':
        if (value && value.length < 2) {
          newErrors[name] = 'Company name must be at least 2 characters if provided';
        } else {
          delete newErrors[name];
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    Object.entries(formData).forEach(([name, value]) => {
      validateField(name, value);
    });

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Check CAPTCHA
    if (!captchaValue) {
      toast({
        title: "CAPTCHA Required",
        description: "Please complete the CAPTCHA verification.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent Successfully",
        description: "Your secure message has been sent. I'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
      setCaptchaValue(null);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input 
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="John" 
            required
            className={`bg-background border-border focus:border-primary transition-colors ${
              errors.firstName ? 'border-destructive focus:border-destructive' : ''
            }`}
          />
          {errors.firstName && (
            <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input 
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Doe" 
            required
            className={`bg-background border-border focus:border-primary transition-colors ${
              errors.lastName ? 'border-destructive focus:border-destructive' : ''
            }`}
          />
          {errors.lastName && (
            <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address <span className="text-destructive">*</span>
        </Label>
        <Input 
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john.doe@company.com"
          required
          className={`bg-background border-border focus:border-primary transition-colors ${
            errors.email ? 'border-destructive focus:border-destructive' : ''
          }`}
        />
        {errors.email && (
          <p className="text-xs text-destructive mt-1">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="company" className="text-sm font-medium">Company (Optional)</Label>
        <Input 
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Your Company"
          className={`bg-background border-border focus:border-primary transition-colors ${
            errors.company ? 'border-destructive focus:border-destructive' : ''
          }`}
        />
        {errors.company && (
          <p className="text-xs text-destructive mt-1">{errors.company}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-sm font-medium">
          Subject <span className="text-destructive">*</span>
        </Label>
        <Input 
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Security Consultation Request"
          required
          className={`bg-background border-border focus:border-primary transition-colors ${
            errors.subject ? 'border-destructive focus:border-destructive' : ''
          }`}
        />
        {errors.subject && (
          <p className="text-xs text-destructive mt-1">{errors.subject}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea 
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Tell me about your security requirements, current challenges, or any specific services you're interested in..."
          required
          minLength={20}
          maxLength={1000}
          className={`min-h-32 bg-background border-border focus:border-primary transition-colors resize-none ${
            errors.message ? 'border-destructive focus:border-destructive' : ''
          }`}
        />
        <div className="flex justify-between items-start">
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message}</p>
          )}
          <p className="text-xs text-muted-foreground ml-auto">
            {formData.message.length}/1000 characters
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test key - replace with actual site key
            onChange={setCaptchaValue}
            theme="dark"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full btn-primary group"
          disabled={isSubmitting || Object.keys(errors).length > 0 || !captchaValue}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              Send Secure Message
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;