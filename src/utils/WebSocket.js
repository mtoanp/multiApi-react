const apiKey = import.meta.env.VITE_WEBSOCKET_API_KEY;
const socket = new WebSocket('wss://ws.finnhub.io?token=' + apiKey);

socket.addEventListener('open', () => {
  console.log('WebSocket Connected');

  // Abonnez-vous aux symboles nécessaires pour l'API de trading
  socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}));
  socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AMZN'}));

  // Pour l'API ExchangeRate-API, abonnez-vous au symbole FX:EURUSD
  socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'FX:EURUSD'}));
});

socket.addEventListener('message', (event) => {
  const json = JSON.parse(event.data);

  if (json.type === 'trade' && json.data && json.data.length > 0) {
    const stockData = json.data[0];
    console.log('Nouvelles données de trade reçues :', stockData);
  } else if (json.s === 'FX:EURUSD') {
    const exchangeRateData = {
      symbol: json.s,
      rate: json.p,
    };
    console.log('Nouvelles données de taux de change reçues :', exchangeRateData);
  }
});

socket.addEventListener('error', (error) => {
  console.error('WebSocket Error:', error);
});

socket.addEventListener('close', () => {
  console.log('WebSocket Disconnected');
});

export default socket;
