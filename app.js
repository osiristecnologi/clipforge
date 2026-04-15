// === ClipForge App ===
(function() {
  'use strict';

  // --- Auth Particles ---
  function initParticles() {
    const canvas = document.getElementById('auth-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
        r: Math.random() * 1.5 + .5,
        a: Math.random() * .4 + .1
      });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${.06 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // --- Navigation ---
  window.navigateTo = function(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('screen-' + screen);
    if (el) {
      setTimeout(() => el.classList.add('active'), 20);
    }
  };

  // --- Auth ---
  let isLogin = true;
  window.toggleAuthForm = function(e) {
    e.preventDefault();
    isLogin = !isLogin;
    const formLogin = document.getElementById('form-login');
    const formSignup = document.getElementById('form-signup');
    const subtitle = document.getElementById('auth-subtitle');
    const switchEl = document.getElementById('auth-switch');
    if (isLogin) {
      formLogin.classList.remove('hidden');
      formSignup.classList.add('hidden');
      subtitle.textContent = 'Entre e comece a criar';
      switchEl.innerHTML = 'Não tem conta? <a href="#" onclick="toggleAuthForm(event)">Criar conta</a>';
    } else {
      formLogin.classList.add('hidden');
      formSignup.classList.remove('hidden');
      subtitle.textContent = 'Crie sua conta grátis';
      switchEl.innerHTML = 'Já tem conta? <a href="#" onclick="toggleAuthForm(event)">Entrar</a>';
    }
  };

  window.togglePass = function(btn) {
    const input = btn.parentElement.querySelector('input');
    input.type = input.type === 'password' ? 'text' : 'password';
  };

  window.doLogin = function() {
    const btn = document.querySelector('.auth-form:not(.hidden) .btn-primary');
    btn.classList.add('loading');
    setTimeout(() => {
      btn.classList.remove('loading');
      navigateTo('dashboard');
    }, 1200);
  };

  window.doLogout = function() {
    navigateTo('auth');
  };

  // --- Dashboard Tabs ---
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // --- Sidebar Tools ---
  document.querySelectorAll('.sidebar-tool').forEach(tool => {
    tool.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-tool').forEach(t => t.classList.remove('active'));
      tool.classList.add('active');
      const name = tool.dataset.tool;
      const titles = {
        media: 'Mídia', templates: 'Templates', text: 'Texto',
        stickers: 'Stickers', effects: 'Efeitos', filters: 'Filtros', audio: 'Áudio'
      };
      document.getElementById('tool-panel-title').textContent = titles[name] || name;
    });
  });

  function populateTemplates() {
    const carousel = document.getElementById('templates-carousel');
    const templates = [
      { name: 'Vlog Dinâmico', cat: 'YouTube', color: '#1a2a4a', badge: 'Novo' },
      { name: 'Reels Fitness', cat: 'Reels', color: '#2a1a3a', badge: 'Popular' },
      { name: 'Receita Rápida', cat: 'TikTok', color: '#1a3a2a', badge: null }
    ];
    carousel.innerHTML = templates.map((t, i) => `
      <div class="template-card" onclick="navigateTo('editor')">
        ${t.badge ? `<span class="template-badge">${t.badge}</span>` : ''}
        <div class="template-thumb" style="background:${t.color}">
          <div class="template-info">
            <h4>${t.name}</h4>
            <small>${t.cat}</small>
          </div>
        </div>
      </div>
    `).join('');
  }

  function populateProjects() {
    const grid = document.getElementById('projects-grid');
    const projects = [
      { name: 'Meu primeiro vlog', date: 'Hoje', dur: '2:34' },
      { name: 'Review iPhone', date: 'Ontem', dur: '5:12' }
    ];
    grid.innerHTML = projects.map(p => `
      <div class="project-card">
        <h4>${p.name}</h4>
        <small>${p.date} • ${p.dur}</small>
      </div>
    `).join('');
  }

  initParticles();
  populateTemplates();
  populateProjects();

})();
