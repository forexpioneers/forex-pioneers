const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;
const API_KEY = 'LISDU46A2I8BLHA8';

app.use(cors());

// Endpoint per ottenere dati di mercato da Alpha Vantage
app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: 'MSFT',
        interval: '5min',
        apikey: API_KEY
      }
    });

    if (response.data && response.data['Time Series (5min)']) {
      res.json(response.data);
    } else {
      console.error('Formato risposta non valido:', response.data);
      res.status(500).json({ error: 'Invalid data format from API' });
    }
  } catch (error) {
    console.error('Errore nel recupero dati:', error.message);
    res.status(500).json({ error: 'Error fetching news' });
  }
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
