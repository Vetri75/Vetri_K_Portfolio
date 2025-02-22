
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


// Contact js

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Get error message containers
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    // Regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let isValid = true;

    // Validate Name
    if (name === "") {
        nameError.style.display = "block";
        isValid = false;
    } else {
        nameError.style.display = "none";
    }

    // Validate Email
    if (email === "" || !emailPattern.test(email)) {
        emailError.style.display = "block";
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    // Validate Message
    if (message === "") {
        messageError.style.display = "block";
        isValid = false;
    } else {
        messageError.style.display = "none";
    }

    // If all fields are valid, submit the form (you can modify this for backend integration)
    if (isValid) {
        alert("Form submitted successfully!"); // Replace with AJAX or backend call
        document.getElementById("contact-form").reset();
    }
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
        darkModeToggle.checked = true; // ✅ Ensure the toggle switch is checked
    } else {
        darkModeToggle.checked = false; // ✅ Ensure the toggle switch is unchecked
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
        document.querySelectorAll(".hero, .about-me, .skills, #projects, .form-sec, .footer, .project-card, .skill-card, button, input, textarea, nav, .li-nav li a")
            .forEach(el => el.classList.add("dark-mode")); // Ensure nav also gets the class
        localStorage.setItem("darkMode", "enabled");
    }
    
    function disableDarkMode() {
        document.body.classList.remove("dark-mode");
        document.querySelectorAll(".hero, .about-me, .skills, #projects, .form-sec, .footer, .project-card, .skill-card, button, input, textarea, nav, .li-nav li a")
            .forEach(el => el.classList.remove("dark-mode")); // Remove dark-mode class from nav
        localStorage.setItem("darkMode", "disabled");
    }
    
});
