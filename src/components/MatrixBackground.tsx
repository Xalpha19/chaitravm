import { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters with more cyberpunk symbols
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()_+-=[]{}|;:,.<>?~`ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
    const matrixArray = matrix.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops: number[] = [];
    const colors = [
      '#8B5CF6', // Purple
      '#A855F7', // Purple variant
      '#C084FC', // Light purple
      '#DDD6FE', // Very light purple
      '#00ff00', // Classic matrix green
    ];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Darker background with purple tint
      ctx.fillStyle = 'rgba(16, 15, 23, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        // Random color from purple palette
        const colorIndex = Math.floor(Math.random() * colors.length);
        ctx.fillStyle = colors[colorIndex];
        ctx.font = fontSize + 'px "Courier New", monospace';
        
        // Add glow effect
        ctx.shadowColor = colors[colorIndex];
        ctx.shadowBlur = 8;
        
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset shadow
        ctx.shadowBlur = 0;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-20 pointer-events-none z-0"
    />
  );
};

export default MatrixBackground;