// =========================================================
// SMART EVENT MANAGEMENT SYSTEM
// DASHBOARD JAVASCRIPT
// =========================================================


// LOAD DASHBOARD
function loadDashboard() {

    const registeredUser =
        JSON.parse(
            localStorage.getItem("registeredUser") || "null"
        );

    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser") || "null"
        );

    const user = currentUser || registeredUser;


    // CHECK LOGIN
    if (!user || localStorage.getItem("isLoggedIn") !== "true") {

        alert("Please login first to access your profile.");

        window.location.href = "login.html";

        return;
    }


    // =====================================================
    // USER DETAILS
    // =====================================================

    document.getElementById("userName").textContent =
        user.name || "User";

    document.getElementById("userEmail").textContent =
        user.email || "-";

    document.getElementById("profileName").textContent =
        user.name || "-";

    document.getElementById("profileEmail").textContent =
        user.email || "-";

    document.getElementById("profilePhone").textContent =
        user.phone || "-";

    document.getElementById("registeredDate").textContent =
        user.registeredDate || "-";


    // =====================================================
    // GET BOOKINGS
    // =====================================================

    const bookings =
        JSON.parse(
            localStorage.getItem("bookings") || "[]"
        );


    // =====================================================
    // TOTAL BOOKINGS
    // =====================================================

    document.getElementById("totalBookings").textContent =
        bookings.length;


    // =====================================================
    // CALCULATE TICKETS + AMOUNT
    // =====================================================

    let totalTickets = 0;
    let totalAmount = 0;


    bookings.forEach(function (booking) {

        const tickets =
            Number(booking.tickets || 1);

        const ticketPrice =
            Number(booking.ticketPrice || 0);

        const bookingFee =
            Number(booking.bookingFee || 0);


        // If amount already exists, use it.
        // Otherwise calculate it.

        let amount =
            Number(booking.amount || 0);


        if (amount === 0 && ticketPrice > 0) {

            amount =
                (ticketPrice * tickets) +
                bookingFee;

        }


        totalTickets += tickets;

        totalAmount += amount;

    });


    // =====================================================
    // SHOW TOTAL TICKETS
    // =====================================================

    document.getElementById("totalTickets").textContent =
        totalTickets;


    // =====================================================
    // SHOW TOTAL AMOUNT
    // =====================================================

    document.getElementById("totalAmount").textContent =
        "₹" + totalAmount.toLocaleString("en-IN");


    // =====================================================
    // RECENT BOOKINGS
    // =====================================================

    const recentBookings =
        document.getElementById("recentBookings");

    recentBookings.innerHTML = "";


    if (bookings.length === 0) {

        recentBookings.innerHTML = `

            <div class="empty-message">

                <i
                    class="bi bi-ticket"
                    style="font-size:40px;">
                </i>

                <p class="mt-3 mb-3">
                    You have no bookings yet.
                </p>

                <a
                    href="events.html"
                    class="btn btn-primary">

                    Explore Events

                </a>

            </div>

        `;

        return;
    }


    // LAST 5 BOOKINGS

    const recentBookingsList =
        bookings.slice(-5).reverse();


    recentBookingsList.forEach(function (booking) {

        const tickets =
            Number(booking.tickets || 1);

        const ticketPrice =
            Number(booking.ticketPrice || 0);

        const bookingFee =
            Number(booking.bookingFee || 0);

        let amount =
            Number(booking.amount || 0);


        if (amount === 0 && ticketPrice > 0) {

            amount =
                (ticketPrice * tickets) +
                bookingFee;

        }


        const row =
            document.createElement("div");


        row.className =
            "booking-row";


        row.innerHTML = `

            <div
                class="d-flex justify-content-between
                align-items-center gap-3">

                <div>

                    <div class="booking-title">

                        <i
                            class="bi bi-calendar-event
                            text-primary">
                        </i>

                        ${booking.event || "Event"}

                    </div>


                    <div class="booking-details">

                        ${booking.date || "-"}

                        &nbsp; | &nbsp;

                        ${tickets} Ticket(s)

                        &nbsp; | &nbsp;

                        ₹${amount.toLocaleString("en-IN")}

                    </div>

                </div>


                <span class="status-badge">

                    ${booking.status || "Confirmed"}

                </span>

            </div>

        `;


        recentBookings.appendChild(row);

    });

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


    localStorage.removeItem("isLoggedIn");

    localStorage.removeItem("currentUser");


    window.location.href =
        "login.html";

}


// =========================================================
// LOGOUT BUTTON
// =========================================================

document
    .getElementById("logoutButton")
    .addEventListener(
        "click",
        logoutUser
    );


// =========================================================
// NAVBAR LOGOUT
// =========================================================

document
    .getElementById("logoutNav")
    .addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            logoutUser();

        }
    );


// =========================================================
// PAGE LOAD
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    loadDashboard
);
