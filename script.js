// LocalStorage initialize karein agar data pehle se na ho
const defaultEvents = [
    {
        id: 1,
        title: "Tech Innovation Summit 2026",
        category: "Technology",
        date: "15 September 2026",
        image: "tech-event.jpg.png", // Aapke repository ki image
        description: "Join top industry leaders for the biggest tech conference.",
        ticketsAvailable: 50,
        price: 499
    },
    {
        id: 2,
        title: "Music & Cultural Festival",
        category: "Music",
        date: "20 September 2026",
        image: "music-event.jpg.png",
        description: "Experience live music performances and cultural exhibitions.",
        ticketsAvailable: 30,
        price: 299
    },
    {
        id: 3,
        title: "Business Networking Meet",
        category: "Business",
        date: "25 September 2026",
        image: "business-event.jpg.png",
        description: "Connect with entrepreneurs and expand your business network.",
        ticketsAvailable: 20,
        price: 199
    }
];

if (!localStorage.getItem('events')) {
    localStorage.setItem('events', JSON.stringify(defaultEvents));
}
