(function () {
  'use strict';

  var root = document.documentElement;
  var buttons = document.querySelectorAll('[data-set-mode]');

  // ---------- Mode switch (Apps / Backend + AI) ----------
  function setMode(mode, save) {
    root.setAttribute('data-mode', mode);
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.setMode === mode));
    });
    if (save) {
      try { localStorage.setItem('mode', mode); } catch (e) { /* private mode */ }
      var url = new URL(location.href);
      url.searchParams.set('mode', mode);
      history.replaceState(null, '', url);
    }
    revealVisible();
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      if (root.getAttribute('data-mode') !== b.dataset.setMode) setMode(b.dataset.setMode, true);
    });
  });
  setMode(root.getAttribute('data-mode') || 'apps', false);

  // ---------- Demo video: loaded only when opened ----------
  var dialog = document.getElementById('demo');
  var video = dialog && dialog.querySelector('video');

  document.querySelectorAll('[data-demo]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!dialog || typeof dialog.showModal !== 'function') {
        window.open(btn.dataset.demo, '_blank', 'noopener');
        return;
      }
      video.poster = btn.dataset.poster || '';
      if (video.getAttribute('src') !== btn.dataset.demo) video.src = btn.dataset.demo;
      dialog.showModal();
      video.play().catch(function () {});
    });
  });

  if (dialog) {
    dialog.addEventListener('close', function () { video.pause(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  }

  // ---------- Gentle reveal on scroll ----------
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.featured, .row, .stack__grid');
  var io = null;

  if (!reduce && 'IntersectionObserver' in window) {
    targets.forEach(function (el) { el.classList.add('reveal'); });
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  // Newly shown content after a mode switch should appear immediately if on screen.
  function revealVisible() {
    if (!io) return;
    requestAnimationFrame(function () {
      targets.forEach(function (el) {
        if (el.classList.contains('is-in')) return;
        var r = el.getBoundingClientRect();
        if (r.height && r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
      });
    });
  }
})();
