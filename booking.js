// =========================================================
// SMART EVENT MANAGEMENT SYSTEM
// BOOKING JAVASCRIPT
// =========================================================


// =========================================================
// EVENT DATA WITH PRICE
// =========================================================

const bookingEvents = {

    "Music Festival": {

        date: "20 August 2026",

        time: "6:00 PM - 10:00 PM",

        location: "Rajkot, Gujarat",

        price: 499,

        image:
            "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80"

    },


    "Technology Conference": {

        date: "25 August 2026",

        time: "10:00 AM - 5:00 PM",

        location: "Rajkot, Gujarat",

        price: 799,

        image:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80"

    },


    "Business Seminar": {

        date: "30 August 2026",

        time: "11:00 AM - 4:00 PM",

        location: "Ahmedabad, Gujarat",

        price: 599,

        image:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80"

    },


    "Sports Championship": {

        date: "5 September 2026",

        time: "4:00 PM - 9:00 PM",

        location: "Gujarat",

        price: 399,

        image:
            "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80"

    },


    "Education Workshop": {

        date: "10 September 2026",

        time: "10:00 AM - 3:00 PM",

        location: "Rajkot, Gujarat",

        price: 299,

        image:
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80"

    },


    "Live Concert": {

        date: "15 September 2026",

        time: "6:30 PM - 10:30 PM",

        location: "Ahmedabad, Gujarat",

        price: 699,

        image:
            "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=80"

    }

};


// =========================================================
// BOOKING FEE
// =========================================================

const BOOKING_FEE = 20;


// =========================================================
// GET HTML ELEMENTS
// =========================================================

const bookingForm =
    document.getElementById("bookingForm");

const eventName =
    document.getElementById("eventName");

const ticketCount =
    document.getElementById("ticketCount");

const summaryEvent =
    document.getElementById("summaryEvent");

const summaryDate =
    document.getElementById("summaryDate");

const summaryTime =
    document.getElementById("summaryTime");

const summaryLocation =
    document.getElementById("summaryLocation");

const summaryPrice =
    document.getElementById("summaryPrice");

const summaryTickets =
    document.getElementById("summaryTickets");

const summarySubtotal =
    document.getElementById("summarySubtotal");

const bookingFee =
    document.getElementById("bookingFee");

const totalAmount =
    document.getElementById("totalAmount");

const summaryImage =
    document.getElementById("summaryImage");


// =========================================================
// UPDATE EVENT INFORMATION
// =========================================================

function updateEventSummary() {

    const selectedEvent =
        eventName.value;


    if (!selectedEvent) {

        summaryEvent.textContent =
            "Select an Event";

        summaryDate.textContent =
            "-";

        summaryTime.textContent =
            "-";

        summaryLocation.textContent =
            "-";

        summaryPrice.textContent =
            "₹0";

        summaryTickets.textContent =
            ticketCount.value || "1";

        summarySubtotal.textContent =
            "₹0";

        bookingFee.textContent =
            "₹0";

        totalAmount.textContent =
            "₹0";

        return;

    }


    const event =
        bookingEvents[selectedEvent];


    if (!event) {

        return;

    }


    summaryEvent.textContent =
        selectedEvent;


    summaryDate.textContent =
        event.date;


    summaryTime.textContent =
        event.time;


    summaryLocation.textContent =
        event.location;


    summaryPrice.textContent =
        "₹" + event.price;


    summaryImage.src =
        event.image;


    updateTotal();

}


// =========================================================
// UPDATE PRICE / TOTAL
// =========================================================

function updateTotal() {

    const selectedEvent =
        eventName.value;


    if (!selectedEvent) {

        return;

    }


    const event =
        bookingEvents[selectedEvent];


    let quantity =
        parseInt(ticketCount.value);


    if (
        isNaN(quantity) ||
        quantity < 1
    ) {

        quantity = 1;

        ticketCount.value = 1;

    }


    if (quantity > 10) {

        quantity = 10;

        ticketCount.value = 10;

    }


    // Ticket price

    const ticketPrice =
        event.price;


    // Subtotal

    const subtotal =
        ticketPrice * quantity;


    // Total

    const total =
        subtotal + BOOKING_FEE;


    // Display values

    summaryPrice.textContent =
        "₹" + ticketPrice;


    summaryTickets.textContent =
        quantity;


    summarySubtotal.textContent =
        "₹" + subtotal;


    bookingFee.textContent =
        "₹" + BOOKING_FEE;


    totalAmount.textContent =
        "₹" + total;

}


// =========================================================
// EVENT CHANGE
// =========================================================

if (eventName) {

    eventName.addEventListener(
        "change",
        updateEventSummary
    );

}


// =========================================================
// TICKET QUANTITY CHANGE
// =========================================================

if (ticketCount) {

    ticketCount.addEventListener(
        "input",
        updateTotal
    );

}


// =========================================================
// HIDE ALL ERRORS
// =========================================================

function hideErrors() {

    document.querySelectorAll(
        ".error-message"
    ).forEach(
        function(error) {

            error.style.display =
                "none";

        }
    );

}


// =========================================================
// SHOW ERROR
// =========================================================

