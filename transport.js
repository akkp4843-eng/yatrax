
function swapLocations() {
    const from = document.getElementById("from");
    const to = document.getElementById("to");

    const oldFrom = from.value;
    from.value = to.value;
    to.value = oldFrom;
}

function findTransport() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const message = document.getElementById("routeMessage");

    if (from === to) {
        message.textContent = "Please select two different locations.";
        return;
    }

    message.textContent = `Showing transport categories for ${from} → ${to}. Actual routes and availability need operator confirmation.`;

    document.querySelector(".transport-section").scrollIntoView({
        behavior: "smooth"
    });
}

function showRide(type) {
    alert(
        `${type}\n\nYou selected ${type} for your journey.\n\nThis is a demo feature. Live operator details and booking are not connected yet.`
    );
}

function calculateFare() {
    const distance = Number(document.getElementById("distance").value);
    const type = document.getElementById("rideType").value;
    const result = document.getElementById("fareResult");

    if (!Number.isFinite(distance) || distance <= 0 || distance > 500) {
        result.textContent = "Please enter a valid distance between 1 and 500 km.";
        return;
    }

    let minFare = 0;
    let maxFare = 0;

    if (type === "bus") {
        minFare = distance * 2;
        maxFare = distance * 4;
    } else if (type === "taxi") {
        minFare = 80 + distance * 12;
        maxFare = 150 + distance * 18;
    } else {
        minFare = 20 + distance * 4;
        maxFare = 40 + distance * 7;
    }

    result.textContent =
        `Estimated demo fare: ₹${Math.round(minFare)} – ₹${Math.round(maxFare)}`;
}
