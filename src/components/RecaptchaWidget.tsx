import ReCAPTCHA from 'react-google-recaptcha';
import { useState, useRef } from 'react';
import { Loader2, Shield, RefreshCw } from 'lucide-react';

interface RecaptchaWidgetProps {
  onVerify: (token: string) => void;
  onError: () => void;
  onExpire: () => void;
  onLoad: () => void;
  theme?: 'light' | 'dark';
  className?: string;
}

const RecaptchaWidget = ({ 
  onVerify, 
  onError, 
  onExpire, 
  onLoad, 
  theme = 'light',
  className = '' 
}: RecaptchaWidgetProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  const handleSuccess = (token: string) => {
    setIsLoading(false);
    setHasError(false);
    onVerify(token);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError();
  };

  const handleExpire = () => {
    setHasError(false);
    onExpire();
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad();
  };

  const resetWidget = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    setIsLoading(true);
    setHasError(false);
  };

  const handleChange = (token: string | null) => {
    if (token) {
      handleSuccess(token);
    } else {
      handleExpire();
    }
  };

  if (hasError) {
    return (
      <div className={`flex flex-col items-center space-y-3 p-4 border border-destructive/20 rounded-lg bg-destructive/5 ${className}`}>
        <div className="flex items-center space-x-2 text-destructive">
          <Shield className="h-4 w-4" />
          <span className="text-sm font-medium">Verification failed</span>
        </div>
        <button
          type="button"
          onClick={resetWidget}
          className="flex items-center space-x-2 px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Try again</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`relative min-h-[78px] ${className}`}>
      {isLoading && (
        <div className="flex items-center justify-center space-x-2 p-4 border border-border rounded-lg bg-muted/30 absolute inset-0">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Loading security check...</span>
        </div>
      )}
      
      <div className={isLoading ? 'absolute opacity-0 pointer-events-none' : 'block'}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={handleChange}
          onErrored={handleError}
          onExpired={handleExpire}
          onLoad={handleLoad}
          theme={theme}
          size="normal"
        />
      </div>
    </div>
  );
};

export default RecaptchaWidget;