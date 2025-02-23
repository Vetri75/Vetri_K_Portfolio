
// nav
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Adjust for navbar height
                behavior: "smooth"
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section, .hero, .about-me, .skills");
    const navLinks = document.querySelectorAll(".nav-links a");

    function activateNavLink() {
        let scrollPosition = window.scrollY + 100; // Adjusting offset

        sections.forEach((section) => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                let currentId = section.getAttribute("id");
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${currentId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", activateNavLink);
    activateNavLink(); // Run initially to highlight the correct section
});

// move line
document.addEventListener("scroll", function () {
    let scrollTop = window.scrollY;
    let documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    let scrollPercentage = (scrollTop / documentHeight) * 100;
    
    let indicator = document.querySelector(".progress-dot");
    let barHeight = document.querySelector(".scroll-indicator").clientHeight;
    
    indicator.style.top = (scrollPercentage * (barHeight / 100)) + "px";
});



// Skills js
document.addEventListener("DOMContentLoaded", function () {
    const skillsSection = document.querySelector(".skills");
    const skillCards = document.querySelectorAll(".skill-card");
    const progressBars = document.querySelectorAll(".progress");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    skillCards.forEach((card) => {
                        card.classList.add("show");
                    });

                    progressBars.forEach((bar) => {
                        bar.style.width = bar.getAttribute("data-width");
                    });

                    observer.unobserve(entry.target); // Stop observing after triggering
                }
            });
        },
        { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    observer.observe(skillsSection);
});


// projects

document.addEventListener("DOMContentLoaded", function () {
    const projectCards = document.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show"); // Add the 'show' class when in view
                    observer.unobserve(entry.target); // Stop observing once it's visible
                }
            });
        },
        { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    projectCards.forEach(card => observer.observe(card));
});


// dark mode
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check if dark mode was previously enabled
    if (localStorage.getItem("darkMode") === "enabled") {
        enableDarkMode();
        darkModeToggle.checked = true; 
    } else {
        darkModeToggle.checked = false; 
    }

    darkModeToggle.addEventListener("change", function () {
        if (darkModeToggle.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    function enableDarkMode() {
        document.body.classList.add("dark-mode");
        document.querySelectorAll(".hero, .about-me, .skills, #projects, .form-sec, .hero-image, .footer, .project-card, .skill-card, button, input, textarea, nav, .li-nav li a")
            .forEach(el => el.classList.add("dark-mode")); 
        localStorage.setItem("darkMode", "enabled");
    }
    
    function disableDarkMode() {
        document.body.classList.remove("dark-mode");
        document.querySelectorAll(".hero, .about-me, .skills, #projects, .form-sec, .hero-image, .footer, .project-card, .skill-card, button, input, textarea, nav, .li-nav li a")
            .forEach(el => el.classList.remove("dark-mode")); 
        localStorage.setItem("darkMode", "disabled");
    }
    
});
