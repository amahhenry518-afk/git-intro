/* =========================================================
   PENTECOST GLOBAL SERVICE
   JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");

const navMenu = document.getElementById("navMenu");


menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("active");


    if (navMenu.classList.contains("active")) {

        menuBtn.innerHTML = "✕";

    } else {

        menuBtn.innerHTML = "☰";

    }

});


/* Close menu when a navigation link is clicked */

const navLinks =
    document.querySelectorAll(".nav-menu a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

        menuBtn.innerHTML = "☰";

    });

});


/* =========================================================
   PRODUCT FILTER
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter");

const productCards =
    document.querySelectorAll(".product-card");


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {


        /* Remove active class */

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        /* Add active class */

        button.classList.add("active");


        /* Get selected category */

        const selectedCategory =
            button.getAttribute("data-filter");


        /* Filter products */

        productCards.forEach(function (card) {

            const productCategory =
                card.getAttribute("data-category");


            if (
                selectedCategory === "all" ||
                selectedCategory === productCategory
            ) {

                card.classList.remove("hide");

            } else {

                card.classList.add("hide");

            }

        });

    });

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const year =
    document.getElementById("year");

year.textContent =
    new Date().getFullYear();


/* =========================================================
   SIMPLE SCROLL EFFECT
========================================================= */

window.addEventListener("scroll", function () {

    const header =
        document.querySelector(".header");

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.25)";

    } else {

        header.style.boxShadow = "none";

    }

});