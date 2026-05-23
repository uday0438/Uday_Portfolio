import React, { useEffect, useRef } from 'react';

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    
    // Scroll tracking for parallax
    let scrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Re-initialize gradient orbs positions inside new bounds
      orbs.forEach((orb) => {
        orb.x = Math.random() * width;
        orb.y = Math.random() * height;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Nebula Gradient Orbs definition
    interface Orb {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      speed: number;
    }

    const orbs: Orb[] = [
      {
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: 0,
        targetY: 0,
        radius: Math.min(width, height) * 0.55,
        color: 'rgba(59, 130, 246, 0.08)', // Electric Blue
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        speed: 0.002,
      },
      {
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: 0,
        targetY: 0,
        radius: Math.min(width, height) * 0.65,
        color: 'rgba(139, 92, 246, 0.09)', // Purple Glow
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        speed: 0.0015,
      },
      {
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: 0,
        targetY: 0,
        radius: Math.min(width, height) * 0.45,
        color: 'rgba(6, 182, 212, 0.06)', // Cyan Highlights
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        speed: 0.003,
      },
      {
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: 0,
        targetY: 0,
        radius: Math.min(width, height) * 0.35,
        color: 'rgba(236, 72, 153, 0.04)', // Very soft pink accents
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        speed: 0.001,
      },
    ];

    // Star Class for particles
    class Star {
      x: number;
      y: number;
      size: number;
      baseAlpha: number;
      alpha: number;
      twinkleSpeed: number;
      parallaxFactor: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.35 + 0.3; // Tiny realistic stars
        this.baseAlpha = Math.random() * 0.6 + 0.2;
        this.alpha = this.baseAlpha;
        this.twinkleSpeed = Math.random() * 0.015 + 0.003;
        this.parallaxFactor = this.size * 0.08; // Deep-based parallax scrolling
        
        // Slight coloration (soft blue, soft yellow, white)
        const rand = Math.random();
        if (rand < 0.15) {
          this.color = `rgba(147, 197, 253, `; // Soft blue-white
        } else if (rand < 0.25) {
          this.color = `rgba(253, 230, 138, `; // Soft yellow-white
        } else {
          this.color = `rgba(255, 255, 255, `; // Pure white
        }
      }

      update(time: number) {
        // Twinkling animation
        this.alpha = this.baseAlpha + Math.sin(time * this.twinkleSpeed) * 0.18;
        if (this.alpha < 0.05) this.alpha = 0.05;
        if (this.alpha > 0.85) this.alpha = 0.85;
      }

      draw(c: CanvasRenderingContext2D, py: number) {
        // Apply scroll parallax
        let actualY = this.y - py * this.parallaxFactor;
        
        // Wrap coordinates to loop infinitely
        actualY = ((actualY % height) + height) % height;
        
        c.fillStyle = this.color + this.alpha + ')';
        c.beginPath();
        c.arc(this.x, actualY, this.size, 0, Math.PI * 2);
        c.fill();
      }
    }

    // Floating Dust Particle Class
    class Dust {
      x: number;
      y: number;
      size: number;
      alpha: number;
      vx: number;
      vy: number;
      parallaxFactor: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 0.8; // Floating cosmic dust
        this.alpha = Math.random() * 0.15 + 0.05;
        this.vx = (Math.random() - 0.5) * 0.08;
        this.vy = (Math.random() - 0.5) * 0.08 - 0.05; // Upward drift
        this.parallaxFactor = this.size * 0.15;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around bounds
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(c: CanvasRenderingContext2D, py: number) {
        let actualY = this.y - py * this.parallaxFactor;
        actualY = ((actualY % height) + height) % height;

        // Draw soft glow dust
        const glow = c.createRadialGradient(this.x, actualY, 0, this.x, actualY, this.size * 2);
        glow.addColorStop(0, `rgba(96, 165, 250, ${this.alpha})`);
        glow.addColorStop(0.5, `rgba(139, 92, 246, ${this.alpha * 0.3})`);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        c.fillStyle = glow;
        c.beginPath();
        c.arc(this.x, actualY, this.size * 2, 0, Math.PI * 2);
        c.fill();
      }
    }

    const stars: Star[] = Array.from({ length: 180 }, () => new Star());
    const dusts: Dust[] = Array.from({ length: 40 }, () => new Dust());

    let time = 0;

    const render = () => {
      time++;
      
      // Black Base Background (#050505)
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse spring interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // 1. Draw Nebula Gaseous Layers (Infinite drifting orbs)
      orbs.forEach((orb) => {
        // Slow random movements
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Soft bounce on boundaries
        if (orb.x < -orb.radius || orb.x > width + orb.radius) orb.vx *= -1;
        if (orb.y < -orb.radius || orb.y > height + orb.radius) orb.vy *= -1;

        // Apply dynamic shift relative to mouse for 3D parallax feel
        const mouseShiftX = (mouse.x - width / 2) * 0.08;
        const mouseShiftY = (mouse.y - height / 2) * 0.08;
        
        // Scroll parallax shift for the nebulae
        const scrollShiftY = -scrollY * 0.05;

        const cx = orb.x + mouseShiftX;
        const cy = orb.y + mouseShiftY + scrollShiftY;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.radius);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(0.5, orb.color.replace('0.', '0.04'));
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Interactive Mouse Spotlight Glow
      const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
      cursorGlow.addColorStop(0, 'rgba(96, 165, 250, 0.04)'); // Soft ambient cyan cursor light
      cursorGlow.addColorStop(0.5, 'rgba(139, 92, 246, 0.02)');
      cursorGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = cursorGlow;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 300, 0, Math.PI * 2);
      ctx.fill();

      // 3. Draw Tiny Stars
      stars.forEach((star) => {
        star.update(time);
        star.draw(ctx, scrollY);
      });

      // 4. Draw Cosmic Dust Particles
      dusts.forEach((dust) => {
        dust.update();
        dust.draw(ctx, scrollY);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#050505]"
      style={{ mixBlendMode: 'screen' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};

export default SpaceBackground;
