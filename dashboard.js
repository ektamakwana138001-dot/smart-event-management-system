document.addEventListener("DOMContentLoaded", function () {

    // ================= ELEMENTS =================

    const totalBookingsElement =
        document.getElementById("totalBookings");

    const totalUsersElement =
        document.getElementById("totalUsers");

    const totalTicketsElement =
        document.getElementById("totalTickets");

    const totalRevenueElement =
        document.getElementById("totalRevenue");

    const recentBookingsElement =
        document.getElementById("recentBookings");

    const clearBookingsButton =
        document.getElementById("clearBookings");

    const logoutButton =
        document.getElementById("logoutButton");


    // ================= ADMIN PROTECTION =================

    const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true";

    const userRole =
        localStorage.getItem("userRole");


    if (
        !isLoggedIn ||
        userRole !== "admin"
    ) {

        alert(
            "Admin access required."
        );

        window.location.href =
            "login.html";

        return;
    }


    // ================= GET DATA =================

    function getBookings() {

        return JSON.parse(
            localStorage.getItem("bookings")
        ) || [];

    }


    function getUsers() {

        return JSON.parse(
            localStorage.getItem("users")
        ) || [];

    }


    // ================= UPDATE STATISTICS =================

    function updateStatistics() {

        const bookings =
            getBookings();

        const users =
            getUsers();


        let totalTickets = 0;

        let totalRevenue = 0;


        bookings.forEach(function (booking) {

            totalTickets +=
                Number(booking.tickets) || 0;

            totalRevenue +=
                Number(booking.totalAmount) || 0;

        });


        if (totalBookingsElement) {

            totalBookingsElement.textContent =
                bookings.length;

        }


        if (totalUsersElement) {

            totalUsersElement.textContent =
                users.length;

        }


        if (totalTicketsElement) {

            totalTicketsElement.textContent =
                totalTickets;

        }


        if (totalRevenueElement) {

            totalRevenueElement.textContent =
                "₹" +
                totalRevenue.toFixed(2);

        }

    }


    // ================= DISPLAY BOOKINGS =================

    function displayRecentBookings() {

        if (!recentBookingsElement) {
            return;
        }


        const bookings =
            getBookings();


        recentBookingsElement.innerHTML =
            "";


        if (bookings.length === 0) {

            recentBookingsElement.innerHTML = `

                <div class="text-center py-5">

                    <h5>
                        No Bookings Yet
                    </h5>

                    <p class="text-muted mb-0">
                        Bookings will appear here.
                    </p>

                </div>

            `;

            return;
        }


        const recentBookings =
            bookings
                .slice()
                .reverse()
                .slice(0, 10);


        recentBookings.forEach(
            function (booking) {

                const row =
                    document.createElement("div");

                row.className =
                    "dashboard-booking-row";


                row.innerHTML = `

                    <div>

                        <strong>
                            ${booking.bookingId}
                        </strong>

                        <p>
                            ${booking.bookingDate}
                        </p>

                    </div>


                    <div>

                        <strong>
                            ${booking.event}
                        </strong>

                        <p>
                            ${booking.name}
                        </p>

                    </div>


                    <div>

                        <strong>
                            ${booking.tickets}
                        </strong>

                        <p>
                            Ticket(s)
                        </p>

                    </div>


                    <div>

                        <strong>
                            ₹${Number(
                                booking.totalAmount
                            ).toFixed(2)}
                        </strong>

                        <p>
                            ${booking.status}
                        </p>

                    </div>

                `;


                recentBookingsElement.appendChild(
                    row
                );

            }
        );

    }


    // ================= CLEAR BOOKINGS =================

    if (clearBookingsButton) {

        clearBookingsButton.addEventListener(
            "click",
            function () {

                const bookings =
                    getBookings();


                if (bookings.length === 0) {

                    alert(
                        "There are no bookings to clear."
                    );

                    return;
                }


                const confirmClear =
                    confirm(
                        "Are you sure you want to delete all bookings?"
                    );


                if (!confirmClear) {
                    return;
                }


                localStorage.removeItem(
                    "bookings"
                );


                alert(
                    "All bookings have been cleared."
                );


                updateStatistics();

                displayRecentBookings();

            }
        );

    }


    // ================= LOGOUT =================

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "isLoggedIn"
                );

                localStorage.removeItem(
                    "userEmail"
                );

                localStorage.removeItem(
                    "userRole"
                );


                alert(
                    "Admin logged out successfully."
                );


                window.location.href =
                    "login.html";

            }
        );

    }


    // ================= INITIAL LOAD =================

    updateStatistics();

    displayRecentBookings();

});