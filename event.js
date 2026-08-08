document.addEventListener("DOMContentLoaded", function () {

    const eventContainer = document.getElementById("eventsContainer");

    if (!eventContainer) {
        return;
    }

    const events = [
        {
            id: 1,
            name: "Tech Innovation Summit 2026",
            category: "Technology",
            date: "15 September 2026",
            time: "10:00 AM",
            location: "Rajkot Convention Centre",
            price: 499,
            image: "images/tech-event.jpg"
        },
        {
            id: 2,
            name: "Music & Cultural Festival",
            category: "Music",
            date: "20 September 2026",
            time: "06:00 PM",
            location: "Race Course Ground, Rajkot",
            price: 299,
            image: "images/music-event.jpg"
        },
        {
            id: 3,
            name: "Business Networking Meet",
            category: "Business",
            date: "25 September 2026",
            time: "11:00 AM",
            location: "Grand Palace Hotel",
            price: 399,
            image: "images/business-event.jpg"
        },
        {
            id: 4,
            name: "Food & Street Festival",
            category: "Food",
            date: "02 October 2026",
            time: "05:00 PM",
            location: "Crystal Mall Ground",
            price: 199,
            image: "images/food-event.jpg"
        },
        {
            id: 5,
            name: "Startup & Entrepreneur Expo",
            category: "Business",
            date: "10 October 2026",
            time: "09:30 AM",
            location: "Atmiya University",
            price: 599,
            image: "images/startup-event.jpg"
        },
        {
            id: 6,
            name: "Art & Photography Exhibition",
            category: "Art",
            date: "18 October 2026",
            time: "10:00 AM",
            location: "Rajkot Art Gallery",
            price: 149,
            image: "images/art-event.jpg"
        }
    ];

    function displayEvents(eventList) {

        eventContainer.innerHTML = "";

        if (eventList.length === 0) {
            eventContainer.innerHTML = `
                <div class="no-events">
                    <h3>No Events Found</h3>
                    <p>Please try another search or category.</p>
                </div>
            `;
            return;
        }

        eventList.forEach(function (event) {

            const eventCard = document.createElement("div");

            eventCard.className = "event-card";

            eventCard.setAttribute(
                "data-category",
                event.category.toLowerCase()
            );

            eventCard.innerHTML = `
                <div class="event-image">
                    <img 
                        src="${event.image}" 
                        alt="${event.name}"
                        onerror="this.src='images/event-placeholder.jpg'"
                    >
                </div>

                <div class="event-content">

                    <span class="event-category">
                        ${event.category}
                    </span>

                    <h3>${event.name}</h3>

                    <p>
                        <strong>Date:</strong>
                        ${event.date}
                    </p>

                    <p>
                        <strong>Time:</strong>
                        ${event.time}
                    </p>

                    <p>
                        <strong>Location:</strong>
                        ${event.location}
                    </p>

                    <div class="event-bottom">

                        <span class="event-price">
                            ₹${event.price}
                        </span>

                        <a 
                            href="event-details.html?id=${event.id}"
                            class="btn"
                        >
                            View Details
                        </a>

                    </div>

                </div>
            `;

            eventContainer.appendChild(eventCard);
        });
    }

    displayEvents(events);


    // Search
    const searchInput = document.getElementById("eventSearch");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchText =
                searchInput.value.toLowerCase().trim();

            const filteredEvents = events.filter(function (event) {

                return (
                    event.name.toLowerCase().includes(searchText) ||
                    event.category.toLowerCase().includes(searchText) ||
                    event.location.toLowerCase().includes(searchText)
                );

            });

            displayEvents(filteredEvents);
        });
    }


    // Category Filter
    const categoryFilter =
        document.getElementById("categoryFilter");

    if (categoryFilter) {

        categoryFilter.addEventListener("change", function () {

            const selectedCategory =
                categoryFilter.value.toLowerCase();

            if (
                selectedCategory === "all" ||
                selectedCategory === ""
            ) {
                displayEvents(events);
                return;
            }

            const filteredEvents = events.filter(function (event) {

                return (
                    event.category.toLowerCase() ===
                    selectedCategory
                );

            });

            displayEvents(filteredEvents);
        });
    }

});