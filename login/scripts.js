document.addEventListener("DOMContentLoaded", function () {
    // Check if user is already authenticated
    const storedUserId = getCookie("userId");
    if (storedUserId) {
        redirectToDashboard();
    }

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const userIdInput = document.getElementById("userId");
        const userId = userIdInput.value;

        // Validate Discord User ID using a mock function (replace with actual API call)
        if (isValidUserId(userId)) {
            setCookie("userId", userId, 30); // Set cookie to expire in 30 days
            redirectToDashboard();
        } else {
            displayErrorMessage("Invalid Discord User ID");
        }
    });
});

function redirectToDashboard() {
    window.location.href = "../dashboard";
}

function isValidUserId(userId) {
    // Mock function - replace with actual Discord API call to validate user ID
    return userId.length === 18 && !isNaN(userId);
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}

function displayErrorMessage(message) {
    const errorMessageDiv = document.getElementById("errorMessage");
    errorMessageDiv.textContent = message;
}