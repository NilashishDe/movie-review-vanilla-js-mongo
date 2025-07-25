document.getElementById('ratingForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get the selected rating
    const form = event.target;
    const selectedRating = form.elements['rating'].value;

    // Example movie ID (you should replace this with the actual movie ID)
    const movieId = 'god';

    // Send the rating to the server
    try {
        const response = await fetch('/submitRating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                movieId: movieId,
                rating: parseInt(selectedRating),
            }),
        });

        if (response.ok) {
            console.log('Rating submitted successfully');
        } else {
            console.error('Failed to submit rating');
        }
    } catch (error) {
        console.error('An error occurred while submitting the rating:', error);
    }
});
