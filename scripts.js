function redirectToLogin() {
    window.location.href = './login';
}

// Check if the user is on a mobile device
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Redirect function
function redirectUser() {
    if (isMobileDevice()) {
        // If user is on a mobile device, do nothing (stay on the current page)
        console.log("User is on a mobile device.");
    } else {
        // If user is on a computer, redirect them to a different website
        console.log("User is on a computer. Redirecting...");
        window.location.href = "https://www.scyted.tv/resources"; // Replace "https://example.com" with your desired URL
    }
}

// Call the redirect function when the page loads
window.onload = redirectUser;