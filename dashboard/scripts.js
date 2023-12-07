document.addEventListener("DOMContentLoaded", function () {
    const storedAccessToken = getCookie("accessToken");

    if (!storedAccessToken) {
        // Redirect to login if access token is not found
        window.location.href = "../login";
    } else {
        // Fetch user data from Discord API
        fetchDiscordUserData(storedAccessToken)
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

function fetchDiscordUserData(accessToken) {
    const apiUrl = 'https://discord.com/api/users/@me';

    return fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Discord API Request Failed! Status: ${response.status}`);
        }
        return response.json();
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
    // Clear cookies
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

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