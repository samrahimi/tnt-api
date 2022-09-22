const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const gpt = require('./model/davinci_api');

const pretrained_model = require('./model/sir_g').pretrained;
app.use(express.static('static'));
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages/main.html'));
});

app.get('/model', (req, res) => {
  res.send(pretrained_model);
});
app.get('/invoke', async (req, res) => {
  //assume the happy path, save an engineer
  const pipeline = 'trinity';
  const original_prompt = req.query['invocation'];
  const full_prompt =
    pretrained_model + original_prompt + '\nBEST PROMPT EVER:';

  //log before and after
  console.log('PROMPT', JSON.stringify(full_prompt));

  const result = await gpt.query_davinci(full_prompt);
  console.log('RESPONSE', JSON.stringify(result.data.choices[0]));

  //if we are in training mode, append prompt and response to the zeroshot
  const config = require('./model/config');
  if (config.append_prompt) {
    const new_prompt = full_prompt + result + '\n***\nBAD Prompt:';
    require('./model/sir_g').update_model(new_prompt);
  }
  res.send(result.data.choices[0]);
});

app.listen(port, () => {
  console.log(
    `Axion prompt enhancer standing by at http://localhost:${port}/invoke`
  );
});
