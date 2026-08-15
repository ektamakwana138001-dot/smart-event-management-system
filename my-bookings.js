// =========================================================
// SMART EVENT MANAGEMENT SYSTEM
// MY BOOKINGS JAVASCRIPT
// =========================================================


// =========================================================
// LOAD BOOKINGS
// =========================================================

function loadBookings() {


    const bookingList =
        document.getElementById(
            "bookingList"
        );


    // GET BOOKINGS

    const bookings =
        JSON.parse(
            localStorage.getItem(
                "bookings"
            ) || "[]"
        );


    // =====================================================
    // SUMMARY VARIABLES
    // =====================================================

    let totalTickets = 0;

    let totalAmount = 0;


    // =====================================================
    // CALCULATE SUMMARY
    // =====================================================

    bookings.forEach(
        function(booking) {

            const tickets =
                Number(
                    booking.tickets || 1
                );


            const ticketPrice =
                Number(
                    booking.ticketPrice || 0
                );


            const bookingFee =
                Number(
                    booking.bookingFee || 0
                );


            let amount =
                Number(
                    booking.amount || 0
                );


            // Calculate if amount missing

            if (
                amount === 0 &&
                ticketPrice > 0
            ) {

                amount =
                    (ticketPrice * tickets)
                    + bookingFee;

            }


            totalTickets += tickets;

            totalAmount += amount;

        }
    );


    // =====================================================
    // SHOW SUMMARY
    // =====================================================

    document.getElementById(
        "summaryBookings"
    ).textContent =
        bookings.length;


    document.getElementById(
        "summaryTickets"
    ).textContent =
        totalTickets;


    document.getElementById(
        "summaryAmount"
    ).textContent =
        "₹" +
        totalAmount.toLocaleString(
            "en-IN"
        );


    // =====================================================
    // NO BOOKINGS
    // =====================================================

    if (bookings.length === 0) {

        bookingList.innerHTML = `

            <div class="empty-bookings">

                <i class="bi bi-ticket-perforated"></i>

                <h3>
                    No Bookings Yet
                </h3>

                <p class="text-muted">

                    You haven't booked any events yet.

                </p>

                <a
                    href="events.html"
                    class="btn btn-primary">

                    <i class="bi bi-calendar-event"></i>

                    Explore Events

                </a>

            </div>

        `;

        return;

    }


    // =====================================================
    // CLEAR LIST
    // =====================================================

    bookingList.innerHTML = "";


    // =====================================================
    // DISPLAY BOOKINGS
    // =====================================================

    bookings
        .slice()
        .reverse()
        .forEach(
            function(booking) {


                const tickets =
                    Number(
                        booking.tickets || 1
                    );


                const ticketPrice =
                    Number(
                        booking.ticketPrice || 0
                    );


                const bookingFee =
                    Number(
                        booking.bookingFee || 0
                    );


                const subtotal =
                    Number(
                        booking.subtotal ||
                        ticketPrice * tickets
                    );


                let amount =
                    Number(
                        booking.amount || 0
                    );


                if (
                    amount === 0 &&
                    ticketPrice > 0
                ) {

                    amount =
                        subtotal +
                        bookingFee;

                }


                // =================================================
                // CARD
                // =================================================

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "booking-card";


                card.innerHTML = `

                    <div class="row g-4">


                        <!-- EVENT DETAILS -->

                        <div class="col-lg-7">

                            <div
                                class="d-flex gap-3">

                                <div
                                    class="event-icon">

                                    <i
                                        class="bi bi-calendar-event">
                                    </i>

                                </div>


                                <div>

                                    <div
                                        class="d-flex
                                        align-items-center
                                        gap-2
                                        flex-wrap">

                                        <h4
                                            class="mb-0">

                                            ${booking.event || "Event"}

                                        </h4>


                                        <span
                                            class="status-badge">

                                            ${booking.status || "Confirmed"}

                                        </span>

                                    </div>


                                    <div
                                        class="booking-id mt-2">

                                        Booking ID:
                                        ${booking.id || "-"}

                                    </div>

                                </div>

                            </div>


                            <div
                                class="row mt-4 g-3">


                                <div class="col-sm-6">

                                    <div
                                        class="booking-info">

                                        <i
                                            class="bi bi-calendar3">
                                        </i>

                                        <strong>
                                            Event Date
                                        </strong>

                                        <br>

                                        ${booking.date || "-"}

                                    </div>

                                </div>


                                <div class="col-sm-6">

                                    <div
                                        class="booking-info">

                                        <i
                                            class="bi bi-geo-alt">
                                        </i>

                                        <strong>
                                            Location
                                        </strong>

                                        <br>

                                        ${booking.location || "-"}

                                    </div>

                                </div>


                                <div class="col-sm-6">

                                    <div
                                        class="booking-info">

                                        <i
                                            class="bi bi-person">
                                        </i>

                                        <strong>
                                            Name
                                        </strong>

                                        <br>

                                        ${booking.customerName || "-"}

                                    </div>

                                </div>


                                <div class="col-sm-6">

                                    <div
                                        class="booking-info">

                                        <i
                                            class="bi bi-people">
                                        </i>

                                        <strong>
                                            Tickets
                                        </strong>

                                        <br>

                                        ${tickets}

                                    </div>

                                </div>


                                <div class="col-sm-6">

                                    <div
                                        class="booking-info">

                                        <i
                                            class="bi bi-calendar-check">
                                        </i>

                                        <strong>
                                            Booking Date
                                        </strong>

                                        <br>

                                        ${booking.bookingDate || "-"}

                                    </div>

                                </div>

                            </div>

                        </div>


                        <!-- PRICE DETAILS -->

                        <div class="col-lg-5">

                            <div class="price-summary">

                                <h5
                                    class="fw-bold mb-3">

                                    <i
                                        class="bi bi-receipt">
                                    </i>

                                    Payment Details

                                </h5>


                                <div
                                    class="price-row">

                                    <span>
                                        Event Fee
                                    </span>

                                    <strong>
                                        ₹${ticketPrice.toLocaleString("en-IN")}
                                    </strong>

                                </div>


                                <div
                                    class="price-row">

                                    <span>
                                        Number of Tickets
                                    </span>

                                    <strong>
                                        ${tickets}
                                    </strong>

                                </div>


                                <div
                                    class="price-row">

                                    <span>
                                        Subtotal
                                    </span>

                                    <strong>
                                        ₹${subtotal.toLocaleString("en-IN")}
                                    </strong>

                                </div>


                                <div
                                    class="price-row">

                                    <span>
                                        Booking Fee
                                    </span>

                                    <strong>
                                        ₹${bookingFee.toLocaleString("en-IN")}
                                    </strong>

                                </div>


                                <div
                                    class="price-row total-row">

                                    <span>
                                        Total Amount
                                    </span>

                                    <strong>
                                        ₹${amount.toLocaleString("en-IN")}
                                    </strong>

                                </div>

                            </div>

                        </div>


                    </div>

                `;


                bookingList.appendChild(
                    card
                );

            }
        );

}


// =========================================================
// PAGE LOAD
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    loadBookings
);
