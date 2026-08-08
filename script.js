/* =========================================================
   SMART EVENT MANAGEMENT & TICKET BOOKING SYSTEM
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    initializeEvents();
    initializeRegister();
    initializeLogin();
    initializeEventDetails();
    initializeBooking();
    initializeMyBookings();
    updateNavbar();
});


/* =========================================================
   EVENT DATA
   ========================================================= */

const events = [
    {
        id: 1,
        name: "Tech Innovation Summit 2026",
        category: "Technology",
        date: "2026-09-15",
        time: "10:00 AM",
        location: "Rajkot Convention Centre",
        price: 499,
        image: "event1.jpg",
        status: "Coming Soon",
        description:
            "Join an exciting technology summit featuring innovation, artificial intelligence, web development and future technologies."
    },

    {
        id: 2,
        name: "Music & Cultural Night",
        category: "Music",
        date: "2026-09-25",
        time: "07:00 PM",
        location: "Rajkot Auditorium",
        price: 299,
        image: "event2.jpg",
        status: "Coming Soon",
        description:
            "Enjoy a memorable evening filled with music, culture, entertainment and amazing performances."
    },

    {
        id: 3,
        name: "Business Leadership Conference",
        category: "Business",
        date: "2026-10-05",
        time: "09:30 AM",
        location: "Grand Palace Hall",
        price: 799,
        image: "event3.jpg",
        status: "Coming Soon",
        description:
            "A professional conference focused on leadership, entrepreneurship, business growth and future opportunities."
    },

    {
        id: 4,
        name: "College Fest 2026",
        category: "College",
        date: "2026-10-15",
        time: "11:00 AM",
        location: "University Campus",
        price: 199,
        image: "event4.jpg",
        status: "Coming Soon",
        description:
            "A complete college festival featuring competitions, cultural activities, music, food and entertainment."
    },

    {
        id: 5,
        name: "Startup & Entrepreneurship Meet",
        category: "Startup",
        date: "2026-11-01",
        time: "10:00 AM",
        location: "Innovation Hub",
        price: 399,
        image: "event5.jpg",
        status: "Coming Soon",
        description:
            "Meet entrepreneurs, startup founders and innovators while learning about business ideas and opportunities."
    },

    {
        id: 6,
        name: "Sports & Fitness Carnival",
        category: "Sports",
        date: "2026-11-15",
        time: "08:00 AM",
        location: "City Sports Ground",
        price: 249,
        image: "event6.jpg",
        status: "Coming Soon",
        description:
            "A fun-filled sports carnival with games, activities, fitness sessions and exciting competitions."
    }
];


/* =========================================================
   LOCAL STORAGE HELPERS
   ========================================================= */

function getUsers() {
    return JSON.parse(localStorage.getItem("smartEventUsers")) || [];
}

function saveUsers(users) {
    localStorage.setItem("smartEventUsers", JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("smartEventCurrentUser"));
}

function setCurrentUser(user) {
    localStorage.setItem(
        "smartEventCurrentUser",
        JSON.stringify(user)
    );
}

function logoutUser() {
    localStorage.removeItem("smartEventCurrentUser");
    window.location.href = "index.html";
}

function getBookings() {
    return JSON.parse(localStorage.getItem("smartEventBookings")) || [];
}

function saveBookings(bookings) {
    localStorage.setItem(
        "smartEventBookings",
        JSON.stringify(bookings)
    );
}


/* =========================================================
   NAVBAR
   ========================================================= */

function updateNavbar() {

    const user = getCurrentUser();

    const loginLinks =
        document.querySelectorAll(".login-link");

    const registerLinks =
        document.querySelectorAll(".register-link");

    const logoutLinks =
        document.querySelectorAll(".logout-link");

    const myBookingLinks =
        document.querySelectorAll(".my-bookings-link");

    if (user) {

        loginLinks.forEach(link => {
            link.style.display = "none";
        });

        registerLinks.forEach(link => {
            link.style.display = "none";
        });

        myBookingLinks.forEach(link => {
            link.style.display = "inline-block";
        });

        logoutLinks.forEach(link => {
            link.style.display = "inline-block";

            link.onclick = function (e) {
                e.preventDefault();
                logoutUser();
            };
        });

    } else {

        myBookingLinks.forEach(link => {
            link.style.display = "none";
        });

        logoutLinks.forEach(link => {
            link.style.display = "none";
        });

        loginLinks.forEach(link => {
            link.style.display = "inline-block";
        });

        registerLinks.forEach(link => {
            link.style.display = "inline-block";
        });
    }
}


