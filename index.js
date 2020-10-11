import reddit from './redditapi';

// Get DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form Event listener
searchForm.addEventListener('submit', (e) => {
    // Get search term
    const searchTerm = searchInput.value;
    // Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // Get limit
    const searchLimit = document.getElementById('limit').value;
    // Check input
    if (searchTerm === '') {
        // Show a message
        showMessage('Please add a search term', 'alert-danger');
    }
    // Clear input
    searchInput.value = '';

    // Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
        .then(results => {
            let output = '<div class="card-columns">';
            // Loop through posts
            results.forEach(post => {
                // Check for image
                const image = post.preview ? post.preview.images[0].source.url : 'https://logos-download.com/wp-content/uploads/2016/06/Reddit_logo_full_1.png'
                output += `<div class="card">
                <img src=${image} class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title">${truncateText(post.title, 100)}</h5>
                  <p class="card-text">${truncateText(post.selftext, 100)}</p>
                  <a href="${post.url}" target="_blank" class="btn btn-dark">Read More</a>
                </div>
                <hr>
                <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                <span class="badge badge-dark">Score: ${post.score}</span>
              </div>`;
                document.getElementById("results").innerHTML = output;
            })
        });

    e.preventDefault();

})

// Show message
const showMessage = (message, className) => {
    // Create the div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add the text
    div.appendChild(document.createTextNode(message));
    // Get the parent
    const searchContainer = document.getElementById('search-container');
    // Get search
    const search = document.getElementById('search');
    // Insert the message
    searchContainer.insertBefore(div, search);
    // Timeout alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
};

// Trancate Text
const truncateText = (str, num) => {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it
    if (str.length <= num) {
        return str
    }
    // Return str truncated with '...' concatenated to the end of str
    return str.slice(0, num) + '...'
}