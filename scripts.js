// scripts.js
function justOneRoll() {
  const elements = [
    document.querySelector('.logo'),
    document.querySelector('#headerBannerText')
  ].filter(Boolean);

  if (elements.length === 0) return;

  if (sessionStorage.getItem('logoAnimated')) {
    elements.forEach(el => el.classList.add('animated'));
  } else {
    setTimeout(() => {
      elements.forEach(el => el.classList.add('animated'));
      sessionStorage.setItem('logoAnimated', 'yes');
    }, 6000);
  }
}

// Scroll animations
	function lerp(a, b, t) { return a + (b - a) * t; }
	function clamp(x, min, max) { return Math.max(min, Math.min(max, x)); }

	const slideDistance = 350; 
	const triggerStart = 0.85; 
	const triggerEnd = 0.4;   

	function getScrollProgress(el) {
	  const rect = el.getBoundingClientRect();
	  const windowH = window.innerHeight || document.documentElement.clientHeight;
	  const start = windowH * triggerStart;
	  const end = windowH * triggerEnd;
	  const elemMid = rect.top + rect.height/2;

	  let progress = (start - elemMid) / (start - end);
	  return clamp(progress, 0, 1);
	}

	function updateScrollAnimations() {
	  document.querySelectorAll('.inFromLeft').forEach(el => {
	    const progress = getScrollProgress(el);
	    el.style.transform = `translateX(${lerp(-slideDistance, 0, progress)}px)`;
	  });
	  document.querySelectorAll('.inFromRight').forEach(el => {
	    const progress = getScrollProgress(el);
	    el.style.transform = `translateX(${lerp(slideDistance, 0, progress)}px)`;
	  });
	}

	function onScrollOrResize() {
	  if (!onScrollOrResize.scheduled) {
	    onScrollOrResize.scheduled = true;
	    requestAnimationFrame(() => {
	      updateScrollAnimations();
	      onScrollOrResize.scheduled = false;
	    });
	  }
	}
	window.addEventListener('scroll', onScrollOrResize);
	window.addEventListener('resize', onScrollOrResize);
	document.addEventListener('DOMContentLoaded', updateScrollAnimations);

	updateScrollAnimations();

// Accordions
var accItem = document.getElementsByClassName('accordionItem');
var accHD = document.getElementsByClassName('accordionItemHeading');
for (i = 0; i < accHD.length; i++) {
    accHD[i].addEventListener('click', toggleItem, false);
}
function toggleItem() {
    var itemClass = this.parentNode.className;

    for (i = 0; i < accItem.length; i++) {
        accItem[i].className = 'accordionItem close';
    }

    if (itemClass === 'accordionItem close') {
        this.parentNode.className = 'accordionItem open';
    }
}

// Check if the testimonial carousel exists before initializing functionality
var carousel = document.querySelector('.testimonial-carousel');
if (carousel) {
    // Testimonials
var testimonials = document.querySelectorAll('.testimonial-item');
var navdotsContainer = document.querySelector('.testimonial-navdots');
var interval;
var currentIndex = 0;
function createnavdots() {
    testimonials.forEach(function (_, index) {
        var navdot = document.createElement('span');
        navdot.classList.add('testimonial-navdot');
        if (index === 0) navdot.classList.add('active');
        navdot.addEventListener('click', function () {
            showTestimonial(index);
        });
        navdotsContainer.appendChild(navdot);
    });
}
function showTestimonial(index) {
    testimonials.forEach(function (testimonial, idx) {
        testimonial.classList.remove('active');
        testimonial.style.opacity = '0';
        navdotsContainer.children[idx].classList.remove('active');
    });
    testimonials[index].classList.add('active');
    testimonials[index].style.opacity = '1';
    navdotsContainer.children[index].classList.add('active');
    currentIndex = index;
}
function startCarousel() {
    interval = setInterval(function () {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5500);
}
function stopCarousel() {
    clearInterval(interval);
}
createnavdots();
showTestimonial(0);
startCarousel();
var carousel = document.querySelector('.testimonial-carousel');
carousel.addEventListener('mouseenter', stopCarousel);
carousel.addEventListener('mouseleave', startCarousel);
}

// Form logic
function loadContactForm() {
    const container = document.getElementById('contactFormContainer');
    if (container) {
        fetch('form.html') // Adjust the path as necessary
            .then(response => response.text())
            .then(html => {
                container.innerHTML = html;
                // Initialize form functionality after loading
                initFormFunctionality();
            })
            .catch(err => console.error('Failed to load the contact form:', err));
    }
}

// Initialize form functionality: validation and AJAX submission
function initFormFunctionality() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        submitFormWithAjax(form);
    });
}

// Example AJAX form submission function
function submitFormWithAjax(form) {
    const formData = new FormData(form);
    const messageContainer = document.getElementById('formSubmissionMessage');

    fetch(form.action, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        // Handle submission success
        messageContainer.textContent = data;
        form.reset(); // Optional: reset form fields
    })
    .catch(error => {
        // Handle submission error
        messageContainer.textContent = "There was a problem with your submission. Please try again.";
    });
}

