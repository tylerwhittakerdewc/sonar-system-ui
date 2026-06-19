import React, { useRef, useEffect } from 'react';
import { Contact } from '../types';

interface Props {
  contacts?: Contact[];
  maxRange?: number; // meters represented by the outer radius
  size?: number; // diameter in CSS pixels
}

const SonarCanvas: React.FC<Props> = ({ contacts = [], maxRange = 1000, size = 520 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sonarRadius = size / 2; // logical radius (CSS pixels)
  const sweepRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const typeColor = (type: Contact['type']) => {
    switch (type) {
      case 'submarine': return 'rgba(255,50,50,0.95)';
      case 'ship': return 'rgba(255,165,0,0.95)';
      case 'seaTurtle': return 'rgba(0,200,120,0.95)';
      case 'whale': return 'rgba(0,120,255,0.95)';
      case 'swimmer': return 'rgba(255,255,255,0.95)';
      case 'surfer': return 'rgba(255,200,60,0.95)';
      case 'kraken': return 'rgba(200,100,255,0.95)';
      default: return 'rgba(200,200,200,0.95)';
    }
  };

  const typeIcon = (type: Contact['type']) => {
    switch (type) {
      case 'ship': return '🚢';
      case 'submarine': return '🛥️';
      case 'seaTurtle': return '🐢';
      case 'whale': return '🐋';
      case 'swimmer': return '🏊';
      case 'surfer': return '🏄';
      case 'kraken': return '🐙';
      default: return '•';
    }
  };

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY, sonarRadius);

    // background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#001219';
    ctx.fillRect(0, 0, width, height);

    // sonar circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,50,0,0.6)';
    ctx.fill();

    // range rings
    ctx.strokeStyle = 'rgba(100,200,100,0.08)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius / 4) * i, 0, Math.PI * 2);
      ctx.stroke();
    }

    // sweep arm (semi-transparent wedge)
    const sweep = sweepRef.current;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(sweep);
    const grad = ctx.createLinearGradient(0, 0, radius, 0);
    grad.addColorStop(0, 'rgba(150,255,120,0.18)');
    grad.addColorStop(1, 'rgba(150,255,120,0.02)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, -0.04, 0.04);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius, 0);
    ctx.strokeStyle = 'rgba(150,255,120,0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // draw contacts (icons + labels)
    contacts.forEach((c, idx) => {
      const px = (c.position.x / maxRange) * radius;
      const py = -(c.position.y / maxRange) * radius; // invert y so positive y is up
      const sx = centerX + px;
      const sy = centerY + py;

      const distFromCenter = Math.hypot(sx - centerX, sy - centerY);
      if (distFromCenter > radius) return;

      const color = typeColor(c.type);
      const icon = typeIcon(c.type);

      // draw pulse for kraken (pulsing larger ring)
      if (c.type === 'kraken') {
        const pulse = 6 + Math.abs(Math.sin(Date.now() / 400 + idx)) * 8;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(200,100,255,0.08)`;
        ctx.lineWidth = 2;
        ctx.arc(sx, sy, pulse, 0, Math.PI * 2);
        ctx.stroke();
      }

      // draw small dot underneath for visibility
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(sx, sy + 6, 6, 0, Math.PI * 2);
      ctx.fill();

      // draw emoji icon centered
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '20px system-ui, Arial';
      ctx.fillText(icon, sx, sy - 2);

      // label
      ctx.fillStyle = 'rgba(200,200,200,0.95)';
      ctx.font = '12px system-ui, Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`${c.type} • ${c.distance}m`, sx + 12, sy - 10);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const cssSize = size;
    canvas.style.width = `${cssSize}px`;
    canvas.style.height = `${cssSize}px`;
    canvas.width = Math.round(cssSize * dpr);
    canvas.height = Math.round(cssSize * dpr);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const render = () => {
      sweepRef.current += 0.015;
      if (sweepRef.current > Math.PI * 2) sweepRef.current -= Math.PI * 2;
      draw(ctx, cssSize, cssSize);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts, maxRange, size]);
  
  return (
    <canvas
      ref={canvasRef}
      className="rounded-lg shadow-lg bg-transparent"
      aria-label="Sonar display"
    />
  );
};

export default SonarCanvas;