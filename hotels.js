
const searchBtn = document.getElementById("searchBtn");
const locationSelect = document.getElementById("location");
const budgetSelect = document.getElementById("budget");
const hotelCards = document.querySelectorAll(".hotel-card");
const noResults = document.getElementById("noResults");

function filterHotels() {
    const selectedLocation = locationSelect.value;
    const maxBudget = Number(budgetSelect.value);

    let visible = 0;

    hotelCards.forEach(card => {
        const location = card.dataset.location;
        const price = Number(card.dataset.price);

        const locationMatch =
            selectedLocation === "all" ||
            selectedLocation === location;

        const budgetMatch = price <= maxBudget;

        const show = locationMatch && budgetMatch;

        card.style.display = show ? "block" : "none";

        if (show) visible++;
    });

    noResults.hidden = visible !== 0;
}

searchBtn.addEventListener("click", filterHotels);

function showHotel(name) {
    alert(
        name +
        "\n\nThis is a sample hotel listing.\n" +
        "Property identity, room availability and tariffs are not verified.\n" +
        "Live booking is not connected yet."
    );
}
