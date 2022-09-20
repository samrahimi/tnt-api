const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const pretrained_model = require('./model/sir_g').pretrained;
app.use(express.static('static'));
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages/index.html'));
});

app.get('/model', (req, res) => {
  res.send(pretrained_model);
});
app.get('/invoke', async (req, res) => {
  //assume the happy path, save an engineer
  const pipeline = 'trinity';
  const original_prompt = req.query['user_prompt'];
  const full_prompt =
    pretrained_model + original_prompt + '\nBEST PROMPT EVER:';
  const gpt = require('./model/davinci_api');

  //log before and after

  console.log('PROMPT', JSON.stringify(full_prompt));
  const result = await gpt.query_davinci(full_prompt);
  console.log('RESPONSE', JSON.stringify(result.data));
  res.send(result.data);
});

app.listen(port, () => {
  console.log(
    `Axion prompt enhancer standing by at http://localhost:${port}/invoke`
  );
});
