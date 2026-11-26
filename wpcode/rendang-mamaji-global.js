/* =====================================================================
   WPCode Snippet — Rendang Mamaji Global JavaScript (Semua Halaman Elementor)
   Plugin: WPCode -> Code Snippets -> Add Snippet -> Add Your Custom Code
   Code Type : JavaScript Snippet
   Location  : Site Wide Footer
   ===================================================================== */

(function () {
  function initRendangMamaji() {
    // 1. Sticky Header Scroll Shadow & Mobile Menu Toggle
    const header = document.getElementById('rmmTop');
    const toggle = document.getElementById('rmmMobileToggle');
    const nav = document.getElementById('rmmMobileNav');

    if (toggle && nav && !toggle.dataset.rmmBound) {
      toggle.dataset.rmmBound = '1';
      toggle.addEventListener('click', function () {
        const isHidden = nav.hidden;
        nav.hidden = !isHidden;
        toggle.setAttribute('aria-expanded', String(isHidden));
      });
      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          nav.hidden = true;
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    if (header && !window.__rmmScrollBound) {
      window.__rmmScrollBound = true;
      window.addEventListener(
        'scroll',
        function () {
          header.classList.toggle('is-scrolled', window.scrollY > 12);
        },
        { passive: true }
      );
    }

    // 2. Infinite Auto-Carousel
    const root = document.getElementById('rmmCarousel');
    const viewport = document.getElementById('rmmViewport');
    const track = document.getElementById('rmmTrack');

    if (!root || !viewport || !track || root.dataset.rmmBound) return;
    root.dataset.rmmBound = '1';

    const originals = Array.from(track.querySelectorAll('.rmm-carousel-slide'));
    const dots = Array.from(document.querySelectorAll('#rmmDots .rmm-carousel-dot'));
    const caption = document.getElementById('rmmCaption');
    const prevBtn = document.getElementById('rmmPrev');
    const nextBtn = document.getElementById('rmmNext');

    if (originals.length === 0) return;

    const total = originals.length;
    const CLONE = 2;

    const headClones = originals.slice(0, CLONE).map(function (s) {
      const c = s.cloneNode(true);
      c.classList.remove('is-active');
      c.setAttribute('aria-hidden', 'true');
      return c;
    });

    const tailClones = originals.slice(-CLONE).map(function (s) {
      const c = s.cloneNode(true);
      c.classList.remove('is-active');
      c.setAttribute('aria-hidden', 'true');
      return c;
    });

    tailClones.reverse().forEach(function (c) {
      track.insertBefore(c, track.firstChild);
    });
    headClones.forEach(function (c) {
      track.appendChild(c);
    });

    const slides = Array.from(track.querySelectorAll('.rmm-carousel-slide'));
    let trackIdx = CLONE;
    let autoplayTimer = null;
    let settleTimer = null;
    let touchStartX = 0;

    function getRealIdx(i) {
      return (((i - CLONE) % total) + total) % total;
    }

    function applyPos(animate) {
      const target = slides[trackIdx];
      if (!target) return;

      if (!animate) track.classList.add('is-no-transition');
      else track.classList.remove('is-no-transition');

      const real = getRealIdx(trackIdx);
      slides.forEach(function (s, idx) {
        s.classList.toggle('is-active', idx === trackIdx);
      });
      dots.forEach(function (d, idx) {
        const active = idx === real;
        d.classList.toggle('is-active', active);
        d.setAttribute('aria-selected', String(active));
      });
      if (caption) caption.textContent = originals[real].dataset.caption || '';

      const x = viewport.clientWidth / 2 - (target.offsetLeft + target.offsetWidth / 2);
      track.style.transform = 'translate3d(' + x + 'px, 0, 0)';

      if (!animate) {
        void track.offsetHeight;
        track.classList.remove('is-no-transition');
      }
    }

    function normalize() {
      if (trackIdx >= total + CLONE) {
        trackIdx -= total;
        applyPos(false);
      } else if (trackIdx < CLONE) {
        trackIdx += total;
        applyPos(false);
      }
    }

    function stepTo(nextIdx) {
      clearTimeout(settleTimer);
      if (nextIdx > total + CLONE) {
        normalize();
        nextIdx = trackIdx + 1;
      } else if (nextIdx < CLONE - 1) {
        normalize();
        nextIdx = trackIdx - 1;
      }
      trackIdx = nextIdx;
      applyPos(true);
      settleTimer = setTimeout(normalize, 680);
    }

    function startAuto() {
      stopAuto();
      autoplayTimer = setInterval(function () {
        stepTo(trackIdx + 1);
      }, 2500);
    }

    function stopAuto() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        stepTo(trackIdx - 1);
        startAuto();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        stepTo(trackIdx + 1);
        startAuto();
      });
    }

    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        stepTo(CLONE + Number(d.dataset.slide));
        startAuto();
      });
    });

    slides.forEach(function (s, idx) {
      s.addEventListener('click', function () {
        if (idx !== trackIdx) {
          stepTo(idx);
          startAuto();
        }
      });
    });

    viewport.addEventListener(
      'touchstart',
      function (e) {
        touchStartX = e.changedTouches[0].clientX;
        stopAuto();
      },
      { passive: true }
    );

    viewport.addEventListener(
      'touchend',
      function (e) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) stepTo(dx < 0 ? trackIdx + 1 : trackIdx - 1);
        startAuto();
      },
      { passive: true }
    );

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopAuto();
      else {
        normalize();
        applyPos(false);
        startAuto();
      }
    });

    window.addEventListener('resize', function () {
      applyPos(false);
    });
    window.addEventListener('load', function () {
      applyPos(false);
    });

    applyPos(false);
    startAuto();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRendangMamaji);
  } else {
    initRendangMamaji();
  }
})();
