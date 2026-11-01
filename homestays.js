const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const budgetFilter = document.getElementById("budgetFilter");

function filterHomestays() {
  const searchText = searchInput.value.toLowerCase();
  const selectedLocation = locationFilter.value;
  const selectedBudget = budgetFilter.value;

  const cards = document.querySelectorAll(".stay-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    const location = card.dataset.location;
    const price = Number(card.dataset.price);

    const matchesSearch = name.includes(searchText);
    const matchesLocation =
      selectedLocation === "all" || location === selectedLocation;

    let matchesBudget = true;

    if (selectedBudget === "budget") {
      matchesBudget = price < 1500;
    } else if (selectedBudget === "medium") {
      matchesBudget = price >= 1500 && price <= 2500;
    } else if (selectedBudget === "premium") {
      matchesBudget = price > 2500;
    }

    const show = matchesSearch && matchesLocation && matchesBudget;

    card.style.display = show ? "block" : "none";

    if (show) visibleCount++;
  });

  document.getElementById("noResults").hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterHomestays);
locationFilter.addEventListener("change", filterHomestays);
budgetFilter.addEventListener("change", filterHomestays);

function showDetails(name) {
  alert(
    name +
    "\n\nThis is a demo listing. Property verification and booking will be added later."
  );
}