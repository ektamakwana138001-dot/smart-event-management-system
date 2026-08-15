/* =========================================================
   admin.js
   Smart Event Management System
========================================================= */


/* ---------------------------------------------------------
   Admin default events
--------------------------------------------------------- */

const adminDefaultEvents = [

    {
        id: "music",
        name: "Music Festival",
        category: "Entertainment",
        date: "Coming Soon",
        time: "Coming Soon",
        location: "Ahmedabad",
        price: 499,
        status: "Coming Soon",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",
        description: "Live music and entertainment event."
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
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85",
        description: "Technology and innovation conference."
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
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
        description: "Business networking and leadership event."
    }

];


/* ---------------------------------------------------------
   Get admin events
--------------------------------------------------------- */

function getAdminEvents() {

    const savedEvents =
        localStorage.getItem("adminEvents");

    if (savedEvents) {

        try {

            return JSON.parse(savedEvents);

        } catch (error) {

            console.log("Event data error.");

        }

    }

    localStorage.setItem(
        "adminEvents",
        JSON.stringify(adminDefaultEvents)
    );

    return adminDefaultEvents;

}


/* ---------------------------------------------------------
   Save events
--------------------------------------------------------- */

function saveAdminEvents(events) {

    localStorage.setItem(
        "adminEvents",
        JSON.stringify(events)
    );

}


/* ---------------------------------------------------------
   Add event
--------------------------------------------------------- */

function addAdminEvent(event) {

    const events = getAdminEvents();

    event.id =
        event.id ||
        "event-" + Date.now();

    events.push(event);

    saveAdminEvents(events);

    return true;

}


/* ---------------------------------------------------------
   Update event
--------------------------------------------------------- */

function updateAdminEvent(id, updatedEvent) {

    const events = getAdminEvents();

    const index =
        events.findIndex(
            event => event.id === id
        );

    if (index === -1) {

        return false;

    }

    updatedEvent.id = id;

    events[index] = updatedEvent;

    saveAdminEvents(events);

    return true;

}


/* ---------------------------------------------------------
   Delete event
--------------------------------------------------------- */

function deleteAdminEvent(id) {

    const events = getAdminEvents();

    const updatedEvents =
        events.filter(
            event => event.id !== id
        );

    saveAdminEvents(updatedEvents);

    return true;

}


/* ---------------------------------------------------------
   Admin logout
--------------------------------------------------------- */

function adminLogout() {

    localStorage.removeItem(
        "adminLoggedIn"
    );

    localStorage.removeItem(
        "adminData"
    );

    window.location.href =
        "admin-login.html";

}


/* ---------------------------------------------------------
   Admin login check
--------------------------------------------------------- */

function checkAdminLogin() {

    const isLoggedIn =
        localStorage.getItem(
            "adminLoggedIn"
        );

    if (
        isLoggedIn !== "true"
    ) {

        window.location.href =
            "admin-login.html";

    }

}


/* ---------------------------------------------------------
   Statistics
--------------------------------------------------------- */

function getAdminStatistics() {

    const events =
        getAdminEvents();

    const categories =
        new Set(
            events.map(
                event => event.category
            )
        );

    const comingSoon =
        events.filter(
            event =>
                event.status ===
                "Coming Soon"
        );

    return {

        totalEvents:
            events.length,

        comingSoon:
            comingSoon.length,

        categories:
            categories.size

    };

}
