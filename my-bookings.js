// =========================================================
// SMART EVENT MANAGEMENT SYSTEM
// MY BOOKINGS JAVASCRIPT
// =========================================================


// GET ELEMENTS

const bookingsContainer =
    document.getElementById("bookingsContainer");

const emptyBookings =
    document.getElementById("emptyBookings");

const customerBox =
    document.getElementById("customerBox");

const customerName =
    document.getElementById("customerName");

const customerEmail =
    document.getElementById("customerEmail");

const bookingCount =
    document.getElementById("bookingCount");

const clearBox =
    document.getElementById("clearBox");

const clearBookingsBtn =
    document.getElementById("clearBookingsBtn");


// =========================================================
// LOAD BOOKINGS
// =========================================================

function loadBookings() {

    let bookings =
        JSON.parse(
            localStorage.getItem("bookings")
            || "[]"
        );


    // Clear previous content

    bookingsContainer.innerHTML = "";


    // =====================================================
    // NO BOOKINGS
    // =====================================================

    if (bookings.length === 0) {

        emptyBookings.style.display =
            "block";

        customerBox.style.display =
            "none";

        clearBox.style.display =
            "none";

        return;

    }


    // =====================================================
    // SHOW CUSTOMER
    // =====================================================

    customerBox.style.display =
        "block";


    clearBox.style.display =
        "block";


    bookingCount.textContent =
        bookings.length;


    if (bookings[0].name) {

        customerName.textContent =
            bookings[0].name;

    }


    if (bookings[0].email) {

        customerEmail.textContent =
            bookings[0].email;

    }


    // =====================================================
    // DISPLAY BOOKINGS
    // =====================================================

    bookings.forEach(
        function(booking, index) {

            const ticketPrice =
                Number(
                    booking.ticketPrice
                    || 0
                );


            const tickets =
                Number(
                    booking.tickets
                    || 1
                );


            const subtotal =
                Number(
                    booking.subtotal
                    || ticketPrice * tickets
                );


            const fee =
                Number(
                    booking.bookingFee
                    || 0
                );


            const total =
                Number(
                    booking.amount
                    || subtotal + fee
                );


            const card =
                document.createElement("div");


            card.className =
                "booking-card";


            card.innerHTML = `

                <div class="booking-card-header">

                    <div>

                        <h4>

                            <i class="bi bi-calendar-event text-primary"></i>

                            ${booking.event || "Event"}

                        </h4>

                        <div class="booking-id">

                            Booking ID:
                            ${booking.id || "#SE000000"}

                        </div>

                    </div>

                    <span class="status-badge">

                        <i class="bi bi-check-circle"></i>

                        ${booking.status || "Confirmed"}

                    </span>

                </div>


                <div class="booking-info">

                    <div class="info-box">

                        <span>
                            Attendee Name
                        </span>

                        <strong>
                            ${booking.name || "-"}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>
                            Email
                        </span>

                        <strong>
                            ${booking.email || "-"}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>
                            Phone
                        </span>

                        <strong>
                            ${booking.phone || "-"}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>
                            Event Date
                        </span>

                        <strong>
                            ${booking.date || "-"}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>
                            Event Time
                        </span>

                        <strong>
                            ${booking.time || "-"}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>
                            Location
                        </span>

                        <strong>
                            ${booking.location || "-"}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>
                            Ticket Price
                        </span>

                        <strong>
                            ₹${ticketPrice}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>
                            Number of Tickets
                        </span>

                        <strong>
                            ${tickets}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>
                            Payment Method
                        </span>

                        <strong>
                            ${booking.payment || "-"}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>
                            Booking Date
                        </span>

                        <strong>
                            ${booking.bookingDate || "-"}
                        </strong>

                    </div>

                </div>


                <div class="amount-box">

                    <div>

                        <span>
                            Subtotal:
                            ₹${subtotal}
                        </span>

                        <br>

                        <small class="text-muted">

                            Booking Fee:
                            ₹${fee}

                        </small>

                    </div>


                    <div>

                        <span>
                            Total Amount
                        </span>

                        <strong>
                            ₹${total}
                        </strong>

                    </div>

                </div>

            `;


            bookingsContainer.appendChild(card);

        }
    );

}


// =========================================================
// CLEAR ALL BOOKINGS
// =========================================================

clearBookingsBtn.addEventListener(
    "click",
    function() {

        const confirmDelete =
            confirm(
                "Are you sure you want to delete all booking history?"
            );


        if (!confirmDelete) {

            return;

        }


        localStorage.removeItem(
            "bookings"
        );


        localStorage.removeItem(
            "currentBooking"
        );


        loadBookings();

    }
);


// =========================================================
// LOAD WHEN PAGE OPENS
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    loadBookings
);
