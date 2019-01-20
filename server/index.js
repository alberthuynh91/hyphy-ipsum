const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

// app.listen(3001, () =>
//   console.log('Express server is running on localhost:3001')
// );

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'../build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port ' + port))