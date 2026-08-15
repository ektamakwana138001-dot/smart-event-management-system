/* =========================================================
   events.js
   Smart Event Management System
========================================================= */


/* ---------------------------------------------------------
   Event list
--------------------------------------------------------- */

const allEvents = [

    {
        id: "music",
        name: "Music Festival",
        category: "Entertainment",
        date: "Coming Soon",
        time: "Coming Soon",
        location: "Ahmedabad",
        price: 499,
        status: "Coming Soon",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85",
        description: "Experience live music, amazing performances and unforgettable entertainment."
    },

    {
        id: "technology",
        name: "Technology Conference",
        category: "Technology",
        date: "Coming Soon",
        time: "Coming Soon",
        location: "Ahmedabad",
        price: 799,
        status: "Coming Soon",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85",
        description: "Explore artificial intelligence, innovation, software and future technology."
    },

    {
        id: "business",
        name: "Business Summit",
        category: "Business",
        date: "Coming Soon",
        time: "Coming Soon",
        location: "Ahmedabad",
        price: 999,
        status: "Coming Soon",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
        description: "Connect with entrepreneurs, professionals and industry leaders."
    },

    {
        id: "startup",
        name: "Startup Meetup",
        category: "Business",
        date: "Coming Soon",
        time: "Coming Soon",
        location: "Rajkot",
        price: 599,
        status: "Coming Soon",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85",
        description: "Meet startup founders, entrepreneurs and investors."
    },

    {
        id: "coding",
        name: "Coding Workshop",
        category: "Technology",
        date: "Coming Soon",
        time: "Coming Soon",
        location: "Rajkot",
        price: 399,
        status: "Coming Soon",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
        description: "Improve your programming skills with practical sessions."
    },

    {
        id: "food",
        name: "Food Festival",
        category: "Food",
        date: "Coming Soon",
        time: "Coming Soon",
        location: "Ahmedabad",
        price: 299,
        status: "Coming Soon",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85",
        description: "Taste delicious food from different cuisines."
    }

];


/* ---------------------------------------------------------
   Display all events
--------------------------------------------------------- */

function renderEvents() {

    const container =
        document.getElementById(
            "eventsContainer"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";


    allEvents.forEach(
        event => {

            container.innerHTML += `

                <div class="col-md-6 col-lg-4">

                    <div class="event-card">

                        <img
                            src="${event.image}"
                            class="event-image"
                            alt="${event.name}">

                        <div class="event-body">

                            <span class="category-badge">
                                ${event.category}
                            </span>

                            <span class="coming-badge">
                                Coming Soon
                            </span>

                            <h3 class="event-title mt-3">
                                ${event.name}
                            </h3>

                            <p>
                                ${event.description}
                            </p>

                            <p>
                                <i class="bi bi-calendar3"></i>
                                <strong>Date:</strong>
                                ${event.date}
                            </p>

                            <p>
                                <i class="bi bi-clock"></i>
                                <strong>Time:</strong>
                                ${event.time}
                            </p>

                            <p>
                                <i class="bi bi-geo-alt"></i>
                                <strong>Location:</strong>
                                ${event.location}
                            </p>

                            <h4 class="text-success">
                                ₹${event.price}
                            </h4>

                            <a
                                href="event-details.html?event=${event.id}"
                                class="btn btn-primary w-100">

                                View Details

                            </a>

                        </div>

                    </div>

                </div>

            `;

        }
    );

}


/* ---------------------------------------------------------
   Search events
--------------------------------------------------------- */

function searchEvents() {

    const input =
        document.getElementById(
            "searchInput"
        );

    if (!input) {
        return;
    }

    const search =
        input.value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(
            "#eventsContainer .col-md-6"
        );


    cards.forEach(
        card => {

            const text =
                card.textContent
                    .toLowerCase();

            if (
                text.includes(search)
            ) {

                card.style.display =
                    "";

            } else {

                card.style.display =
                    "none";

            }

        }
    );

}


/* ---------------------------------------------------------
   Category filter
--------------------------------------------------------- */

function filterEvents() {

    const select =
        document.getElementById(
            "categoryFilter"
        );

    if (!select) {
        return;
    }

    const category =
        select.value;


    const cards =
        document.querySelectorAll(
            "#eventsContainer .col-md-6"
        );


    cards.forEach(
        card => {

            if (
                category === "all"
                ||
                card.textContent
                    .includes(category)
            ) {

                card.style.display =
                    "";

            } else {

                card.style.display =
                    "none";

            }

        }
    );

}


/* ---------------------------------------------------------
   Page load
--------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderEvents();

        const search =
            document.getElementById(
                "searchInput"
            );

        const filter =
            document.getElementById(
                "categoryFilter"
            );


        if (search) {

            search.addEventListener(
                "input",
                searchEvents
            );

        }


        if (filter) {

            filter.addEventListener(
                "change",
                filterEvents
            );

        }

    }
);
