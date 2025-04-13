const express = require('express');
const axios = require('axios'); // Assicurati di installare axios con npm install axios
const app = express();
const port = process.env.PORT || 10000;

// Aggiungi una rotta principale per verificare che il server sia attivo
app.get('/', (req, res) => {
    res.send('API is working!');
});

// Aggiungi una rotta per ottenere le notizie Forex
app.get('/api/news', async (req, res) => {
    try {
        // Sostituisci con l'URL dell'API di notizie corretto (ad esempio, da una fonte Forex)
        const response = await axios.get('https://api.pexels.com/v1/curated', {
            headers: {
                Authorization: '6d72ddc02567443cac6bbb44e2b1b0a8' // Usa la tua API key qui
            }
        });

        // Restituisci i dati delle notizie ricevuti dall'API
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send('Error fetching news');
    }
});

// Aggiungi una rotta per la pagina di contatto
app.get('/contact', (req, res) => {
    res.send('This is the Contact page');
});

// Aggiungi una rotta per la pagina "About"
app.get('/about', (req, res) => {
    res.send('This is the About page');
});

// Avvia il server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
