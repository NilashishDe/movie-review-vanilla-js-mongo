document.addEventListener('DOMContentLoaded', function () {
  // Fetch movie reviews from the server and render them
  fetchMovieReviews();
});

function fetchMovieReviews() {
  fetch('/api/movie-reviews')
    .then(response => response.json())
    .then(reviews => renderMovieReviews(reviews))
    .catch(error => console.error('Error fetching movie reviews:', error));
}

function renderMovieReviews(reviews) {
  const reviewSection = document.getElementById('movie-reviews');
  reviewSection.innerHTML = '';
  reviews.forEach(review => {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review');
    reviewElement.innerHTML = `
        <h3>${review.title}</h3>
        <p>${review.content}</p>
        <p>Rating: ${review.rating}</p>
      `;
    reviewSection.appendChild(reviewElement);
  });
}
