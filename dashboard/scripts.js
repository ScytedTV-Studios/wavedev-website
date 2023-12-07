document.addEventListener("DOMContentLoaded", function () {
    try {
        const storedUserId = getCookie("userId");

        if (!storedUserId) {
            displayErrorMessage("User ID not found. Redirecting to login...");
            setTimeout(() => {
                window.location.href = "../login";
            }, 3000); // Redirect after 3 seconds
        } else {
            fetchDiscordUserData(storedUserId)
                .then(userData => {
                    displayUserInfo(userData);
                })
                .catch(error => {
                    displayErrorMessage("Error fetching user data. Redirecting to login...");
                    setTimeout(() => {
                        window.location.href = "../login";
                    }, 3000); // Redirect after 3 seconds
                });
        }
    } catch (error) {
        displayErrorMessage("An unexpected error occurred. Redirecting to login...");
        setTimeout(() => {
            window.location.href = "../login";
        }, 3000); // Redirect after 3 seconds
    }
});

function displayErrorMessage(message) {
    const errorMessageDiv = document.createElement("div");
    errorMessageDiv.className = "error-message";
    errorMessageDiv.textContent = message;
    document.body.appendChild(errorMessageDiv);
}

function fetchDiscordUserData(userId) {
    const clientId = '1182368783248134175'; // Replace with your Discord application's client ID
    const clientSecret = 'UTou2PJ5o_gCxh8wVE7pkV1W5ngjkeIg'; // Replace with your Discord application's client secret
    const redirectUri = 'http://localhost:3000/callback'; // Replace with your Discord application's redirect URI

    const apiUrl = `https://discord.com/api/users/${userId}`;

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
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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