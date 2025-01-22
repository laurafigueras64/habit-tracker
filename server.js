const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'frontend')));

const habitsFile = './data/habits.json';

// Load habits
const loadHabits = () => {
    if (fs.existsSync(habitsFile)) {
        return JSON.parse(fs.readFileSync(habitsFile));
    }
    return [];
};

// Save habits
const saveHabits = (habits) => {
    fs.writeFileSync(habitsFile, JSON.stringify(habits, null, 2));
};

let habits = loadHabits();

// Add a new habit
app.post('/add-habit', (req, res) => {
    const { name, description, frequency } = req.body;
    habits.push({ name, description, frequency, progress: [] });
    saveHabits(habits);
    res.json({ message: 'Habit added successfully!' });
});

// Log progress for a habit
app.post('/log-progress', (req, res) => {
    const { name, date } = req.body;
    const habit = habits.find(h => h.name === name);
    if (habit) {
        habit.progress.push(date);
        saveHabits(habits);
        res.json({ message: 'Progress logged!' });
    } else {
        res.status(404).json({ message: 'Habit not found!' });
    }
});

// Get all habits
app.get('/habits', (req, res) => {
    res.json(habits);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
});