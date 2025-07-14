let images = window.slideshowImages || [];

let index = 0;

let autoSlideInterval;



const image1 = document.getElementById("changing-image");

const container = document.getElementById("slideshow-wrapper");



image1.style.position = "absolute";

image1.style.top = "0";

image1.style.left = "0";

if (window.location.pathname.includes("index.html") || window.location.pathname === "/" || window.location.pathname === "/index") {

    image1.style.width = "100%";

    image1.style.height = "auto";

}

image1.style.transition = "left 1s ease, opacity 1s ease";

image1.style.opacity = "1";



const image2 = document.createElement("img");

image2.className = image1.className;

image2.style.position = "absolute";

image2.style.top = "0";

image2.style.left = "100%";

if (window.location.pathname.includes("index.html") || window.location.pathname === "/" || window.location.pathname === "/index") {

    image2.style.width = "100%";

    image2.style.height = "auto";

}

image2.style.transition = "left 1s ease, opacity 1s ease";

image2.style.opacity = "1";



container.appendChild(image2);



function startAutoSlide() {

    clearInterval(autoSlideInterval);

    autoSlideInterval = setInterval(() => {

        index = (index + 1) % images.length;

        image2.src = images[index];



        image1.style.left = "-100%";

        image2.style.left = "0";

        image2.style.opacity = "1";



        setTimeout(() => {

            image1.src = images[index];

            image1.style.transition = "none";

            image1.style.left = "0";



            image2.style.transition = "none";

            image2.style.left = "100%";



            void image1.offsetWidth;

            image1.style.transition = "left 1s ease, opacity 1s ease";

            image2.style.transition = "left 1s ease, opacity 1s ease";

        }, 1000);

    }, 4000);

}



function changeSlide(direction) {

    index = (index + direction + images.length) % images.length;

    clearInterval(autoSlideInterval);



    image1.style.transition = "opacity 1s ease";

    image1.style.opacity = "0";

    image2.src = images[index];



    setTimeout(() => {

        image1.src = image2.src;

        image1.style.opacity = "1";

        image1.style.transition = "left 1s ease, opacity 1s ease";

    }, 700);

    startAutoSlide();

}



startAutoSlide();




function toggleDropdown(button) {

    const dropdown = button.nextElementSibling;

    const icon = button.querySelector('i');



    const isOpen = dropdown.classList.toggle("show");



    if (isOpen) {

        // Opened: show staggered and black icon

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-bars-staggered");

        icon.style.color = "black";

    } else {

        // Closed: revert to bars and white icon

        icon.classList.remove("fa-bars-staggered");

        icon.classList.add("fa-bars");

        icon.style.color = "white";

    }

}



// Close dropdown when clicking outside

window.onclick = function(e) {

    const dropdown = document.getElementById("myDropdown");

    const button = document.querySelector(".dropbtn");

    const icon = button.querySelector("i");



    if (!e.target.closest(".dropdown")) {

        dropdown.classList.remove("show");



        // Reset icon and color

        icon.classList.remove("fa-bars-staggered");

        icon.classList.add("fa-bars");

        icon.style.color = "white";

    }

};

document.addEventListener("DOMContentLoaded", function() {

    const observer = new IntersectionObserver(

        function(entries) {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold: 0.25

        }

    );

    document.querySelectorAll(".scroll-slide, .scroll-fade, .scroll-zoom").forEach(el => {

        observer.observe(el);

    });

});