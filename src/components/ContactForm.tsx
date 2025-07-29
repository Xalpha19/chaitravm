import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, RefreshCw, AlertCircle, Loader2, Shield, CheckCircle } from 'lucide-react';
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
  const [captchaError, setCaptchaError] = useState<string>('');
  const [captchaLoaded, setCaptchaLoaded] = useState<boolean>(false);
  const [captchaLoading, setCaptchaLoading] = useState<boolean>(true);
  const [captchaKey, setCaptchaKey] = useState<number>(0);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [networkError, setNetworkError] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Environment and configuration
  const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development';
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  const isTestKey = siteKey === "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

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

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    setNetworkError(false);
    if (value) {
      setCaptchaError('');
      setRetryCount(0);
    }
  };

  const handleCaptchaError = () => {
    const errorMessage = networkError 
      ? 'Network error loading CAPTCHA. Check your connection and try again.'
      : 'Failed to load CAPTCHA. Please refresh and try again.';
    
    setCaptchaError(errorMessage);
    setCaptchaValue(null);
    setCaptchaLoaded(false);
    setCaptchaLoading(false);
    setNetworkError(true);
    
    // Auto-retry with exponential backoff (max 3 retries)
    if (retryCount < 3) {
      const retryDelay = Math.pow(2, retryCount) * 2000; // 2s, 4s, 8s
      retryTimeoutRef.current = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        resetCaptcha();
      }, retryDelay);
    }
  };

  const handleCaptchaExpired = () => {
    setCaptchaError('CAPTCHA has expired. Please complete it again.');
    setCaptchaValue(null);
    toast({
      title: "CAPTCHA Expired",
      description: "Please complete the CAPTCHA verification again.",
      variant: "destructive"
    });
  };

  const handleCaptchaLoaded = () => {
    setCaptchaLoaded(true);
    setCaptchaLoading(false);
    setCaptchaError('');
    setNetworkError(false);
    setRetryCount(0);
  };

  const resetCaptcha = () => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    setCaptchaKey(prev => prev + 1);
    setCaptchaValue(null);
    setCaptchaError('');
    setCaptchaLoaded(false);
    setCaptchaLoading(true);
    setNetworkError(false);
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
      setCaptchaError('Please complete the CAPTCHA verification.');
      toast({
        title: "CAPTCHA Required",
        description: "Please complete the CAPTCHA verification.",
        variant: "destructive"
      });
      return;
    }

    // Clear any previous CAPTCHA errors
    setCaptchaError('');

    setIsSubmitting(true);

    try {
      // Validate CAPTCHA with backend (simulated)
      console.log('Verifying CAPTCHA token:', captchaValue);
      
      // Simulate backend CAPTCHA verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent Successfully",
        description: "Your secure message has been sent. I'll get back to you within 24 hours.",
      });

      // Reset form and CAPTCHA
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
      resetCaptcha();
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
      // Reset CAPTCHA on error for security
      resetCaptcha();
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
            {isTestKey && isDevelopment && (
              <span className="text-xs bg-yellow-500/20 text-yellow-600 px-2 py-0.5 rounded border border-yellow-500/30">
                TEST MODE
              </span>
            )}
          </div>
          
          <div className="flex flex-col items-center space-y-3">
            <div className="relative flex justify-center min-h-[78px] w-full">
              {captchaLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg border border-border">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Loading security verification...</span>
                  </div>
                </div>
              )}
              
              <ReCAPTCHA
                key={captchaKey}
                ref={captchaRef}
                sitekey={siteKey}
                onChange={handleCaptchaChange}
                onErrored={handleCaptchaError}
                onExpired={handleCaptchaExpired}
                onLoad={handleCaptchaLoaded}
                theme="dark"
                size="normal"
                className={captchaLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}
              />
            </div>
            
            {/* Success indicator */}
            {captchaValue && !captchaError && (
              <div className="flex items-center gap-2 text-green-600 text-sm animate-in fade-in duration-300">
                <CheckCircle className="w-4 h-4" />
                <span>Verification completed successfully</span>
              </div>
            )}
            
            {/* Error display */}
            {captchaError && (
              <div className="flex flex-col items-center gap-2 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-center">{captchaError}</span>
                </div>
                {retryCount > 0 && retryCount < 3 && (
                  <div className="text-xs text-muted-foreground">
                    Auto-retry {retryCount}/3 in progress...
                  </div>
                )}
              </div>
            )}
            
            {/* Retry button */}
            {(captchaError || (!captchaValue && captchaLoaded)) && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={resetCaptcha}
                className="text-xs gap-1"
                disabled={captchaLoading}
              >
                {captchaLoading ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <RefreshCw className="w-3 h-3" />
                )}
                {captchaLoading ? 'Loading...' : 'Refresh CAPTCHA'}
              </Button>
            )}
            
            {/* Development helper */}
            {isTestKey && isDevelopment && (
              <div className="text-xs text-muted-foreground text-center max-w-md">
                <p className="mb-1">🔧 Development Mode: Using Google's test key</p>
                <p>Replace VITE_RECAPTCHA_SITE_KEY in .env for production</p>
              </div>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full btn-primary group relative"
          disabled={isSubmitting || Object.keys(errors).length > 0 || !captchaValue || !!captchaError || captchaLoading}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending Secure Message...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              Send Secure Message
              {captchaValue && (
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
          {Object.keys(errors).length === 0 && !captchaValue && !captchaError && captchaLoaded && (
            <span>Complete the security verification to enable submission</span>
          )}
          {Object.keys(errors).length === 0 && captchaValue && (
            <span className="text-green-600">Form ready for secure submission</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default ContactForm;