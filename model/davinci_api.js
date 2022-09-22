const { Configuration, OpenAIApi } = require('openai');
const credentials = require('./config');
const configuration = new Configuration({
  apiKey: credentials.api_key,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  query_davinci: async (full_prompt_state) => {
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: full_prompt_state,
      temperature: 1,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['\n***\n'],
    });
    return response;
  },
};
