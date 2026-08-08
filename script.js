document.addEventListener("DOMContentLoaded", function () {

    // ================= CURRENT YEAR =================

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    // ================= NAVBAR ACTIVE LINK =================

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();

    const navLinks =
        document.querySelectorAll(".navbar .nav-link");

    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (
            linkPage &&
            linkPage === currentPage
        ) {

            link.classList.add("active");

        }

    });


    // ================= LOGIN STATUS =================

    const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true";

    const userEmail =
        localStorage.getItem("userEmail");

    const userRole =
        localStorage.getItem("userRole");


    // Show logged-in user's name/email
    const userDisplay =
        document.getElementById("userDisplay");

    if (userDisplay && isLoggedIn) {

        userDisplay.textContent =
            userEmail || "User";

    }


    // ================= LOGOUT LINKS =================

    const logoutLinks =
        document.querySelectorAll(".logout-link");

    logoutLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userRole");

            alert("You have been logged out.");

            window.location.href =
                "login.html";

        });

    });


    // ================= ADMIN LINK =================

    const adminLinks =
        document.querySelectorAll(".admin-link");

    adminLinks.forEach(function (link) {

        if (
            !isLoggedIn ||
            userRole !== "admin"
        ) {

            link.style.display = "none";

        }

    });


    // ================= ERROR HANDLING =================

    window.addEventListener(
        "error",
        function (event) {

            console.error(
                "Website error:",
                event.message
            );

        }
    );

});