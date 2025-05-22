const express = require('express');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Stock API is running!');
});

app.get('/stock/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  try {
    const response = await axios.get(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`);
    const result = response.data.quoteResponse.result[0];
    if (!result) {
      return res.status(404).json({ error: 'Stock symbol not found' });
    }

    const price = result.regularMarketPrice;
    res.json({ symbol, price });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
