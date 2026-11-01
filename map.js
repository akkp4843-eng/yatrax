
document.addEventListener("DOMContentLoaded", function () {

    console.log("YatraX Smart Map Connected!");

    // ==================================
    // 1. INITIALIZE UTTARAKHAND MAP
    // ==================================

    const map = L.map("map").setView([30.0668, 79.0193], 7);

    // OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);


    // ==================================
    // 2. UTTARAKHAND DESTINATION MARKERS
    // ==================================

    const destinations = [
        { name: "Dehradun", lat: 30.3165, lng: 78.0322 },
        { name: "Rishikesh", lat: 30.0869, lng: 78.2676 },
        { name: "Haridwar", lat: 29.9457, lng: 78.1642 },
        { name: "Mussoorie", lat: 30.4598, lng: 78.0644 },
        { name: "Nainital", lat: 29.3919, lng: 79.4542 },
        { name: "Haldwani", lat: 29.2183, lng: 79.5130 },
        { name: "Almora", lat: 29.5971, lng: 79.6591 },
        { name: "Ranikhet", lat: 29.6434, lng: 79.4322 },
        { name: "Uttarkashi", lat: 30.7268, lng: 78.4354 },
        { name: "Joshimath", lat: 30.5550, lng: 79.5644 },
        { name: "Auli", lat: 30.5280, lng: 79.5680 },
        { name: "Chamoli", lat: 30.4020, lng: 79.3200 },
        { name: "Rudraprayag", lat: 30.2844, lng: 78.9811 },
        { name: "Tehri", lat: 30.3780, lng: 78.4800 },
        { name: "Pithoragarh", lat: 29.5829, lng: 80.2182 },
        { name: "Lansdowne", lat: 29.8370, lng: 78.6860 }
    ];

    const markerLayer = L.layerGroup().addTo(map);

    destinations.forEach(function (place) {

        L.marker([place.lat, place.lng])
            .bindPopup(
                `<b>${place.name}</b><br>Uttarakhand`
            )
            .addTo(markerLayer);

    });


    // ==================================
    // 3. MAP VARIABLES
    // ==================================

    let routeLayers = [];
    let startMarker = null;
    let endMarker = null;

    const routeForm = document.getElementById("routeForm");
    const startInput = document.getElementById("startLocation");
    const endInput = document.getElementById("endLocation");
    const routeResults = document.getElementById("routeResults");
    const resetButton = document.getElementById("resetMap");


// ==================================
// LIVE GPS LOCATION TRACKING
// ==================================

const myLocationBtn = document.getElementById("myLocationBtn");

let userLocationMarker = null;
let userAccuracyCircle = null;
let gpsWatchId = null;


// LIVE NAVIGATION VARIABLES

let isNavigationActive = false;
let currentRouteSteps = [];
let currentStepIndex = 0;
let activeNavigationRoute = null;


// ==================================
// LIVE NAVIGATION POSITION UPDATE
// ==================================

function getDistanceMeters(lat1, lon1, lat2, lon2) {

    const R = 6371000;
    const toRad = value => value * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}


function updateNavigationPosition(lat, lng) {

    if (!isNavigationActive || !currentRouteSteps.length) return;

    const nextStep = currentRouteSteps[currentStepIndex + 1];

    if (nextStep && nextStep.maneuver && nextStep.maneuver.location) {

        const target = nextStep.maneuver.location;

        const distance = getDistanceMeters(
            lat, lng, target[1], target[0]
        );

        if (distance < 35) {
            currentStepIndex++;
        }
    }

    const currentStep = currentRouteSteps[currentStepIndex];

    if (!currentStep) return;

    const maneuver = currentStep.maneuver || {};

    let instruction = maneuver.type || "Continue";

    if (maneuver.modifier) {
        instruction += " " + maneuver.modifier;
    }

   

const status = document.getElementById("navigationStatus");
const distanceText = document.getElementById("navigationDistance");

if (status) {
    status.textContent =
        instruction.charAt(0).toUpperCase() +
        instruction.slice(1);
}

if (distanceText) {

    const maneuver = currentStep.maneuver;

    if (maneuver && maneuver.location) {

        const target = maneuver.location;

        const remaining = getDistanceMeters(
            lat, lng, target[1], target[0]
        );

        distanceText.textContent =
            remaining >= 1000
                ? (remaining / 1000).toFixed(1) + " km to next turn"
                : Math.round(remaining) + " m to next turn";

    } else {
        distanceText.textContent = "Continue on the route";
    }
}
    

 
}


const userLocationIcon = L.divIcon({
    className: "user-location-icon",
    html: '<div class="gps-blue-dot"></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

myLocationBtn.addEventListener("click", function () {

    if (!navigator.geolocation) {
        alert("Your browser does not support GPS location.");
        return;
    }

    myLocationBtn.textContent = "Locating...";

    if (gpsWatchId !== null) {
        navigator.geolocation.clearWatch(gpsWatchId);
    }

    gpsWatchId = navigator.geolocation.watchPosition(

        function (position) {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            const userPosition = [lat, lng];

            // Set current GPS location as starting point
startInput.value = "My Current Location";

selectedLocations.set("my current location", {
    name: "My Current Location",
    lat: lat,
    lng: lng
});

            if (!userLocationMarker) {

                userLocationMarker = L.marker(userPosition, {
                    icon: userLocationIcon,
                    zIndexOffset: 1000
                }).addTo(map);

                userLocationMarker.bindPopup("Your Current Location");

            } else {

                userLocationMarker.setLatLng(userPosition);

            }

            if (!userAccuracyCircle) {

                userAccuracyCircle = L.circle(userPosition, {
                    radius: accuracy,
                    color: "#2583eb",
                    fillColor: "#2583eb",
                    fillOpacity: 0.12,
                    weight: 1
                }).addTo(map);

            } else {

                userAccuracyCircle.setLatLng(userPosition);
                userAccuracyCircle.setRadius(accuracy);

            }

            map.setView(userPosition, 16);

            updateNavigationPosition(lat, lng);

            myLocationBtn.textContent = "📍 My Location";

        },

        function (error) {

            myLocationBtn.textContent = "📍 My Location";

            if (error.code === 1) {
                alert("Please allow location permission in your browser.");
            } else if (error.code === 2) {
                alert("Your current location is unavailable.");
            } else {
                alert("GPS request timed out. Please try again.");
            }

        },

        {
            enableHighAccuracy: true,
            maximumAge: 3000,
            timeout: 15000
        }

    );

});



// ==================================
// LOCATION AUTOCOMPLETE
// ==================================

const startSuggestions = document.getElementById("startSuggestions");
const endSuggestions = document.getElementById("endSuggestions");

let startTimer;
let endTimer;

const selectedLocations = new Map();

async function searchLocation(query, container, input) {

    if (query.length < 3) {
        container.innerHTML = "";
        return;
    }

    container.innerHTML = `
        <div class="suggestion-empty">Searching locations...</div>
    `;

    try {

        const url =
            "https://photon.komoot.io/api/?q=" +
            encodeURIComponent(query + ", Uttarakhand, India") +
            "&limit=5&lat=30.0668&lon=79.0193";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Search unavailable");
        }

        const data = await response.json();

        container.innerHTML = "";

        const places = data.features || [];

        if (places.length === 0) {
            container.innerHTML = `
                <div class="suggestion-empty">
                    No locations found.
                </div>
            `;
            return;
        }

        places.forEach(function (place) {

            const properties = place.properties;
            const coordinates = place.geometry.coordinates;

            const name = properties.name || "Unknown location";

            const details = [
                properties.city,
                properties.state,
                properties.country
            ].filter(Boolean).join(", ");

            const item = document.createElement("div");
            item.className = "suggestion-item";

            const title = document.createElement("strong");
            title.textContent = name;

            const subtitle = document.createElement("small");
            subtitle.textContent = details;

            item.appendChild(title);
            item.appendChild(subtitle);

            item.addEventListener("click", function () {

                input.value = name;

                selectedLocations.set(name.toLowerCase(), {
                    name: name,
                    lat: Number(coordinates[1]),
                    lng: Number(coordinates[0])
                });

                container.innerHTML = "";

            });

            container.appendChild(item);

        });

    } catch (error) {

        container.innerHTML = `
            <div class="suggestion-empty">
                Location search failed. Please try again.
            </div>
        `;

    }
}


// Starting point suggestions

startInput.addEventListener("input", function () {

    clearTimeout(startTimer);

    selectedLocations.delete(startInput.value.trim().toLowerCase());

    startTimer = setTimeout(function () {

        searchLocation(
            startInput.value.trim(),
            startSuggestions,
            startInput
        );

    }, 400);

});


// Destination suggestions

endInput.addEventListener("input", function () {

    clearTimeout(endTimer);

    selectedLocations.delete(endInput.value.trim().toLowerCase());

    endTimer = setTimeout(function () {

        searchLocation(
            endInput.value.trim(),
            endSuggestions,
            endInput
        );

    }, 400);

});


    const routeColors = [
        "#087c50",
        "#e3a52e",
        "#347fc4",
        "#9b62bd"
    ];


    // ==================================
    // 4. FIND LOCATION COORDINATES
    // ==================================

    async function getCoordinates(place) {

    const url =
        "https://photon.komoot.io/api/?q=" +
        encodeURIComponent(place + ", Uttarakhand, India") +
        "&limit=5&lat=30.0668&lon=79.0193";

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Location service unavailable. Please try again.");
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
        throw new Error("Location not found: " + place);
    }

    const result = data.features[0];
    const properties = result.properties;
    const coordinates = result.geometry.coordinates;

    return {
        name: properties.name || place,
        lat: Number(coordinates[1]),
        lng: Number(coordinates[0])
    };
}

    // ==================================
    // 5. CLEAR OLD ROUTES
    // ==================================

    function clearRoutes() {

        routeLayers.forEach(function (layer) {
            map.removeLayer(layer);
        });

        routeLayers = [];

        if (startMarker) {
            map.removeLayer(startMarker);
            startMarker = null;
        }

        if (endMarker) {
            map.removeLayer(endMarker);
            endMarker = null;
        }
    }


    // ==================================
    // 6. DISTANCE FORMAT
    // ==================================

    function formatDistance(meters) {

        return (meters / 1000).toFixed(1) + " km";

    }


    // ==================================
    // 7. TIME FORMAT
    // ==================================

    function formatTime(seconds) {

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.round((seconds % 3600) / 60);

        if (hours === 0) {
            return minutes + " min";
        }

        return hours + " hr " + minutes + " min";

    }


    // ==================================
    // 8. FIND ROUTES USING OSRM
    // ==================================

    async function findRoutes(start, end) {

        const url =
            `https://router.project-osrm.org/route/v1/driving/` +
            `${start.lng},${start.lat};${end.lng},${end.lat}` +
            `?overview=full&geometries=geojson&alternatives=3&steps=true`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Route service is unavailable.");
        }

        const data = await response.json();

        if (data.code !== "Ok" || !data.routes.length) {
            throw new Error("No driving route found for these locations.");
        }

        return data.routes;

    }


    // ==================================
    // 9. DISPLAY ROUTES
    // ==================================

    function displayRoutes(routes, start, end) {

        clearRoutes();

        startMarker = L.marker([start.lat, start.lng])
            .addTo(map)
            .bindPopup("<b>Starting Point</b><br>" + startInput.value);

        endMarker = L.marker([end.lat, end.lng])
            .addTo(map)
            .bindPopup("<b>Destination</b><br>" + endInput.value);

        const selection = document.querySelector(
            'input[name="routeType"]:checked'
        );

        const routeType = selection ? selection.value : "shortest";

        const sortedRoutes = [...routes].sort(function (a, b) {

            if (routeType === "fastest") {
                return a.duration - b.duration;
            }

            return a.distance - b.distance;

        });

        if (routeType === "all") {

            sortedRoutes.forEach(function (route, index) {

                const line = L.geoJSON(route.geometry, {
                    style: {
                        color: routeColors[index % routeColors.length],
                        weight: 5,
                        opacity: 0.8
                    }
                }).addTo(map);

                routeLayers.push(line);

            });

        } else {

            const selectedRoute = sortedRoutes[0];

            const line = L.geoJSON(selectedRoute.geometry, {
                style: {
                    color: "#087c50",
                    weight: 6,
                    opacity: 0.9
                }
            }).addTo(map);

            routeLayers.push(line);

        }

        const bounds = L.latLngBounds([
            [start.lat, start.lng],
            [end.lat, end.lng]
        ]);

        sortedRoutes.forEach(function (route) {

            route.geometry.coordinates.forEach(function (point) {
                bounds.extend([point[1], point[0]]);
            });

        });

        map.fitBounds(bounds, {
            padding: [45, 45]
        });

        showRouteResults(sortedRoutes, routeType);

    }


    // ==================================
    // 10. ROUTE RESULT INFORMATION
    // ==================================

    function showRouteResults(routes, routeType) {

        routeResults.innerHTML = "";

        const heading = document.createElement("h3");
        heading.textContent = "Available Route Options";

        routeResults.appendChild(heading);

        routes.forEach(function (route, index) {

            const card = document.createElement("div");
            card.className = "route-result-card";

            card.innerHTML = `
                <strong>Route ${index + 1}</strong>
                <p>Distance: ${formatDistance(route.distance)}</p>
                <p>Estimated time: ${formatTime(route.duration)}</p>
            `;

            routeResults.appendChild(card);

        });

       // ==================================
// STEP-BY-STEP DIRECTIONS
// ==================================

// ==================================
// STEP-BY-STEP DIRECTIONS
// ==================================

const directionsPanel = document.getElementById("directionsPanel");

directionsPanel.innerHTML = `
    <h3>Route Directions</h3>
`;

const selectedRoute = routes[0];

const steps = selectedRoute.legs.flatMap(function (leg) {
    return leg.steps;
});

steps.forEach(function (step, index) {

    const maneuver = step.maneuver || {};

    let action = maneuver.type || "Continue";

    if (maneuver.modifier) {
        action += " " + maneuver.modifier;
    }

    action = action.charAt(0).toUpperCase() + action.slice(1);

    const item = document.createElement("div");
    item.className = "direction-step";

    const number = document.createElement("div");
    number.className = "direction-number";
    number.textContent = index + 1;

    const info = document.createElement("div");
    info.className = "direction-info";

    const heading = document.createElement("strong");
    heading.textContent = action;

    const road = document.createElement("p");
    road.textContent = step.name || "Road name unavailable";

    const distance = document.createElement("small");
    distance.textContent = formatDistance(step.distance);

    info.appendChild(heading);
    info.appendChild(road);
    info.appendChild(distance);

    item.appendChild(number);
    item.appendChild(info);

    directionsPanel.appendChild(item);

});

// START NAVIGATION BUTTON

activeNavigationRoute = selectedRoute;
currentRouteSteps = steps;
currentStepIndex = 0;

const startNavButton = document.createElement("button");

startNavButton.id = "startNavigationBtn";
startNavButton.textContent = "▶ Start Navigation";

startNavButton.className = "primary-btn";

startNavButton.addEventListener("click", function () {

    if (gpsWatchId === null) {
        alert("Please enable My Location first.");
        return;
    }

    isNavigationActive = true;

// SHOW LIVE NAVIGATION BANNER

const navigationBanner = document.getElementById("navigationBanner");

navigationBanner.style.display = "flex";

const firstStep = currentRouteSteps[0];

if (firstStep) {

    const maneuver = firstStep.maneuver || {};

    let instruction = maneuver.type || "Continue";

    if (maneuver.modifier) {
        instruction += " " + maneuver.modifier;
    }

    document.getElementById("navigationStatus").textContent =
        instruction.charAt(0).toUpperCase() + instruction.slice(1);

    document.getElementById("navigationDistance").textContent =
        "Follow the route ahead";
}


    currentStepIndex = 0;

    startNavButton.textContent = "Navigation Started";

    alert("YatraX navigation started!");

});

directionsPanel.appendChild(startNavButton);


        const note = document.createElement("p");

        if (routeType === "safest") {
            note.textContent =
                "Safety ranking is not available yet. No route has been verified as safest. Compare official road and disaster alerts before travelling.";
        } else {
            note.textContent =
                "These are routing estimates, not live traffic or safety guarantees. Road closures and weather alerts are not yet integrated.";
        }

        note.className = "route-note";
        routeResults.appendChild(note);

    }


    // ==================================
    // 11. FORM SUBMISSION
    // ==================================

    routeForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const startName = startInput.value.trim();
        const endName = endInput.value.trim();

        if (!startName || !endName) {
            alert("Please enter both locations.");
            return;
        }

        if (startName.toLowerCase() === endName.toLowerCase()) {
            alert("Starting point and destination cannot be the same.");
            return;
        }

        routeResults.innerHTML = "<p>Finding locations and calculating routes...</p>";

        try {

            const start =
    selectedLocations.get(startName.toLowerCase()) ||
    await getCoordinates(startName);
            const end =
    selectedLocations.get(endName.toLowerCase()) ||
    await getCoordinates(endName);

            const routes = await findRoutes(start, end);

            displayRoutes(routes, start, end);

        } catch (error) {

            routeResults.innerHTML = "";

            const message = document.createElement("p");
            message.textContent = error.message;

            routeResults.appendChild(message);

        }

    });


    // ==================================
    // 12. CHANGE ROUTE TYPE
    // ==================================

    document.querySelectorAll('input[name="routeType"]')
        .forEach(function (radio) {

            radio.addEventListener("change", function () {

                if (startMarker && endMarker) {
                    routeForm.requestSubmit();
                }

            });

        });


    // ==================================
    // 13. RESET MAP
    // ==================================

    resetButton.addEventListener("click", function () {

        clearRoutes();

        markerLayer.addTo(map);

        map.setView([30.0668, 79.0193], 7);

        routeResults.innerHTML = `
            <h3>Route Information</h3>
            <p>Enter your starting point and destination to compare available routes.</p>
        `;

    });

});
