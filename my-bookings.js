// my-bookings.js

function loadMyBookings() {
    const bookings = JSON.parse(localStorage.getItem('myBookings')) || [];
    const container = document.getElementById('bookings-container') || document.getElementById('my-bookings');

    if (!container) return;

    if (bookings.length === 0) {
        container.innerHTML = "<p style='padding: 20px;'>Aapne abhi tak koi ticket book nahi kiya hai.</p>";
        return;
    }

    container.innerHTML = bookings.map(item => `
        <div class="booking-card" style="border: 1px solid #ccc; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: #f9f9f9;">
            <h3 style="color: #28a745; margin-top: 0;">🎉 ${item.eventName}</h3>
            <p><strong>Booking ID:</strong> <span style="background: #e2e2e2; padding: 2px 6px; border-radius: 4px;">${item.bookingId}</span></p>
            <p><strong>Event Date:</strong> ${item.date}</p>
            <p><strong>Booked On:</strong> ${item.bookingDate}</p>
            <p><strong>Amount Paid:</strong> ₹${item.price}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadMyBookings);
