const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;
const API_KEY = 'LISDU46A2I8BLHA8';

app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'NEWS_SENTIMENT',
        tickers: 'MSFT',
        apikey: API_KEY
      }
    });

    if (response.data && response.data.feed) {
      const articles = response.data.feed.map(article => ({
        title: article.title,
        description: article.summary,
        url: article.url,
        urlToImage: article.banner_image
      }));
      res.json({ articles });
    } else {
      res.status(500).json({ error: 'Invalid data format from API' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
