document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.hpd-slider');

  sliders.forEach(slider => {
    const track = slider.querySelector('.hpd-slider__track');
    const slides = slider.querySelectorAll('.hpd-slider__slide');
    const prevBtn = slider.querySelector('.hpd-slider__arrow--prev');
    const nextBtn = slider.querySelector('.hpd-slider__arrow--next');
    const dots = slider.querySelectorAll('.hpd-slider__dot');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let slidesToShow = getSlidesToShow();
    let slideWidth = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function getSlidesToShow() {
      const width = window.innerWidth;
      if (width <= 480) return 1;
      if (width <= 768) return 2;
      if (width <= 992) return 3;
      if (width <= 1200) return 4;
      return 5;
    }

    function updateSlideWidth() {
      const containerWidth = slider.querySelector('.hpd-slider__container').offsetWidth;
      const gap = 20;
      slideWidth = (containerWidth + gap) / slidesToShow;
    }

    function updateSlider() {
      updateSlideWidth();
      const maxIndex = Math.max(0, slides.length - slidesToShow);
      currentIndex = Math.min(currentIndex, maxIndex);

      const offset = -currentIndex * slideWidth;
      track.style.transform = `translateX(${offset}px)`;
      currentTranslate = offset;
      prevTranslate = offset;

      updateDots();
      updateButtons();
    }

    function updateDots() {
      dots.forEach((dot, index) => {
        dot.classList.toggle('is-active', index === currentIndex);
      });
    }

    function updateButtons() {
      const maxIndex = Math.max(0, slides.length - slidesToShow);

      if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
      }

      if (nextBtn) {
        nextBtn.disabled = currentIndex >= maxIndex;
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
      }
    }

    function goToSlide(index) {
      const maxIndex = Math.max(0, slides.length - slidesToShow);
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      updateSlider();
    }

    function nextSlide() {
      const maxIndex = Math.max(0, slides.length - slidesToShow);
      if (currentIndex < maxIndex) {
        goToSlide(currentIndex + 1);
      }
    }

    function prevSlide() {
      if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    }

    // Event Listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    // Touch/Drag functionality
    function touchStart(e) {
      isDragging = true;
      startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      track.style.cursor = 'grabbing';
    }

    function touchMove(e) {
      if (!isDragging) return;

      const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      currentTranslate = prevTranslate + currentPosition - startPos;
      track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function touchEnd() {
      if (!isDragging) return;

      isDragging = false;
      track.style.cursor = 'grab';

      const movedBy = currentTranslate - prevTranslate;

      // If moved enough negative, go to next slide
      if (movedBy < -50) {
        nextSlide();
      }
      // If moved enough positive, go to previous slide
      else if (movedBy > 50) {
        prevSlide();
      } else {
        updateSlider();
      }
    }

    track.addEventListener('mousedown', touchStart);
    track.addEventListener('mousemove', touchMove);
    track.addEventListener('mouseup', touchEnd);
    track.addEventListener('mouseleave', touchEnd);

    track.addEventListener('touchstart', touchStart);
    track.addEventListener('touchmove', touchMove);
    track.addEventListener('touchend', touchEnd);

    // Prevent context menu and drag default behavior
    track.addEventListener('contextmenu', e => e.preventDefault());
    track.addEventListener('dragstart', e => e.preventDefault());

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newSlidesToShow = getSlidesToShow();
        if (newSlidesToShow !== slidesToShow) {
          slidesToShow = newSlidesToShow;
          updateSlider();
        }
      }, 250);
    });

    // Initialize
    track.style.cursor = 'grab';
    updateSlider();
  });
});

