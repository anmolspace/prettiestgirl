document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYearElem = document.getElementById('currentYear');
    if (currentYearElem) {
        currentYearElem.textContent = new Date().getFullYear();
    }

    // --- Countdown Timer ---
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        // Set the date we're counting down to (e.g., 30 days from now)
        const countDownDate = new Date();
        countDownDate.setDate(countDownDate.getDate() + 30); // Example: 30 days from now
        // Alternatively, set a specific date:
        // const countDownDate = new Date("Jan 1, 2026 00:00:00").getTime();


        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                countdownElement.innerHTML = "🎉 We're Live!";
                clearInterval(interval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <span>${days}d</span>
                <span>${hours}h</span>
                <span>${minutes}m</span>
                <span>${seconds}s</span>
            `;
        };

        updateCountdown(); // Initial call
        const interval = setInterval(updateCountdown, 1000);
    }


    // --- Newsletter Form ---
    const notifyForm = document.getElementById('notifyForm');
    const emailInput = document.getElementById('email');
    const formMessage = document.getElementById('formMessage');

    if (notifyForm && emailInput && formMessage) {
        notifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (email === "") {
                formMessage.textContent = "Please enter your email address.";
                formMessage.className = "form-message error";
                return;
            }

            // Basic email validation
            if (!validateEmail(email)) {
                formMessage.textContent = "Please enter a valid email address.";
                formMessage.className = "form-message error";
                return;
            }

            // Simulate form submission (in a real scenario, you'd send this to a server or service)
            formMessage.textContent = `Thank you! We'll notify ${email} when we launch.`;
            formMessage.className = "form-message success";
            emailInput.value = ""; // Clear the input

            // You can integrate with services like Netlify Forms, Mailchimp, etc. here
            // For Netlify Forms, you just need to add `data-netlify="true"` to your <form> tag
            // and Netlify will handle submissions automatically.
            // Example: <form id="notifyForm" data-netlify="true">
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

});
