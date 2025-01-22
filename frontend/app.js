const form = document.getElementById('habit-form');
const habitList = document.getElementById('habit-list');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('habit-name').value;
        const description = document.getElementById('habit-description').value;
        const frequency = document.getElementById('habit-frequency').value;

        const response = await fetch('/add-habit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, frequency })
        });
        const result = await response.json();
        alert(result.message);
        window.location.href = 'index.html';
    });
}

if (habitList) {
    const loadHabits = async () => {
        const response = await fetch('/habits');
        const habits = await response.json();
        habitList.innerHTML = habits.map(habit => `
            <div>
                <h3>${habit.name}</h3>
                <p>${habit.description}</p>
                <p>Frequency: ${habit.frequency}</p>
            </div>
        `).join('');
    };
    loadHabits();
}

document.addEventListener('DOMContentLoaded', () => {
    // Fetch the menu.html content
    fetch('menu.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load menu: ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            // Insert the menu content into the placeholder
            document.getElementById('menu-container').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading menu:', error);
        });
});
