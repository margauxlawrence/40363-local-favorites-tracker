// ==========================================
// PROJECT 2: LOCAL FAVORITES TRACKER
// LAB13: Functions & DOM Manipulation
// ==========================================

console.log('LAB13: Functions & DOM Manipulation');

// Array to store all favorites
let favorites = [];

// Get references to DOM elements
const form = document.getElementById('add-favorite-form');
const favoritesList = document.getElementById('favorites-list');

console.log('Form:', form);
console.log('Favorites list container:', favoritesList);

// Function to display all favorites on the page
function displayFavorites() {
    console.log('Displaying favorites...');

    // Clear the current display
    favoritesList.innerHTML = '';

    // Check if there are any favorites
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-message">No favorites yet. Add your first favorite place above!</p>';
        return;
    }

    // Loop through each favorite and create HTML
    favorites.forEach(function(favorite) {
        // Create the star rating display
        let starsDisplay = '⭐'.repeat(favorite.rating);

        // Build the HTML for this favorite card
        const cardHTML = `
            <div class="favorite-card">
                <h3>${favorite.name}</h3>
                <span class="favorite-category">${favorite.category}</span>
                <div class="favorite-rating">${starsDisplay} (${favorite.rating}/5)</div>
                <p class="favorite-notes">${favorite.notes}</p>
                <p class="favorite-date">Added: ${favorite.dateAdded}</p>
            </div>
        `;

        // Add this card to the favorites list
        favoritesList.innerHTML += cardHTML;
    });

    console.log('Displayed', favorites.length, 'favorite(s)');
}

// Function to handle adding a new favorite
function addFavorite(event) {
    event.preventDefault();  // Prevent page reload

    console.log('Add Favorite button clicked!');

    // Step 1: Get values from form inputs
    const nameInput = document.getElementById('name');
    const categoryInput = document.getElementById('category');
    const ratingInput = document.getElementById('rating');
    const notesInput = document.getElementById('notes');

    const nameValue = nameInput.value;
    const categoryValue = categoryInput.value;
    const ratingValue = parseInt(ratingInput.value);  // Convert to number
    const notesValue = notesInput.value;

    // Step 2: Validate required fields
    if (!nameValue || !categoryValue) {
        alert('Please fill in the place name and category!');
        return;
    }

    // Step 3: Create a favorite object
    const newFavorite = {
        name: nameValue,
        category: categoryValue,
        rating: ratingValue,
        notes: notesValue,
        dateAdded: new Date().toLocaleDateString()
    };

    console.log('Created favorite object:', newFavorite);

    // Step 4: Add to favorites array
    favorites.push(newFavorite);
    console.log('Total favorites:', favorites.length);

    // Step 5: Clear the form for next entry
    form.reset();
    console.log('Form reset - ready for next favorite!');

    // Step 6: Display the updated favorites list
    displayFavorites();
}

// Connect the addFavorite function to the form submit event
form.addEventListener('submit', addFavorite);

console.log('Event listener attached - form is ready!');

// Display empty message when page first loads
displayFavorites();