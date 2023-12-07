document.addEventListener("DOMContentLoaded", function () {
    const storedUserId = getCookie("userId");

    // Redirect to login if user is not authenticated
    if (!storedUserId) {
        window.location.href = "../login";
    } else {
        // Mock function to get user data (replace with actual Discord API call)
        const userData = getUserData(storedUserId);

        // Display user info on the dashboard
        displayUserInfo(userData);
    }
});

function getUserData(userId) {
    // Mock function - replace with actual Discord API call to get user data
    return {
        username: "MockUsername",
        avatarUrl: "https://via.placeholder.com/150", // Placeholder image
    };
}

function displayUserInfo(userData) {
    const userInfoDiv = document.getElementById("userInfo");

    const profilePicture = document.createElement("img");
    profilePicture.src = userData.avatarUrl;
    profilePicture.alt = "Profile Picture";
    profilePicture.classList.add("profile-picture");

    const usernameElement = document.createElement("h2");
    usernameElement.textContent = userData.username;

    userInfoDiv.appendChild(profilePicture);
    userInfoDiv.appendChild(usernameElement);
}

function logout() {
    // Clear cookies
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to login page
    window.location.href = "../login";
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