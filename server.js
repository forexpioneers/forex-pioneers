// Import delle librerie necessarie
const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Per caricare la chiave API dal file .env

const app = express();
const port = 10000;

// Endpoint per ottenere le notizie
app.get('/api/news', async (req, res) => {
  try {
    // Chiave API da variabile d'ambiente
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

    // URL dell'API di Alpha Vantage per ottenere i dati delle azioni
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=${apiKey}`;

    // Richiesta API per ottenere i dati
    const response = await axios.get(url);

    // Restituisci i dati al client
    res.json(response.data);
  } catch (error) {
    // In caso di errore, restituire un messaggio di errore
    console.error('Error fetching data from Alpha Vantage:', error);
    res.status(500).json({ error: 'Error fetching news' });
  }
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