/* =========================================================
   EVENTS PAGE
   ========================================================= */

function initializeEvents() {

    const eventContainer =
        document.getElementById("eventsContainer");

    if (!eventContainer) {
        return;
    }

    displayEvents(events);

    const searchInput =
        document.getElementById("eventSearch");

    const categoryFilter =
        document.getElementById("categoryFilter");

    if (searchInput) {
        searchInput.addEventListener("input", filterEvents);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterEvents);
    }
}


function displayEvents(eventList) {

    const container =
        document.getElementById("eventsContainer");

    if (!container) {
        return;
    }

    if (eventList.length === 0) {

        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    No events found.
                </div>
            </div>
        `;

        return;
    }

    container.innerHTML = eventList.map(event => {

        return `
            <div class="col-lg-4 col-md-6 mb-4">

                <div class="card event-card h-100 shadow-sm">

                    <div class="event-image-wrapper">

                        <img
                            src="${event.image}"
                            class="card-img-top event-image"
                            alt="${event.name}"
                            onerror="this.src='https://via.placeholder.com/800x500?text=Event+Image'"
                        >

                        <span class="event-status">
                            ${event.status}
                        </span>

                    </div>

                    <div class="card-body d-flex flex-column">

                        <span class="badge bg-primary mb-2 align-self-start">
                            ${event.category}
                        </span>

                        <h5 class="card-title">
                            ${event.name}
                        </h5>

                        <p class="text-muted mb-1">
                            📅 ${formatDate(event.date)}
                        </p>

                        <p class="text-muted mb-1">
                            ⏰ ${event.time}
                        </p>

                        <p class="text-muted">
                            📍 ${event.location}
                        </p>

                        <div class="mt-auto">

                            <div class="d-flex justify-content-between align-items-center mb-3">

                                <strong class="text-primary">
                                    ₹${event.price}
                                </strong>

                                <span class="small text-muted">
                                    per ticket
                                </span>

                            </div>

                            <a
                                href="event-details.html?id=${event.id}"
                                class="btn btn-primary w-100"
                            >
                                View Details
                            </a>

                        </div>

                    </div>

                </div>

            </div>
        `;

    }).join("");
}


function filterEvents() {

    const search =
        document.getElementById("eventSearch")
            ?.value
            .toLowerCase()
            .trim() || "";

    const category =
        document.getElementById("categoryFilter")
            ?.value || "";

    const filteredEvents = events.filter(event => {

        const matchesSearch =
            event.name.toLowerCase().includes(search) ||
            event.category.toLowerCase().includes(search);

        const matchesCategory =
            category === "" ||
            event.category === category;

        return matchesSearch && matchesCategory;

    });

    displayEvents(filteredEvents);
}


/* =========================================================
   REGISTER
   ========================================================= */

function initializeRegister() {

    const registerForm =
        document.getElementById("registerForm");

    if (!registerForm) {
        return;
    }

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim().toLowerCase();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("registerMessage");


        if (!name || !email || !password || !confirmPassword) {

            showMessage(
                message,
                "Please fill all fields.",
                "danger"
            );

            return;
        }


        if (password.length < 6) {

            showMessage(
                message,
                "Password must contain at least 6 characters.",
                "danger"
            );

            return;
        }


        if (password !== confirmPassword) {

            showMessage(
                message,
                "Passwords do not match.",
                "danger"
            );

            return;
        }


        const users = getUsers();

        const existingUser =
            users.find(user => user.email === email);

        if (existingUser) {

            showMessage(
                message,
                "An account with this email already exists.",
                "danger"
            );

            return;
        }


        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password
        };


        users.push(newUser);

        saveUsers(users);


        showMessage(
            message,
            "Registration completed successfully! Redirecting to login...",
            "success"
        );


        registerForm.reset();


        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 1500);

    });
}


/* =========================================================
   LOGIN
   ========================================================= */

function initializeLogin() {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
            document.getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("loginPassword")
                .value;

        const message =
            document.getElementById("loginMessage");


        const users = getUsers();

        const user =
            users.find(
                u =>
                    u.email === email &&
                    u.password === password
            );


        if (!user) {

            showMessage(
                message,
                "Invalid email or password.",
                "danger"
            );

            return;
        }


        setCurrentUser({
            id: user.id,
            name: user.name,
            email: user.email
        });


        showMessage(
            message,
            "Login successful! Redirecting...",
            "success"
        );


        setTimeout(() => {

            window.location.href =
                "index.html";

        }, 1000);

    });
}


/* =========================================================
   EVENT DETAILS
   ========================================================= */

function initializeEventDetails() {

    const detailsContainer =
        document.getElementById("eventDetails");

    if (!detailsContainer) {
        return;
    }


    const params =
        new URLSearchParams(window.location.search);

    const eventId =
        parseInt(params.get("id"));


    const event =
        events.find(e => e.id === eventId);


    if (!event) {

        detailsContainer.innerHTML = `
            <div class="alert alert-danger text-center">
                Event not found.
            </div>
        `;

        return;
    }


    detailsContainer.innerHTML = `

        <div class="row align-items-center">

            <div class="col-lg-6 mb-4">

                <img
                    src="${event.image}"
                    class="img-fluid rounded shadow event-detail-image"
                    alt="${event.name}"
                    onerror="this.src='https://via.placeholder.com/900x600?text=Event+Image'"
                >

            </div>


            <div class="col-lg-6">

                <span class="badge bg-primary mb-3">
                    ${event.category}
                </span>

                <h1 class="fw-bold mb-3">
                    ${event.name}
                </h1>

                <p class="lead text-muted">
                    ${event.description}
                </p>

                <hr>

                <p>
                    <strong>📅 Date:</strong>
                    ${formatDate(event.date)}
                </p>

                <p>
                    <strong>⏰ Time:</strong>
                    ${event.time}
                </p>

                <p>
                    <strong>📍 Location:</strong>
                    ${event.location}
                </p>

                <p>
                    <strong>🎫 Ticket Price:</strong>
                    ₹${event.price}
                </p>

                <div class="alert alert-info">
                    ${event.status}
                </div>

                <button
                    class="btn btn-primary btn-lg w-100"
                    onclick="startBooking(${event.id})"
                >
                    Book Now
                </button>

            </div>

        </div>
    `;
}


/* =========================================================
   BOOKING START
   ========================================================= */

function startBooking(eventId) {

    const user = getCurrentUser();

    if (!user) {

        alert(
            "Please login or register before booking an event."
        );

        window.location.href =
            "login.html?redirect=event-details.html?id=" +
            eventId;

        return;
    }


    window.location.href =
        "booking.html?id=" + eventId;
}


/* =========================================================
   BOOKING PAGE
   ========================================================= */

function initializeBooking() {

    const bookingForm =
        document.getElementById("bookingForm");

    if (!bookingForm) {
        return;
    }


    const user = getCurrentUser();

    if (!user) {

        window.location.href =
            "login.html";

        return;
    }


    const params =
        new URLSearchParams(window.location.search);

    const eventId =
        parseInt(params.get("id"));


    const event =
        events.find(e => e.id === eventId);


    if (!event) {

        document.getElementById("bookingDetails").innerHTML = `
            <div class="alert alert-danger">
                Event not found.
            </div>
        `;

        return;
    }


    const bookingDetails =
        document.getElementById("bookingDetails");


    bookingDetails.innerHTML = `

        <div class="row">

            <div class="col-md-5">

                <img
                    src="${event.image}"
                    class="img-fluid rounded"
                    alt="${event.name}"
                >

            </div>

            <div class="col-md-7">

                <h3>${event.name}</h3>

                <p>
                    <strong>Date:</strong>
                    ${formatDate(event.date)}
                </p>

                <p>
                    <strong>Time:</strong>
                    ${event.time}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${event.location}
                </p>

                <p>
                    <strong>Price per ticket:</strong>
                    ₹${event.price}
                </p>

            </div>

        </div>
    `;


    const quantityInput =
        document.getElementById("ticketQuantity");

    const totalPrice =
        document.getElementById("totalPrice");


    function calculateTotal() {

        let quantity =
            parseInt(quantityInput.value) || 1;

        if (quantity < 1) {
            quantity = 1;
            quantityInput.value = 1;
        }

        if (quantity > 10) {
            quantity = 10;
            quantityInput.value = 10;
        }

        totalPrice.textContent =
            "₹" + (event.price * quantity);

    }


    quantityInput.addEventListener(
        "input",
        calculateTotal
    );


    calculateTotal();


    bookingForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const quantity =
                parseInt(quantityInput.value);


            if (
                isNaN(quantity) ||
                quantity < 1 ||
                quantity > 10
            ) {

                alert(
                    "Please select between 1 and 10 tickets."
                );

                return;
            }


            const bookings =
                getBookings();


            const alreadyBooked =
                bookings.some(
                    booking =>
                        booking.eventId === event.id &&
                        booking.userId === user.id
                );


            if (alreadyBooked) {

                alert(
                    "You have already booked this event."
                );

                window.location.href =
                    "my-bookings.html";

                return;
            }


            const booking = {

                id: "BK" + Date.now(),

                userId: user.id,

                userName: user.name,

                userEmail: user.email,

                eventId: event.id,

                eventName: event.name,

                eventDate: event.date,

                eventTime: event.time,

                eventLocation: event.location,

                eventImage: event.image,

                quantity: quantity,

                pricePerTicket: event.price,

                totalPrice: event.price * quantity,

                bookingDate:
                    new Date().toLocaleString(),

                status: "Confirmed"

            };


            bookings.push(booking);

            saveBookings(bookings);


            window.location.href =
                "my-bookings.html?success=1";

        }
    );
}


/* =========================================================
   MY BOOKINGS
   ========================================================= */

function initializeMyBookings() {

    const container =
        document.getElementById("myBookingsContainer");

    if (!container) {
        return;
    }


    const user = getCurrentUser();


    if (!user) {

        container.innerHTML = `
            <div class="alert alert-warning text-center">

                Please login to view your bookings.

                <br><br>

                <a href="login.html"
                   class="btn btn-primary">
                    Login
                </a>

            </div>
        `;

        return;
    }


    const bookings =
        getBookings().filter(
            booking =>
                booking.userId === user.id
        );


    if (bookings.length === 0) {

        container.innerHTML = `

            <div class="text-center py-5">

                <h3>No bookings yet</h3>

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

        `;

        return;
    }


    container.innerHTML =
        bookings.map(booking => `

            <div class="card booking-card mb-4 shadow-sm">

                <div class="row g-0">

                    <div class="col-md-4">

                        <img
                            src="${booking.eventImage}"
                            class="img-fluid h-100 booking-image"
                            alt="${booking.eventName}"
                        >

                    </div>


                    <div class="col-md-8">

                        <div class="card-body">

                            <div class="d-flex justify-content-between">

                                <h4>
                                    ${booking.eventName}
                                </h4>

                                <span class="badge bg-success">
                                    ${booking.status}
                                </span>

                            </div>


                            <p class="mb-1">
                                📅 ${formatDate(booking.eventDate)}
                            </p>

                            <p class="mb-1">
                                ⏰ ${booking.eventTime}
                            </p>

                            <p class="mb-1">
                                📍 ${booking.eventLocation}
                            </p>

                            <hr>


                            <div class="row">

                                <div class="col-md-6">

                                    <strong>
                                        Booking ID
                                    </strong>

                                    <p>
                                        ${booking.id}
                                    </p>

                                </div>


                                <div class="col-md-6">

                                    <strong>
                                        Tickets
                                    </strong>

                                    <p>
                                        ${booking.quantity}
                                    </p>

                                </div>


                                <div class="col-md-6">

                                    <strong>
                                        Total Amount
                                    </strong>

                                    <p class="text-primary fw-bold">
                                        ₹${booking.totalPrice}
                                    </p>

                                </div>


                                <div class="col-md-6">

                                    <strong>
                                        Booked On
                                    </strong>

                                    <p>
                                        ${booking.bookingDate}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        `).join("");
}


/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


function showMessage(element, text, type) {

    if (!element) {
        return;
    }

    element.className =
        "alert alert-" + type;

    element.textContent = text;

    element.style.display = "block";
}


/* =========================================================
   GLOBAL FUNCTIONS
   ========================================================= */

window.startBooking = startBooking;
window.logoutUser = logoutUser;
window.filterEvents = filterEvents;
