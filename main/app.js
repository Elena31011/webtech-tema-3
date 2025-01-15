const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Rutele (inclusiv cea pentru /food-items)
app.post('/food-items', async (req, res) => {
    // Codul deja prezent în fișier
    try {
        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({ message: "body is missing" });
        }

        const { name, category, calories } = body;

        if (!name || !category || calories === undefined) {
            return res.status(400).json({ message: "malformed request" });
        }

        if (calories <= 0) {
            return res.status(400).json({ message: "calories should be a positive number" });
        }

        const validCategories = ["MEAT", "DAIRY", "VEGETABLE"];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ message: "not a valid category" });
        }

        // Simulare creare în baza de date
        console.log("Food item created:", { name, category, calories });

        return res.status(201).json({ message: "created" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "server error" });
    }
});

// Exportă aplicația pentru teste
module.exports = app;
