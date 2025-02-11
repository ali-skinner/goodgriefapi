// <!-- First, add this HTML to your page -->
// <div class="search-container">
//     <input type="text" id="searchInput" placeholder="Search for GIFs...">
//     <button id="searchButton">Search</button>
// </div>
// <div id="loadingIndicator" style="display: none;">Loading...</div>
// <div id="resultsContainer"></div>


// Then use this JavaScript
async function searchGifs(searchTerm) {
    const apiKey = 'YOUR_API_KEY';
    const resultsContainer = document.getElementById('resultsContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    try {
        // Show loading indicator
        loadingIndicator.style.display = 'block';
        resultsContainer.innerHTML = '';
        
        // Make the API call
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=10`
        );
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Hide loading indicator
        loadingIndicator.style.display = 'none';
        
        // Display results
        if (data.data.length === 0) {
            resultsContainer.innerHTML = 'No GIFs found';
            return;
        }
        
        data.data.forEach(gif => {
            const gifContainer = document.createElement('div');
            gifContainer.className = 'gif-item';
            
            const img = document.createElement('img');
            img.src = gif.images.fixed_height.url; // Using fixed height for consistency
            img.alt = gif.title;
            
            gifContainer.appendChild(img);
            resultsContainer.appendChild(gifContainer);
        });
        
    } catch (error) {
        console.error('Error:', error);
        loadingIndicator.style.display = 'none';
        resultsContainer.innerHTML = 'Error loading GIFs. Please try again.';
    }
}

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    // Search when button is clicked
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchGifs(searchTerm);
        }
    });
    
    // Search when Enter key is pressed
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                searchGifs(searchTerm);
            }
        }
    });
});

/* And this CSS to make it look nice */
// .search-container {
//     margin: 20px 0;
// }

// #searchInput {
//     padding: 8px;
//     font-size: 16px;
//     width: 200px;
// }

// #searchButton {
//     padding: 8px 16px;
//     font-size: 16px;
//     margin-left: 8px;
// }

// #loadingIndicator {
//     margin: 20px 0;
//     font-style: italic;
// }

// #resultsContainer {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//     gap: 16px;
//     padding: 20px;
// }

// .gif-item {
//     display: flex;
//     justify-content: center;
//     align-items: center;
// }

// .gif-item img {
//     max-width: 100%;
//     height: auto;
// }

///////////////////////////////////////

async function init() {
    // Replace with your actual API key
    const apiKey = 'YOUR_API_KEY';
    const searchTerm = 'cats';  // Change this to whatever you want to search for
    
    try {
        // Make the API call
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=5`
        );
        
        // Convert the response to JSON
        const data = await response.json();
        
        // The actual GIF data is in the 'data' property of the response
        const gifs = data.data;
        
        // Loop through the results
        gifs.forEach(gif => {
            console.log('GIF URL:', gif.images.original.url);
            // You could display the GIF here, for example:
            // document.body.innerHTML += `<img src="${gif.images.original.url}" alt="gif">`;
        });

    } catch (error) {
        console.error('Error fetching GIFs:', error);
    }
}

// Don't forget to call the function!
init();



// -------------------ask v2---------------------------

async function init() {
    const apiKey = 'YOUR_API_KEY';
    const searchTerm = 'cats';
    
    // Create a container for the GIFs
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    try {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=5`
        );
        const data = await response.json();
        
        data.data.forEach(gif => {
            // Create an image element for each GIF
            const img = document.createElement('img');
            img.src = gif.images.original.url;
            img.alt = gif.title;
            container.appendChild(img);
        });

    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = 'Error loading GIFs';
    }
}

init();


