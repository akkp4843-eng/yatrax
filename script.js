
document.addEventListener("DOMContentLoaded", () => {

  
  // 1. SEARCH FEATURE
  const searchForm = document.getElementById("searchForm");
  const destinationInput = document.getElementById("destinationInput");

  const destinationsList = [
    "Dehradun", "Rishikesh", "Haridwar", "Mussoorie",
    "Nainital", "Auli", "Jim Corbett", "Kedarnath",
    "Badrinath", "Gangotri", "Yamunotri", "Chopta",
    "Lansdowne", "Almora", "Ranikhet", "Harsil"
  ];

  const searchResults = document.createElement("div");
  searchResults.id = "searchResults";
  searchForm.insertAdjacentElement("afterend", searchResults);

  destinationInput.addEventListener("input", () => {
    const query = destinationInput.value.trim().toLowerCase();
    searchResults.innerHTML = "";

    if (!query) {
      searchResults.style.display = "none";
      return;
    }

    const matches = destinationsList.filter(place =>
      place.toLowerCase().includes(query)
    );

    matches.forEach(place => {
      const item = document.createElement("button");
      item.type = "button";
      item.textContent = "📍 " + place;

      item.addEventListener("click", () => {
        destinationInput.value = place;
        searchResults.style.display = "none";
      });

      searchResults.appendChild(item);
    });

    searchResults.style.display = matches.length ? "block" : "none";
  });

 searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = destinationInput.value.trim().toLowerCase();

    if (!query) {
        alert("Please enter a destination.");
        return;
    }

    
// DEHRADUN DASHBOARD
if (query === "dehradun") {
    window.location.href = "dehradun.html";
    return;
}

// RISHIKESH DASHBOARD
if (query === "rishikesh") {
    window.location.href = "rishikesh.html";
    return;
}


    const match = destinationsList.find(place =>
        place.toLowerCase() === query
    );

    if (match) {
        alert("Destination selected: " + match);
    } else {
        alert("Destination not found.");
    }
});


  // 2. DESTINATION BUTTONS
  document.querySelectorAll(".destinations [data-place]").forEach(button => {
    button.addEventListener("click", () => {
        const place = button.dataset.place;

        if (place.toLowerCase() === "dehradun") {
            window.location.href = "dehradun.html";
            return;
        }

        if (place.toLowerCase() === "rishikesh") {
            window.location.href = "rishikesh.html";
            return;
        }

        destinationInput.value = place;
        destinationInput.focus();
    });
});

  // 3. MORE DESTINATIONS
  const moreBtn = document.getElementById("moreBtn");

  const morePlaces = [
    "Kedarnath",
    "Badrinath",
    "Gangotri",
    "Yamunotri",
    "Chopta",
    "Lansdowne",
    "Almora",
    "Ranikhet"
  ];

  moreBtn.addEventListener("click", () => {
    const existing = document.getElementById("morePlaces");

    if (existing) {
      existing.remove();
      moreBtn.textContent = "More⌄";
      return;
    }

    const menu = document.createElement("div");
    menu.id = "morePlaces";

    morePlaces.forEach(place => {
      const button = document.createElement("button");
      button.textContent = place;

      button.addEventListener("click", () => {
        destinationInput.value = place;
        menu.remove();
        moreBtn.textContent = "More⌄";
      });

      menu.appendChild(button);
    });

    moreBtn.closest(".destinations").appendChild(menu);
    moreBtn.textContent = "Less⌃";
  });

  // 4. LOGIN AND SIGNUP
  document.getElementById("loginBtn").addEventListener("click", () => {
    const email = prompt("Enter your email:");
    if (!email) return;

    const password = prompt("Enter your password:");
    if (password) {
      alert("Demo Login submitted for " + email);
    }
  });

  document.getElementById("signupBtn").addEventListener("click", () => {
    const name = prompt("Enter your name:");
    if (!name) return;

    const email = prompt("Enter your email:");
    if (email) {
      alert("Demo Sign Up submitted for " + name);
    }
  });

  // 5. NOTIFICATIONS
  document.getElementById("notificationBtn").addEventListener("click", () => {
    alert("You have no new notifications.");
  });

  // 6. EMERGENCY
  document.getElementById("emergencyBtn").addEventListener("click", () => {
    alert(
      "Emergency Help\n\n" +
      "Police: 112\n" +
      "Ambulance: 108\n\n" +
      "For immediate assistance, call the appropriate emergency service."
    );
  });

});
