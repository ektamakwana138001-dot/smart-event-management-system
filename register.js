document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector("form");

    if (!registerForm) return;

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Inputs se value lena
        const nameInput = document.querySelector('input[type="text"]');
        const emailInput = document.querySelector('input[type="email"]');
        const phoneInput = document.querySelector('input[type="tel"]');
        const passwordInputs = document.querySelectorAll('input[type="password"]');

        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const password = passwordInputs[0] ? passwordInputs[0].value : "";
        const confirmPassword = passwordInputs[1] ? passwordInputs[1].value : "";

        // Validations
        if (!name || !email || !password) {
            alert("Kripya saari details bharein!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords match nahi ho rahe hain!");
            return;
        }

        // LocalStorage se existing users nikalna
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Email check
        const userExists = users.some((u) => u.email === email);
        if (userExists) {
            alert("An account with this email already exists.");
            return;
        }

        // Create New User
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            role: "user",
            registeredDate: new Date().toLocaleDateString("en-IN")
        };

        // Save User
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful!\nPlease login to continue.");

        // Redirect to Login Page
        window.location.href = "login.html";
    });
});
        
