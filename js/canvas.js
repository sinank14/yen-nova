/* ==========================================================================
   ECE TECHNICAL EVENT 2026 — YENEPOYA INSTITUTE OF TECHNOLOGY
   Interactive Canvas Engine — PCB Traces & Binary Data Stream
   ========================================================================== */

(function () {
  'use strict';

  // BACKGROUND PCB TRACES & DATA PULSE CANVAS
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initTraceNodes();
  });

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });

  class TraceNode {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 2.2 + 1.5;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.02 + Math.random() * 0.03;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulsePhase += this.pulseSpeed;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      const alpha = 0.35 + Math.sin(this.pulsePhase) * 0.25;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 3.5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(27, 107, 255, ${alpha * 0.6})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }

  class SignalPulse {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.speed = Math.random() * 1.5 + 0.5;
      this.char = Math.random() > 0.5 ? '1' : '0';
      this.alpha = Math.random() * 0.4 + 0.1;
    }

    update() {
      this.y -= this.speed;
      if (this.y < -20) {
        this.reset();
        this.y = height + 10;
      }
    }

    draw() {
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = `rgba(0, 240, 255, ${this.alpha})`;
      ctx.fillText(this.char, this.x, this.y);
    }
  }

  const nodes = [];
  const pulses = [];
  const MAX_NODES = 45;
  const MAX_PULSES = 25;

  function initTraceNodes() {
    nodes.length = 0;
    pulses.length = 0;
    for (let i = 0; i < MAX_NODES; i++) nodes.push(new TraceNode());
    for (let j = 0; j < MAX_PULSES; j++) pulses.push(new SignalPulse());
  }

  initTraceNodes();

  let timeGlobal = 0;

  function drawPCBConnections() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 160) {
          const alpha = (1 - dist / 160) * 0.28;
          ctx.beginPath();
          const midX = nodes[i].x;
          const midY = nodes[j].y;

          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(midX, midY);
          ctx.lineTo(nodes[j].x, nodes[j].y);

          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          const progress = (timeGlobal * 0.8 + i + j) % 1;
          let px, py;
          if (progress < 0.5) {
            const t = progress * 2;
            px = nodes[i].x + (midX - nodes[i].x) * t;
            py = nodes[i].y + (midY - nodes[i].y) * t;
          } else {
            const t = (progress - 0.5) * 2;
            px = midX + (nodes[j].x - midX) * t;
            py = midY + (nodes[j].y - midY) * t;
          }

          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#00f0ff';
          ctx.fill();
        }
      }
    }
  }

  function animateBackground() {
    ctx.clearRect(0, 0, width, height);

    timeGlobal += 0.005;
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    pulses.forEach(p => {
      p.update();
      p.draw();
    });

    drawPCBConnections();

    nodes.forEach(node => {
      node.update();
      node.draw();
    });

    requestAnimationFrame(animateBackground);
  }

  animateBackground();
})();
