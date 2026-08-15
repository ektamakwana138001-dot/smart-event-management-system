// =========================================================
// SMART EVENT MANAGEMENT SYSTEM
// BOOKING JAVASCRIPT
// =========================================================


// EVENT DATA

const bookingEvents = {

    "Music Festival": {
        date: "20 August 2026",
        time: "6:00 PM - 10:00 PM",
        location: "Rajkot, Gujarat",
        price: 499,
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80"
    },

    "Technology Conference": {
        date: "25 August 2026",
        time: "10:00 AM - 5:00 PM",
        location: "Rajkot, Gujarat",
        price: 799,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80"
    },

    "Business Seminar": {
        date: "30 August 2026",
        time: "11:00 AM - 4:00 PM",
        location: "Ahmedabad, Gujarat",
        price: 599,
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80"
    },

    "Sports Championship": {
        date: "5 September 2026",
        time: "4:00 PM - 9:00 PM",
        location: "Gujarat",
        price: 399,
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80"
    },

    "Education Workshop": {
        date: "10 September 2026",
        time: "10:00 AM - 3:00 PM",
        location: "Rajkot, Gujarat",
        price: 299,
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80"
    },

    "Live Concert": {
        date: "15 September 2026",
        time: "6:30 PM - 10:30 PM",
        location: "Ahmedabad, Gujarat",
        price: 699,
        image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=80"
    }

};


// GET ELEMENTS

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

const totalAmount =
    document.getElementById("totalAmount");

const summaryImage =
    document.getElementById("summaryImage");


// UPDATE EVENT SUMMARY

function updateEventSummary() {

    const selectedEvent =
        eventName.value;

    if (!selectedEvent) {

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


// UPDATE TOTAL

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

    const total =
        event.price * quantity;

    summaryTickets.textContent =
        quantity;

    totalAmount.textContent =
        "₹" + total;

}


// EVENT CHANGE

eventName.addEventListener(
    "change",
    updateEventSummary
);


// TICKET CHANGE

ticketCount.addEventListener(
    "input",
    updateTotal
);


// HIDE ALL ERRORS

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


// SHOW ERROR

function showError(id) {

    const error =
        document.getElementById(id);

    if (error) {

        error.style.display =
            "block";

    }

}


// VALIDATE FORM

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


    // NAME

    if (name.length < 2) {

        showError("nameError");

        valid = false;

    }


    // EMAIL

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        showError("emailError");

        valid = false;

    }


    // PHONE

    const phonePattern =
        /^[0-9]{10}$/;


    if (!phonePattern.test(phone)) {

        showError("phoneError");

        valid = false;

    }


    // EVENT

    if (!selectedEvent) {

        showError("eventError");

        valid = false;

    }


    // TICKETS

    if (
        isNaN(tickets) ||
        tickets < 1 ||
        tickets > 10
    ) {

        showError("ticketError");

        valid = false;

    }


    // PAYMENT

    if (!payment) {

        showError("paymentError");

        valid = false;

    }


    // TERMS

    if (!terms) {

        showError("termsError");

        valid = false;

    }


    return valid;

}


// FORM SUBMIT

bookingForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const isValid =
            validateForm();


        if (!isValid) {

            return;

        }


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

            tickets:
                tickets,

            amount:
                eventData.price * tickets,

            payment:
                payment,

            status:
                "Confirmed",

            bookingDate:
                new Date()
                    .toLocaleDateString()

        };


        // GET OLD BOOKINGS

        let bookings =
            JSON.parse(
                localStorage.getItem("bookings")
                || "[]"
            );


        // ADD NEW BOOKING

        bookings.push(booking);


        // SAVE

        localStorage.setItem(
            "bookings",
            JSON.stringify(bookings)
        );


        // SAVE CURRENT USER

        localStorage.setItem(
            "currentBooking",
            JSON.stringify(booking)
        );


        // SUCCESS MESSAGE

        const successBox =
            document.getElementById(
                "successBox"
            );

        successBox.style.display =
            "block";


        // SCROLL

        successBox.scrollIntoView({
            behavior: "smooth"
        });


        // REDIRECT

        setTimeout(
            function() {

                window.location.href =
                    "my-bookings.html";

            },
            1500
        );

    }
);


// LOAD EVENT FROM EVENT DETAILS PAGE

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
