document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("contactForm");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("contactName");

        const email =
            document.getElementById("contactEmail");

        const subject =
            document.getElementById("contactSubject");

        const message =
            document.getElementById("contactMessage");

        const messageBox =
            document.getElementById("contactMessageBox");


        name.classList.remove("is-invalid");
        email.classList.remove("is-invalid");
        subject.classList.remove("is-invalid");
        message.classList.remove("is-invalid");


        let valid = true;


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (name.value.trim().length < 2) {

            name.classList.add("is-invalid");

            valid = false;
        }


        if (!emailPattern.test(email.value.trim())) {

            email.classList.add("is-invalid");

            valid = false;
        }


        if (subject.value.trim().length < 3) {

            subject.classList.add("is-invalid");

            valid = false;
        }


        if (message.value.trim().length < 10) {

            message.classList.add("is-invalid");

            valid = false;
        }


        if (!valid) {

            messageBox.innerHTML = `

                <div class="alert alert-danger">

                    <i class="bi bi-exclamation-circle"></i>

                    Please correct the highlighted fields.

                </div>

            `;

            return;
        }


        const messages =
            JSON.parse(
                localStorage.getItem("contactMessages")
            ) || [];


        messages.push({

            id: Date.now(),

            name: name.value.trim(),

            email: email.value.trim(),

            subject: subject.value.trim(),

            message: message.value.trim(),

            date: new Date().toLocaleString(),

            status: "New"

        });


        localStorage.setItem(
            "contactMessages",
            JSON.stringify(messages)
        );


        messageBox.innerHTML = `

            <div class="alert alert-success">

                <i class="bi bi-check-circle-fill"></i>

                Your message has been sent successfully.

            </div>

        `;


        form.reset();

    });

});
