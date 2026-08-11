// ===============================
// SMART EVENTS - EVENT DATA
// ===============================

const defaultEvents = [

    {
        id: 1,
        title: "Tech Innovation Summit 2026",
        category: "Technology",
        date: "15 September 2026",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        description: "Join top industry leaders for the biggest technology conference.",
        ticketsAvailable: 50,
        price: 499
    },

    {
        id: 2,
        title: "Music & Cultural Festival",
        category: "Music",
        date: "20 September 2026",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
        description: "Experience live music performances and cultural exhibitions.",
        ticketsAvailable: 30,
        price: 299
    },

    {
        id: 3,
        title: "Business Networking Meet",
        category: "Business",
        date: "25 September 2026",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
        description: "Connect with entrepreneurs and expand your business network.",
        ticketsAvailable: 20,
        price: 199
    },

    {
        id: 4,
        title: "Global Leadership Conference",
        category: "Conference",
        date: "30 September 2026",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
        description: "Insights and discussions from global leaders.",
        ticketsAvailable: 40,
        price: 599
    },

    {
        id: 5,
        title: "Annual Sports Tournament",
        category: "Sports",
        date: "05 October 2026",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
        description: "Compete and watch thrilling sports matches.",
        ticketsAvailable: 15,
        price: 150
    },

    {
        id: 6,
        title: "College Fest 2026",
        category: "College",
        date: "10 October 2026",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        description: "Enjoy competitions, performances and exciting college activities.",
        ticketsAvailable: 60,
        price: 100
    },

    {
        id: 7,
        title: "Startup Meetup 2026",
        category: "Startup",
        date: "15 October 2026",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
        description: "Meet startup founders, investors and young entrepreneurs.",
        ticketsAvailable: 35,
        price: 250
    },

    {
        id: 8,
        title: "Future Technology Expo",
        category: "Technology",
        date: "20 October 2026",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
        description: "Discover innovative technologies and future digital solutions.",
        ticketsAvailable: 45,
        price: 350
    },

    {
        id: 9,
        title: "Live Concert Night",
        category: "Music",
        date: "25 October 2026",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
        description: "Enjoy an unforgettable night of live music and entertainment.",
        ticketsAvailable: 100,
        price: 399
    },

    {
        id: 10,
        title: "Mega Sports Championship",
        category: "Sports",
        date: "30 October 2026",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
        description: "Watch exciting matches and support your favorite teams.",
        ticketsAvailable: 80,
        price: 200
    }

];


// ===============================
// LOCAL STORAGE SETUP
// ===============================

if (!localStorage.getItem("events")) {

    localStorage.setItem(
        "events",
        JSON.stringify(defaultEvents)
    );
}


// ===============================
// LOAD EVENTS
// ===============================

