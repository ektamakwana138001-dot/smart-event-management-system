document.addEventListener("DOMContentLoaded", function () {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }


    const emailInput =
        document.getElementById("loginEmail");

    const passwordInput =
        document.getElementById("loginPassword");


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value.trim();


            // ================= VALIDATION =================

            if (!email || !password) {

                alert(
                    "Please enter email and password."
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


            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;
            }


            // ================= REGISTERED USERS =================

            const users =
                JSON.parse(
                    localStorage.getItem(
                        "users"
                    )
                ) || [];


            const registeredUser =
                users.find(function (user) {

                    return (
                        user.email === email &&
                        user.password === password
                    );

                });


            // ================= ADMIN LOGIN =================

            const adminEmail =
                "admin@smartevents.com";

            const adminPassword =
                "admin123";


            if (
                email === adminEmail &&
                password === adminPassword
            ) {

                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "userEmail",
                    email
                );

                localStorage.setItem(
                    "userRole",
                    "admin"
                );


                alert(
                    "Admin login successful!"
                );


                window.location.href =
                    "dashboard.html";

                return;
            }


            // ================= USER LOGIN =================

            if (registeredUser) {

                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "userEmail",
                    registeredUser.email
                );

                localStorage.setItem(
                    "userRole",
                    "user"
                );


                alert(
                    "Login successful!"
                );


                window.location.href =
                    "index.html";

                return;
            }


            // ================= LOGIN FAILED =================

            alert(
                "Invalid email or password.\nPlease register first."
            );

        }
    );

});