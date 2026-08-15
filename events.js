/* =========================================================
   event.js
   Smart Event Management System
   Event details, online images, date, price
========================================================= */

const eventData = [

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
        description: "Meet startup founders, entrepreneurs and investors and share new ideas."
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
        description: "Improve your programming skills with practical coding sessions."
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
        description: "Taste delicious food from different cuisines and enjoy a great experience."
    }

];


/* ---------------------------------------------------------
   Get event from URL
--------------------------------------------------------- */

function getSelectedEvent() {

    const params = new URLSearchParams(window.location.search);

    const eventId = params.get("event");

    if (!eventId) {
        return eventData[0];
    }

    return eventData.find(
        event => event.id === eventId
    ) || eventData[0];
}


/* ---------------------------------------------------------
   Display event details
--------------------------------------------------------- */

function displayEventDetails() {

    const event = getSelectedEvent();

    const image = document.getElementById("eventImage");
    const name = document.getElementById("eventName");
    const category = document.getElementById("eventCategory");
    const date = document.getElementById("eventDate");
    const time = document.getElementById("eventTime");
    const location = document.getElementById("eventLocation");
    const price = document.getElementById("eventPrice");
    const description = document.getElementById("eventDescription");
    const status = document.getElementById("eventStatus");

    if (image) {
        image.src = event.image;
        image.alt = event.name;
    }

    if (name) {
        name.textContent = event.name;
    }

    if (category) {
        category.textContent = event.category;
    }

    if (date) {
        date.textContent = event.date;
    }

    if (time) {
        time.textContent = event.time;
    }

    if (location) {
        location.textContent = event.location;
    }

    if (price) {
        price.textContent = "₹" + event.price;
    }

    if (description) {
        description.textContent = event.description;
    }

    if (status) {
        status.textContent = event.status;
    }

}


/* ---------------------------------------------------------
   Book event
--------------------------------------------------------- */

function bookSelectedEvent() {

    const event = getSelectedEvent();

    localStorage.setItem(
        "selectedEvent",
        JSON.stringify(event)
    );

    window.location.href = "booking.html";

}


/* ---------------------------------------------------------
   Load on page
--------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    displayEventDetails
);
