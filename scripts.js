// scripts.js
//Slider
let slideIndex = 1;
let autoplayInterval;

function changeSlide(n) {
    showSlides(slideIndex += n);
    resetAutoplay();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetAutoplay();
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].className = slides[i].className.replace(" current", "");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" current", "");
    }
    if (slides.length > 0) {
        slides[slideIndex - 1].className += " current";
    }
    if (dots.length > 0 && dots.length >= slideIndex) {
        dots[slideIndex - 1].className += " current";
    }
}

function startAutoplay() {
    autoplayInterval = setInterval(function () {
        changeSlide(1);
    }, 9000); // Change slides every 9 seconds, feel free to change this to suit your needs BUT be sure to update slide.current timing in style.css
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
}

function addHoverPause() {
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
}
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

var slider = document.querySelector('.slider');
if (slider) {    
// Slider nav dots
    window.onload = function () {
        let slideContainer = document.querySelector('.slider');
        let dotContainer = slideContainer.querySelector('.dots');
        let slides = slideContainer.getElementsByClassName('slide');
        for (let i = 0; i < slides.length; i++) {
            let dot = document.createElement('span');
            dot.classList.add('dot');
            dot.onclick = function () { currentSlide(i + 1); };
            dotContainer.appendChild(dot);
        }
        currentSlide(1); // Initialize to show the first slide
    };
    showSlides(slideIndex);
    //addHoverPause(); 
    // I didn't like this with the animation I set on the slider - it's here if you want to use it, though
}
    // conditionally load our form
    loadContactForm();
});
