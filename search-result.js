let currentPage = 1;
const perPage = 30;

document.addEventListener('DOMContentLoaded', () => {
    loadImages(currentPage);

    document.querySelector('.pagination').addEventListener('click', (event) => {
        if (event.target.classList.contains('next-page')) {
            currentPage++;
            loadImages(currentPage);
        }
    });
});

async function loadImages(page) {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=PmOI6QJGRXMMMBa3B4Qay37dFePA4wN8cdehE8h6qIE&page=${page}&per_page=${perPage}`);
        const data = await response.json();

        const resultsContainer = document.querySelector('.results-container');
        resultsContainer.innerHTML = '';

        data.results.forEach(image => {
            const imageElement = document.createElement('img');
            imageElement.src = image.urls.small;
            imageElement.alt = image.alt_description;

            const card = document.createElement('div');
            card.className = 'image-card';
            card.appendChild(imageElement);

            resultsContainer.appendChild(card);
        });

        // Update pagination controls
        const paginationContainer = document.querySelector('.pagination');
        paginationContainer.innerHTML = '';
        if (data.total_pages > page) {
            const nextPageButton = document.createElement('button');
            nextPageButton.textContent = 'Next Page';
            nextPageButton.className = 'next-page';
            paginationContainer.appendChild(nextPageButton);
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}
