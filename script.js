/* =========================================================
SMART EVENT MANAGEMENT & TICKET BOOKING SYSTEM
MAIN JAVASCRIPT
========================================================= */

/* ================= EVENT DATA ================= */

const events = [

```
{
    id: 1,
    name: "Tech Innovation Summit 2026",
    category: "Technology",
    date: "25 September 2026",
    time: "10:00 AM",
    location: "Rajkot Convention Centre",
    price: 499,
    image: "images/event1.jpg",
    status: "Coming Soon",
    description:
        "Join technology enthusiasts, students and professionals to explore artificial intelligence, cloud computing, cybersecurity and the future of technology."
},

{
    id: 2,
    name: "Grand Music Festival 2026",
    category: "Music",
    date: "10 October 2026",
    time: "6:00 PM",
    location: "Open Air Arena, Rajkot",
    price: 799,
    image: "images/event2.jpg",
    status: "Coming Soon",
    description:
        "Enjoy an exciting evening filled with live music, talented performers, entertainment and an unforgettable festival experience."
},

{
    id: 3,
    name: "Business Leadership Conference",
    category: "Business",
    date: "18 October 2026",
    time: "9:30 AM",
    location: "Business Convention Hall",
    price: 599,
    image: "images/event3.jpg",
    status: "Coming Soon",
    description:
        "A professional conference featuring leadership discussions, entrepreneurship ideas, networking opportunities and business strategies."
},

{
    id: 4,
    name: "College Youth Fest 2026",
    category: "College",
    date: "2 November 2026",
    time: "11:00 AM",
    location: "University Campus",
    price: 299,
    image: "images/event4.jpg",
    status: "Coming Soon",
    description:
        "A fun-filled college festival featuring competitions, cultural performances, music, games and exciting student activities."
},

{
    id: 5,
    name: "Startup & Entrepreneur Meetup",
    category: "Startup",
    date: "15 November 2026",
    time: "4:00 PM",
    location: "Innovation Hub, Rajkot",
    price: 399,
    image: "images/event5.jpg",
    status: "Coming Soon",
    description:
        "Meet startup founders, entrepreneurs and innovators while learning about startup ideas, business growth and networking."
},

{
    id: 6,
    name: "Sports Championship 2026",
    category: "Sports",
    date: "5 December 2026",
    time: "8:00 AM",
    location: "City Sports Ground",
    price: 199,
    image: "images/event6.jpg",
    status: "Coming Soon",
    description:
        "Experience an exciting sports championship featuring competitive matches, energetic performances and a memorable sporting atmosphere."
}
```

];

/* =========================================================
LOCAL STORAGE HELPERS
========================================================= */

function getUsers() {

```
try {

    return JSON.parse(
        localStorage.getItem("smartEventUsers")
    ) || [];

} catch (error) {

    return [];

}
```

}

function saveUsers(users) {

```
localStorage.setItem(
    "smartEventUsers",
    JSON.stringify(users)
);
```

}

function getCurrentUser() {

```
try {

    return JSON.parse(
        localStorage.getItem("smartEventCurrentUser")
    );

} catch (error) {

    return null;

}
```

}

function setCurrentUser(user) {

```
localStorage.setItem(
    "smartEventCurrentUser",
    JSON.stringify(user)
);
```

}

function logoutUser() {

```
localStorage.removeItem(
    "smartEventCurrentUser"
);

window.location.href = "index.html";
```

}

function getBookings() {

```
try {

    return JSON.parse(
        localStorage.getItem("smartEventBookings")
    ) || [];

} catch (error) {

    return [];

}
```

}

function saveBookings(bookings) {

```
localStorage.setItem(
    "smartEventBookings",
    JSON.stringify(bookings)
);
```

}

/* =========================================================
IMAGE FALLBACK
========================================================= */

function imageFallback(imageElement, eventName) {

```
imageElement.onerror = function () {

    this.onerror = null;

    this.src =
        "https://placehold.co/900x600/005aa9/ffffff?text=" +
        encodeURIComponent(eventName);

};
```

}

/* =========================================================
NAVBAR
========================================================= */

function updateNavbar() {

```
const currentUser = getCurrentUser();

const loginLinks =
    document.querySelectorAll(".login-link");

const registerLinks =
    document.querySelectorAll(".register-link");

const bookingLinks =
    document.querySelectorAll(".my-bookings-link");

const logoutLinks =
    document.querySelectorAll(".logout-link");


if (currentUser) {

    loginLinks.forEach(function (link) {

        link.style.display = "none";

    });


    registerLinks.forEach(function (link) {

        link.style.display = "none";

    });


    bookingLinks.forEach(function (link) {

        link.style.display = "";

    });


    logoutLinks.forEach(function (link) {

        link.style.display = "";

        link.onclick = function (event) {

            event.preventDefault();

            logoutUser();

        };

    });

} else {

    loginLinks.forEach(function (link) {

        link.style.display = "";

    });


    registerLinks.forEach(function (link) {

        link.style.display = "";

    });


    bookingLinks.forEach(function (link) {

        link.style.display = "none";

    });


    logoutLinks.forEach(function (link) {

        link.style.display = "none";

    });

}
```

}

/* =========================================================
EVENT CARD
========================================================= */

function createEventCard(event) {

```
return `

    <div class="col-lg-4 col-md-6 mb-4">

        <div class="card event-card shadow-sm h-100">

            <div class="event-image-wrapper">

                <img
                    src="${event.image}"
                    class="event-image"
                    alt="${event.name}"
                    onerror="this.onerror=null;this.src='https://placehold.co/900x600/005aa9/ffffff?text=Event+Image';">

                <span class="event-status">
                    ${event.status}
                </span>

            </div>


            <div class="card-body d-flex flex-column">

                <span class="badge bg-light text-primary align-self-start mb-2">

                    ${event.category}

                </span>


                <h5 class="card-title">

                    ${event.name}

                </h5>


                <p class="text-muted mb-2">

                    <i class="bi bi-calendar3 text-primary"></i>

                    ${event.date}

                </p>


                <p class="text-muted mb-2">

                    <i class="bi bi-clock text-primary"></i>

                    ${event.time}

                </p>


                <p class="text-muted mb-3">

                    <i class="bi bi-geo-alt text-primary"></i>

                    ${event.location}

                </p>


                <div
                    class="mt-auto d-flex justify-content-between align-items-center">

                    <strong class="text-primary fs-5">

                        ₹${event.price}

                    </strong>


                    <a
                        href="event-details.html?id=${event.id}"
                        class="btn btn-primary">

                        View Details

                        <i class="bi bi-arrow-right"></i>

                    </a>

                </div>

            </div>

        </div>

    </div>

`;
```

}

/* =========================================================
HOME EVENTS
========================================================= */

function loadHomeEvents() {

```
const container =
    document.getElementById(
        "homeEventsContainer"
    );

if (!container) {

    return;

}


container.innerHTML = "";


events.forEach(function (event) {

    container.innerHTML +=
        createEventCard(event);

});
```

}

/* =========================================================
EVENTS PAGE
========================================================= */

function loadEventsPage() {

```
const container =
    document.getElementById(
        "eventsContainer"
    );

if (!container) {

    return;

}


renderEvents(events);


const searchInput =
    document.getElementById(
        "eventSearch"
    );

const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


function filterEvents() {

    const search =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const category =
        categoryFilter
            ? categoryFilter.value
            : "";


    const filteredEvents =
        events.filter(function (event) {

            const matchesSearch =
                event.name
                    .toLowerCase()
                    .includes(search) ||

                event.category
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "" ||
                event.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    renderEvents(filteredEvents);

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterEvents
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterEvents
    );

}
```

}

function renderEvents(eventList) {

```
const container =
    document.getElementById(
        "eventsContainer"
    );

if (!container) {

    return;

}


if (eventList.length === 0) {

    container.innerHTML = `

        <div class="col-12 text-center py-5">

            <i
                class="bi bi-calendar-x text-muted"
                style="font-size:60px;">
            </i>

            <h4 class="mt-3">
                No Events Found
            </h4>

            <p class="text-muted">
                Try another search or category.
            </p>

        </div>

    `;

    return;

}


container.innerHTML = "";

eventList.forEach(function (event) {

    container.innerHTML +=
        createEventCard(event);

});
```

}

/* =========================================================
EVENT DETAILS PAGE
========================================================= */

function loadEventDetails() {

```
const container =
    document.getElementById(
        "eventDetails"
    );

if (!container) {

    return;

}


const params =
    new URLSearchParams(
        window.location.search
    );


const eventId =
    Number(
        params.get("id")
    );


const event =
    events.find(function (item) {

        return item.id === eventId;

    });


if (!event) {

    container.innerHTML = `

        <div class="text-center py-5">

            <i
                class="bi bi-exclamation-circle text-danger"
                style="font-size:60px;">
            </i>

            <h2 class="mt-3">
                Event Not Found
            </h2>

            <p class="text-muted">
                The selected event does not exist.
            </p>

            <a
                href="events.html"
                class="btn btn-primary">

                Back to Events

            </a>

        </div>

    `;

    return;

}


container.innerHTML = `

    <div class="row g-5 align-items-start">


        <div class="col-lg-6">

            <img
                src="${event.image}"
                class="event-detail-image shadow-sm"
                alt="${event.name}"
                onerror="this.onerror=null;this.src='https://placehold.co/900x600/005aa9/ffffff?text=Event+Image';">

        </div>


        <div class="col-lg-6">

            <span class="badge bg-primary mb-3">

                ${event.status}

            </span>


            <span class="badge bg-light text-primary mb-3 ms-2">

                ${event.category}

            </span>


            <h1 class="mb-3">

                ${event.name}

            </h1>


            <p class="lead text-muted">

                ${event.description}

            </p>


            <hr>


            <div class="row g-3 mb-4">


                <div class="col-sm-6">

                    <div class="d-flex">

                        <i
                            class="bi bi-calendar3 text-primary fs-4 me-3">
                        </i>

                        <div>

                            <small class="text-muted">
                                Date
                            </small>

                            <div class="fw-semibold">
                                ${event.date}
                            </div>

                        </div>

                    </div>

                </div>


                <div class="col-sm-6">

                    <div class="d-flex">

                        <i
                            class="bi bi-clock text-primary fs-4 me-3">
                        </i>

                        <div>

                            <small class="text-muted">
                                Time
                            </small>

                            <div class="fw-semibold">
                                ${event.time}
                            </div>

                        </div>

                    </div>

                </div>


                <div class="col-sm-6">

                    <div class="d-flex">

                        <i
                            class="bi bi-geo-alt text-primary fs-4 me-3">
                        </i>

                        <div>

                            <small class="text-muted">
                                Location
                            </small>

                            <div class="fw-semibold">
                                ${event.location}
                            </div>

                        </div>

                    </div>

                </div>


                <div class="col-sm-6">

                    <div class="d-flex">

                        <i
                            class="bi bi-ticket-perforated text-primary fs-4 me-3">
                        </i>

                        <div>

                            <small class="text-muted">
                                Ticket Price
                            </small>

                            <div class="fw-bold text-primary">
                                ₹${event.price}
                            </div>

                        </div>

                    </div>

                </div>


            </div>


            <div class="d-flex flex-wrap gap-3">


                <button
                    type="button"
                    class="btn btn-primary btn-lg"
                    onclick="startBooking(${event.id})">

                    <i class="bi bi-ticket-perforated"></i>

                    Book Now

                </button>


                <a
                    href="events.html"
                    class="btn btn-outline-primary btn-lg">

                    <i class="bi bi-arrow-left"></i>

                    Back to Events

                </a>


            </div>

        </div>

    </div>

`;
```

}

/* =========================================================
START BOOKING
========================================================= */

function startBooking(eventId) {

```
const currentUser =
    getCurrentUser();


if (!currentUser) {

    alert(
        "Please login first to book a ticket."
    );

    window.location.href =
        "login.html?redirect=booking&event=" +
        eventId;

    return;

}


window.location.href =
    "booking.html?id=" +
    eventId;
```

}

/* =========================================================
BOOKING PAGE
========================================================= */

function loadBookingPage() {

```
const detailsContainer =
    document.getElementById(
        "bookingDetails"
    );

const bookingForm =
    document.getElementById(
        "bookingForm"
    );

const quantityInput =
    document.getElementById(
        "ticketQuantity"
    );

const totalPrice =
    document.getElementById(
        "totalPrice"
    );


if (
    !detailsContainer ||
    !bookingForm
) {

    return;

}


const currentUser =
    getCurrentUser();


if (!currentUser) {

    alert(
        "Please login first."
    );

    window.location.href =
        "login.html";

    return;

}


const params =
    new URLSearchParams(
        window.location.search
    );


const eventId =
    Number(
        params.get("id")
    );


const event =
    events.find(function (item) {

        return item.id === eventId;

    });


if (!event) {

    detailsContainer.innerHTML = `

        <div class="alert alert-danger">

            Event not found.

        </div>

    `;

    bookingForm.style.display = "none";

    return;

}


detailsContainer.innerHTML = `

    <div class="booking-card">

        <img
            src="${event.image}"
            class="booking-image rounded mb-4"
            alt="${event.name}"
            onerror="this.onerror=null;this.src='https://placehold.co/900x600/005aa9/ffffff?text=Event+Image';">


        <span class="badge bg-primary mb-2">

            ${event.category}

        </span>


        <h4 class="mb-3">

            ${event.name}

        </h4>


        <p class="mb-2">

            <i class="bi bi-calendar3 text-primary me-2"></i>

            ${event.date}

        </p>


        <p class="mb-2">

            <i class="bi bi-clock text-primary me-2"></i>

            ${event.time}

        </p>


        <p class="mb-2">

            <i class="bi bi-geo-alt text-primary me-2"></i>

            ${event.location}

        </p>


        <p class="mb-0">

            <i class="bi bi-ticket-perforated text-primary me-2"></i>

            ₹${event.price} per ticket

        </p>

    </div>

`;


function updateTotal() {

    let quantity =
        Number(
            quantityInput.value
        );


    if (
        !quantity ||
        quantity < 1
    ) {

        quantity = 1;

        quantityInput.value = 1;

    }


    if (quantity > 10) {

        quantity = 10;

        quantityInput.value = 10;

    }


    const total =
        quantity * event.price;


    totalPrice.textContent =
        "₹" + total;

}


quantityInput.addEventListener(
    "input",
    updateTotal
);


updateTotal();


bookingForm.addEventListener(
    "submit",
    function (submitEvent) {

        submitEvent.preventDefault();


        const quantity =
            Number(
                quantityInput.value
            );


        const terms =
            document.getElementById(
                "bookingTerms"
            );


        if (
            quantity < 1 ||
            quantity > 10
        ) {

            alert(
                "Please select between 1 and 10 tickets."
            );

            return;

        }


        if (
            terms &&
            !terms.checked
        ) {

            alert(
                "Please confirm the booking information."
            );

            return;

        }


        const bookings =
            getBookings();


        const bookingId =
            "SE" +
            Date.now()
                .toString()
                .slice(-8);


        const booking = {

            id: bookingId,

            userEmail:
                currentUser.email,

            userName:
                currentUser.name,

            eventId:
                event.id,

            eventName:
                event.name,

            category:
                event.category,

            date:
                event.date,

            time:
                event.time,

            location:
                event.location,

            image:
                event.image,

            ticketPrice:
                event.price,

            quantity:
                quantity,

            total:
                quantity * event.price,

            bookingDate:
                new Date()
                    .toLocaleDateString(
                        "en-IN"
                    ),

            status:
                "Confirmed"

        };


        bookings.push(booking);

        saveBookings(bookings);


        window.location.href =
            "my-bookings.html?success=1";

    }
);
```

}

/* =========================================================
MY BOOKINGS PAGE
========================================================= */

function loadMyBookings() {

```
const container =
    document.getElementById(
        "myBookingsContainer"
    );


if (!container) {

    return;

}


const currentUser =
    getCurrentUser();


if (!currentUser) {

    container.innerHTML = `

        <div class="text-center py-5">

            <i
                class="bi bi-person-lock text-primary"
                style="font-size:60px;">
            </i>

            <h3 class="mt-3">
                Login Required
            </h3>

            <p class="text-muted">
                Please login to view your bookings.
            </p>

            <a
                href="login.html"
                class="btn btn-primary">

                Login

            </a>

        </div>

    `;

    return;

}


const bookings =
    getBookings().filter(
        function (booking) {

            return (
                booking.userEmail ===
                currentUser.email
            );

        }
    );


if (bookings.length === 0) {

    container.innerHTML = `

        <div class="text-center py-5">

            <i
                class="bi bi-ticket-perforated text-muted"
                style="font-size:70px;">
            </i>

            <h3 class="mt-3">
                No Bookings Yet
            </h3>

            <p class="text-muted">
                You haven't booked any events yet.
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


container.innerHTML = `

    <div class="row g-4">

        ${bookings.map(
            createBookingCard
        ).join("")}

    </div>

`;
```

}

function createBookingCard(booking) {

```
return `

    <div class="col-lg-6">

        <div class="card border-0 shadow-sm booking-card h-100">

            <div class="row g-0">


                <div class="col-md-5">

                    <img
                        src="${booking.image}"
                        class="booking-image h-100"
                        alt="${booking.eventName}"
                        onerror="this.onerror=null;this.src='https://placehold.co/600x500/005aa9/ffffff?text=Event+Image';">

                </div>


                <div class="col-md-7">

                    <div class="card-body">

                        <span class="badge bg-success mb-2">

                            <i class="bi bi-check-circle"></i>

                            ${booking.status}

                        </span>


                        <h5 class="fw-bold">

                            ${booking.eventName}

                        </h5>


                        <p class="small text-muted mb-2">

                            <i class="bi bi-calendar3"></i>

                            ${booking.date}

                        </p>


                        <p class="small text-muted mb-2">

                            <i class="bi bi-clock"></i>

                            ${booking.time}

                        </p>


                        <p class="small text-muted mb-2">

                            <i class="bi bi-geo-alt"></i>

                            ${booking.location}

                        </p>


                        <hr>


                        <p class="mb-1">

                            <strong>
                                Booking ID:
                            </strong>

                            ${booking.id}

                        </p>


                        <p class="mb-1">

                            <strong>
                                Tickets:
                            </strong>

                            ${booking.quantity}

                        </p>


                        <p class="mb-1">

                            <strong>
                                Total:
                            </strong>

                            <span class="text-primary fw-bold">

                                ₹${booking.total}

                            </span>

                        </p>


                        <p class="small text-muted mb-0">

                            Booked on:
                            ${booking.bookingDate}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    </div>

`;
```

}

/* =========================================================
REGISTER
========================================================= */

function setupRegisterForm() {

```
const form =
    document.getElementById(
        "registerForm"
    );


if (!form) {

    return;

}


form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "registerName"
            ).value.trim();


        const email =
            document.getElementById(
                "registerEmail"
            ).value.trim()
                .toLowerCase();


        const password =
            document.getElementById(
                "registerPassword"
            ).value;


        const confirmPasswordElement =
            document.getElementById(
                "confirmPassword"
            );


        const confirmPassword =
            confirmPasswordElement
                ? confirmPasswordElement.value
                : password;


        const message =
            document.getElementById(
                "registerMessage"
            );


        function showRegisterMessage(
            text,
            type
        ) {

            if (!message) {

                alert(text);

                return;

            }


            message.className =
                "alert alert-" + type;


            message.textContent =
                text;


            message.style.display =
                "block";

        }


        if (
            name.length < 2
        ) {

            showRegisterMessage(
                "Please enter your full name.",
                "danger"
            );

            return;

        }


        if (
            !email
        ) {

            showRegisterMessage(
                "Please enter your email.",
                "danger"
            );

            return;

        }


        if (
            password.length < 6
        ) {

            showRegisterMessage(
                "Password must contain at least 6 characters.",
                "danger"
            );

            return;

        }


        if (
            password !==
            confirmPassword
        ) {

            showRegisterMessage(
                "Passwords do not match.",
                "danger"
            );

            return;

        }


        const users =
            getUsers();


        const existingUser =
            users.find(
                function (user) {

                    return (
                        user.email ===
                        email
                    );

                }
            );


        if (existingUser) {

            showRegisterMessage(
                "This email is already registered. Please login.",
                "warning"
            );

            return;

        }


        const newUser = {

            id:
                Date.now(),

            name:
                name,

            email:
                email,

            password:
                password

        };


        users.push(
            newUser
        );


        saveUsers(
            users
        );


        showRegisterMessage(
            "Registration completed successfully! Redirecting to login...",
            "success"
        );


        form.reset();


        setTimeout(
            function () {

                window.location.href =
                    "login.html";

            },
            1200
        );

    }
);
```

}

/* =========================================================
LOGIN
========================================================= */

function setupLoginForm() {

```
const form =
    document.getElementById(
        "loginForm"
    );


if (!form) {

    return;

}


form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const email =
            document.getElementById(
                "loginEmail"
            ).value.trim()
                .toLowerCase();


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        const message =
            document.getElementById(
                "loginMessage"
            );


        function showLoginMessage(
            text,
            type
        ) {

            if (!message) {

                alert(text);

                return;

            }


            message.className =
                "alert alert-" + type;


            message.textContent =
                text;


            message.style.display =
                "block";

        }


        const users =
            getUsers();


        const user =
            users.find(
                function (item) {

                    return (
                        item.email ===
                        email &&
                        item.password ===
                        password
                    );

                }
            );


        if (!user) {

            showLoginMessage(
                "Invalid email or password.",
                "danger"
            );

            return;

        }


        setCurrentUser({

            id:
                user.id,

            name:
                user.name,

            email:
                user.email

        });


        showLoginMessage(
            "Login successful! Redirecting...",
            "success"
        );


        const params =
            new URLSearchParams(
                window.location.search
            );


        const redirect =
            params.get(
                "redirect"
            );


        const eventId =
            params.get(
                "event"
            );


        setTimeout(
            function () {

                if (
                    redirect ===
                    "booking" &&
                    eventId
                ) {

                    window.location.href =
                        "booking.html?id=" +
                        eventId;

                } else {

                    window.location.href =
                        "index.html";

                }

            },
            800
        );

    }
);
```

}

/* =========================================================
PAGE INITIALIZATION
========================================================= */

document.addEventListener(
"DOMContentLoaded",
function () {

```
    updateNavbar();

    loadHomeEvents();

    loadEventsPage();

    loadEventDetails();

    loadBookingPage();

    loadMyBookings();

    setupRegisterForm();

    setupLoginForm();

}
```

);
