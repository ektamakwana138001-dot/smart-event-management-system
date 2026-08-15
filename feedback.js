document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("feedbackForm");

    if (!form) {
        return;
    }

    const messageBox =
        document.getElementById("feedbackMessageBox");


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("feedbackName");

        const email =
            document.getElementById("feedbackEmail");

        const rating =
            document.getElementById("feedbackRating");

        const feedbackText =
            document.getElementById("feedbackText");


        name.classList.remove("is-invalid");
        email.classList.remove("is-invalid");
        rating.classList.remove("is-invalid");
        feedbackText.classList.remove("is-invalid");


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


        if (rating.value === "") {

            rating.classList.add("is-invalid");

            valid = false;
        }


        if (feedbackText.value.trim().length < 10) {

            feedbackText.classList.add("is-invalid");

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


        const feedbackList =
            JSON.parse(
                localStorage.getItem("feedback")
            ) || [];


        const feedbackData = {

            id: Date.now(),

            name: name.value.trim(),

            email: email.value.trim(),

            rating: Number(rating.value),

            message: feedbackText.value.trim(),

            date: new Date().toLocaleString(),

            status: "New"

        };


        feedbackList.push(feedbackData);


        localStorage.setItem(
            "feedback",
            JSON.stringify(feedbackList)
        );


        messageBox.innerHTML = `

            <div class="alert alert-success">

                <i class="bi bi-check-circle-fill"></i>

                Thank you! Your feedback has been submitted successfully.

            </div>

        `;


        form.reset();

    });

});
