document.addEventListener('DOMContentLoaded', function () {
    // Check if user is already logged in
    const userId = getCookie('userId');
    if (userId) {
        window.location.href = `./users/${userId}`;
    }
});

function login() {
    const userId = document.getElementById('userId').value;

    if (userId.trim() === '') {
        alert('Please enter your Discord User ID.');
        return;
    }

    // Set user ID in cookie
    setCookie('userId', userId, 30);

    // Redirect to the user's page
    window.location.href = `/users/${userId}`;
}

// Function to set cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Function to get cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}