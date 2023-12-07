document.addEventListener("DOMContentLoaded", function () {
    const storedUserId = getCookie("userId");

    // Redirect to login if user is not authenticated
    if (!storedUserId) {
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
    const clientId = '1182368783248134175'; // Replace with your Discord application's client ID
    const clientSecret = 'UTou2PJ5o_gCxh8wVE7pkV1W5ngjkeIg'; // Replace with your Discord application's client secret
    const redirectUri = 'http://localhost:3000/callback'; // Replace with your Discord application's redirect URI

    // Construct the URL for fetching user data
    const apiUrl = `https://discord.com/api/users/${userId}`;

    // Fetch OAuth2 token using client credentials (this should be done securely on the server side)
    return fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&scope=identify`,
    })
    .then(response => response.json())
    .then(tokenResponse => {
        const accessToken = tokenResponse.access_token;

        // Fetch user data using the obtained access token
        return fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
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