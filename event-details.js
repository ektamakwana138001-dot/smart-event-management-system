document.addEventListener("DOMContentLoaded", function () {

    const detailsContainer =
        document.getElementById("eventDetails");

    if (!detailsContainer) {
        return;
    }


    const events = [

        {
            id: 1,
            name: "Tech Innovation Summit 2026",
            category: "Technology",
            date: "15 September 2026",
            time: "10:00 AM - 5:00 PM",
            location: "Ahmedabad, Gujarat",
            price: 499,
            image: "images/tech-event.jpg",
            description:
                "Discover the latest technology trends, innovations and digital solutions. Meet technology experts, developers and industry professionals."
        },

        {
            id: 2,
            name: "Music & Cultural Festival",
            category: "Music",
            date: "20 September 2026",
            time: "6:00 PM - 10:00 PM",
            location: "Rajkot, Gujarat",
            price: 399,
            image: "images/music-event.jpg",
            description:
                "Enjoy live music, cultural performances, entertainment and an unforgettable evening with friends and family."
        },

        {
            id: 3,
            name: "Business Networking Meet",
            category: "Business",
            date: "25 September 2026",
            time: "11:00 AM - 4:00 PM",
            location: "Surat, Gujarat",
            price: 599,
            image: "images/business-event.jpg",
            description:
                "Connect with entrepreneurs, professionals and business leaders. Build valuable connections and explore new opportunities."
        },

        {
            id: 4,
            name: "Food & Street Festival",
            category: "Food",
            date: "30 September 2026",
            time: "5:00 PM - 10:00 PM",
            location: "Vadodara, Gujarat",
            price: 299,
            image: "images/food-event.jpg",
            description:
                "Taste delicious food, discover local flavours and enjoy a colourful street festival with exciting activities."
        },

        {
            id: 5,
            name: "Startup & Entrepreneur Expo",
            category: "Business",
            date: "5 October 2026",
            time: "10:00 AM - 6:00 PM",
            location: "Ahmedabad, Gujarat",
            price: 699,
            image: "images/startup-event.jpg",
            description:
                "Meet startups, entrepreneurs and innovative businesses. Discover ideas, products and exciting opportunities."
        },

        {
            id: 6,
            name: "Art & Photography Exhibition",
            category: "Art",
            date: "10 October 2026",
            time: "11:00 AM - 7:00 PM",
            location: "Rajkot, Gujarat",
            price: 249,
            image: "images/art-event.jpg",
            description:
                "Explore creative artwork, photography and artistic expressions from talented artists."
        }

    ];


    // Get event ID from URL

    const urlParams =
        new URLSearchParams(window.location.search);

    const eventId =
        Number(urlParams.get("id"));


    // Find selected event

    const event =
        events.find(function (item) {

            return item.id === eventId;

        });


    // Event not found

    if (!event) {

        detailsContainer.innerHTML = `

            <div class="alert alert-danger text-center">

                <h4>
                    Event Not Found
                </h4>

                <p>
                    The event you are looking for does not exist.
                </p>

                <a
                    href="events.html"
                    class="btn btn-primary"
                >
                    Back to Events
                </a>

            </div>

        `;

        return;
    }


    // Display event details

    detailsContainer.innerHTML = `

        <div class="card event-details-card shadow border-0">

            <div class="row g-0">

                <div class="col-lg-6">

                    <img
                        src="${event.image}"
                        alt="${event.name}"
                        onerror="this.src='images/event-placeholder.jpg'"
                    >

                </div>


                <div class="col-lg-6">

                    <div class="event-details-info">

                        <span class="badge bg-primary mb-3">
                            ${event.category}
                        </span>


                        <h2>
                            ${event.name}
                        </h2>


                        <div class="event-meta">

                            <p>
                                <strong>📅 Date:</strong>
                                ${event.date}
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

                        </div>


                        <hr>


                        <h5>
                            About This Event
                        </h5>

                        <p class="text-muted">
                            ${event.description}
                        </p>


                        <div class="d-flex gap-2 flex-wrap mt-4">

                            <a
                                href="booking.html?event=${event.id}"
                                class="btn btn-primary btn-lg"
                            >
                                Book Tickets
                            </a>

                            <a
                                href="events.html"
                                class="btn btn-outline-secondary btn-lg"
                            >
                                Back to Events
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    `;

});