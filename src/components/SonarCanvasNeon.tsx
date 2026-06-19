import React, { useRef, useEffect } from 'react';
import { Contact } from '../types';

interface Props {
  contacts?: Contact[];
  maxRange?: number; // meters represented by the outer radius
  size?: number; // diameter in CSS pixels
}

const SonarCanvas: React.FC<Props> = ({ contacts = [], maxRange = 1000, size = 620 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sonarRadius = size / 2;
  const sweepRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // unified neon/cyan palette
  const typeColor = (type: Contact['type']) => {
    switch (type) {
      case 'submarine': return 'rgba(0,255,218,0.98)'; // bright cyan
      case 'ship': return 'rgba(0,200,255,0.95)';
      case 'seaTurtle': return 'rgba(80,230,200,0.95)';
      case 'whale': return 'rgba(0,170,255,0.95)';
      case 'swimmer': return 'rgba(170,255,240,0.95)';
      case 'surfer': return 'rgba(160,230,200,0.95)';
      case 'kraken': return 'rgba(160,200,255,0.95)';
      default: return 'rgba(160,240,220,0.95)';
    }
  };

  // Draw simple silhouette shapes scaled by `s`
  const drawSilhouette = (ctx: CanvasRenderingContext2D, type: Contact['type'], x: number, y: number, s: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = typeColor(type);
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.lineWidth = Math.max(1, s * 0.06);

    if (type === 'ship') {
      // hull
      ctx.beginPath();
      ctx.moveTo(-s * 0.6, s * 0.25);
      ctx.lineTo(s * 0.6, s * 0.25);
      ctx.lineTo(s * 0.4, s * 0.45);
      ctx.lineTo(-s * 0.4, s * 0.45);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // superstructure
      ctx.fillRect(-s * 0.25, -s * 0.15, s * 0.5, s * 0.25);
      ctx.strokeRect(-s * 0.25, -s * 0.15, s * 0.5, s * 0.25);
    } else if (type === 'submarine') {
      // body
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.6, s * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // conning tower
      ctx.fillRect(-s * 0.05, -s * 0.35, s * 0.18, s * 0.18);
      ctx.strokeRect(-s * 0.05, -s * 0.35, s * 0.18, s * 0.18);
    } else if (type === 'seaTurtle') {
      // shell
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.45, s * 0.33, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // head
      ctx.beginPath();
      ctx.ellipse(-s * 0.55, 0, s * 0.12, s * 0.09, 0, 0, Math.PI * 2);
      ctx.fill();
      // flippers
      ctx.beginPath();
      ctx.ellipse(s * 0.2, -s * 0.35, s * 0.12, s * 0.06, 0, 0, Math.PI * 2);
      ctx.ellipse(s * 0.2, s * 0.35, s * 0.12, s * 0.06, 0, 0, Math.PI * 2);
      ctx.ellipse(-s * 0.35, -s * 0.25, s * 0.12, s * 0.06, 0, 0, Math.PI * 2);
      ctx.ellipse(-s * 0.35, s * 0.25, s * 0.12, s * 0.06, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'whale') {
      // body
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.55, s * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // tail
      ctx.beginPath();
      ctx.moveTo(-s * 0.55, 0);
      ctx.lineTo(-s * 0.8, -s * 0.12);
      ctx.lineTo(-s * 0.8, s * 0.12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (type === 'swimmer') {
      // head
      ctx.beginPath();
      ctx.arc(0, -s * 0.15, s * 0.08, 0, Math.PI * 2);
      ctx.fill();
      // body / stroke for arms
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.06);
      ctx.lineTo(0, s * 0.18);
      ctx.moveTo(0, 0);
      ctx.lineTo(s * 0.18, s * 0.02);
      ctx.moveTo(0, 0);
      ctx.lineTo(-s * 0.18, s * 0.02);
      ctx.stroke();
    } else if (type === 'surfer') {
      // board
      ctx.beginPath();
      ctx.ellipse(0, s * 0.12, s * 0.5, s * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // rider (stick)
      ctx.beginPath();
      ctx.arc(0, -s * 0.05, s * 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, s * 0.18);
      ctx.stroke();
    } else if (type === 'kraken') {
      // central head
      ctx.beginPath();
      ctx.ellipse(0, -s * 0.05, s * 0.22, s * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // tentacles
      ctx.strokeStyle = 'rgba(100,220,255,0.9)';
      for (let i = -3; i <= 3; i++) {
        const ix = i * s * 0.12;
        ctx.beginPath();
        ctx.moveTo(ix * 0.3, s * 0.15);
        ctx.quadraticCurveTo(ix * 0.4, s * 0.35, ix + (i % 2 === 0 ? s * 0.14 : -s * 0.14), s * 0.55);
        ctx.stroke();
      }
    } else {
      // fallback simple dot
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.12, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY, sonarRadius);

    // background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#000814';
    ctx.fillRect(0, 0, width, height);

    // outer neon glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(6,255,220,0.06)';
    ctx.lineWidth = 6;
    ctx.stroke();

    // sonar circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,16,18,0.85)';
    ctx.fill();

    // rings
    ctx.strokeStyle = 'rgba(20,240,210,0.08)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius / 4) * i, 0, Math.PI * 2);
      ctx.stroke();
    }

    // grid lines (subtle)
    ctx.strokeStyle = 'rgba(10,200,180,0.04)';
    ctx.beginPath();
    ctx.moveTo(centerX - radius, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.moveTo(centerX, centerY - radius);
    ctx.lineTo(centerX, centerY + radius);
    ctx.stroke();

    // sweep
    const sweep = sweepRef.current;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(sweep);
    const grad = ctx.createLinearGradient(0, 0, radius, 0);
    grad.addColorStop(0, 'rgba(0,255,220,0.14)');
    grad.addColorStop(1, 'rgba(0,255,220,0.02)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, -0.034, 0.034);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius, 0);
    ctx.strokeStyle = 'rgba(0,220,200,0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // contacts
    contacts.forEach((c, idx) => {
      const px = (c.position.x / maxRange) * radius;
      const py = -(c.position.y / maxRange) * radius;
      const sx = centerX + px;
      const sy = centerY + py;
      const distFromCenter = Math.hypot(sx - centerX, sy - centerY);
      if (distFromCenter > radius) return;

      // shadow
      ctx.beginPath();
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.ellipse(sx + 2, sy + 6, 10, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // silhouette size derived from distance
      const s = Math.max(14, Math.min(48, 48 * (1 - (c.distance / maxRange))));
      drawSilhouette(ctx, c.type, sx, sy, s);

      // neon label
      ctx.fillStyle = 'rgba(120,255,235,0.95)';
      ctx.font = '12px system-ui, Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`${c.type} • ${c.distance}m`, sx + Math.max(18, s * 0.6), sy - Math.max(12, s * 0.5));
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
      sweepRef.current += 0.0115;
      if (sweepRef.current > Math.PI * 2) sweepRef.current -= Math.PI * 2;
      draw(ctx, cssSize, cssSize);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [contacts, maxRange, size]);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-xl shadow-2xl bg-transparent"
      aria-label="Sonar display"
    />
  );
};

export default SonarCanvas;