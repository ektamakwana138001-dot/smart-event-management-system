document.addEventListener("DOMContentLoaded", function () {

    const bookingsContainer =
        document.getElementById("bookingsContainer");

    if (!bookingsContainer) {
        return;
    }


    // ================= GET BOOKINGS =================

    let bookings =
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];


    // ================= DISPLAY BOOKINGS =================

    function displayBookings() {

        bookingsContainer.innerHTML = "";


        if (bookings.length === 0) {

            bookingsContainer.innerHTML = `

                <div class="col-12">

                    <div class="no-bookings">

                        <h2>
                            No Bookings Found
                        </h2>

                        <p class="text-muted">
                            You have not booked any event yet.
                        </p>

                        <a
                            href="events.html"
                            class="btn btn-primary"
                        >
                            Explore Events
                        </a>

                    </div>

                </div>

            `;

            return;
        }


        bookings
            .slice()
            .reverse()
            .forEach(function (booking) {

                const bookingColumn =
                    document.createElement("div");

                bookingColumn.className =
                    "col-12";


                bookingColumn.innerHTML = `

                    <div class="booking-card">

                        <div class="booking-header">

                            <div>

                                <h3>
                                    ${booking.event}
                                </h3>

                                <small class="text-muted">
                                    Booking ID:
                                    ${booking.bookingId}
                                </small>

                            </div>

                            <span class="booking-status">
                                ${booking.status}
                            </span>

                        </div>


                        <div class="booking-details">

                            <div class="row">

                                <div class="col-md-6">

                                    <p>
                                        <strong>
                                            Name:
                                        </strong>

                                        ${booking.name}
                                    </p>

                                    <p>
                                        <strong>
                                            Email:
                                        </strong>

                                        ${booking.email}
                                    </p>

                                    <p>
                                        <strong>
                                            Phone:
                                        </strong>

                                        ${booking.phone}
                                    </p>

                                </div>


                                <div class="col-md-6">

                                    <p>
                                        <strong>
                                            Tickets:
                                        </strong>

                                        ${booking.tickets}
                                    </p>

                                    <p>
                                        <strong>
                                            Ticket Price:
                                        </strong>

                                        ₹${booking.ticketPrice}
                                    </p>

                                    <p>
                                        <strong>
                                            Booking Date:
                                        </strong>

                                        ${booking.bookingDate}
                                    </p>

                                </div>

                            </div>


                            <div class="alert alert-primary mt-3 mb-0">

                                <div class="d-flex justify-content-between align-items-center">

                                    <strong>
                                        Total Amount
                                    </strong>

                                    <strong>
                                        ₹${Number(
                                            booking.totalAmount
                                        ).toFixed(2)}
                                    </strong>

                                </div>

                            </div>

                        </div>


                        <div class="booking-actions">

                            <button
                                type="button"
                                class="btn btn-outline-danger btn-sm cancel-booking"
                                data-id="${booking.bookingId}"
                            >
                                Cancel Booking
                            </button>

                        </div>

                    </div>

                `;


                bookingsContainer.appendChild(
                    bookingColumn
                );

            });


        // ================= CANCEL BOOKING =================

        const cancelButtons =
            document.querySelectorAll(
                ".cancel-booking"
            );


        cancelButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const bookingId =
                        button.getAttribute(
                            "data-id"
                        );


                    const confirmCancel =
                        confirm(
                            "Are you sure you want to cancel this booking?"
                        );


                    if (!confirmCancel) {
                        return;
                    }


                    bookings =
                        bookings.filter(
                            function (booking) {

                                return (
                                    booking.bookingId !==
                                    bookingId
                                );

                            }
                        );


                    localStorage.setItem(
                        "bookings",
                        JSON.stringify(bookings)
                    );


                    alert(
                        "Booking cancelled successfully."
                    );


                    displayBookings();

                }
            );

        });

    }


    displayBookings();

});