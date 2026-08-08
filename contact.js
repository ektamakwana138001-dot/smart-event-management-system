document.addEventListener("DOMContentLoaded", function () {

    const contactForm =
        document.getElementById("contactForm");

    if (!contactForm) {
        return;
    }


    // ================= CONTACT FORM =================

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("contactName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("contactEmail")
                    .value
                    .trim();


            const subject =
                document
                    .getElementById("contactSubject")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("contactMessage")
                    .value
                    .trim();


            // ================= VALIDATION =================

            if (name.length < 2) {

                alert(
                    "Please enter your name."
                );

                return;
            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert(
                    "Please enter a valid email address."
                );

                return;
            }


            if (subject.length < 3) {

                alert(
                    "Please enter a subject."
                );

                return;
            }


            if (message.length < 10) {

                alert(
                    "Please enter a message of at least 10 characters."
                );

                return;
            }


            // ================= SAVE MESSAGE =================

            const contactMessage = {

                id:
                    Date.now(),

                name:
                    name,

                email:
                    email,

                subject:
                    subject,

                message:
                    message,

                date:
                    new Date()
                        .toLocaleString(
                            "en-IN"
                        )

            };


            let messages =
                JSON.parse(
                    localStorage.getItem(
                        "contactMessages"
                    )
                ) || [];


            messages.push(
                contactMessage
            );


            localStorage.setItem(
                "contactMessages",
                JSON.stringify(messages)
            );


            // ================= SUCCESS =================

            alert(
                "Your message has been sent successfully!"
            );


            contactForm.reset();

        }
    );

});