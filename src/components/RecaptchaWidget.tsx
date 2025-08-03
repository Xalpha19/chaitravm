import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RefreshCw, Shield } from 'lucide-react';

interface SimpleCaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  onLoad?: () => void;
  theme?: string;
  className?: string;
}

const SimpleCaptcha: React.FC<SimpleCaptchaProps> = ({ 
  onVerify, 
  onExpire, 
  onError, 
  onLoad,
  className = '' 
}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');

  const generateQuestion = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, result;
    
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        result = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * 10) + 1;
        result = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        result = num1 * num2;
        break;
      default:
        num1 = 5;
        num2 = 3;
        result = 8;
    }
    
    setQuestion(`${num1} ${operation} ${num2} = ?`);
    setAnswer(result.toString());
    setUserInput('');
    setError('');
  };

  useEffect(() => {
    generateQuestion();
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  const handleSubmit = () => {
    if (userInput.trim() === answer) {
      setIsVerified(true);
      setError('');
      // Generate a simple verification token
      const token = btoa(`verified-${Date.now()}-${Math.random()}`);
      onVerify(token);
    } else {
      setAttempts(prev => prev + 1);
      setError('Incorrect answer. Please try again.');
      
      if (attempts >= 2) {
        generateQuestion();
        setAttempts(0);
      }
      
      if (onError) {
        onError();
      }
    }
  };

  const handleRefresh = () => {
    generateQuestion();
    setAttempts(0);
    setIsVerified(false);
  };

  return (
    <div className={`space-y-4 p-4 border border-border rounded-lg bg-muted/30 ${className}`}>
      <div className="flex items-center gap-2 text-sm font-medium">
        <Shield className="h-4 w-4 text-primary" />
        Security Verification
      </div>
      
      {isVerified ? (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <Shield className="h-4 w-4" />
          Verification completed successfully
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="captcha-input" className="text-sm">
              Solve: <span className="font-mono font-bold">{question}</span>
            </Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              className="h-6 w-6 p-0"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Input
              id="captcha-input"
              type="number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter answer"
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
            <Button
              type="button"
              onClick={handleSubmit}
              size="sm"
              disabled={!userInput.trim()}
            >
              Verify
            </Button>
          </div>
          
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          
          {attempts > 0 && (
            <p className="text-xs text-muted-foreground">
              Attempts: {attempts}/3
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleCaptcha;