/* =========================================================
   SMART EVENT MANAGEMENT SYSTEM
   FINAL WORKING SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       STORAGE KEYS
       ===================================================== */

    const USERS_KEY = "smartEventUsers";
    const CURRENT_USER_KEY = "smartEventCurrentUser";
    const BOOKINGS_KEY = "smartEventBookings";


    /* =====================================================
       EVENT DATA
       ===================================================== */

    const events = [
        {
            id: 1,
            name: "Future Tech Summit 2026",
            category: "Technology",
            date: "20 September 2026",
            time: "10:00 AM",
            location: "Ahmedabad Convention Centre",
            price: 499,
            image: "event1.jpg",
            description: "A technology event featuring innovation, artificial intelligence, startups and future technologies."
        },

        {
            id: 2,
            name: "Live Music Festival",
            category: "Music",
            date: "27 September 2026",
            time: "6:00 PM",
            location: "Rajkot City Ground",
            price: 799,
            image: "event2.jpg",
            description: "Enjoy an exciting evening of live music, entertainment and performances."
        },

        {
            id: 3,
            name: "Business Leadership Conference",
            category: "Business",
            date: "4 October 2026",
            time: "9:30 AM",
            location: "Grand Business Hall, Ahmedabad",
            price: 999,
            image: "event3.jpg",
            description: "Learn business strategies, leadership skills and modern management techniques."
        },

        {
            id: 4,
            name: "College Cultural Fest",
            category: "College",
            date: "11 October 2026",
            time: "11:00 AM",
            location: "University Auditorium",
            price: 299,
            image: "event4.jpg",
            description: "A fun-filled college festival with cultural performances, competitions and activities."
        },

        {
            id: 5,
            name: "Startup & Innovation Expo",
            category: "Startup",
            date: "18 October 2026",
            time: "10:00 AM",
            location: "Startup Hub, Ahmedabad",
            price: 599,
            image: "event5.jpg",
            description: "Explore innovative startups, new ideas, entrepreneurs and business opportunities."
        },

        {
            id: 6,
            name: "Sports Championship",
            category: "Sports",
            date: "25 October 2026",
            time: "8:00 AM",
            location: "Sports Complex, Rajkot",
            price: 399,
            image: "event6.jpg",
            description: "Experience an exciting sports championship with multiple competitions."
        },

        {
            id: 7,
            name: "Digital Marketing Workshop",
            category: "Technology",
            date: "1 November 2026",
            time: "10:00 AM",
            location: "Digital Learning Centre",
            price: 449,
            image: "event7.jpg",
            description: "Learn SEO, social media marketing, content marketing and digital growth strategies."
        },

        {
            id: 8,
            name: "Youth Music Night",
            category: "Music",
            date: "8 November 2026",
            time: "7:00 PM",
            location: "Open Air Arena",
            price: 699,
            image: "event8.jpg",
            description: "A special music night created for young music lovers and performers."
        },

        {
            id: 9,
            name: "Entrepreneurship Meetup",
            category: "Business",
            date: "15 November 2026",
            time: "11:00 AM",
            location: "Business Innovation Centre",
            price: 349,
            image: "event9.jpg",
            description: "Meet entrepreneurs, discuss ideas and learn from successful business founders."
        },

        {
            id: 10,
            name: "AI & Robotics Exhibition",
            category: "Technology",
            date: "22 November 2026",
            time: "10:30 AM",
            location: "Science & Technology Hall",
            price: 549,
            image: "event10.jpg",
            description: "Discover artificial intelligence, robotics and the technologies shaping the future."
        },

        {
            id: 11,
            name: "Mega Entertainment Fest",
            category: "College",
            date: "29 November 2026",
            time: "5:00 PM",
            location: "City Entertainment Ground",
            price: 899,
            image: "event11.jpg",
            description: "A complete entertainment experience with performances, activities and fun."
        }
    ];


    /* =====================================================
       HELPER FUNCTIONS
       ===================================================== */

    function getUsers() {

        try {

            return JSON.parse(
                localStorage.getItem(USERS_KEY)
            ) || [];

        } catch (error) {

            return [];

        }
    }


    function saveUsers(users) {

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(users)
        );

    }


    function getBookings() {

        try {

            return JSON.parse(
                localStorage.getItem(BOOKINGS_KEY)
            ) || [];

        } catch (error) {

            return [];

        }
    }


    function saveBookings(bookings) {

        localStorage.setItem(
            BOOKINGS_KEY,
            JSON.stringify(bookings)
        );

    }


    function getCurrentUser() {

        try {

            return JSON.parse(
                localStorage.getItem(CURRENT_USER_KEY)
            );

        } catch (error) {

            return null;

        }

    }


    function showMessage(element, message, type) {

        if (!element) return;

        element.className = "alert alert-" + type;
        element.textContent = message;
        element.style.display = "block";

    }


    function getEventId() {

        const params =
            new URLSearchParams(
                window.location.search
            );

        return Number(
            params.get("id")
        );

    }


    function getSelectedEvent() {

        const id = getEventId();

        return events.find(
            event => event.id === id
        );

    }


    /* =====================================================
       REGISTER
       ===================================================== */

    const registerForm =
        document.getElementById(
            "registerForm"
        );


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const name =
                    document.getElementById(
                        "registerName"
                    ).value.trim();


                const email =
                    document.getElementById(
                        "registerEmail"
                    ).value.trim().toLowerCase();


                const password =
                    document.getElementById(
                        "registerPassword"
                    ).value;


                const confirmPassword =
                    document.getElementById(
                        "confirmPassword"
                    ).value;


                const message =
                    document.getElementById(
                        "registerMessage"
                    );


                if (name.length < 2) {

                    showMessage(
                        message,
                        "Please enter your full name.",
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
                    users.find(
                        user =>
                            user.email === email
                    );


                if (existingUser) {

                    showMessage(
                        message,
                        "An account with this email already exists.",
                        "warning"
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
                    "Registration Completed! Redirecting to Login...",
                    "success"
                );


                registerForm.reset();


                setTimeout(
                    function () {

                        window.location.href =
                            "login.html";

                    },
                    1500
                );

            }
        );

    }


    /* =====================================================
       LOGIN
       ===================================================== */

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const email =
                    document.getElementById(
                        "loginEmail"
                    ).value.trim().toLowerCase();


                const password =
                    document.getElementById(
                        "loginPassword"
                    ).value;


                const message =
                    document.getElementById(
                        "loginMessage"
                    );


                const users =
                    getUsers();


                const user =
                    users.find(
                        item =>
                            item.email === email &&
                            item.password === password
                    );


                if (!user) {

                    showMessage(
                        message,
                        "Invalid email or password.",
                        "danger"
                    );

                    return;

                }


                localStorage.setItem(
                    CURRENT_USER_KEY,
                    JSON.stringify(user)
                );


                showMessage(
                    message,
                    "Login Successful!",
                    "success"
                );


                const redirect =
                    sessionStorage.getItem(
                        "bookingRedirect"
                    );


                setTimeout(
                    function () {

                        if (redirect) {

                            sessionStorage.removeItem(
                                "bookingRedirect"
                            );

                            window.location.href =
                                redirect;

                        } else {

                            window.location.href =
                                "index.html";

                        }

                    },
                    800
                );

            }
        );

    }


    /* =====================================================
       EVENTS PAGE
       ===================================================== */

    const eventsContainer =
        document.getElementById(
            "eventsContainer"
        );


    function renderEvents(list) {

        if (!eventsContainer) return;


        if (list.length === 0) {

            eventsContainer.innerHTML = `

                <div class="col-12 text-center py-5">

                    <i
                        class="bi bi-calendar-x display-3 text-muted">
                    </i>

                    <h4 class="mt-3">
                        No events found
                    </h4>

                    <p class="text-muted">
                        Try another search or category.
                    </p>

                </div>

            `;

            return;

        }


        eventsContainer.innerHTML =
            list.map(
                event => `

                <div class="col-lg-4 col-md-6 mb-4">

                    <div class="card h-100 border-0 shadow-sm">

                        <div class="position-relative">

                            <img
                                src="${event.image}"
                                class="card-img-top"
                                alt="${event.name}"
                                style="height:220px;object-fit:cover;"
                                onerror="this.src='https://placehold.co/800x450?text=Event+${event.id}'">

                            <span
                                class="badge bg-warning text-dark position-absolute top-0 end-0 m-3">

                                Coming Soon

                            </span>

                        </div>


                        <div class="card-body d-flex flex-column">

                            <span class="badge bg-primary align-self-start mb-2">

                                ${event.category}

                            </span>


                            <h5 class="fw-bold">

                                ${event.name}

                            </h5>


                            <p class="text-muted small">

                                ${event.description}

                            </p>


                            <div class="small mb-2">

                                <i class="bi bi-calendar3 text-primary"></i>

                                ${event.date}

                            </div>


                            <div class="small mb-2">

                                <i class="bi bi-clock text-primary"></i>

                                ${event.time}

                            </div>


                            <div class="small mb-3">

                                <i class="bi bi-geo-alt text-primary"></i>

                                ${event.location}

                            </div>


                            <div class="mt-auto">

                                <div class="d-flex justify-content-between align-items-center mb-3">

                                    <strong class="text-primary fs-5">

                                        ₹${event.price}

                                    </strong>

                                    <small class="text-muted">
                                        per ticket
                                    </small>

                                </div>


                                <a
                                    href="event-details.html?id=${event.id}"
                                    class="btn btn-primary w-100">

                                    View Details

                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            `
            ).join("");

    }


    if (eventsContainer) {

        renderEvents(events);


        const search =
            document.getElementById(
                "eventSearch"
            );


        const category =
            document.getElementById(
                "categoryFilter"
            );


        function filterEvents() {

            const searchValue =
                search
                    ? search.value
                        .toLowerCase()
                        .trim()
                    : "";


            const categoryValue =
                category
                    ? category.value
                    : "";


            const filtered =
                events.filter(
                    event => {

                        const matchesSearch =
                            event.name
                                .toLowerCase()
                                .includes(searchValue) ||

                            event.category
                                .toLowerCase()
                                .includes(searchValue);


                        const matchesCategory =
                            !categoryValue ||
                            event.category ===
                            categoryValue;


                        return (
                            matchesSearch &&
                            matchesCategory
                        );

                    }
                );


            renderEvents(filtered);

        }


        if (search) {

            search.addEventListener(
                "input",
                filterEvents
            );

        }


        if (category) {

            category.addEventListener(
                "change",
                filterEvents
            );

        }

    }


    /* =====================================================
       EVENT DETAILS
       ===================================================== */

    const eventDetails =
        document.getElementById(
            "eventDetails"
        );


    if (eventDetails) {

        const event =
            getSelectedEvent();


        if (!event) {

            eventDetails.innerHTML = `

                <div class="alert alert-danger">

                    Event not found.

                    <a
                        href="events.html"
                        class="alert-link">

                        Back to Events

                    </a>

                </div>

            `;

        } else {

            eventDetails.innerHTML = `

                <div class="row g-5 align-items-center">

                    <div class="col-lg-6">

                        <img
                            src="${event.image}"
                            alt="${event.name}"
                            class="img-fluid rounded shadow"
                            style="width:100%;max-height:450px;object-fit:cover;"
                            onerror="this.src='https://placehold.co/800x450?text=Event+${event.id}'">

                    </div>


                    <div class="col-lg-6">

                        <span class="badge bg-warning text-dark mb-3">

                            Coming Soon

                        </span>


                        <span class="badge bg-primary mb-3 ms-2">

                            ${event.category}

                        </span>


                        <h1 class="fw-bold mb-3">

                            ${event.name}

                        </h1>


                        <p class="text-muted">

                            ${event.description}

                        </p>


                        <div class="mb-3">

                            <i class="bi bi-calendar3 text-primary"></i>

                            <strong>Date:</strong>

                            ${event.date}

                        </div>


                        <div class="mb-3">

                            <i class="bi bi-clock text-primary"></i>

                            <strong>Time:</strong>

                            ${event.time}

                        </div>


                        <div class="mb-3">

                            <i class="bi bi-geo-alt text-primary"></i>

                            <strong>Location:</strong>

                            ${event.location}

                        </div>


                        <h3 class="text-primary fw-bold mb-4">

                            ₹${event.price}

                            <small class="text-muted fs-6">
                                / ticket
                            </small>

                        </h3>


                        <button
                            id="bookNowButton"
                            class="btn btn-primary btn-lg">

                            <i class="bi bi-ticket-perforated"></i>

                            Book Now

                        </button>


                        <a
                            href="events.html"
                            class="btn btn-outline-secondary btn-lg ms-2">

                            Back

                        </a>

                    </div>

                </div>

            `;


            const bookButton =
                document.getElementById(
                    "bookNowButton"
                );


            if (bookButton) {

                bookButton.addEventListener(
                    "click",
                    function () {

                        const user =
                            getCurrentUser();


                        if (!user) {

                            sessionStorage.setItem(
                                "bookingRedirect",
                                "booking.html?id=" +
                                event.id
                            );


                            window.location.href =
                                "login.html";


                            return;

                        }


                        window.location.href =
                            "booking.html?id=" +
                            event.id;

                    }
                );

            }

        }

    }


    /* =====================================================
       BOOKING PAGE
       ===================================================== */

    const bookingDetails =
        document.getElementById(
            "bookingDetails"
        );


    const bookingForm =
        document.getElementById(
            "bookingForm"
        );


    if (bookingDetails) {

        const event =
            getSelectedEvent();


        if (!event) {

            bookingDetails.innerHTML = `

                <div class="alert alert-danger">

                    Event not found.

                </div>

            `;

        } else {

            bookingDetails.innerHTML = `

                <div class="card border-0 shadow-sm">

                    <img
                        src="${event.image}"
                        class="card-img-top"
                        alt="${event.name}"
                        style="height:300px;object-fit:cover;"
                        onerror="this.src='https://placehold.co/800x450?text=Event+${event.id}'">


                    <div class="card-body p-4">

                        <span class="badge bg-warning text-dark mb-2">

                            Coming Soon

                        </span>


                        <h3 class="fw-bold">

                            ${event.name}

                        </h3>


                        <p class="text-muted">

                            ${event.description}

                        </p>


                        <p class="mb-2">

                            <i class="bi bi-calendar text-primary"></i>

                            ${event.date}

                        </p>


                        <p class="mb-2">

                            <i class="bi bi-clock text-primary"></i>

                            ${event.time}

                        </p>


                        <p class="mb-0">

                            <i class="bi bi-geo-alt text-primary"></i>

                            ${event.location}

                        </p>

                    </div>

                </div>

            `;


            const user =
                getCurrentUser();


            if (!user) {

                sessionStorage.setItem(
                    "bookingRedirect",
                    "booking.html?id=" +
                    event.id
                );

                setTimeout(
                    function () {

                        window.location.href =
                            "login.html";

                    },
                    500
                );

                return;

            }


            const name =
                document.getElementById(
                    "bookingName"
                );


            const email =
                document.getElementById(
                    "bookingEmail"
                );


            if (name) {

                name.value =
                    user.name || "";

            }


            if (email) {

                email.value =
                    user.email || "";

            }


            const quantity =
                document.getElementById(
                    "ticketQuantity"
                );


            const total =
                document.getElementById(
                    "totalPrice"
                );


            function updateTotal() {

                const qty =
                    Number(
                        quantity
                            ? quantity.value
                            : 1
                    );


                if (total) {

                    total.textContent =
                        "₹" +
                        (event.price * qty);

                }

            }


            if (quantity) {

                quantity.addEventListener(
                    "change",
                    updateTotal
                );

            }


            updateTotal();


            if (bookingForm) {

                bookingForm.addEventListener(
                    "submit",
                    function (e) {

                        e.preventDefault();


                        const phone =
                            document.getElementById(
                                "bookingPhone"
                            ).value.trim();


                        if (!/^[0-9]{10}$/.test(phone)) {

                            alert(
                                "Please enter a valid 10-digit mobile number."
                            );

                            return;

                        }


                        const qty =
                            Number(
                                quantity.value
                            );


                        const booking = {

                            bookingId:
                                "SE" +
                                Date.now(),

                            userId:
                                user.id,

                            userName:
                                user.name,

                            userEmail:
                                user.email,

                            phone:
                                phone,

                            eventId:
                                event.id,

                            eventName:
                                event.name,

                            eventImage:
                                event.image,

                            eventDate:
                                event.date,

                            eventTime:
                                event.time,

                            eventLocation:
                                event.location,

                            tickets:
                                qty,

                            price:
                                event.price,

                            total:
                                event.price *
                                qty,

                            status:
                                "Confirmed",

                            bookingDate:
                                new Date()
                                    .toLocaleString()

                        };


                        const bookings =
                            getBookings();


                        bookings.push(
                            booking
                        );


                        saveBookings(
                            bookings
                        );


                        alert(
                            "Booking Confirmed Successfully!"
                        );


                        window.location.href =
                            "my-bookings.html";

                    }
                );

            }

        }

    }


    /* =====================================================
       MY BOOKINGS
       ===================================================== */

    const bookingsContainer =
        document.getElementById(
            "bookingsContainer"
        );


    if (bookingsContainer) {

        const user =
            getCurrentUser();


        if (!user) {

            bookingsContainer.innerHTML = `

                <div class="text-center py-5">

                    <i class="bi bi-person-lock display-3 text-muted"></i>

                    <h4 class="mt-3">
                        Please Login
                    </h4>

                    <p class="text-muted">
                        Login to view your bookings.
                    </p>

                    <a
                        href="login.html"
                        class="btn btn-primary">

                        Login

                    </a>

                </div>

            `;

        } else {

            const bookings =
                getBookings().filter(
                    booking =>
                        booking.userId ===
                        user.id
                );


            if (bookings.length === 0) {

                bookingsContainer.innerHTML = `

                    <div class="text-center py-5">

                        <i class="bi bi-ticket-perforated display-3 text-muted"></i>

                        <h4 class="mt-3">
                            No Bookings Yet
                        </h4>

                        <p class="text-muted">
                            Book an event and your ticket will appear here.
                        </p>

                        <a
                            href="events.html"
                            class="btn btn-primary">

                            Explore Events

                        </a>

                    </div>

                `;

            } else {

                bookingsContainer.innerHTML =
                    bookings
                        .slice()
                        .reverse()
                        .map(
                            booking => `

                            <div class="card border-0 shadow-sm mb-4">

                                <div class="row g-0">


                                    <div class="col-md-4">

                                        <img
                                            src="${booking.eventImage}"
                                            alt="${booking.eventName}"
                                            style="width:100%;height:100%;min-height:220px;object-fit:cover;"
                                            onerror="this.src='https://placehold.co/800x450?text=Event'">

                                    </div>


                                    <div class="col-md-8">

                                        <div class="card-body p-4">


                                            <div class="d-flex justify-content-between">

                                                <span class="badge bg-success">

                                                    ${booking.status}

                                                </span>


                                                <strong class="text-primary">

                                                    ₹${booking.total}

                                                </strong>

                                            </div>


                                            <h4 class="fw-bold mt-3">

                                                ${booking.eventName}

                                            </h4>


                                            <p class="mb-1">

                                                <i class="bi bi-calendar text-primary"></i>

                                                ${booking.eventDate}

                                            </p>


                                            <p class="mb-1">

                                                <i class="bi bi-clock text-primary"></i>

                                                ${booking.eventTime}

                                            </p>


                                            <p class="mb-1">

                                                <i class="bi bi-geo-alt text-primary"></i>

                                                ${booking.eventLocation}

                                            </p>


                                            <p class="mb-1">

                                                <i class="bi bi-ticket text-primary"></i>

                                                ${booking.tickets} Ticket(s)

                                            </p>


                                            <p class="mb-3">

                                                <strong>
                                                    Booking ID:
                                                </strong>

                                                ${booking.bookingId}

                                            </p>


                                            <button
                                                class="btn btn-outline-danger btn-sm cancel-booking"
                                                data-id="${booking.bookingId}">

                                                Cancel Booking

                                            </button>


                                        </div>

                                    </div>

                                </div>

                            </div>

                        `
                        )
                        .join("");


                document
                    .querySelectorAll(
                        ".cancel-booking"
                    )
                    .forEach(
                        button => {

                            button.addEventListener(
                                "click",
                                function () {

                                    const id =
                                        this.dataset.id;


                                    if (
                                        !confirm(
                                            "Are you sure you want to cancel this booking?"
                                        )
                                    ) {

                                        return;

                                    }


                                    const allBookings =
                                        getBookings();


                                    const updated =
                                        allBookings.filter(
                                            booking =>
                                                booking.bookingId !==
                                                id
                                        );


                                    saveBookings(
                                        updated
                                    );


                                    location.reload();

                                }
                            );

                        }
                    );

            }

        }

    }


    /* =====================================================
       LOGOUT
       ===================================================== */

    document
        .querySelectorAll(
            ".logout-link"
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    function (e) {

                        e.preventDefault();


                        localStorage.removeItem(
                            CURRENT_USER_KEY
                        );


                        window.location.href =
                            "index.html";

                    }
                );

            }
        );


    /* =====================================================
       NAVIGATION USER STATE
       ===================================================== */

    const currentUser =
        getCurrentUser();


    if (currentUser) {

        document
            .querySelectorAll(
                ".login-link"
            )
            .forEach(
                link => {

                    link.style.display =
                        "none";

                }
            );


        document
            .querySelectorAll(
                ".register-link"
            )
            .forEach(
                link => {

                    link.style.display =
                        "none";

                }
            );


        document
            .querySelectorAll(
                ".logout-link"
            )
            .forEach(
                link => {

                    link.style.display =
                        "block";

                }
            );

    } else {

        document
            .querySelectorAll(
                ".logout-link"
            )
            .forEach(
                link => {

                    link.style.display =
                        "none";

                }
            );

    }


});
