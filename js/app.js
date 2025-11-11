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
const countElement = document.getElementById('favorites-count');
const submitBtn = document.getElementById('submit-btn');

console.log('Form:', form);
console.log('Favorites list:', favoritesList);
console.log('Search input:', searchInput);
console.log('Category filter:', categoryFilter);

// Function to save favorites to localStorage
function saveFavorites() {
  try {
    localStorage.setItem('localFavorites', JSON.stringify(favorites));
    console.log('Favorites saved to localStorage');
    updateCount();
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
    updateCount();
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    favorites = [];
  }
}

// Function to update favorites count
function updateCount() {
  if (countElement) {
    countElement.textContent = `You have ${favorites.length} favorite${favorites.length === 1 ? '' : 's'}`;
  }
}

// Function to display all favorites on the page
function displayFavorites() {
  console.log('Displaying favorites...');

  favoritesList.innerHTML = '';

  if (favorites.length === 0) {
    favoritesList.innerHTML =
      '<p class="empty-message">No favorites yet. Add your first favorite place above!</p>';
    updateCount();
    return;
  }

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

  updateCount();
}

// Function to search and filter favorites
function searchFavorites() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  console.log('Searching for:', searchText, 'Category:', selectedCategory);

  favoritesList.innerHTML = '';

  const filteredFavorites = favorites.filter(function (favorite) {
    const matchesSearch =
      searchText === '' ||
      favorite.name.toLowerCase().includes(searchText) ||
      favorite.notes.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === 'all' || favorite.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  console.log('Found', filteredFavorites.length, 'matching favorites');

  const countMessage = document.createElement('p');
  countMessage.className = 'favorites-count';
  countMessage.textContent = `Showing ${filteredFavorites.length} of ${favorites.length} favorites`;
  favoritesList.prepend(countMessage);

  if (filteredFavorites.length === 0) {
    favoritesList.innerHTML =
      '<p class="empty-message">No favorites match your search.</p>';
    return;
  }

  filteredFavorites.forEach(function (favorite) {
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
  event.preventDefault();
  console.log('Add Favorite button clicked!');

  const nameInput = document.getElementById('name');
  const categoryInput = document.getElementById('category');
  const ratingInput = document.getElementById('rating');
  const notesInput = document.getElementById('notes');

  const nameValue = nameInput.value.trim();
  const categoryValue = categoryInput.value;
  const ratingValue = parseInt(ratingInput.value);
  const notesValue = notesInput.value.trim();

  // Validate required fields
  if (!nameValue.trim()) {
    alert('⚠️ Please enter a place name before saving!');
    nameInput.style.borderColor = 'red';
    return;
  } else {
    nameInput.style.borderColor = '';
  }

  if (!categoryValue) {
    alert('⚠️ Please select a category!');
    categoryInput.style.borderColor = 'red';
    return;
  } else {
    categoryInput.style.borderColor = '';
  }

  // Temporary button feedback
  submitBtn.textContent = 'Saving...';

  const newFavorite = {
    name: nameValue,
    category: categoryValue,
    rating: ratingValue,
    notes: notesValue,
    dateAdded: new Date().toLocaleDateString()
  };

  favorites.push(newFavorite);
  console.log('Created favorite object:', newFavorite);
  saveFavorites();
  form.reset();
  displayFavorites();

  // Button reset animation
  submitBtn.textContent = 'Added!';
  setTimeout(() => {
    submitBtn.textContent = 'Add Favorite';
  }, 1500);

  console.log('Favorite added successfully!');
}

// Sorting functions
function sortByName() {
  favorites.sort((a, b) => a.name.localeCompare(b.name));
  saveFavorites();
  displayFavorites();
}

function sortByRating() {
  favorites.sort((a, b) => b.rating - a.rating);
  saveFavorites();
  displayFavorites();
}

function sortByDate() {
  favorites.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  saveFavorites();
  displayFavorites();
}

// Function to delete a favorite by index
function deleteFavorite(index) {
  console.log('Deleting favorite at index:', index);
  console.log('Favorite to delete:', favorites[index].name);

  const favorite = favorites[index];
  const confirmDelete = confirm(`Are you sure you want to delete "${favorite.name}"?`);

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

const clearAllBtn = document.getElementById('clear-all-btn');
if (clearAllBtn) {
  clearAllBtn.addEventListener('click', clearAllFavorites);
  console.log('Clear all button connected');
}

// Load saved favorites from localStorage on startup
loadFavorites();
displayFavorites();