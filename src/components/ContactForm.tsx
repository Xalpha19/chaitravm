import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, Shield, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TurnstileWidget from './TurnstileWidget';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string>('');
  const [turnstileLoaded, setTurnstileLoaded] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Environment configuration
  const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development';

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

  const handleTurnstileVerify = (token: string) => {
    console.log('Turnstile verification successful:', token.substring(0, 20) + '...');
    setTurnstileToken(token);
    setTurnstileError('');
    toast({
      title: "Security Verification Complete",
      description: "You can now submit the form.",
    });
  };

  const handleTurnstileError = () => {
    console.log('Turnstile verification failed');
    setTurnstileToken(null);
    setTurnstileError('Security verification failed. Please try again.');
    toast({
      title: "Verification Failed",
      description: "Please try the security verification again.",
      variant: "destructive"
    });
  };

  const handleTurnstileExpire = () => {
    setTurnstileToken(null);
    setTurnstileError('Security verification expired. Please verify again.');
  };

  const handleTurnstileLoad = () => {
    console.log('Turnstile widget loaded successfully');
    setTurnstileLoaded(true);
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

    // Check Turnstile
    if (!turnstileToken) {
      setTurnstileError('Please complete the security verification.');
      toast({
        title: "Security Verification Required",
        description: "Please complete the security verification.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send form data to Supabase edge function
      console.log("Submitting form data...");
      
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
          turnstileToken: turnstileToken,
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to send message');
      }

      console.log('Form submission successful:', data);
      
      toast({
        title: "Message Sent Successfully! ✅",
        description: "Your secure message has been sent and stored. I'll get back to you within 24 hours.",
      });

      // Reset form and Turnstile
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
      setTurnstileToken(null);
      
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Error Sending Message",
        description: error.message || "Failed to send message. Please try again later.",
        variant: "destructive"
      });
      // Reset Turnstile on error for security
      setTurnstileToken(null);
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
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <Label className="text-sm font-medium">
              Security Verification <span className="text-destructive">*</span>
            </Label>
            {turnstileToken && (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
          </div>
          
          <div className="flex flex-col space-y-3">
            <TurnstileWidget
              onVerify={handleTurnstileVerify}
              onError={handleTurnstileError}
              onExpire={handleTurnstileExpire}
              onLoad={handleTurnstileLoad}
              theme="auto"
            />
            
            {turnstileError && (
              <div className="flex items-start space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <Shield className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-destructive font-medium">Verification Error</p>
                  <p className="text-muted-foreground text-xs">{turnstileError}</p>
                </div>
              </div>
            )}
            
            {/* Success indicator */}
            {turnstileToken && !turnstileError && (
              <div className="flex items-center gap-2 text-green-600 text-sm animate-in fade-in duration-300">
                <CheckCircle className="w-4 h-4" />
                <span>Verification completed successfully</span>
              </div>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full btn-primary group relative"
          disabled={isSubmitting || Object.keys(errors).length > 0 || !turnstileToken || !!turnstileError}
        >
          {isSubmitting ? (
            <>
              <Shield className="w-4 h-4 animate-spin" />
              Sending Secure Message...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              Send Secure Message
              {turnstileToken && (
                <CheckCircle className="w-4 h-4 ml-2 text-green-400" />
              )}
            </>
          )}
        </Button>
        
        {/* Form status indicator */}
        <div className="text-xs text-center text-muted-foreground">
          {Object.keys(errors).length > 0 && (
            <span className="text-destructive">Please fix form errors above</span>
          )}
          {Object.keys(errors).length === 0 && !turnstileToken && !turnstileError && turnstileLoaded && (
            <span>Complete the security verification to enable submission</span>
          )}
          {Object.keys(errors).length === 0 && turnstileToken && (
            <span className="text-green-600">Form ready for secure submission</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default ContactForm;