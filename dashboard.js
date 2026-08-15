/* =========================================================
   dashboard.js
   Smart Event Management System
========================================================= */


/* ---------------------------------------------------------
   Dashboard statistics
--------------------------------------------------------- */

function loadDashboardStatistics() {

    const events =
        JSON.parse(
            localStorage.getItem(
                "adminEvents"
            ) || "[]"
        );


    const bookings =
        JSON.parse(
            localStorage.getItem(
                "bookings"
            ) || "[]"
        );


    const users =
        JSON.parse(
            localStorage.getItem(
                "users"
            ) || "[]"
        );


    const totalEvents =
        document.getElementById(
            "totalEvents"
        );


    const totalBookings =
        document.getElementById(
            "totalBookings"
        );


    const totalUsers =
        document.getElementById(
            "totalUsers"
        );


    const totalRevenue =
        document.getElementById(
            "totalRevenue"
        );


    if (totalEvents) {

        totalEvents.textContent =
            events.length;

    }


    if (totalBookings) {

        totalBookings.textContent =
            bookings.length;

    }


    if (totalUsers) {

        totalUsers.textContent =
            users.length;

    }


    if (totalRevenue) {

        let revenue = 0;

        bookings.forEach(
            booking => {

                revenue +=
                    Number(
                        booking.total ||
                        booking.price ||
                        0
                    );

            }
        );

        totalRevenue.textContent =
            "₹" + revenue;

    }

}


/* ---------------------------------------------------------
   Dashboard navigation
--------------------------------------------------------- */

function openAllEvents() {

    window.location.href =
        "events.html";

}


function openAdminEvents() {

    window.location.href =
        "admin-events.html";

}


function openBookings() {

    window.location.href =
        "my-bookings.html";

}


function openWebsite() {

    window.location.href =
        "index.html";

}


function openFeedback() {

    window.location.href =
        "contact.html";

}


/* ---------------------------------------------------------
   Admin logout
--------------------------------------------------------- */

function dashboardLogout() {

    localStorage.removeItem(
        "adminLoggedIn"
    );

    localStorage.removeItem(
        "adminData"
    );

    window.location.href =
        "admin-login.html";

}


/* ---------------------------------------------------------
   Load dashboard
--------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    loadDashboardStatistics
);
