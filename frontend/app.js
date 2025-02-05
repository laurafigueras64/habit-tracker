// =============================
// DOM Elements
// =============================
// Get references to various elements in the DOM
const form = document.getElementById('habit-form');
const habitList = document.getElementById('habit-list');

// =============================
// Function to Load the Menu Dynamically
// =============================
// Fetches menu.html and inserts it into the #menu-container element
const loadMenu = async () => {
    try {
        const response = await fetch('menu.html'); // Fetch menu from external file
        if (!response.ok) {
            throw new Error(`Failed to load menu: ${response.statusText}`);
        }
        const html = await response.text(); // Convert response to text
        document.getElementById('menu-container').innerHTML = html; // Insert into page
    } catch (error) {
        console.error('Error loading menu:', error); // Log errors if fetching fails
    }
};

// =============================
// Load and Display Habits
// =============================
// Fetches habits from the backend and displays them in #habit-list
const loadHabits = async () => {
    if (!habitList) return; // Exit function if habitList doesn't exist
    try {
        const response = await fetch('/habits'); // Request habit data
        const habits = await response.json(); // Parse response as JSON
        
        // Generate and insert habit items into the habit list
        habitList.innerHTML = habits.map(habit => `
            <div class="habit-item">
                <div class="habit-content">
                    <div class="habit-text">
                        <h3>${habit.name}</h3>
                        <p>${habit.description}</p>
                        <p><strong>Frequency:</strong> ${habit.frequency}</p>
                    </div>
                    <div class="habit-graphic"></div> <!-- Placeholder for future graphic -->
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading habits:', error);
        habitList.innerHTML = '<p class="error-message">Failed to load habits. Please try again later.</p>';
    }
};

// =============================
// Handle Form Submission for Adding a Habit
// =============================
// Listens for form submission and sends habit data to the backend
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        // Capture user input values from the form
        const name = document.getElementById('habit-name').value;
        const description = document.getElementById('habit-description').value;
        const dayCheckboxes = document.querySelectorAll('input[name="habit-days"]:checked');
        let frequency = Array.from(dayCheckboxes).map(checkbox => checkbox.value); // Collect checked values
        
        if (frequency.toString() == 'monday,tuesday,wednesday,thursday,friday,saturday,sunday') {
            console.log('made it')
            frequency = "daily";
        }

        try {
            // Send user input data as JSON to the server
            const response = await fetch('/add-habit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, frequency })
            });
            const result = await response.json(); // Parse JSON response
            alert(result.message); // Show success/failure message to user
            window.location.href = 'view-habits.html'; // Redirect to habits page
        } catch (error) {
            console.error('Error adding habit:', error);
            alert('Failed to add habit. Please try again.');
        }
    });
}

// =============================
// Event Listener for DOM Content Loaded
// =============================
// Ensures that functions only run after the page has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadMenu(); // Load menu dynamically
    loadHabits(); // Load and display habits if habitList exists
});
