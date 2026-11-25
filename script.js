// Rendang Mamaji — Infinite Auto-Carousel, Mobile Navigation & Scroll Reveal

const siteHeader = document.querySelector('.site-header');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuToggle && mobileNav) {
  mobileMenuToggle.addEventListener('click', () => {
    const isHidden = mobileNav.hidden;
    mobileNav.hidden = !isHidden;
    mobileMenuToggle.setAttribute('aria-expanded', String(isHidden));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.hidden = true;
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener(
  'scroll',
  () => {
    if (siteHeader) {
      siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
    }
  },
  { passive: true }
);

// ============================================================
// Rendang Infinite Auto-Carousel
// ============================================================
const carouselRoot = document.getElementById('rendangCarousel');
const carouselViewport = document.getElementById('carouselViewport');
const carouselTrack = document.getElementById('carouselTrack');
const originalSlides = Array.from(document.querySelectorAll('.carousel-slide'));
const carouselDots = Array.from(document.querySelectorAll('.carousel-dot'));
const carouselCaption = document.getElementById('carouselCaption');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

if (carouselRoot && carouselViewport && carouselTrack && originalSlides.length > 0) {
  const totalReal = originalSlides.length;
  const CLONE_COUNT = 2;

  // Clone tail slides to prepend & head slides to append for seamless infinite loop
  const headClones = originalSlides
    .slice(0, CLONE_COUNT)
    .map((slide) => {
      const clone = slide.cloneNode(true);
      clone.classList.remove('is-active');
      clone.setAttribute('aria-hidden', 'true');
      return clone;
    });

  const tailClones = originalSlides
    .slice(-CLONE_COUNT)
    .map((slide) => {
      const clone = slide.cloneNode(true);
      clone.classList.remove('is-active');
      clone.setAttribute('aria-hidden', 'true');
      return clone;
    });

  tailClones.reverse().forEach((clone) => {
    carouselTrack.insertBefore(clone, carouselTrack.firstChild);
  });
  headClones.forEach((clone) => {
    carouselTrack.appendChild(clone);
  });

  const allSlides = Array.from(carouselTrack.querySelectorAll('.carousel-slide'));
  let trackIndex = CLONE_COUNT; // Start at real slide 0
  let autoplayTimer = null;
  let settleTimer = null;
  let touchStartX = 0;

  function getRealIndex(idx) {
    return (((idx - CLONE_COUNT) % totalReal) + totalReal) % totalReal;
  }

  function applyTrackPosition(animate = true) {
    const targetSlide = allSlides[trackIndex];
    if (!targetSlide) return;

    if (!animate) {
      carouselTrack.classList.add('is-no-transition');
    } else {
      carouselTrack.classList.remove('is-no-transition');
    }

    const realIdx = getRealIndex(trackIndex);
    allSlides.forEach((slide, idx) => {
      slide.classList.toggle('is-active', idx === trackIndex);
    });

    carouselDots.forEach((dot, idx) => {
      const active = idx === realIdx;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });

    if (carouselCaption) {
      carouselCaption.textContent = originalSlides[realIdx].dataset.caption || '';
    }

    const viewportWidth = carouselViewport.clientWidth;
    const translateX =
      viewportWidth / 2 - (targetSlide.offsetLeft + targetSlide.offsetWidth / 2);
    carouselTrack.style.transform = `translate3d(${translateX}px, 0, 0)`;

    if (!animate) {
      void carouselTrack.offsetHeight;
      carouselTrack.classList.remove('is-no-transition');
    }
  }

  function normalizeLoopPosition() {
    if (trackIndex >= totalReal + CLONE_COUNT) {
      trackIndex -= totalReal;
      applyTrackPosition(false);
    } else if (trackIndex < CLONE_COUNT) {
      trackIndex += totalReal;
      applyTrackPosition(false);
    }
  }

  function stepTo(newTrackIndex) {
    clearTimeout(settleTimer);
    // Clamp inside cloned bounds if rapid-clicked
    if (newTrackIndex > totalReal + CLONE_COUNT) {
      normalizeLoopPosition();
      newTrackIndex = trackIndex + 1;
    } else if (newTrackIndex < CLONE_COUNT - 1) {
      normalizeLoopPosition();
      newTrackIndex = trackIndex - 1;
    }

    trackIndex = newTrackIndex;
    applyTrackPosition(true);

    settleTimer = setTimeout(normalizeLoopPosition, 680);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      stepTo(trackIndex + 1);
    }, 2500);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  prevBtn?.addEventListener('click', () => {
    stepTo(trackIndex - 1);
    startAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    stepTo(trackIndex + 1);
    startAutoplay();
  });

  carouselDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetReal = Number(dot.dataset.slide);
      stepTo(CLONE_COUNT + targetReal);
      startAutoplay();
    });
  });

  allSlides.forEach((slide, idx) => {
    slide.addEventListener('click', () => {
      if (idx !== trackIndex) {
        stepTo(idx);
        startAutoplay();
      }
    });
  });

  carouselViewport.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
      stopAutoplay();
    },
    { passive: true }
  );

  carouselViewport.addEventListener(
    'touchend',
    (event) => {
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 40) {
        stepTo(deltaX < 0 ? trackIndex + 1 : trackIndex - 1);
      }
      startAutoplay();
    },
    { passive: true }
  );

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      normalizeLoopPosition();
      applyTrackPosition(false);
      startAutoplay();
    }
  });

  window.addEventListener('resize', () => applyTrackPosition(false));
  window.addEventListener('load', () => applyTrackPosition(false));

  applyTrackPosition(false);
  startAutoplay();
}

// ============================================================
// Scroll Reveal Observer
// ============================================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05, rootMargin: '0px 0px -24px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
