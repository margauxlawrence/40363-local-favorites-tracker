// ==========================================
// PROJECT 2: LOCAL FAVORITES TRACKER
// JavaScript Starter Code
// ==========================================

// Log to confirm JavaScript is loaded
console.log('JavaScript file loaded successfully!');

// Global array to store favorites (will use in LAB12-15)
let favorites = [];

// Get references to DOM elements
const addForm = document.getElementById('add-favorite-form');
const favoritesList = document.getElementById('favorites-list');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');

// Test that elements are found
console.log('Form element:', addForm);
console.log('Favorites list element:', favoritesList);
console.log('Search input:', searchInput);
console.log('Category filter:', categoryFilter);

// Temporary test: Prevent form submission until we add JavaScript
addForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form submitted! (JavaScript will handle this in LAB12)');
    alert('Form submitted! We\'ll add JavaScript functionality in LAB12.');
});

console.log('Ready for LAB12: JavaScript Fundamentals!');