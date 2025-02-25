// scripts.js
// Homepage seasonal
function displaySeasonalContent() {
  const today = new Date();
  const month = today.getMonth(); // 0 = January, 11 = December
  let content = '';

  if (month >= 1 && month <= 3) {
    // Spring: February, March, April
    content = `
        <div class="twoCards">
            <div>
                <h3>
                      Spring Cleanups & Overseeding
                  </h3>
                <p>
                  Revive your landscape with a well-timed Spring cleaning & ensure you're ready for the Masters. We go beyond basic debris removal to expertly prune trees and shrubs, refresh garden beds, and revitalize your lawn’s appearance. Let us make you look good & free you to enjoy the finer things — knowing every inch of your landscape is impeccably cared for.
                </p>
                <p>
                  Seeing a little decline after the Winter season? No problem, we can make it look great again with seeding, sodding, or planting show-ready plants in your landscape.
                </p>
                    <button><a href="tel:7068331464">
                        Call Or Text Us
                    </a></button>
            </div>
            <div>
                <img src="images/spring-cleanup.jpg" alt="Fertilizer being spread on grass, CSRA LawnCare provides lawn & ornamental treatment services to Augusta, Hephzibah, Grovetown, Evans, & North Augusta" />
            </div>
        </div>
    `;
  } else if (month >= 4 && month <= 7) {
    // Summer: May, June, July, August
    content = `
        <div class="twoCards">
            <div>
                <h3>
                      Lawn Care & Landscape Maintenance
                  </h3>
                <p>
                    Stay cool during the Summer months & let us handle things outside for you. Our expertise helps ensure that your turf doesn't get overstressed during the peak heat we see here in the CSRA to keep it looking its best.
                </p>
                <p>
                    Don't forget, your plants need feeding, too, just like you do. It's important to maintain proper fertilization for your specific kind of grass.
                </p>
                    <button><a href="tel:7068331464">
                        Call Or Text Us
                    </a></button>
            </div>
            <div>
                <img src="images/landscape-maintenance.jpg" alt="Fertilizer being spread on grass, CSRA LawnCare provides lawn & ornamental treatment services to Augusta, Hephzibah, Grovetown, Evans, & North Augusta" />
            </div>
        </div>
    `;
  } else if (month >= 8 && month <= 10) {
    // Fall: September, October, November
    content = `
        <div class="twoCards">
            <div>
                <h3>
                      Leaf Cleanups & Overseeding
                  </h3>
                <p>
                    It's that time again, time to start cleaning up the leaves that are starting to come down to ensure that you don't start forming a forest floor where you invested in your lawn. We can help clear out that leaf debris on a regular schedule so you're not faced with a big bill.
                </p>
                  <p>
                      Did you fall behind a little on your leaves? We also handle initial cleanups!
                  </p>
                <p>
                    Now is the time to start thinking about seeding some rye grass if you want to maintain a lush, green lawn through the Fall & Winter, too.
                </p>
                    <button><a href="tel:7068331464">
                        Call Or Text Us
                    </a></button>
            </div>
            <div>
                <img src="images/leaf-removal-clean-up.jpg" alt="Fertilizer being spread on grass, CSRA LawnCare provides lawn & ornamental treatment services to Augusta, Hephzibah, Grovetown, Evans, & North Augusta" />
            </div>
        </div>
    `;
  } else {
    // Winter: December, January
    content = `
        <div class="twoCards">
            <div>
                <h3>
                      Winter Prep
                  </h3>
                <p>
                    Just because it's Winter here & your plants are dormant doesn't mean they're inactive. The root systems are still alive & well, so it's important to ensure that your lawn has the right start for when Spring rolls around. 
                </p>
                <p>
                    Core aeration can help reduce soil compaction so your grass has an easier time to thicken up in the Spring. It also makes it easier for water & nutrients to reach the root system, giving it a nice little boost to kick off the growing season.
                </p>
                    <button><a href="tel:7068331464">
                        Call Or Text Us
                    </a></button>
            </div>
            <div>
                <img src="images/aeration.jpg" alt="Fertilizer being spread on grass, CSRA LawnCare provides lawn & ornamental treatment services to Augusta, Hephzibah, Grovetown, Evans, & North Augusta" />
            </div>
        </div>
    `;
  }

  const contentContainer = document.getElementById('seasonal-content');
  if (contentContainer) {
    // Use innerHTML so the HTML markup in the string is rendered.
    contentContainer.innerHTML = content;
  }
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
let slides = document.querySelectorAll(".slide");
let currentSlideIndex = 0;

function showNextSlide() {
    slides[currentSlideIndex].classList.remove("active");
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    slides[currentSlideIndex].classList.add("active");
}

setInterval(showNextSlide, 3000);

//Listener
document.addEventListener('DOMContentLoaded', () => {
    const seasonalDiv = document.getElementById('seasonal-content');
    seasonalDiv && displaySeasonalContent();
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
    'images/homepageBanner1.webp',
    'images/homepageBanner2.webp',
    'images/homepageBanner3.webp',
    'images/homepageBanner4.webp',
    'images/homepageBanner5.webp',
    'images/homepageBanner6.webp',
    'images/homepageBanner7.webp',
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
