document.addEventListener("DOMContentLoaded", function () {

    const bookingForm =
        document.getElementById("bookingForm");

    if (!bookingForm) {
        return;
    }

    const eventSelect =
        document.getElementById("bookingEvent");

    const nameInput =
        document.getElementById("bookingName");

    const emailInput =
        document.getElementById("bookingEmail");

    const phoneInput =
        document.getElementById("bookingPhone");

    const ticketPriceInput =
        document.getElementById("ticketPrice");

    const ticketQuantityInput =
        document.getElementById("ticketQuantity");

    const totalAmount =
        document.getElementById("totalAmount");


    const eventPrices = {

        "Tech Innovation Summit 2026": 499,

        "Music & Cultural Festival": 399,

        "Business Networking Meet": 599,

        "Food & Street Festival": 299,

        "Startup & Entrepreneur Expo": 699,

        "Art & Photography Exhibition": 249

    };


    // ================= URL EVENT =================

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const eventId =
        urlParams.get("event");


    const eventNames = {

        "1": "Tech Innovation Summit 2026",

        "2": "Music & Cultural Festival",

        "3": "Business Networking Meet",

        "4": "Food & Street Festival",

        "5": "Startup & Entrepreneur Expo",

        "6": "Art & Photography Exhibition"

    };


    if (
        eventId &&
        eventNames[eventId]
    ) {

        eventSelect.value =
            eventNames[eventId];

        updatePrice();

    }


    // ================= UPDATE PRICE =================

    function updatePrice() {

        const selectedEvent =
            eventSelect.value;

        const price =
            eventPrices[selectedEvent] || 0;

        const quantity =
            Number(ticketQuantityInput.value) || 1;

        ticketPriceInput.value =
            price;

        const total =
            price * quantity;

        totalAmount.textContent =
            "₹" + total.toFixed(2);

    }


    eventSelect.addEventListener(
        "change",
        updatePrice
    );


    ticketQuantityInput.addEventListener(
        "input",
        updatePrice
    );


    // ================= BOOKING SUBMIT =================

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const selectedEvent =
                eventSelect.value;

            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const phone =
                phoneInput.value.trim();

            const quantity =
                Number(
                    ticketQuantityInput.value
                );


            // Validation

            if (!selectedEvent) {

                alert(
                    "Please select an event."
                );

                return;
            }


            if (name.length < 2) {

                alert(
                    "Please enter a valid name."
                );

                return;
            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert(
                    "Please enter a valid email address."
                );

                return;
            }


            const phonePattern =
                /^[0-9]{10}$/;


            if (!phonePattern.test(phone)) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;
            }


            if (
                quantity < 1 ||
                quantity > 10
            ) {

                alert(
                    "Tickets must be between 1 and 10."
                );

                return;
            }


            const price =
                eventPrices[selectedEvent];


            const total =
                price * quantity;


            // ================= BOOKING OBJECT =================

            const booking = {

                bookingId:
                    "BK" +
                    Date.now()
                        .toString()
                        .slice(-8),

                event:
                    selectedEvent,

                name:
                    name,

                email:
                    email,

                phone:
                    phone,

                tickets:
                    quantity,

                ticketPrice:
                    price,

                totalAmount:
                    total,

                bookingDate:
                    new Date()
                        .toLocaleDateString(
                            "en-IN"
                        ),

                status:
                    "Confirmed"

            };


            // ================= SAVE BOOKING =================

            let bookings =
                JSON.parse(
                    localStorage.getItem(
                        "bookings"
                    )
                ) || [];


            bookings.push(booking);


            localStorage.setItem(
                "bookings",
                JSON.stringify(bookings)
            );


            // ================= SUCCESS =================

            alert(
                "Booking confirmed successfully!\n\n" +
                "Booking ID: " +
                booking.bookingId
            );


            window.location.href =
                "my-bookings.html";

        }
    );


    // Initial price

    updatePrice();

});