//Listener
document.addEventListener('DOMContentLoaded', () => {
     // let's check if our header & footer are already in storage to prevent that flash
    let headerHTML = localStorage.getItem('headerHTML');
    let footerHTML = localStorage.getItem('footerHTML');

    // we don't want our images to be render-blocking
    const teamplateImages = document.querySelectorAll('img');
    teamplateImages.forEach(img => {
        img.setAttribute('decoding', 'async');
    });

    if (headerHTML && footerHTML) {
        document.getElementById('header-placeholder').innerHTML = headerHTML;
        document.getElementById('footer-placeholder').innerHTML = footerHTML;
    } else {
        // Fetch and inject the header
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
                initMobileNav();
                justOneRoll();
            })
            .catch(err => console.error('Failed to load header: ', err));

        // Fetch and inject the footer
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
                // Now that the footer is loaded, set the current year
                const yearSpan = document.getElementById('year');
                if (yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                }
            })
            .catch(err => console.error('Failed to load footer: ', err));
        //pop a new tab for external domain links
        document.querySelectorAll('a').forEach(link => {
            if (link.hostname !== window.location.hostname) {
                link.target = '_blank';
                // Optional: Add rel="noopener noreferrer" for security and performance reasons - if you want to attribute the link to your site, comment out the line below
                link.rel = 'noopener noreferrer';
            }
        });
    }
    // Creating Mobile Nav Links
function initMobileNav() {
    const toggleButton = document.querySelector('.toggle-button');
    const navContainer = document.querySelector('#navbar');

    if (toggleButton && navContainer) {
        // Create a container for the mobile navigation
        const mobileNavContainer = document.createElement('ul');
        mobileNavContainer.classList.add('mobile-nav');

        // Select the top-level ul elements from both left and right nav sections
        const leftNavUl = navContainer.querySelector('.navbar-links.left > ul');
        const rightNavUl = navContainer.querySelector('.navbar-links.right > ul');

        // Clone the ul contents from left and right nav sections
        if (leftNavUl) {
            const clonedLeftNav = leftNavUl.cloneNode(true); // Deep clone
            // Append each child (li) to the mobile nav container
            Array.from(clonedLeftNav.children).forEach(child => {
                mobileNavContainer.appendChild(child);
            });
        }

        if (rightNavUl) {
            const clonedRightNav = rightNavUl.cloneNode(true); // Deep clone
            // Append each child (li) to the mobile nav container
            Array.from(clonedRightNav.children).forEach(child => {
                mobileNavContainer.appendChild(child);
            });
        }

        // Append the newly created ul to the navbar
        navContainer.appendChild(mobileNavContainer);

        // Toggle mobile navigation
        toggleButton.addEventListener('click', function () {
            mobileNavContainer.classList.toggle('active'); // Use classList.toggle to add/remove the active class

            // Toggle visibility
            const isVisible = mobileNavContainer.classList.contains('active');
            mobileNavContainer.style.display = isVisible ? 'block' : 'none';
        });
    }
}
var homeGrid = document.querySelectorAll('.homepageServiceBox');
homeGrid && console.log('resizing boxes');
function matchHeights() {
    var serviceBoxes = document.querySelectorAll('.homepageServiceBox');
    serviceBoxes.forEach(function (box) {
        var imgDiv = box.querySelector('div:first-child');
        var textDiv = box.querySelector('div:last-child');
        var imgHeight = imgDiv.offsetHeight;
        textDiv.style.height = imgHeight + 'px';
    });
}
// Run the function on window load and resize
window.onload = matchHeights;
window.onresize = matchHeights;

var slider = document.querySelector('.headerBanner .bgImage');
if (slider) {
// Slider nav dots
var images = [
    'images/mag_design_port01.webp',
    'images/mag_design_port02.webp',
    'images/mag_design_port03.webp',
    'images/mag_design_port05.webp',
    'images/mag_design_port06.webp',
    'images/mag_design_port07.webp',
    'images/mag_design_port08.webp',
    'images/mag_design_port09.webp',
    'images/mag_design_port10.webp',
    'images/mag_design_port11.webp',
    'images/mag_design_port12.webp',
    'images/mag_design_port13.webp',
    // Add more image URLs
];
var currentIndex = 0;
var bgImages = document.querySelectorAll('.headerBanner .bgImage');
bgImages[0].style.opacity = '1'; // Make the first image visible initially

function changeBackground() {
    var nextIndex = (currentIndex + 1) % images.length;
    var currentImage = bgImages[currentIndex % 2];
    var nextImage = bgImages[nextIndex % 2];

    nextImage.style.backgroundImage = 'url(' + images[nextIndex] + ')';
    nextImage.style.opacity = '1'; // Fade in next image
    setTimeout(function() {
        currentImage.style.opacity = '0'; // Fade out current image
    }, 100); // Short delay to ensure overlap during crossfade

    currentIndex = nextIndex;
}

setInterval(changeBackground, 4500); 
}
    // conditionally load our form
    loadContactForm();
});
