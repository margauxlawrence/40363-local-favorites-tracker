// ==========================================
// PROJECT 2: LOCAL FAVORITES TRACKER
// LAB12: JavaScript Fundamentals
// ==========================================

console.log('JavaScript loaded successfully!');
console.log('LAB12: Applying Variables and Objects');

// Example: Creating a sample favorite place
const sampleFavorite = {
    name: 'Starbucks on University Drive',
    category: 'coffee',
    rating: 5,
    notes: 'Great study spot with fast wifi',
    dateAdded: new Date().toLocaleDateString()
};

console.log('Sample Favorite Object:');
console.log(sampleFavorite);

// Practice: Display information about the sample favorite
console.log('Place Name:', sampleFavorite.name);
console.log('Category:', sampleFavorite.category);
console.log('Rating:', sampleFavorite.rating, 'out of 5 stars');
console.log('Notes:', sampleFavorite.notes);
console.log('Date Added:', sampleFavorite.dateAdded);

// Build a formatted display message
let displayMessage = sampleFavorite.name + ' (' + sampleFavorite.category + ') - ' +
                     sampleFavorite.rating + '/5 stars';
console.log('Display Format:', displayMessage);

// Check data types
console.log('Data Types:');
console.log('  name is a', typeof sampleFavorite.name);
console.log('  rating is a', typeof sampleFavorite.rating);

console.log('Ready for LAB13: Functions & DOM Manipulation!');

// Additional Practice: Variables and Math 
let rating1 = 5;
let rating2 = 4;
let rating3 = 5;

let totalRating = rating1 + rating2 + rating3;
let averageRating = totalRating / 3;

console.log('Total Rating:', totalRating);
console.log('Average Rating:', averageRating);
console.log('Average (rounded):', averageRating.toFixed(1));

// Additional Practice: Building String Displays

let placeName = 'Starbucks';
let category = 'coffee';
let rating = 5;
let notes = 'Great wifi';

// Create different display formats
let format1 = placeName + ' - ' + rating + '/5';
let format2 = category.toUpperCase() + ': ' + placeName;
let format3 = '⭐'.repeat(rating) + ' ' + placeName;

console.log(format1);
console.log(format2);
console.log(format3)

// Additional Practice: Create more favorites

let favorite4 = {
    name: 'Your choice',
    category: 'entertainment',  // Try: fitness, services, shopping
    rating: 4,
    notes: 'What you think'
};

let favorite5 = {
    name: 'Your choice',
    category: 'your choice',
    rating: 5,
    notes: 'Your thoughts'
};

// Display both with formatted strings
console.log(favorite4.name + ' (' + favorite4.category + ')');
console.log(favorite5.name + ' (' + favorite5.category + ')');
