document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameInput = document.getElementById("contactName");
        const emailInput = document.getElementById("contactEmail");
        const subjectInput = document.getElementById("contactSubject");
        const messageInput = document.getElementById("contactMessage");

        if (
            !nameInput ||
            !emailInput ||
            !subjectInput ||
            !messageInput
        ) {
            alert("Contact form fields are missing.");
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {
            alert("Please fill all required fields.");
            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const contactMessage = {
            id: Date.now(),

            name: name,

            email: email,

            subject: subject,

            message: message,

            date: new Date().toLocaleDateString("en-IN")
        };

        let messages =
            JSON.parse(
                localStorage.getItem("contactMessages")
            ) || [];

        messages.push(contactMessage);

        localStorage.setItem(
            "contactMessages",
            JSON.stringify(messages)
        );

        alert(
            "Thank you, " +
            name +
            "! Your message has been submitted successfully."
        );

        contactForm.reset();
    });

});