function showError(id) {

    const error =
        document.getElementById(id);


    if (error) {

        error.style.display =
            "block";

    }

}


// =========================================================
// VALIDATE FORM
// =========================================================

function validateForm() {

    hideErrors();


    let valid = true;


    const name =
        document.getElementById("fullName")
            .value.trim();


    const email =
        document.getElementById("email")
            .value.trim();


    const phone =
        document.getElementById("phone")
            .value.trim();


    const selectedEvent =
        eventName.value;


    const tickets =
        parseInt(ticketCount.value);


    const payment =
        document.getElementById("paymentMethod")
            .value;


    const terms =
        document.getElementById("terms")
            .checked;


    // =====================================================
    // NAME VALIDATION
    // =====================================================

    if (name.length < 2) {

        showError("nameError");

        valid = false;

    }


    // =====================================================
    // EMAIL VALIDATION
    // =====================================================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        showError("emailError");

        valid = false;

    }


    // =====================================================
    // PHONE VALIDATION
    // =====================================================

    const phonePattern =
        /^[0-9]{10}$/;


    if (!phonePattern.test(phone)) {

        showError("phoneError");

        valid = false;

    }


    // =====================================================
    // EVENT VALIDATION
    // =====================================================

    if (!selectedEvent) {

        showError("eventError");

        valid = false;

    }


    // =====================================================
    // TICKET VALIDATION
    // =====================================================

    if (
        isNaN(tickets) ||
        tickets < 1 ||
        tickets > 10
    ) {

        showError("ticketError");

        valid = false;

    }


    // =====================================================
    // PAYMENT VALIDATION
    // =====================================================

    if (!payment) {

        showError("paymentError");

        valid = false;

    }


    // =====================================================
    // TERMS VALIDATION
    // =====================================================

    if (!terms) {

        showError("termsError");

        valid = false;

    }


    return valid;

}


// =========================================================
// FORM SUBMIT
// =========================================================

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const isValid =
                validateForm();


            if (!isValid) {

                return;

            }


            // =================================================
            // GET FORM DATA
            // =================================================

            const name =
                document.getElementById("fullName")
                    .value.trim();


            const email =
                document.getElementById("email")
                    .value.trim();


            const phone =
                document.getElementById("phone")
                    .value.trim();


            const selectedEvent =
                eventName.value;


            const tickets =
                parseInt(ticketCount.value);


            const payment =
                document.getElementById("paymentMethod")
                    .value;


            const eventData =
                bookingEvents[selectedEvent];


            // =================================================
            // CALCULATE PRICE
            // =================================================

            const ticketPrice =
                eventData.price;


            const subtotal =
                ticketPrice * tickets;


            const total =
                subtotal + BOOKING_FEE;


            // =================================================
            // CREATE BOOKING OBJECT
            // =================================================

            const booking = {

                id:
                    "#SE" +
                    Date.now()
                        .toString()
                        .slice(-6),


                name:
                    name,


                email:
                    email,


                phone:
                    phone,


                event:
                    selectedEvent,


                date:
                    eventData.date,


                time:
                    eventData.time,


                location:
                    eventData.location,


                ticketPrice:
                    ticketPrice,


                tickets:
                    tickets,


                subtotal:
                    subtotal,


                bookingFee:
                    BOOKING_FEE,


                amount:
                    total,


                payment:
                    payment,


                status:
                    "Confirmed",


                bookingDate:
                    new Date()
                        .toLocaleDateString()

            };


            // =================================================
            // GET OLD BOOKINGS
            // =================================================

            let bookings =
                JSON.parse(
                    localStorage.getItem("bookings")
                    || "[]"
                );


            // =================================================
            // ADD NEW BOOKING
            // =================================================

            bookings.push(booking);


            // =================================================
            // SAVE BOOKINGS
            // =================================================

            localStorage.setItem(
                "bookings",
                JSON.stringify(bookings)
            );


            // =================================================
            // SAVE CURRENT BOOKING
            // =================================================

            localStorage.setItem(
                "currentBooking",
                JSON.stringify(booking)
            );


            // =================================================
            // SUCCESS MESSAGE
            // =================================================

            const successBox =
                document.getElementById(
                    "successBox"
                );


            successBox.innerHTML = `

                <i class="bi bi-check-circle-fill"></i>

                <strong>
                    Booking Confirmed!
                </strong>

                <br>

                Booking ID:
                <strong>${booking.id}</strong>

                <br>

                Total Amount:
                <strong>₹${booking.amount}</strong>

            `;


            successBox.style.display =
                "block";


            // =================================================
            // SCROLL TO SUCCESS MESSAGE
            // =================================================

            successBox.scrollIntoView({
                behavior: "smooth"
            });


            // =================================================
            // REDIRECT TO MY BOOKINGS
            // =================================================

            setTimeout(
                function() {

                    window.location.href =
                        "my-bookings.html";

                },
                2000
            );

        }
    );

}


// =========================================================
// LOAD SELECTED EVENT
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const selectedEvent =
            localStorage.getItem(
                "selectedEvent"
            );


        if (
            selectedEvent &&
            bookingEvents[selectedEvent]
        ) {

            eventName.value =
                selectedEvent;


            updateEventSummary();

        }

    }
);
