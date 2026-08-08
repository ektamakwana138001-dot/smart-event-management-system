// my-bookings.js
function loadMyBookings() {
    const bookings = JSON.parse(localStorage.getItem('myBookings')) || [];
    const container = document.getElementById('bookings-container'); // Apne HTML id ke hisab se set karein

    if (!container) return;

    if (bookings.length === 0) {
        container.innerHTML = "<p>Aapne abhi tak koi ticket book nahi kiya hai.</p>";
        return;
    }

    container.innerHTML = bookings.map(item => `
        <div class="booking-card">
            <h3>${item.eventName}</h3>
            <p><strong>Booking ID:</strong> ${item.bookingId}</p>
            <p><strong>Event Date:</strong> ${item.date}</p>
            <p><strong>Booked On:</strong> ${item.bookingDate}</p>
            <p><strong>Price:</strong> ₹${item.price}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadMyBookings);
