import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { Contact } from '../types';

interface Props {
  contacts?: Contact[];
  maxRange?: number; // meters represented by the outer radius
  size?: number; // max diameter in CSS pixels
  iconSize?: number; // fixed silhouette size in px
}

const SonarCanvas: React.FC<Props> = ({ contacts = [], maxRange = 1000, size = 620, iconSize = 28 }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sonarRadiusRef = useRef<number>(0);
  const sweepRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const [renderSize, setRenderSize] = useState<number>(Math.min(size, 400));

  // unified neon/cyan palette
  const typeColor = (type: Contact['type']) => {
    switch (type) {
      case 'submarine': return 'rgba(0,255,218,0.98)';
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
      ctx.beginPath();
      ctx.moveTo(-s * 0.6, s * 0.25);
      ctx.lineTo(s * 0.6, s * 0.25);
      ctx.lineTo(s * 0.4, s * 0.45);
      ctx.lineTo(-s * 0.4, s * 0.45);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillRect(-s * 0.25, -s * 0.15, s * 0.5, s * 0.25);
      ctx.strokeRect(-s * 0.25, -s * 0.15, s * 0.5, s * 0.25);
    } else if (type === 'submarine') {
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.6, s * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillRect(-s * 0.05, -s * 0.35, s * 0.18, s * 0.18);
      ctx.strokeRect(-s * 0.05, -s * 0.35, s * 0.18, s * 0.18);
    } else if (type === 'seaTurtle') {
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.45, s * 0.33, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(-s * 0.55, 0, s * 0.12, s * 0.09, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(s * 0.2, -s * 0.35, s * 0.12, s * 0.06, 0, 0, Math.PI * 2);
      ctx.ellipse(s * 0.2, s * 0.35, s * 0.12, s * 0.06, 0, 0, Math.PI * 2);
      ctx.ellipse(-s * 0.35, -s * 0.25, s * 0.12, s * 0.06, 0, 0, Math.PI * 2);
      ctx.ellipse(-s * 0.35, s * 0.25, s * 0.12, s * 0.06, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'whale') {
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.55, s * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 0.55, 0);
      ctx.lineTo(-s * 0.8, -s * 0.12);
      ctx.lineTo(-s * 0.8, s * 0.12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (type === 'swimmer') {
      ctx.beginPath();
      ctx.arc(0, -s * 0.15, s * 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.06);
      ctx.lineTo(0, s * 0.18);
      ctx.moveTo(0, 0);
      ctx.lineTo(s * 0.18, s * 0.02);
      ctx.moveTo(0, 0);
      ctx.lineTo(-s * 0.18, s * 0.02);
      ctx.stroke();
    } else if (type === 'surfer') {
      ctx.beginPath();
      ctx.ellipse(0, s * 0.12, s * 0.5, s * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -s * 0.05, s * 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, s * 0.18);
      ctx.stroke();
    } else if (type === 'kraken') {
      ctx.beginPath();
      ctx.ellipse(0, -s * 0.05, s * 0.22, s * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = 'rgba(100,220,255,0.9)';
      for (let i = -3; i <= 3; i++) {
        const ix = i * s * 0.12;
        ctx.beginPath();
        ctx.moveTo(ix * 0.3, s * 0.15);
        ctx.quadraticCurveTo(ix * 0.4, s * 0.35, ix + (i % 2 === 0 ? s * 0.14 : -s * 0.14), s * 0.55);
        ctx.stroke();
      }
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.12, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  // helper to draw rounded rect that tightly surrounds the circle
  const strokeRoundedFrame = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, padding = 6) => {
    const w = (r + padding) * 2;
    const h = w;
    const x = cx - (r + padding);
    const y = cy - (r + padding);
    const radius = Math.max(6, Math.min(20, Math.floor(Math.min(w, h) * 0.04)));

    ctx.save();
    ctx.beginPath();
    // rounded rect path
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.strokeStyle = 'rgba(6,255,220,0.10)';
    ctx.lineWidth = Math.max(2, Math.min(6, padding));
    ctx.stroke();
    ctx.restore();
  };

  const draw = (ctx: CanvasRenderingContext2D, cssWidth: number, cssHeight: number) => {
    // ensure we compute center & radius from actual css pixel dimensions
    const centerX = cssWidth / 2;
    const centerY = cssHeight / 2;
    // leave a small padding so the circle doesn't touch edges
    const padding = Math.max(8, Math.min(24, Math.floor(Math.min(cssWidth, cssHeight) * 0.03)));
    const radius = Math.min(centerX, centerY) - padding;
    sonarRadiusRef.current = radius;

    // background
    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.fillStyle = '#000814';
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    // outer neon glow (around circle)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(6,255,220,0.06)';
    ctx.lineWidth = 6;
    ctx.stroke();

    // draw a rounded rectangular frame that fits the circle exactly
    strokeRoundedFrame(ctx, centerX, centerY, radius, 8);

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

    // contacts - use fixed iconSize for all objects (medium by default)
    contacts.forEach((c, idx) => {
      const px = (c.position.x / (maxRange || 1)) * radius;
      const py = -(c.position.y / (maxRange || 1)) * radius;
      const sx = centerX + px;
      const sy = centerY + py;
      const distFromCenter = Math.hypot(sx - centerX, sy - centerY);
      if (distFromCenter > radius) return;

      // shadow
      ctx.beginPath();
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.ellipse(sx + 2, sy + 6, 10, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // fixed silhouette size
      const s = iconSize;
      drawSilhouette(ctx, c.type, sx, sy, s);

      // neon label
      ctx.fillStyle = 'rgba(120,255,235,0.95)';
      ctx.font = '12px system-ui, Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`${c.type} • ${c.distance}m`, sx + Math.max(18, s * 0.6), sy - Math.max(12, s * 0.5));
    });
  };

  // measure wrapper size and compute square canvas size to fit container
  useLayoutEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      const s = Math.max(120, Math.min(size || 9999, Math.floor(Math.min(rect.width, rect.height))));
      setRenderSize(s);
    });
    ro.observe(node);
    // initial measure
    const rect = node.getBoundingClientRect();
    const initial = Math.max(120, Math.min(size || 9999, Math.floor(Math.min(rect.width, rect.height))));
    setRenderSize(initial);

    return () => ro.disconnect();
  }, [size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const cssSize = renderSize;
    // set CSS size so it lays out properly in the container
    canvas.style.width = `${cssSize}px`;
    canvas.style.height = `${cssSize}px`;
    // set actual pixel buffer according to DPR
    canvas.width = Math.round(cssSize * dpr);
    canvas.height = Math.round(cssSize * dpr);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // scale drawing operations to DPR
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

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
  }, [contacts, maxRange, renderSize, iconSize]);

  return (
    <div
      ref={wrapperRef}
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <canvas
        ref={canvasRef}
        className="rounded-xl shadow-2xl bg-transparent"
        aria-label="Sonar display"
      />
    </div>
  );
};

export default SonarCanvas;