const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// API endpoint per le notizie Forex
app.get('/news', async (req, res) => {
  try {
    const response = await fetch('https://newsapi.org/v2/everything?q=forex&apiKey=bc3b5d8a7d6a45c8a7b16d3077433d59');
    const data = await response.json();

    if (data.status === 'ok') {
      res.json(data);
    } else {
      res.status(500).json({ error: 'Error fetching Forex news' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
