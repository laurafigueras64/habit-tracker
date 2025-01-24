const form = document.getElementById('habit-form');
const habitList = document.getElementById('habit-list');

// Function to dynamically load the menu
const loadMenu = async () => {
    try {
        const response = await fetch('menu.html');
        if (!response.ok) {
            throw new Error(`Failed to load menu: ${response.statusText}`);
        }
        const html = await response.text();
        document.getElementById('menu-container').innerHTML = html;
    } catch (error) {
        console.error('Error loading menu:', error);
    }
};

// Handle form submission for adding a habit
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('habit-name').value;
        const description = document.getElementById('habit-description').value;
        const frequency = document.getElementById('habit-frequency').value;

        try {
            const response = await fetch('/add-habit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, frequency })
            });
            const result = await response.json();
            alert(result.message);
            window.location.href = 'index.html'; // Redirect to the habits page
        } catch (error) {
            console.error('Error adding habit:', error);
            alert('Failed to add habit. Please try again.');
        }
    });
}

// Load and display habits if the habit list exists
if (habitList) {
    const loadHabits = async () => {
        try {
            const response = await fetch('/habits');
            const habits = await response.json();
            habitList.innerHTML = habits.map(habit => `
                <div>
                    <h3>${habit.name}</h3>
                    <p>${habit.description}</p>
                    <p>Frequency: ${habit.frequency}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading habits:', error);
            habitList.innerHTML = '<p>Failed to load habits. Please try again later.</p>';
        }
    };
    loadHabits();
}

// On DOMContentLoaded, dynamically load the menu
document.addEventListener('DOMContentLoaded', () => {
    loadMenu(); // Call the menu loading function
});
