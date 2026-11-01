
document.addEventListener("DOMContentLoaded", function () {

    // Smooth scrolling for category cards
    document.querySelectorAll(".category-card").forEach(function (card) {

        card.addEventListener("click", function (event) {

            const target = card.getAttribute("href");

            if (target && target.startsWith("#")) {
                const section = document.querySelector(target);

                if (section) {
                    event.preventDefault();

                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }

        });

    });

});
