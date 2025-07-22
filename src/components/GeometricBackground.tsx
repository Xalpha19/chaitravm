import { useEffect, useRef } from 'react';

const GeometricBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Geometric shapes data
    const shapes: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      type: 'cube' | 'pyramid' | 'ring';
      color: string;
    }> = [];

    // Initialize shapes
    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 100,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        type: ['cube', 'pyramid', 'ring'][Math.floor(Math.random() * 3)] as 'cube' | 'pyramid' | 'ring',
        color: `hsl(${271 + Math.random() * 40}, 81%, ${40 + Math.random() * 30}%)`
      });
    }

    const drawCube = (x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      
      // Create 3D effect with gradients
      const gradient = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color.replace(/[\d.]+%\)/, '20%)'));
      
      ctx.fillStyle = gradient;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      
      // Draw cube faces
      ctx.fillRect(-size/2, -size/2, size, size);
      ctx.strokeRect(-size/2, -size/2, size, size);
      
      // Add 3D depth
      ctx.beginPath();
      ctx.moveTo(size/2, -size/2);
      ctx.lineTo(size/2 + size/4, -size/2 - size/4);
      ctx.lineTo(-size/2 + size/4, -size/2 - size/4);
      ctx.lineTo(-size/2, -size/2);
      ctx.fillStyle = color.replace(/[\d.]+%\)/, '60%)');
      ctx.fill();
      ctx.stroke();
      
      ctx.restore();
    };

    const drawPyramid = (x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      
      ctx.strokeStyle = color;
      ctx.fillStyle = color.replace(/[\d.]+%\)/, '30%)');
      ctx.lineWidth = 2;
      
      // Draw pyramid
      ctx.beginPath();
      ctx.moveTo(0, -size/2);
      ctx.lineTo(-size/2, size/2);
      ctx.lineTo(size/2, size/2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      ctx.restore();
    };

    const drawRing = (x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      
      // Outer ring
      ctx.beginPath();
      ctx.arc(0, 0, size/2, 0, Math.PI * 2);
      ctx.stroke();
      
      // Inner ring
      ctx.beginPath();
      ctx.arc(0, 0, size/4, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle background glow
      const centerGlow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      centerGlow.addColorStop(0, 'hsla(271, 81%, 56%, 0.05)');
      centerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      shapes.forEach(shape => {
        // Update rotation
        shape.rotation += shape.rotationSpeed;
        
        // Floating movement
        shape.y += Math.sin(Date.now() * 0.001 + shape.x * 0.01) * 0.5;
        shape.x += Math.cos(Date.now() * 0.0008 + shape.y * 0.01) * 0.3;
        
        // Wrap around screen
        if (shape.x > canvas.width + 50) shape.x = -50;
        if (shape.x < -50) shape.x = canvas.width + 50;
        if (shape.y > canvas.height + 50) shape.y = -50;
        if (shape.y < -50) shape.y = canvas.height + 50;
        
        // Calculate opacity based on distance from center
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distance = Math.sqrt((shape.x - centerX) ** 2 + (shape.y - centerY) ** 2);
        const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
        const opacity = 1 - (distance / maxDistance) * 0.7;
        
        ctx.globalAlpha = opacity * 0.6;
        
        // Draw shape based on type
        switch (shape.type) {
          case 'cube':
            drawCube(shape.x, shape.y, shape.size, shape.rotation, shape.color);
            break;
          case 'pyramid':
            drawPyramid(shape.x, shape.y, shape.size, shape.rotation, shape.color);
            break;
          case 'ring':
            drawRing(shape.x, shape.y, shape.size, shape.rotation, shape.color);
            break;
        }
        
        ctx.globalAlpha = 1;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-30 pointer-events-none z-0"
    />
  );
};

export default GeometricBackground;