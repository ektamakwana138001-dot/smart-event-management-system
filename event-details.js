document.addEventListener("DOMContentLoaded", function () {

    const detailsContainer = document.getElementById("eventDetails");

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
            image: "photos.jpg/event 1.jpg",
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
            image: "photos.jpg/event 2.jpg",
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
            image: "photos.jpg/event 3.jpg",
            description:
                "Connect with entrepreneurs, professionals and business leaders. Build valuable connections and explore new opportunities."
        },

        {
            id: 4,
            name: "Global Leadership Conference",
            category: "Conference",
            date: "30 September 2026",
            time: "10:00 AM - 5:00 PM",
            location: "Vadodara, Gujarat",
            price: 599,
            image: "photos.jpg/event 4.jpg",
            description:
                "Gain valuable insights from global leaders and industry experts."
        },

        {
            id: 5,
            name: "Annual Sports Tournament",
            category: "Sports",
            date: "05 October 2026",
            time: "9:00 AM - 6:00 PM",
            location: "Ahmedabad, Gujarat",
            price: 150,
            image: "photos.jpg/event 5.jpg",
            description:
                "Compete and watch thrilling sports matches with exciting activities."
        },

        {
            id: 6,
            name: "College Fest 2026",
            category: "College",
            date: "10 October 2026",
            time: "10:00 AM - 7:00 PM",
            location: "Rajkot, Gujarat",
            price: 100,
            image: "photos.jpg/event 6.jpg",
            description:
                "Enjoy competitions, performances, cultural activities and exciting college events."
        },

        {
            id: 7,
            name: "Startup Meetup 2026",
            category: "Startup",
            date: "15 October 2026",
            time: "11:00 AM - 5:00 PM",
            location: "Ahmedabad, Gujarat",
            price: 250,
            image: "photos.jpg/event 7.jpg",
            description:
                "Meet startup founders, investors and young entrepreneurs."
        },

        {
            id: 8,
            name: "Future Technology Expo",
            category: "Technology",
            date: "20 October 2026",
            time: "10:00 AM - 6:00 PM",
            location: "Gandhinagar, Gujarat",
            price: 350,
            image: "photos.jpg/event 8.jpg",
            description:
                "Discover innovative technologies and future digital solutions."
        },

        {
            id: 9,
            name: "Live Concert Night",
            category: "Music",
            date: "25 October 2026",
            time: "6:00 PM - 10:00 PM",
            location: "Rajkot, Gujarat",
            price: 399,
            image: "photos.jpg/event 9.jpg",
            description:
                "Enjoy an unforgettable night of live music and entertainment."
        },

        {
            id: 10,
            name: "Mega Sports Championship",
            category: "Sports",
            date: "30 October 2026",
            time: "9:00 AM - 6:00 PM",
            location: "Ahmedabad, Gujarat",
            price: 200,
            image: "photos.jpg/event 10.jpg",
            description:
                "Watch exciting matches and support your favorite teams."
        }

    ];


    // Get event ID from URL
    const urlParams = new URLSearchParams(window.location.search);

    const eventId = Number(urlParams.get("id"));


    // Find selected event
    const event = events.find(function (item) {
        return item.id === eventId;
    });


    // Event not found
    if (!event) {

        detailsContainer.innerHTML = `

            <div class="alert alert-danger text-center">

                <h4>Event Not Found</h4>

                <p>
                    The event you are looking for does not exist.
                </p>

                <a
                    href="event.html"
                    class="btn btn-primary">

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
                        class="img-fluid w-100"
                        style="
                            height: 450px;
                            object-fit: cover;
                            border-radius: 8px 0 0 8px;
                        "
                        onerror="this.onerror=null; this.src='event-images-reference.png.png';"
                    >

                </div>


                <div class="col-lg-6">

                    <div class="event-details-info p-4">

                        <span class="badge bg-primary mb-3">

                            ${event.category}

                        </span>


                        <h2 class="fw-bold">

                            ${event.name}

                        </h2>


                        <div class="event-meta mt-4">

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


                        <h5 class="fw-bold">

                            About This Event

                        </h5>


                        <p class="text-muted">

                            ${event.description}

                        </p>


                        <div class="d-flex gap-2 flex-wrap mt-4">

                            <a
                                href="booking.html?event=${event.id}"
                                class="btn btn-primary btn-lg">

                                <i class="bi bi-ticket-perforated"></i>

                                Book Tickets

                            </a>


                            <a
                                href="event.html"
                                class="btn btn-outline-secondary btn-lg">

                                Back to Events

                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    `;

});
