document.addEventListener("DOMContentLoaded", function () {

    const registerForm =
        document.getElementById("registerForm");

    if (!registerForm) {
        return;
    }


    const nameInput =
        document.getElementById("name");

    const emailInput =
        document.getElementById("email");

    const phoneInput =
        document.getElementById("phone");

    const passwordInput =
        document.getElementById("password");

    const confirmPasswordInput =
        document.getElementById("confirmPassword");

    const termsInput =
        document.getElementById("terms");


    // ================= REGISTER =================

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const phone =
                phoneInput.value.trim();

            const password =
                passwordInput.value;

            const confirmPassword =
                confirmPasswordInput.value;


            // ================= VALIDATION =================

            if (name.length < 2) {

                alert(
                    "Please enter your full name."
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


            const phonePattern =
                /^[0-9]{10}$/;


            if (!phonePattern.test(phone)) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;
            }


            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;
            }


            if (
                password !== confirmPassword
            ) {

                alert(
                    "Passwords do not match."
                );

                return;
            }


            if (!termsInput.checked) {

                alert(
                    "Please agree to the terms and conditions."
                );

                return;
            }


            // ================= GET USERS =================

            let users =
                JSON.parse(
                    localStorage.getItem(
                        "users"
                    )
                ) || [];


            // ================= CHECK EXISTING USER =================

            const existingUser =
                users.find(function (user) {

                    return user.email === email;

                });


            if (existingUser) {

                alert(
                    "An account with this email already exists."
                );

                return;
            }


            // ================= CREATE USER =================

            const newUser = {

                id:
                    Date.now(),

                name:
                    name,

                email:
                    email,

                phone:
                    phone,

                password:
                    password,

                role:
                    "user",

                registeredDate:
                    new Date()
                        .toLocaleDateString(
                            "en-IN"
                        )

            };


            users.push(newUser);


            // ================= SAVE USER =================

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );


            // ================= SUCCESS =================

            alert(
                "Registration successful!\nPlease login to continue."
            );


            window.location.href =
                "login.html";

        }
    );

});