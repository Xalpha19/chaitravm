import { Turnstile } from '@marsidev/react-turnstile';
import { useEffect, useState } from 'react';
import { Loader2, Shield, RefreshCw } from 'lucide-react';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError: () => void;
  onExpire: () => void;
  onLoad: () => void;
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
}

const TurnstileWidget = ({ 
  onVerify, 
  onError, 
  onExpire, 
  onLoad, 
  theme = 'auto',
  className = '' 
}: TurnstileWidgetProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [key, setKey] = useState(0);

  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

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
    setKey(prev => prev + 1);
    setIsLoading(true);
    setHasError(false);
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
    <div className={`relative min-h-[65px] ${className}`}>
      {isLoading && (
        <div className="flex items-center justify-center space-x-2 p-4 border border-border rounded-lg bg-muted/30 absolute inset-0">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Loading security check...</span>
        </div>
      )}
      
      <div className={isLoading ? 'absolute opacity-0 pointer-events-none' : 'block'}>
        <Turnstile
          key={key}
          siteKey={siteKey}
          onSuccess={handleSuccess}
          onError={handleError}
          onExpire={handleExpire}
          onLoad={handleLoad}
          options={{
            theme,
            size: 'normal',
            action: 'contact-form',
            cData: 'contact-submission'
          }}
        />
      </div>
    </div>
  );
};

export default TurnstileWidget;