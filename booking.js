// =====================================================
// SMART EVENT MANAGEMENT SYSTEM
// BOOKING JAVASCRIPT
// =====================================================


// =====================================================
// GET ELEMENTS
// =====================================================

const bookingForm = document.getElementById("bookingForm");

const customerName = document.getElementById("customerName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const eventSelect = document.getElementById("event");
const ticketsInput = document.getElementById("tickets");

const paymentMethod =
    document.getElementById("paymentMethod");

const terms = document.getElementById("terms");


// =====================================================
// SUMMARY ELEMENTS
// =====================================================

const summaryEvent =
    document.getElementById("summaryEvent");

const summaryDate =
    document.getElementById("summaryDate");

const summaryLocation =
    document.getElementById("summaryLocation");

const summaryPrice =
    document.getElementById("summaryPrice");

const summaryTickets =
    document.getElementById("summaryTickets");

const subtotalElement =
    document.getElementById("subtotal");

const bookingFeeElement =
    document.getElementById("bookingFee");

const totalAmountElement =
    document.getElementById("totalAmount");


// =====================================================
// SUCCESS BOX
// =====================================================

const successBox =
    document.getElementById("successBox");

const successMessage =
    document.getElementById("successMessage");


// =====================================================
// BOOKING FEE
// =====================================================

const BOOKING_FEE = 20;


// =====================================================
// EVENT SELECTED FROM URL
// =====================================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const urlEvent =
    urlParams.get("event");


// =====================================================
// AUTO SELECT EVENT
// =====================================================

if (urlEvent) {

    const options =
        Array.from(
            eventSelect.options
        );

    const matchingOption =
        options.find(
            function(option) {

                return option.value === urlEvent;

            }
        );


    if (matchingOption) {

        eventSelect.value =
            urlEvent;

        updateBookingSummary();

    }

}


// =====================================================
// UPDATE BOOKING SUMMARY
// =====================================================

function updateBookingSummary() {


    const selectedOption =
        eventSelect.options[
            eventSelect.selectedIndex
        ];


    if (
        !selectedOption ||
        !selectedOption.value
    ) {

        summaryEvent.textContent =
            "Select an event";

        summaryDate.textContent =
            "-";

        summaryLocation.textContent =
            "-";

        summaryPrice.textContent =
            "0";

        summaryTickets.textContent =
            ticketsInput.value || "1";

        subtotalElement.textContent =
            "0";

        bookingFeeElement.textContent =
            BOOKING_FEE;

        totalAmountElement.textContent =
            BOOKING_FEE;

        return;

    }


    // =================================================
    // EVENT DETAILS
    // =================================================

    const eventName =
        selectedOption.value;

    const price =
        Number(
            selectedOption.dataset.price
        );

    const date =
        selectedOption.dataset.date;

    const location =
        selectedOption.dataset.location;


    // =================================================
    // TICKETS
    // =================================================

    let tickets =
        Number(
            ticketsInput.value
        );


    if (
        !tickets ||
        tickets < 1
    ) {

        tickets = 1;

        ticketsInput.value = 1;

    }


    if (tickets > 10) {

        tickets = 10;

        ticketsInput.value = 10;

    }


    // =================================================
    // CALCULATION
    // =================================================

    const subtotal =
        price * tickets;

    const total =
        subtotal + BOOKING_FEE;


    // =================================================
    // DISPLAY
    // =================================================

    summaryEvent.textContent =
        eventName;

    summaryDate.textContent =
        date;

    summaryLocation.textContent =
        location;

    summaryPrice.textContent =
        price.toLocaleString("en-IN");

    summaryTickets.textContent =
        tickets;

    subtotalElement.textContent =
        subtotal.toLocaleString("en-IN");

    bookingFeeElement.textContent =
        BOOKING_FEE.toLocaleString("en-IN");

    totalAmountElement.textContent =
        total.toLocaleString("en-IN");

}


// =====================================================
// EVENT CHANGE
// =====================================================

eventSelect.addEventListener(
    "change",
    updateBookingSummary
);


// =====================================================
// TICKET CHANGE
// =====================================================

ticketsInput.addEventListener(
    "input",
    updateBookingSummary
);


// =====================================================
// REMOVE ERROR MESSAGES
// =====================================================

function clearErrors() {

    document.getElementById(
        "nameError"
    ).textContent = "";

    document.getElementById(
        "emailError"
    ).textContent = "";

    document.getElementById(
        "phoneError"
    ).textContent = "";

    document.getElementById(
        "eventError"
    ).textContent = "";

    document.getElementById(
        "paymentError"
    ).textContent = "";

}


// =====================================================
// VALIDATE FORM
// =====================================================

function validateForm() {


    clearErrors();


    let isValid = true;


    // =================================================
    // NAME
    // =================================================

    const name =
        customerName.value.trim();


    if (name === "") {

        document.getElementById(
            "nameError"
        ).textContent =
            "Please enter your full name.";

        isValid = false;

    }
    else if (name.length < 3) {

        document.getElementById(
            "nameError"
        ).textContent =
            "Name must contain at least 3 characters.";

        isValid = false;

    }


    // =================================================
    // EMAIL
    // =================================================

    const emailValue =
        email.value.trim();


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (emailValue === "") {

        document.getElementById(
            "emailError"
        ).textContent =
            "Please enter your email.";

        isValid = false;

    }
    else if (
        !emailPattern.test(emailValue)
    ) {

        document.getElementById(
            "emailError"
        ).textContent =
            "Please enter a valid email address.";

        isValid = false;

    }


    // =================================================
    // PHONE
    // =================================================

    const phoneValue =
        phone.value.trim();


    const phonePattern =
        /^[6-9][0-9]{9}$/;


    if (phoneValue === "") {

        document.getElementById(
            "phoneError"
        ).textContent =
            "Please enter your mobile number.";

        isValid = false;

    }
    else if (
        !phonePattern.test(phoneValue)
    ) {

        document.getElementById(
            "phoneError"
        ).textContent =
            "Please enter a valid 10 digit mobile number.";

        isValid = false;

    }


    // =================================================
    // EVENT
    // =================================================

    if (
        eventSelect.value === ""
    ) {

        document.getElementById(
            "eventError"
        ).textContent =
            "Please select an event.";

        isValid = false;

    }


    // =================================================
    // TICKETS
    // =================================================

    const ticketCount =
        Number(
            ticketsInput.value
        );


    if (
        !ticketCount ||
        ticketCount < 1
    ) {

        alert(
            "Please select at least 1 ticket."
        );

        isValid = false;

    }


    if (ticketCount > 10) {

        alert(
            "Maximum 10 tickets are allowed."
        );

        isValid = false;

    }


    // =================================================
    // PAYMENT
    // =================================================

    if (
        paymentMethod.value === ""
    ) {

        document.getElementById(
            "paymentError"
        ).textContent =
            "Please select a payment method.";

        isValid = false;

    }


    // =================================================
    // TERMS
    // =================================================

    if (!terms.checked) {

        alert(
            "Please agree to the terms and conditions."
        );

        isValid = false;

    }


    return isValid;

}


// =====================================================
// FORM SUBMIT
// =====================================================

bookingForm.addEventListener(
    "submit",
    function(event) {


        event.preventDefault();


        // Hide old success message

        successBox.style.display =
            "none";


        // Validate

        if (!validateForm()) {

            return;

        }


        // =================================================
        // GET SELECTED EVENT
        // =================================================

        const selectedOption =
            eventSelect.options[
                eventSelect.selectedIndex
            ];


        const eventName =
            selectedOption.value;


        const ticketPrice =
            Number(
                selectedOption.dataset.price
            );


        const eventDate =
            selectedOption.dataset.date;


        const eventLocation =
            selectedOption.dataset.location;


        // =================================================
        // TICKETS
        // =================================================

        const ticketCount =
            Number(
                ticketsInput.value
            );


        // =================================================
        // AMOUNT
        // =================================================

        const subtotal =
            ticketPrice *
            ticketCount;


        const totalAmount =
            subtotal +
            BOOKING_FEE;


        // =================================================
        // BOOKING ID
        // =================================================

        const bookingId =
            "SE" +
            Date.now();


        // =================================================
        // BOOKING DATE
        // =================================================

        const currentDate =
            new Date();


        const bookingDate =
            currentDate.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );


        // =================================================
        // BOOKING OBJECT
        // =================================================

        const booking = {

            id: bookingId,

            customerName:
                customerName.value.trim(),

            email:
                email.value.trim(),

            phone:
                phone.value.trim(),

            event:
                eventName,

            date:
                eventDate,

            location:
                eventLocation,

            tickets:
                ticketCount,

            ticketPrice:
                ticketPrice,

            subtotal:
                subtotal,

            bookingFee:
                BOOKING_FEE,

            amount:
                totalAmount,

            paymentMethod:
                paymentMethod.value,

            status:
                "Confirmed",

            bookingDate:
                bookingDate

        };


        // =================================================
        // GET OLD BOOKINGS
        // =================================================

        let bookings =
            JSON.parse(
                localStorage.getItem(
                    "bookings"
                ) || "[]"
            );


        // =================================================
        // ADD NEW BOOKING
        // =================================================

        bookings.push(
            booking
        );


        // =================================================
        // SAVE BOOKINGS
        // =================================================

        localStorage.setItem(
            "bookings",
            JSON.stringify(
                bookings
            )
        );


        // =================================================
        // SUCCESS MESSAGE
        // =================================================

        successBox.style.display =
            "block";


        successMessage.innerHTML = `

            Your booking for
            <strong>${eventName}</strong>
            has been confirmed.

            <br><br>

            Booking ID:
            <strong>${bookingId}</strong>

            <br>

            Tickets:
            <strong>${ticketCount}</strong>

            <br>

            Total Amount:
            <strong>
                ₹${totalAmount.toLocaleString("en-IN")}
            </strong>

        `;


        // =================================================
        // RESET FORM
        // =================================================

        bookingForm.reset();


        ticketsInput.value =
            1;


        // =================================================
        // RESET SUMMARY
        // =================================================

        updateBookingSummary();


        // =================================================
        // SCROLL TO SUCCESS
        // =================================================

        successBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


// =====================================================
// INITIAL SUMMARY
// =====================================================

updateBookingSummary();
