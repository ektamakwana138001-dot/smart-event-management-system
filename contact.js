// =========================================================
// SMART EVENT MANAGEMENT SYSTEM
// CONTACT & FEEDBACK JAVASCRIPT
// =========================================================

const contactForm =
    document.getElementById("contactForm");


// =========================================================
// RATING STARS
// =========================================================

const ratingLabels =
    document.querySelectorAll(".rating label");


ratingLabels.forEach(
    function(label, index) {

        label.addEventListener(
            "click",
            function() {

                ratingLabels.forEach(
                    function(item, i) {

                        const icon =
                            item.querySelector("i");

                        if (i <= index) {

                            icon.className =
                                "bi bi-star-fill";

                        } else {

                            icon.className =
                                "bi bi-star";

                        }

                    }
                );

            }
        );

    }
);


// =========================================================
// HIDE ERRORS
// =========================================================

function hideContactErrors() {

    document.querySelectorAll(
        ".error-message"
    ).forEach(
        function(error) {

            error.style.display =
                "none";

        }
    );

}


// =========================================================
// FORM SUBMIT
// =========================================================

contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        hideContactErrors();


        let valid = true;


        const name =
            document.getElementById(
                "contactName"
            ).value.trim();


        const email =
            document.getElementById(
                "contactEmail"
            ).value.trim();


        const phone =
            document.getElementById(
                "contactPhone"
            ).value.trim();


        const subject =
            document.getElementById(
                "subject"
            ).value;


        const message =
            document.getElementById(
                "message"
            ).value.trim();


        // =================================================
        // NAME
        // =================================================

        if (name.length < 2) {

            document.getElementById(
                "contactNameError"
            ).style.display = "block";

            valid = false;

        }


        // =================================================
        // EMAIL
        // =================================================

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            document.getElementById(
                "contactEmailError"
            ).style.display = "block";

            valid = false;

        }


        // =================================================
        // PHONE
        // =================================================

        if (
            phone !== "" &&
            !/^[0-9]{10}$/.test(phone)
        ) {

            document.getElementById(
                "contactPhoneError"
            ).style.display = "block";

            valid = false;

        }


        // =================================================
        // SUBJECT
        // =================================================

        if (!subject) {

            document.getElementById(
                "subjectError"
            ).style.display = "block";

            valid = false;

        }


        // =================================================
        // MESSAGE
        // =================================================

        if (message.length < 10) {

            document.getElementById(
                "messageError"
            ).style.display = "block";

            valid = false;

        }


        // =================================================
        // STOP IF INVALID
        // =================================================

        if (!valid) {

            return;

        }


        // =================================================
        // GET RATING
        // =================================================

        const selectedRating =
            document.querySelector(
                'input[name="rating"]:checked'
            );


        const rating =
            selectedRating
                ? selectedRating.value
                : "Not Rated";


        // =================================================
        // CREATE FEEDBACK
        // =================================================

        const feedback = {

            id:
                "#FB" +
                Date.now()
                    .toString()
                    .slice(-6),

            name:
                name,

            email:
                email,

            phone:
                phone,

            subject:
                subject,

            rating:
                rating,

            message:
                message,

            date:
                new Date()
                    .toLocaleDateString(),

            status:
                "New"

        };


        // =================================================
        // GET OLD FEEDBACK
        // =================================================

        let feedbackList =
            JSON.parse(
                localStorage.getItem(
                    "feedback"
                ) || "[]"
            );


        // =================================================
        // ADD NEW FEEDBACK
        // =================================================

        feedbackList.push(feedback);


        // =================================================
        // SAVE FEEDBACK
        // =================================================

        localStorage.setItem(
            "feedback",
            JSON.stringify(
                feedbackList
            )
        );


        // =================================================
        // SHOW SUCCESS
        // =================================================

        const successMessage =
            document.getElementById(
                "successMessage"
            );


        successMessage.style.display =
            "block";


        successMessage.scrollIntoView({
            behavior: "smooth"
        });


        // =================================================
        // RESET FORM
        // =================================================

        contactForm.reset();


        // RESET STARS
        ratingLabels.forEach(
            function(label) {

                const icon =
                    label.querySelector("i");

                icon.className =
                    "bi bi-star";

            }
        );


        // =================================================
        // HIDE SUCCESS AFTER 5 SEC
        // =================================================

        setTimeout(
            function() {

                successMessage.style.display =
                    "none";

            },
            5000
        );

    }
);
