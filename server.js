// Import delle librerie necessarie
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importa CORS

const app = express();
const port = process.env.PORT || 10000; // Porta da Render (o 10000 in locale)

// Chiave API di Alpha Vantage
const apiKey = 'LISDU46A2I8BLHA8'; // Inserisci qui la tua chiave API

// Abilita CORS per permettere le richieste dal frontend (il tuo sito)
app.use(cors());

// Endpoint per ottenere le notizie
app.get('/api/news', async (req, res) => {
  try {
    // URL dell'API di Alpha Vantage per ottenere i dati delle azioni (esempio per MSFT)
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

// Serve file statici (per esempio HTML, CSS, JS)
app.use(express.static('public'));

// Avvia il server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
