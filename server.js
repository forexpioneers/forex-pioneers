// Import delle librerie necessarie
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importa CORS

const app = express();
const port = process.env.PORT || 10000; // Porta da Render (o 10000 in locale)

// Chiave API di Alpha Vantage o qualsiasi altro servizio di notizie finanziarie
const apiKey = 'LISDU46A2I8BLHA8'; // Inserisci qui la tua chiave API

// Abilita CORS per permettere le richieste dal frontend (il tuo sito)
app.use(cors());

// Endpoint per ottenere le notizie
app.get('/api/news', async (req, res) => {
  try {
    // URL dell'API per ottenere le notizie finanziarie (puoi cambiare la fonte se necessario)
    const url = `https://newsapi.org/v2/everything?q=forex&apiKey=${apiKey}`; // Usa un'API come NewsAPI per le notizie Forex

    // Richiesta API per ottenere i dati delle notizie
    const response = await axios.get(url);

    // Se la risposta è corretta, invia i dati
    if (response.status === 200 && response.data.articles) {
      res.json({
        articles: response.data.articles.map(article => ({
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
        }))
      });
    } else {
      res.status(404).json({ error: 'No articles found' });
    }
  } catch (error) {
    // In caso di errore, restituire un messaggio di errore
    console.error('Error fetching data from the news API:', error);
    res.status(500).json({ error: 'Error fetching news' });
  }
});

// Serve file statici (per esempio HTML, CSS, JS)
app.use(express.static('public'));

// Avvia il server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