function loadEvents(eventList = null) {

    const events =
        eventList ||
        JSON.parse(localStorage.getItem("events")) ||
        defaultEvents;

    const container =
        document.getElementById("eventsContainer");

    if (!container) {
        return;
    }


    // No events message

    if (events.length === 0) {

        container.innerHTML = `
            <div class="col-12 text-center py-5">

                <i class="bi bi-calendar-x"
                   style="font-size: 50px;">
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


    // Event Cards

    container.innerHTML = events.map(event => `

        <div class="col-md-6 col-lg-4 mb-4">

            <div class="card h-100 shadow-sm border-0 overflow-hidden">

                <!-- EVENT IMAGE -->

                <img
                    src="${event.image}"
                    alt="${event.title}"
                    class="card-img-top"
                    style="
                        height: 220px;
                        object-fit: cover;
                    "
                    onerror="this.src='event-images-reference.png.png';"
                >


                <div class="card-body d-flex flex-column">

                    <!-- CATEGORY -->

                    <span
                        class="badge bg-primary align-self-start mb-2">

                        ${event.category}

                    </span>


                    <!-- TITLE -->

                    <h5 class="card-title fw-bold">

                        ${event.title}

                    </h5>


                    <!-- DESCRIPTION -->

                    <p class="card-text text-muted">

                        ${event.description}

                    </p>


                    <!-- DATE -->

                    <p class="mb-2">

                        <i class="bi bi-calendar3 text-primary"></i>

                        <strong>
                            Date:
                        </strong>

                        ${event.date}

                    </p>


                    <!-- TICKETS -->

                    <p class="mb-2">

                        <i class="bi bi-ticket-perforated text-primary"></i>

                        <strong>
                            Tickets:
                        </strong>

                        ${event.ticketsAvailable}

                    </p>


                    <!-- PRICE -->

                    <p class="mb-3">

                        <i class="bi bi-currency-rupee text-primary"></i>

                        <strong>
                            Price:
                        </strong>

                        ₹${event.price}

                    </p>


                    <!-- BUTTONS -->

                    <div class="mt-auto d-flex gap-2">

                        <a
                            href="event-details.html?id=${event.id}"
                            class="btn btn-outline-primary flex-fill">

                            <i class="bi bi-eye"></i>

                            Details

                        </a>


                        <button
                            onclick="bookTicket(${event.id})"
                            class="btn btn-primary flex-fill"
                            ${event.ticketsAvailable === 0 ? "disabled" : ""}>

                            ${
                                event.ticketsAvailable === 0
                                ? "Sold Out"
                                : "Book Ticket"
                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>

    `).join("");
}


// ===============================
// SEARCH EVENTS
// ===============================

function searchEvents() {

    const searchInput =
        document.getElementById("eventSearch");

    const categoryFilter =
        document.getElementById("categoryFilter");


    const searchText =
        searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";


    const selectedCategory =
        categoryFilter
        ? categoryFilter.value
        : "";


    const events =
        JSON.parse(localStorage.getItem("events")) ||
        defaultEvents;


    const filteredEvents = events.filter(event => {

        const matchesSearch =

            event.title.toLowerCase().includes(searchText) ||

            event.category.toLowerCase().includes(searchText) ||

            event.date.toLowerCase().includes(searchText) ||

            event.description.toLowerCase().includes(searchText);


        const matchesCategory =

            selectedCategory === "" ||

            event.category === selectedCategory;


        return matchesSearch && matchesCategory;

    });


    loadEvents(filteredEvents);

}


// ===============================
// BOOK TICKET
// ===============================

function bookTicket(eventId) {

    let events =
        JSON.parse(localStorage.getItem("events")) ||
        defaultEvents;


    let bookings =
        JSON.parse(localStorage.getItem("myBookings")) ||
        [];


    const event =
        events.find(e => e.id === eventId);


    if (!event) {

        alert("Event not found!");

        return;
    }


    if (event.ticketsAvailable <= 0) {

        alert(
            "Sorry, tickets for this event are sold out!"
        );

        return;
    }


    // Reduce ticket count

    event.ticketsAvailable -= 1;


    // Create booking

    const newBooking = {

        bookingId:
            "TKT-" +
            Math.floor(
                100000 +
                Math.random() * 900000
            ),

        eventId: event.id,

        eventName: event.title,

        date: event.date,

        bookingDate:
            new Date().toLocaleDateString(),

        price: event.price,

        image: event.image

    };


    bookings.push(newBooking);


    // Save data

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );


    localStorage.setItem(
        "myBookings",
        JSON.stringify(bookings)
    );


    // Success message

    alert(
        `🎉 Ticket Booked Successfully!\n\n` +
        `Event: ${event.title}\n` +
        `Booking ID: ${newBooking.bookingId}`
    );


    // Reload events

    searchEvents();

}


// ===============================
// SEARCH EVENT LISTENER
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadEvents();


        const searchInput =
            document.getElementById("eventSearch");


        const categoryFilter =
            document.getElementById("categoryFilter");


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                searchEvents
            );

        }


        if (categoryFilter) {

            categoryFilter.addEventListener(
                "change",
                searchEvents
            );

        }

    }
);
