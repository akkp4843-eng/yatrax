
document.addEventListener("DOMContentLoaded", function () {

    const chatForm = document.getElementById("chatForm");
    const userMessage = document.getElementById("userMessage");
    const chatMessages = document.getElementById("chatMessages");
    const destination = document.getElementById("destination");
    const exploreBtn = document.getElementById("exploreBtn");

    // DEMO DESTINATION DATABASE
    const places = {
        rishikesh: {
            name: "Rishikesh",
            intro: "Rishikesh Uttarakhand ka famous spiritual aur adventure destination hai. Ye Ganga river, yoga, temples, rafting aur Himalayan foothills ke liye jaana jaata hai.",
            specialties: [
                "Ganga Aarti at Triveni Ghat",
                "River rafting and adventure activities",
                "Yoga and meditation",
                "Lakshman Jhula and Ram Jhula area"
            ],
            hidden: [
                "Neer Garh Waterfall",
                "Patna Waterfall",
                "Kunjapuri sunrise viewpoint",
                "Phool Chatti area"
            ],
            hotels: [
                ["Budget", "Hostels and basic guesthouses", "₹500–₹1,200/night"],
                ["Mid-range", "Riverside hotels and homestays", "₹1,500–₹3,500/night"],
                ["Premium", "Luxury resorts and wellness stays", "₹5,000+/night"]
            ],
            food: [
                ["Aloo Puri", "Indicative ₹60–₹120"],
                ["Chole Bhature", "Indicative ₹80–₹150"],
                ["Local Thali", "Indicative ₹100–₹250"],
                ["Masala Chai", "Indicative ₹15–₹40"]
            ],
            itinerary: [
                "Day 1: Triveni Ghat, Ram Jhula, Ganga Aarti",
                "Day 2: Neer Garh Waterfall and Beatles Ashram",
                "Day 3: Adventure activities and Kunjapuri viewpoint"
            ]
        },

        dehradun: {
            name: "Dehradun",
            intro: "Dehradun Uttarakhand ki capital hai. Ye apni valleys, pleasant surroundings, educational institutions aur nearby hill destinations ke liye famous hai.",
            specialties: [
                "Robber's Cave",
                "Sahastradhara",
                "Forest Research Institute",
                "Tapkeshwar Temple"
            ],
            hidden: [
                "Maldevta",
                "Lachhiwala Nature Park",
                "Thano Forest area",
                "Malsi forest surroundings"
            ],
            hotels: [
                ["Budget", "Budget hotels and guesthouses", "₹600–₹1,200/night"],
                ["Mid-range", "Business hotels and homestays", "₹1,500–₹3,500/night"],
                ["Premium", "Premium hotels and resorts", "₹5,000+/night"]
            ],
            food: [
                ["Kandalee ka Saag", "Indicative ₹100–₹200"],
                ["Kafuli", "Indicative ₹100–₹200"],
                ["Chainsoo", "Indicative ₹120–₹220"],
                ["Local snacks", "Indicative ₹30–₹100"]
            ],
            itinerary: [
                "Day 1: FRI, Robber's Cave and Tapkeshwar",
                "Day 2: Sahastradhara and Maldevta",
                "Day 3: Lachhiwala and local food exploration"
            ]
        }
    };

    function addMessage(text, type) {
        const div = document.createElement("div");
        div.className = "message " + type;
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function createList(items) {
        return items.map(item => `<li>${item}</li>`).join("");
    }

    function showGuide(place) {
        const data = places[place.toLowerCase()];

        if (!data) {
            addMessage(
                "Abhi Demo Mode mein Rishikesh aur Dehradun available hain. Baaki destinations ka database jald add hoga.",
                "ai-message"
            );
            return;
        }

        const guide = document.createElement("div");
        guide.className = "message ai-message";

        guide.innerHTML = `
            <h2>🌄 Explore ${data.name}</h2>
            <p>${data.intro}</p>

            <hr>
            <h3>⭐ Famous Specialties</h3>
            <ul>${createList(data.specialties)}</ul>

            <hr>
            <h3>💎 Hidden Gems</h3>
            <ul>${createList(data.hidden)}</ul>

            <hr>
            <h3>🏨 Hotels & Stays</h3>
            ${data.hotels.map(h => `
                <p><b>${h[0]}</b><br>${h[1]}<br>${h[2]}</p>
            `).join("")}

            <hr>
            <h3>🍲 Famous Food & Indicative Prices</h3>
            ${data.food.map(f => `
                <p><b>${f[0]}</b> — ${f[1]}</p>
            `).join("")}

            <hr>
            <h3>🗓️ Suggested 3-Day Itinerary</h3>
            <ul>${createList(data.itinerary)}</ul>

            <hr>
            <h3>🏥 Hospitals & Emergency</h3>
            <p>Nearby hospitals, pharmacies and emergency services should be checked using current verified location data before travel.</p>

            <hr>
            <p><b>🗺️ Explore routes with YatraX Smart Map</b></p>
            <a href="map.html" class="map-link">Open YatraX Map →</a>

            <p style="font-size:11px;margin-top:15px;color:#777;">
                DEMO DATA: Hotel categories and prices are illustrative estimates,
                not live verified listings. Confirm prices, availability and
                facilities directly before booking.
            </p>
        `;

        chatMessages.appendChild(guide);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage(message) {
        message = message.trim();
        if (!message) return;

        addMessage(message, "user-message");
        userMessage.value = "";

        const lower = message.toLowerCase();

        let place = null;

        if (lower.includes("rishikesh")) {
            place = "rishikesh";
        } else if (lower.includes("dehradun")) {
            place = "dehradun";
        }

        if (place) {
            setTimeout(() => showGuide(place), 400);
        } else {
            setTimeout(() => {
                addMessage(
                    "Main tumhari travel query samajhne ki koshish kar raha hoon. Demo ke liye Rishikesh ya Dehradun search karo.",
                    "ai-message"
                );
            }, 400);
        }
    }

    chatForm.addEventListener("submit", function (event) {
        event.preventDefault();
        sendMessage(userMessage.value);
    });

    exploreBtn.addEventListener("click", function () {
        const place = destination.value.trim();
        if (!place) {
            alert("Please enter a destination.");
            return;
        }
        sendMessage("Give me a complete travel guide for " + place);
    });

    document.querySelectorAll(".suggestion").forEach(button => {
        button.addEventListener("click", function () {
            sendMessage(
                button.textContent + " in " +
                (destination.value.trim() || "Rishikesh")
            );
        });
    });

});
