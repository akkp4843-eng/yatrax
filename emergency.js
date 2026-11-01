
let currentLocation = null;

const locationBtn = document.getElementById("locationBtn");
const shareBtn = document.getElementById("shareBtn");
const hospitalBtn = document.getElementById("hospitalBtn");
const locationStatus = document.getElementById("locationStatus");

// Get user's current location
locationBtn.addEventListener("click", function () {

    if (!navigator.geolocation) {
        locationStatus.textContent =
            "Your browser does not support location services.";
        return;
    }

    locationStatus.textContent = "Getting your location...";

    navigator.geolocation.getCurrentPosition(

        function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            currentLocation = {
                latitude,
                longitude
            };

            locationStatus.textContent =
                `Location found: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

            shareBtn.disabled = false;
        },

        function (error) {
            const messages = {
                1: "Location permission denied. Please allow location access.",
                2: "Your location is currently unavailable.",
                3: "Location request timed out. Please try again."
            };

            locationStatus.textContent =
                messages[error.code] || "Unable to get your location.";
        },

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );
});

// Share location
shareBtn.addEventListener("click", async function () {

    if (!currentLocation) return;

    const mapLink =
        `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;

    try {
        if (navigator.share) {
            await navigator.share({
                title: "My Current Location - YatraX",
                text: "This is my current location. Please check on me.",
                url: mapLink
            });
        } else if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(mapLink);
            locationStatus.textContent =
                "Location link copied. You can now share it.";
        } else {
            window.prompt("Copy your location link:", mapLink);
        }
    } catch (error) {
        if (error.name !== "AbortError") {
            locationStatus.textContent =
                "Unable to share location. Please try again.";
        }
    }
});

// Nearby hospitals
hospitalBtn.addEventListener("click", function () {

    if (currentLocation) {
        const { latitude, longitude } = currentLocation;

        const url =
            `https://www.google.com/maps/search/hospitals/@${latitude},${longitude},14z`;

        window.open(url, "_blank", "noopener,noreferrer");

    } else {
        const url =
            "https://www.google.com/maps/search/hospitals+near+Rishikesh/";

        window.open(url, "_blank", "noopener,noreferrer");
    }
});
