document.addEventListener("DOMContentLoaded", function () {
    const storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
        // Redirect to login if user is not authenticated
        window.location.href = "../login";
    } else {
        // Fetch user data from Discord API
        fetchDiscordUserData(storedUserId)
            .then(userData => {
                // Display user info on the dashboard
                displayUserInfo(userData);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                // Handle error (e.g., redirect to login page)
                window.location.href = "../login";
            });
    }
});

function fetchDiscordUserData(userId) {
    // Implement your Discord API call to fetch user data using the user ID
    // Example URL: `https://discord.com/api/users/${userId}`
    // Return a Promise with the user data
    // ...

    // For now, a placeholder Promise is returned
    return Promise.resolve({
        id: userId,
        username: "SampleUser",
        avatar: "abc123"
    });
}

function displayUserInfo(userData) {
    const userInfoDiv = document.getElementById("userInfo");

    const profilePicture = document.createElement("img");
    profilePicture.src = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
    profilePicture.alt = "Profile Picture";
    profilePicture.classList.add("profile-picture");

    const usernameElement = document.createElement("h2");
    usernameElement.textContent = userData.username;

    userInfoDiv.appendChild(profilePicture);
    userInfoDiv.appendChild(usernameElement);
}

function logout() {
    // Clear localStorage
    localStorage.removeItem("userId");

    // Redirect to login page
    window.location.href = "../login";
}