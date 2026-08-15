// =========================================================
// SMART EVENT MANAGEMENT SYSTEM
// LOGIN JAVASCRIPT
// =========================================================


// GET ELEMENTS

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");


// =========================================================
// SHOW / HIDE PASSWORD
// =========================================================

togglePassword.addEventListener(
    "click",
    function() {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.innerHTML =
                '<i class="bi bi-eye-slash"></i>';

        } else {

            passwordInput.type = "password";

            togglePassword.innerHTML =
                '<i class="bi bi-eye"></i>';

        }

    }
);


// =========================================================
// HIDE ERRORS
// =========================================================

function hideErrors() {

    document.querySelectorAll(
        ".error-message"
    ).forEach(
        function(error) {

            error.style.display = "none";

        }
    );

}


// =========================================================
// LOGIN FORM
// =========================================================

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        hideErrors();


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        let valid = true;


        // EMAIL VALIDATION

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            document.getElementById(
                "emailError"
            ).style.display = "block";

            valid = false;

        }


        // PASSWORD VALIDATION

        if (password.length < 6) {

            document.getElementById(
                "passwordError"
            ).style.display = "block";

            valid = false;

        }


        if (!valid) {

            return;

        }


        // =================================================
        // GET REGISTERED USER
        // =================================================

        const registeredUser =
            JSON.parse(
                localStorage.getItem(
                    "registeredUser"
                )
            );


        // =================================================
        // CHECK USER
        // =================================================

        if (
            registeredUser &&
            registeredUser.email === email &&
            registeredUser.password === password
        ) {

            // SAVE LOGIN STATUS

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );


            localStorage.setItem(
                "currentUser",
                JSON.stringify(
                    registeredUser
                )
            );


            // SUCCESS

            const successMessage =
                document.getElementById(
                    "successMessage"
                );

            successMessage.style.display =
                "block";


            // REDIRECT

            setTimeout(
                function() {

                    window.location.href =
                        "dashboard.html";

                },
                1200
            );


        } else {

            // INVALID LOGIN

            const passwordError =
                document.getElementById(
                    "passwordError"
                );

            passwordError.textContent =
                "Invalid email or password.";

            passwordError.style.display =
                "block";

        }

    }
);
