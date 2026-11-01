const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const budgetFilter = document.getElementById("budgetFilter");

function filterActivities() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedBudget = budgetFilter.value;

  const cards = document.querySelectorAll(".activity-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    const category = card.dataset.category;
    const price = Number(card.dataset.price);

    const matchesSearch = name.includes(searchText);
    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;

    let matchesBudget = true;

    if (selectedBudget === "budget") {
      matchesBudget = price < 1000;
    } else if (selectedBudget === "medium") {
      matchesBudget = price >= 1000 && price <= 2500;
    } else if (selectedBudget === "premium") {
      matchesBudget = price > 2500;
    }

    const show = matchesSearch && matchesCategory && matchesBudget;
    card.style.display = show ? "block" : "none";

    if (show) visibleCount++;
  });

  document.getElementById("noResults").hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterActivities);
categoryFilter.addEventListener("change", filterActivities);
budgetFilter.addEventListener("change", filterActivities);

function showDetails(name) {
  alert(
    name +
    "\n\nThis is a demo listing. Operator verification, availability and booking will be added later."
  );
}