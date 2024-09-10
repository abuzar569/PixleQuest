document.addEventListener('DOMContentLoaded', () => {
    // Handle form submission on the landing page
    document.querySelector('.search-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const query = document.querySelector('.search-bar').value;
        if (query.trim() !== '') {
            window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
        }
    });
});
