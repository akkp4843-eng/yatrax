
document.addEventListener("DOMContentLoaded", function () {

    console.log("Rishikesh Dashboard Connected!");

    // SEARCH ELEMENTS
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("placeSearch");
    const results = document.getElementById("searchResults");

    // RISHIKESH PLACES
    const places = [
        "Ram Jhula",
        "Laxman Jhula",
        "Triveni Ghat",
        "Parmarth Niketan",
        "Neer Garh Waterfall",
        "Beatles Ashram",
        "Shivpuri",
        "Marine Drive",
        "Kunjapuri Temple",
        "Bungee Jumping",
        "Ganga Aarti",
        "Kaudiyala",
        "Vashishta Cave",
        "Patna Waterfall",
        "Rajaji National Park",
        "Jumpin Heights",
        "Rishikesh Bus Stand",
        "Rishikesh Railway Station"
    ];

    // GOOGLE SEARCH
    function searchPlace(place) {
        const url =
            "https://www.google.com/search?q=" +
            encodeURIComponent(place + " Rishikesh Uttarakhand");

        window.open(url, "_blank");
    }

    // SHOW SEARCH SUGGESTIONS
    if (searchForm && searchInput && results) {

        searchInput.addEventListener("input", function () {

            const query = searchInput.value.trim().toLowerCase();

            results.innerHTML = "";

            if (!query) {
                results.style.display = "none";
                return;
            }

            const matches = places.filter(function (place) {
                return place.toLowerCase().includes(query);
            });

            if (matches.length === 0) {
                const noResult = document.createElement("button");
                noResult.type = "button";
                noResult.textContent = "No matching place found";
                noResult.disabled = true;
                results.appendChild(noResult);
                results.style.display = "block";
                return;
            }

            matches.forEach(function (place) {

                const item = document.createElement("button");

                item.type = "button";
                item.textContent = "📍 " + place;

                item.addEventListener("click", function () {
                    searchInput.value = place;
                    results.style.display = "none";
                    searchPlace(place);
                });

                results.appendChild(item);

            });

            results.style.display = "block";

        });

        // SEARCH FORM SUBMIT
        searchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const query = searchInput.value.trim();

            if (!query) {
                alert("Please enter a place to search!");
                return;
            }

            const exactMatch = places.find(function (place) {
                return place.toLowerCase() === query.toLowerCase();
            });

            if (exactMatch) {
                searchPlace(exactMatch);
            } else {
                searchPlace(query);
            }

            results.style.display = "none";

        });

        // CLOSE SUGGESTIONS WHEN CLICKING OUTSIDE
        document.addEventListener("click", function (event) {

            if (!searchForm.contains(event.target)) {
                results.style.display = "none";
            }

        });

    }

    // SMOOTH SCROLL FOR INTERNAL LINKS
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });

});
