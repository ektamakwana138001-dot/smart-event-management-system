// =========================================================
// SMART EVENT MANAGEMENT SYSTEM
// DASHBOARD JAVASCRIPT
// =========================================================


// =========================================================
// DASHBOARD DATA
// =========================================================

const dashboardData = {

    totalEvents: 10,

    totalBookings: 25,

    availableTickets: 150,

    upcomingEvents: 6

};


// =========================================================
// UPDATE DASHBOARD STATISTICS
// =========================================================

function updateDashboardStats() {

    const totalEvents =
        document.getElementById("totalEvents");

    const totalBookings =
        document.getElementById("totalBookings");

    const availableTickets =
        document.getElementById("availableTickets");

    const upcomingEvents =
        document.getElementById("upcomingEvents");


    if (totalEvents) {

        totalEvents.textContent =
            dashboardData.totalEvents;

    }


    if (totalBookings) {

        totalBookings.textContent =
            dashboardData.totalBookings;

    }


    if (availableTickets) {

        availableTickets.textContent =
            dashboardData.availableTickets;

    }


    if (upcomingEvents) {

        upcomingEvents.textContent =
            dashboardData.upcomingEvents;

    }

}


// =========================================================
// LOAD USER PROFILE
// =========================================================

function loadUserProfile() {

    const savedUser =
        localStorage.getItem("registeredUser");


    if (!savedUser) {

        return;

    }


    try {

        const user =
            JSON.parse(savedUser);


        const profileName =
            document.getElementById("profileName");

        const profileEmail =
            document.getElementById("profileEmail");

        const profilePhone =
            document.getElementById("profilePhone");


        if (profileName && user.name) {

            profileName.textContent =
                user.name;

        }


        if (profileEmail && user.email) {

            profileEmail.textContent =
                user.email;

        }


        if (profilePhone && user.phone) {

            profilePhone.textContent =
                user.phone;

        }


    } catch (error) {

        console.log(
            "Unable to load profile data."
        );

    }

}


// =========================================================
// LOGOUT
// =========================================================

function logoutUser() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {

        return;

    }


    localStorage.removeItem("loggedInUser");

    localStorage.removeItem("currentUser");


    alert(
        "You have been logged out successfully."
    );


    window.location.href =
        "login.html";

}


// =========================================================
// LOAD BOOKING DATA
// =========================================================

function loadBookings() {

    const bookingTable =
        document.getElementById("bookingTable");


    if (!bookingTable) {

        return;

    }


    const bookings =
        JSON.parse(
            localStorage.getItem("bookings") || "[]"
        );


    if (bookings.length === 0) {

        return;

    }


    bookingTable.innerHTML = "";


    bookings.slice(0, 5).forEach(
        function(booking, index) {


            const row =
                document.createElement("tr");


            const bookingId =
                booking.id ||
                "#SE" +
                String(index + 1)
                    .padStart(3, "0");


            const eventName =
                booking.event ||
                booking.eventName ||
                "Event";


            const bookingDate =
                booking.date ||
                "Upcoming";


            const tickets =
                booking.tickets ||
                booking.quantity ||
                1;


            const status =
                booking.status ||
                "Confirmed";


            let statusClass =
                "status-confirmed";


            if (
                status.toLowerCase() ===
                "pending"
            ) {

                statusClass =
                    "status-pending";

            }


            if (
                status.toLowerCase() ===
                "cancelled"
            ) {

                statusClass =
                    "status-cancelled";

            }


            row.innerHTML = `

                <td>
                    ${bookingId}
                </td>

                <td>
                    ${eventName}
                </td>

                <td>
                    ${bookingDate}
                </td>

                <td>
                    ${tickets}
                </td>

                <td>

                    <span class="${statusClass}">
                        ${status}
                    </span>

                </td>

            `;


            bookingTable.appendChild(row);

        }
    );

}


// =========================================================
// CHECK LOGIN
// =========================================================

function checkLoginStatus() {

    const loggedInUser =
        localStorage.getItem("loggedInUser");


    if (!loggedInUser) {

        // Login checking disabled for demo/project.
        // Dashboard can still be opened directly.

        return;

    }

}


// =========================================================
// PAGE LOAD
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateDashboardStats();

        loadUserProfile();

        loadBookings();

        checkLoginStatus();

    }
);
