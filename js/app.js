// ==========================================
// PROJECT 2: LOCAL FAVORITES TRACKER
// LAB15: localStorage Persistence - COMPLETE!
// ==========================================

console.log('LAB15: localStorage Persistence');
console.log('Project 2: Local Favorites Tracker - COMPLETE!');

// Array to store all favorites
let favorites = [];

// Get references to DOM elements
const form = document.getElementById('add-favorite-form');
const favoritesList = document.getElementById('favorites-list');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');

console.log('Form:', form);
console.log('Favorites list:', favoritesList);
console.log('Search input:', searchInput);
console.log('Category filter:', categoryFilter);

// Function to save favorites to localStorage
function saveFavorites() {
    try {
        localStorage.setItem('localFavorites', JSON.stringify(favorites));
        console.log('Favorites saved to localStorage');
        console.log('Saved', favorites.length, 'favorites');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        alert('Unable to save favorites. Your browser may have storage disabled.');
    }
}

// Function to load favorites from localStorage
function loadFavorites() {
    try {
        const savedData = localStorage.getItem('localFavorites');

        if (savedData) {
            favorites = JSON.parse(savedData);
            console.log('Favorites loaded from localStorage');
            console.log('Loaded', favorites.length, 'favorites');
        } else {
            console.log('No saved favorites found');
            favorites = [];
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        console.log('Starting with empty favorites array');
        favorites = [];
    }
}

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

    // ✅ FIX: do NOT call searchFavorites() here (that variable wasn’t ready yet)
    // Instead, just render all favorites directly
    favorites.forEach(function (favorite, index) {
        let starsDisplay = '⭐'.repeat(favorite.rating);
        const cardHTML = `
            <div class="favorite-card">
                <h3>${favorite.name}</h3>
                <span class="favorite-category">${favorite.category}</span>
                <div class="favorite-rating">${starsDisplay} (${favorite.rating}/5)</div>
                <p class="favorite-notes">${favorite.notes}</p>
                <p class="favorite-date">Added: ${favorite.dateAdded}</p>
                <div class="favorite-actions">
                    <button class="btn btn-danger" onclick="deleteFavorite(${index})">Delete</button>
                </div>
            </div>
        `;
        favoritesList.innerHTML += cardHTML;
    });
}

// Function to search and filter favorites
function searchFavorites() {
    // Get the search input value
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    console.log('Searching for:', searchText, 'Category:', selectedCategory);

    // Clear the display
    favoritesList.innerHTML = '';

    // Filter favorites based on search text and category
    const filteredFavorites = favorites.filter(function(favorite) {
        const matchesSearch =
            searchText === '' ||
            favorite.name.toLowerCase().includes(searchText) ||
            favorite.notes.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === 'all' || favorite.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    console.log('Found', filteredFavorites.length, 'matching favorites');

    // ✅ FIX: move count message *after* filteredFavorites is defined
    const countMessage = document.createElement('p');
    countMessage.className = 'favorites-count';
    countMessage.textContent = `Showing ${filteredFavorites.length} of ${favorites.length} favorites`;
    favoritesList.prepend(countMessage);

    // Check if any favorites match
    if (filteredFavorites.length === 0) {
        if (searchText !== '' || selectedCategory !== 'all') {
            favoritesList.innerHTML = '<p class="empty-message">No favorites match your search.</p>';
        } else {
            favoritesList.innerHTML = '<p class="empty-message">No favorites yet. Add your first favorite place above!</p>';
        }
        return;
    }

    // Display filtered favorites
    filteredFavorites.forEach(function(favorite) {
        const originalIndex = favorites.indexOf(favorite);
        let starsDisplay = '⭐'.repeat(favorite.rating);

        const cardHTML = `
            <div class="favorite-card">
                <h3>${favorite.name}</h3>
                <span class="favorite-category">${favorite.category}</span>
                <div class="favorite-rating">${starsDisplay} (${favorite.rating}/5)</div>
                <p class="favorite-notes">${favorite.notes}</p>
                <p class="favorite-date">Added: ${favorite.dateAdded}</p>
                <div class="favorite-actions">
                    <button class="btn btn-danger" onclick="deleteFavorite(${originalIndex})">Delete</button>
                </div>
            </div>
        `;
        favoritesList.innerHTML += cardHTML;
    });
}

// Function to handle adding a new favorite
function addFavorite(event) {
    event.preventDefault();  // Prevent page reload

    console.log('Add Favorite button clicked!');

    // Get values from form inputs
    const nameInput = document.getElementById('name');
    const categoryInput = document.getElementById('category');
    const ratingInput = document.getElementById('rating');
    const notesInput = document.getElementById('notes');

    const nameValue = nameInput.value.trim();
    const categoryValue = categoryInput.value;
    const ratingValue = parseInt(ratingInput.value);
    const notesValue = notesInput.value.trim();

    // Validate required fields
    if (!nameValue || !categoryValue) {
        alert('Please fill in the place name and category!');
        return;
    }

    // Create a favorite object
    const newFavorite = {
        name: nameValue,
        category: categoryValue,
        rating: ratingValue,
        notes: notesValue,
        dateAdded: new Date().toLocaleDateString()
    };

    console.log('Created favorite object:', newFavorite);

    // Add to favorites array
    favorites.push(newFavorite);
    console.log('Total favorites:', favorites.length);

    // Save to localStorage
    saveFavorites();

    // Clear the form
    form.reset();

    // Display updated list (resets filters)
    displayFavorites();

    console.log('Favorite added successfully!');
}

// Function to delete a favorite by index
function deleteFavorite(index) {
    console.log('Deleting favorite at index:', index);
    console.log('Favorite to delete:', favorites[index].name);

    const favorite = favorites[index];
    const confirmDelete = confirm(`Are you sure you want to delete "${favorite.name}"?`);

    // ✅ FIX: wrap in braces so all three actions are part of the if block
    if (confirmDelete) {
        favorites.splice(index, 1);
        console.log('Favorite deleted. Total remaining:', favorites.length);

        saveFavorites();
        searchFavorites();
    }
}

// Function to clear all favorites
function clearAllFavorites() {
    const confirmClear = confirm('Are you sure you want to delete ALL favorites? This cannot be undone!');

    if (confirmClear) {
        favorites = [];
        console.log('All favorites cleared');
        localStorage.removeItem('localFavorites');
        console.log('localStorage cleared');
        displayFavorites();
        alert('All favorites have been deleted.');
    } else {
        console.log('Clear all cancelled by user');
    }
}

// Connect event listeners
form.addEventListener('submit', addFavorite);
searchInput.addEventListener('input', searchFavorites);
categoryFilter.addEventListener('change', searchFavorites);

console.log('Event listeners attached - app is ready!');

// Connect clear all button
const clearAllBtn = document.getElementById('clear-all-btn');
if (clearAllBtn) {
    clearAllBtn.addEventListener('click', clearAllFavorites);
    console.log('Clear all button connected');
}

// Load saved favorites from localStorage on startup
loadFavorites();

// Display the loaded favorites (or empty message)
displayFavorites();