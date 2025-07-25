document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const moviesList = document.querySelectorAll(".movie");

    searchButton.addEventListener("click", searchMovies);

    searchInput.addEventListener("input", searchMovies);

    function searchMovies() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        moviesList.forEach(function (movie) {
            const title = movie.querySelector("h2").innerText.toLowerCase();
            const genre = movie.querySelector("p:nth-of-type(2)").innerText.toLowerCase();

            if (title.includes(searchTerm) || genre.includes(searchTerm)) {
                movie.style.display = "block";
            } else {
                movie.style.display = "none";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const feedbackForm = document.getElementById("review-form");

    feedbackForm.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log(document.getElementById("reviewText").value)
        const formData = new FormData(feedbackForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);

        alert("Thank you for your feedback!");

        feedbackForm.reset();
    });
});
