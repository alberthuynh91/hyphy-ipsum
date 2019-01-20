const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var fs = require('fs');

function getTextFromFile(textFile) {
  var array = fs.readFileSync(textFile).toString().split("\n");
  for(var i in array) {
      console.log(array[i]);
  }
  return array
}

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/api/hyphy', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const array = getTextFromFile('hyphy.txt')
  res.send(JSON.stringify({ hyphy: array }));
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'../build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port ' + port))


