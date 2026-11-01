
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const filterButtons = document.querySelectorAll(".filter-btn");
const restaurantCards = document.querySelectorAll(".restaurant-card");
const noResults = document.getElementById("noResults");

let activeCategory = "all";

function filterRestaurants() {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    restaurantCards.forEach(card => {
        const category = card.dataset.category;
        const name = card.dataset.name;
        const text = card.innerText.toLowerCase();

        const categoryMatch =
            activeCategory === "all" || category === activeCategory;

        const searchMatch =
            name.includes(query) || text.includes(query);

        const visible = categoryMatch && searchMatch;

        card.style.display = visible ? "block" : "none";

        if (visible) visibleCount++;
    });

    noResults.hidden = visibleCount !== 0;
}

searchBtn.addEventListener("click", filterRestaurants);

searchInput.addEventListener("input", filterRestaurants);

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");
        activeCategory = button.dataset.category;

        filterRestaurants();
    });
});

function showDetails(name) {
    alert(
        name +
        "\n\nThis is a sample restaurant listing.\n" +
        "Business identity, menu and prices are not yet verified.\n\n" +
        "Live booking and owner contact will be added later."
    );
}
