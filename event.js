// event.js

function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const container = document.getElementById('event-container');
    
    if(!container) return;
    
    container.innerHTML = events.map(event => `
        <div class="event-card">
            <img src="${event.image}" alt="${event.title}" style="width: 100%; height: 200px; object-fit: cover;">
            <span class="badge">${event.category}</span>
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Available Tickets:</strong> <span id="tickets-${event.id}">${event.ticketsAvailable}</span></p>
            <p><strong>Price:</strong> ₹${event.price}</p>
            <button onclick="bookTicket(${event.id})" class="btn-primary" ${event.ticketsAvailable === 0 ? 'disabled' : ''}>
                ${event.ticketsAvailable === 0 ? 'Sold Out' : 'Book Ticket'}
            </button>
        </div>
    `).join('');
}

function bookTicket(eventId) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let bookings = JSON.parse(localStorage.getItem('myBookings')) || [];

    let event = events.find(e => e.id === eventId);

    if (event && event.ticketsAvailable > 0) {
        event.ticketsAvailable -= 1;

        const newBooking = {
            bookingId: "TKT-" + Math.floor(100000 + Math.random() * 900000),
            eventId: event.id,
            eventName: event.title,
            date: event.date,
            bookingDate: new Date().toLocaleDateString(),
            price: event.price
        };

        bookings.push(newBooking);

        localStorage.setItem('events', JSON.stringify(events));
        localStorage.setItem('myBookings', JSON.stringify(bookings));

        alert(`🎉 Ticket Booked Successfully!\nBooking ID: ${newBooking.bookingId}`);

        loadEvents();
    } else {
        alert("Sorry, tickets for this event are sold out!");
    }
}

document.addEventListener('DOMContentLoaded', loadEvents);
