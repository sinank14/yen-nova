/* ==========================================================================
   ECE TECHNICAL EVENT 2026 — YENEPOYA INSTITUTE OF TECHNOLOGY
   Application Logic — Preloader, Hardware Schematic, Google Form Registration & Countdown
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const GOOGLE_FORM_URL = 'https://forms.gle/79TdWnUqGqGEqbRy5';

  // --- 0. YEN NOVA PRELOADER ANIMATION HANDLER ---
  const preloader = document.getElementById('preloader');
  const loaderFill = document.getElementById('loader-fill');
  const loaderPct = document.getElementById('loader-pct');
  const loaderStatusText = document.getElementById('loader-status-text');

  if (preloader && loaderFill && loaderPct) {
    let progress = 0;
    const statuses = [
      'INITIALIZING CIRCUIT CORE...',
      'LOADING COMPONENT SCHEMATICS...',
      'CALIBRATING OSCILLOSCOPE READOUTS...',
      'YEN NOVA READY'
    ];

    const progressInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 18) + 8;
      if (progress > 100) progress = 100;

      loaderFill.style.width = `${progress}%`;
      loaderPct.innerText = `${progress}%`;

      if (progress < 30) loaderStatusText.innerText = statuses[0];
      else if (progress < 65) loaderStatusText.innerText = statuses[1];
      else if (progress < 95) loaderStatusText.innerText = statuses[2];
      else loaderStatusText.innerText = statuses[3];

      if (progress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          preloader.classList.add('fade-out');
        }, 350);
      }
    }, 90);
  }

  // --- 1. POPULATE COMPONENT KIT GRID & DRAW SCHEMATIC TRACES ---
  const compGrid = document.getElementById('comp-inventory-grid');
  const svgContainer = document.getElementById('schematic-svg-lines');

  if (compGrid && typeof EVENT_DATA !== 'undefined' && EVENT_DATA.hardwareKit) {
    compGrid.innerHTML = EVENT_DATA.hardwareKit.map((item, idx) => `
      <div class="component-node" data-id="${item.id}" data-idx="${idx}">
        <div class="comp-header">
          <span class="comp-name">${item.name}</span>
          <span class="comp-qty">${item.qty}</span>
        </div>
        <div class="comp-desc">${item.desc}</div>
      </div>
    `).join('');
  }

  function drawSchematicLines() {
    if (!svgContainer || !compGrid) return;
    const mcuNode = document.querySelector('.mcu-center-node');
    if (!mcuNode) return;

    const containerRect = svgContainer.getBoundingClientRect();
    const mcuRect = mcuNode.getBoundingClientRect();
    const mcuCenterX = mcuRect.left + mcuRect.width / 2 - containerRect.left;
    const mcuCenterY = mcuRect.top + mcuRect.height / 2 - containerRect.top;

    const compNodes = document.querySelectorAll('.component-node');
    let svgContent = '';

    compNodes.forEach(node => {
      const nodeRect = node.getBoundingClientRect();
      const nodeCenterX = nodeRect.left + nodeRect.width / 2 - containerRect.left;
      const nodeCenterY = nodeRect.top + nodeRect.height / 2 - containerRect.top;

      const midY = mcuCenterY + (nodeCenterY - mcuCenterY) / 2;
      const pathData = `M ${mcuCenterX} ${mcuCenterY} L ${mcuCenterX} ${midY} L ${nodeCenterX} ${midY} L ${nodeCenterX} ${nodeCenterY}`;

      svgContent += `
        <path d="${pathData}" 
              fill="none" 
              stroke="rgba(0, 240, 255, 0.22)" 
              stroke-width="1.5" 
              stroke-dasharray="4 4" />
      `;
    });

    svgContainer.innerHTML = `<svg width="100%" height="100%">${svgContent}</svg>`;
  }

  setTimeout(drawSchematicLines, 200);
  window.addEventListener('resize', drawSchematicLines);

  // Hover highlighting
  document.querySelectorAll('.component-node').forEach(node => {
    node.addEventListener('mouseenter', () => {
      node.classList.add('active');
    });
    node.addEventListener('mouseleave', () => {
      node.classList.remove('active');
    });
  });

  // --- 2. POPULATE ACHIEVEMENTS TIMELINE ---
  const achievementsList = document.getElementById('achievements-list');
  if (achievementsList && typeof EVENT_DATA !== 'undefined' && EVENT_DATA.achievements) {
    achievementsList.innerHTML = EVENT_DATA.achievements.map(ach => `
      <div class="achievement-card">
        <div class="achievement-year">${ach.year}</div>
        <div>
          <h4 class="achievement-title">${ach.title}</h4>
          <div class="achievement-org">${ach.org}</div>
          <p class="achievement-desc">${ach.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // --- 3. POPULATE TEAM GRID ---
  const teamGrid = document.getElementById('team-grid');
  if (teamGrid && typeof EVENT_DATA !== 'undefined' && EVENT_DATA.team) {
    const allMembers = [...(EVENT_DATA.team.faculty || []), ...(EVENT_DATA.team.students || [])];
    teamGrid.innerHTML = allMembers.map(member => `
      <div class="team-card">
        <div class="team-avatar-placeholder">${member.init || member.name.charAt(0)}</div>
        <div class="team-role">${member.role}</div>
        <h4 class="team-name">${member.name}</h4>
        <div class="team-dept">${member.dept}</div>
      </div>
    `).join('');
  }

  // --- 4. COUNTDOWN TIMER TO 10.10.2026 (HERO & LOGISTICS) ---
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');

  const heroCdDays = document.getElementById('hero-cd-days');
  const heroCdHours = document.getElementById('hero-cd-hours');
  const heroCdMins = document.getElementById('hero-cd-mins');
  const heroCdSecs = document.getElementById('hero-cd-secs');

  const targetDate = new Date('October 10, 2026 09:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const dStr = String(days).padStart(2, '0');
      const hStr = String(hours).padStart(2, '0');
      const mStr = String(mins).padStart(2, '0');
      const sStr = String(secs).padStart(2, '0');

      if (cdDays) cdDays.innerText = dStr;
      if (cdHours) cdHours.innerText = hStr;
      if (cdMins) cdMins.innerText = mStr;
      if (cdSecs) cdSecs.innerText = sStr;

      if (heroCdDays) heroCdDays.innerText = dStr;
      if (heroCdHours) heroCdHours.innerText = hStr;
      if (heroCdMins) heroCdMins.innerText = mStr;
      if (heroCdSecs) heroCdSecs.innerText = sStr;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- 5. REGISTRATION BUTTON HANDLERS (OPENS GOOGLE FORM IN NEW TAB) ---
  document.querySelectorAll('.open-reg-link, .open-reg-modal, a[href*="register"]').forEach(btn => {
    btn.setAttribute('href', GOOGLE_FORM_URL);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // --- 6. STICKY NAVBAR SCROLL EFFECTS & ACTIVE LINK TRACKER ---
  const navbar = document.querySelector('header.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      if (navbar) navbar.classList.add('scrolled');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }
});
