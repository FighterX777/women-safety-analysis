
document.addEventListener('DOMContentLoaded', function () {
  const pages = document.querySelectorAll('.page');

  function showPage(pageId) {
      pages.forEach(page => page.classList.remove('active'));
      document.getElementById(pageId).classList.add('active');
  }

  // Default to login page
  showPage('loginPage');

  // Navigation functions
  window.showPage = showPage;

  // Person Detection & Gender Classification
  window.runPersonDetection = function () {
      document.getElementById('resultPersonDetection').innerText = 'Running person detection... (Results will be shown here.)';
      // Simulate processing time
      setTimeout(() => {
          document.getElementById('resultPersonDetection').innerText = 'Person Detection Results: Detected 5 people. 3 women and 2 men.';
      }, 2000);
  }

  // Gender Distribution
  window.analyzeGenderDistribution = function () {
      document.getElementById('resultGenderDistribution').innerText = 'Analyzing gender distribution... (Results will be shown here.)';
      // Simulate processing time
      setTimeout(() => {
          document.getElementById('resultGenderDistribution').innerText = 'Gender Distribution Analysis: 40% women, 60% men.';
      }, 2000);
  }

  // Identifying a Lone Woman at Night
  window.identifyLoneWoman = function () {
      document.getElementById('resultLoneWoman').innerText = 'Identifying lone woman at night... (Results will be shown here.)';
      // Simulate processing time
      setTimeout(() => {
          document.getElementById('resultLoneWoman').innerText = 'Lone Woman Detection: No lone women detected at this time.';
      }, 2000);
  }

  // Detection of a Woman Surrounded by Men
  window.detectWomanSurroundedByMen = function () {
      document.getElementById('resultWomanSurrounded').innerText = 'Detecting woman surrounded by men... (Results will be shown here.)';
      // Simulate processing time
      setTimeout(() => {
          document.getElementById('resultWomanSurrounded').innerText = 'Detection Results: 1 woman surrounded by 4 men detected.';
      }, 2000);
  }

  // Recognizing SOS Situation
  window.recognizeSOSSituation = function () {
      document.getElementById('resultSOSSituation').innerText = 'Recognizing SOS situation... (Results will be shown here.)';
      // Simulate processing time
      setTimeout(() => {
          document.getElementById('resultSOSSituation').innerText = 'SOS Recognition: SOS signal detected. Alert sent to authorities.';
      }, 2000);
  }

  // Identifying Hotspots
  window.identifyHotspots = function () {
      document.getElementById('resultHotspots').innerText = 'Identifying hotspots... (Results will be shown here.)';
      // Simulate processing time
      setTimeout(() => {
          document.getElementById('resultHotspots').innerText = 'Hotspot Identification: High-risk area detected at Central Park.';
      }, 2000);
  }
});

const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'password') {
    //Handle Login
      showPage('mainPage');
      document.getElementById('nigs').innerText = 'Logged In';
  } else {
    alert('Invalid username or password');
  }
});

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();