
// =========================================================
// SMART EVENT MANAGEMENT SYSTEM
// REGISTER JAVASCRIPT
// =========================================================


// GET ELEMENTS

const registerForm =
    document.getElementById("registerForm");

const passwordInput =
    document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");


// =========================================================
// PASSWORD SHOW / HIDE
// =========================================================

document
    .getElementById("togglePassword")
    .addEventListener(
        "click",
        function() {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                this.innerHTML =
                    '<i class="bi bi-eye-slash"></i>';

            } else {

                passwordInput.type = "password";

                this.innerHTML =
                    '<i class="bi bi-eye"></i>';

            }

        }
    );


// =========================================================
// CONFIRM PASSWORD SHOW / HIDE
// =========================================================

document
    .getElementById("toggleConfirmPassword")
    .addEventListener(
        "click",
        function() {

            if (
                confirmPasswordInput.type ===
                "password"
            ) {

                confirmPasswordInput.type =
                    "text";

                this.innerHTML =
                    '<i class="bi bi-eye-slash"></i>';

            } else {

                confirmPasswordInput.type =
                    "password";

                this.innerHTML =
                    '<i class="bi bi-eye"></i>';

            }

        }
    );


// =========================================================
// PASSWORD STRENGTH
// =========================================================

passwordInput.addEventListener(
    "input",
    function() {

        const password =
            passwordInput.value;

        const bar =
            document.getElementById(
                "passwordStrengthBar"
            );

        const text =
            document.getElementById(
                "passwordStrengthText"
            );


        let strength = 0;


        if (password.length >= 6) {

            strength++;

        }

        if (password.length >= 8) {

            strength++;

        }

        if (/[A-Z]/.test(password)) {

            strength++;

        }

        if (/[0-9]/.test(password)) {

            strength++;

        }

        if (/[^A-Za-z0-9]/.test(password)) {

            strength++;

        }


        if (strength <= 1) {

            bar.style.width = "25%";

            text.textContent =
                "Weak password";

        }

        else if (strength <= 3) {

            bar.style.width = "60%";

            text.textContent =
                "Medium password";

        }

        else {

            bar.style.width = "100%";

            text.textContent =
                "Strong password";

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

            error.style.display =
                "none";

        }
    );

}


// =========================================================
// FORM SUBMIT
// =========================================================

registerForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        hideErrors();


        const name =
            document.getElementById(
                "fullName"
            ).value.trim();


        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const phone =
            document.getElementById(
                "phone"
            ).value.trim();


        const password =
            passwordInput.value;


        const confirmPassword =
            confirmPasswordInput.value;


        const terms =
            document.getElementById(
                "terms"
            ).checked;


        let valid = true;


        // =================================================
        // NAME
        // =================================================

        if (name.length < 2) {

            document.getElementById(
                "nameError"
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
                "emailError"
            ).style.display = "block";

            valid = false;

        }


        // =================================================
        // PHONE
        // =================================================

        if (!/^[0-9]{10}$/.test(phone)) {

            document.getElementById(
                "phoneError"
            ).style.display = "block";

            valid = false;

        }


        // =================================================
        // PASSWORD
        // =================================================

        if (password.length < 6) {

            document.getElementById(
                "passwordError"
            ).style.display = "block";

            valid = false;

        }


        // =================================================
        // CONFIRM PASSWORD
        // =================================================

        if (
            confirmPassword !==
            password
        ) {

            document.getElementById(
                "confirmPasswordError"
            ).style.display = "block";

            valid = false;

        }


        // =================================================
        // TERMS
        // =================================================

        if (!terms) {

            document.getElementById(
                "termsError"
            ).style.display = "block";

            valid = false;

        }


        // =================================================
        // STOP
        // =================================================

        if (!valid) {

            return;

        }


        // =================================================
        // CHECK EXISTING USER
        // =================================================

        const oldUser =
            JSON.parse(
                localStorage.getItem(
                    "registeredUser"
                )
            );


        if (
            oldUser &&
            oldUser.email === email
        ) {

            document.getElementById(
                "emailError"
            ).textContent =
                "An account with this email already exists.";

            document.getElementById(
                "emailError"
            ).style.display =
                "block";

            return;

        }


        // =================================================
        // CREATE USER
        // =================================================

        const user = {

            name:
                name,

            email:
                email,

            phone:
                phone,

            password:
                password,

            registeredDate:
                new Date()
                    .toLocaleDateString()

        };


        // =================================================
        // SAVE USER
        // =================================================

        localStorage.setItem(
            "registeredUser",
            JSON.stringify(user)
        );


        // =================================================
        // SUCCESS MESSAGE
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
        // REDIRECT TO LOGIN
        // =================================================

        setTimeout(
            function() {

                window.location.href =
                    "login.html";

            },
            1500
        );

    }
);
