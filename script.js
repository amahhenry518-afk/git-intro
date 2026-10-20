
/* ========================================
   NOVA UNIVERSITY - JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // GET HTML ELEMENTS
    const preloader = document.getElementById("preloader");
    const header = document.getElementById("header");
    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");
    const searchBtn = document.getElementById("searchBtn");
    const searchOverlay = document.getElementById("searchOverlay");
    const closeSearch = document.getElementById("closeSearch");
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const backToTop = document.getElementById("backToTop");
    const contactForm = document.getElementById("contactForm");
    const newsletterForm = document.getElementById("newsletterForm");

    // ========================================
    // PRELOADER
    // ========================================

    function hidePreloader() {
        if (preloader) {
            preloader.classList.add("hide");
        }
    }

    window.addEventListener("load", hidePreloader);
    setTimeout(hidePreloader, 1500);

    // ========================================
    // MOBILE NAVIGATION
    // ========================================

    function closeMobileMenu() {
        if (!nav || !menuBtn) return;

        nav.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-label", "Open menu");
        menuBtn.setAttribute("aria-expanded", "false");
    }

    if (menuBtn && nav) {
        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.addEventListener("click", function () {
            const isOpen = nav.classList.toggle("open");

            document.body.classList.toggle("menu-open", isOpen);

            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

            menuBtn.setAttribute("aria-expanded", String(isOpen));
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("click", function (event) {
            if (
                nav.classList.contains("open") &&
                !nav.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 900) {
                closeMobileMenu();
            }
        });
    }

    // ========================================
    // SEARCH OVERLAY
    // ========================================

    function openSearch() {
        if (!searchOverlay) return;

        searchOverlay.classList.add("active");
        document.body.classList.add("search-open");

        if (searchInput) {
            setTimeout(function () {
                searchInput.focus();
            }, 200);
        }
    }

    function closeSearchOverlay() {
        if (!searchOverlay) return;

        searchOverlay.classList.remove("active");
        document.body.classList.remove("search-open");
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", openSearch);
    }

    if (closeSearch) {
        closeSearch.addEventListener("click", closeSearchOverlay);
    }

    if (searchOverlay) {
        searchOverlay.addEventListener("click", function (event) {
            if (event.target === searchOverlay) {
                closeSearchOverlay();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeSearchOverlay();
            closeMobileMenu();
        }
    });

    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const query = searchInput.value.trim().toLowerCase();

            if (!query) {
                searchInput.focus();
                return;
            }

            const searchableSections = Array.from(
                document.querySelectorAll("main section[id]")
            );

            const matchingSection = searchableSections.find(function (section) {
                return section.textContent.toLowerCase().includes(query);
            });

            if (matchingSection) {
                closeSearchOverlay();

                matchingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            } else {
                alert("No matching section found. Try another search term.");
            }
        });
    }

    // ========================================
    // STICKY HEADER
    // ========================================

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================

    function updateBackToTop() {
        if (!backToTop) return;

        if (window.scrollY > 400) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    updateBackToTop();

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ========================================
    // ACTIVE NAVIGATION LINK
    // ========================================

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav > a.nav-link");

    if (
        "IntersectionObserver" in window &&
        sections.length &&
        navLinks.length
    ) {
        const sectionObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        navLinks.forEach(function (link) {
                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") ===
                                    "#" + entry.target.id
                            );
                        });
                    }
                });
            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    // ========================================
    // CONTACT FORM
    // FormSubmit handles sending the form.
    // Do not prevent the form's normal submission.
    // ========================================

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                contactForm.reportValidity();
            }
        });
    }

    // ========================================
    // NEWSLETTER FORM
    // This is still a demo; it does not send emails.
    // ========================================

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!newsletterForm.checkValidity()) {
                newsletterForm.reportValidity();
                return;
            }

            alert(
                "The newsletter form is not connected yet. " +
                "Please check back later."
            );
        });
    }

    // ========================================
    // FOOTER YEAR
    // ========================================

    const copyrightText = document.querySelector(".footer-bottom > p");

    if (copyrightText) {
        copyrightText.textContent =
            "© " + new Date().getFullYear() +
            " Nova University. All rights reserved.";
    }

});
