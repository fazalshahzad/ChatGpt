const chatModel = require('../models/chatModel');
const axios = require('axios');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const fs = require('fs');


//OpenAi Configuration
const _OpenApiKey = ''

const openai = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${_OpenApiKey}`,
  },
});
// OpenAi Configuration

async function createChatCompletion(messages, options = {}) {
  try {
    const response = await openai.post("/chat/completions", {
      model: options.model || "gpt-4",
      messages,
      ...options,
    });

    return response.data.choices;
  } catch (error) {
    console.log(error)
    console.error("Error creating chat completion:", error);
    return null
  }
}

async function getAvatar(req, res) {
  try {
    const userPrompt = req.body;
    console.log(userPrompt);
    const messages = userPrompt;
    const options = {
      temperature: 0.7,
      max_tokens: 250,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p:1
    };
    const choices = await createChatCompletion(messages, options);
    const resultMessage = choices[0].message.content;
    const payLoadToGpt = messages.slice()
    messages.push({role:'assistant', content: resultMessage});
    res.json({
      responseFromAi:resultMessage,
      message:messages,
      payload: payLoadToGpt,
      options:options,
      data: true
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      message: error.message,
      body: null,
      data: false
    });
  }
}

module.exports = {
  getAvatar
}


// Frequency penalty:

// It discourages the model from repeating the same words or phrases in its response.
// The value can range from 0 to infinity, where higher values result in fewer repetitions.
// A value of 0 indicates no penalty, i.e., the model is allowed to repeat the same words and phrases as many times as it wants.

// Presence penalty:

// It encourages the model to explore more diverse responses and avoid getting stuck on the same topic.
// The value can range from 0 to infinity, where higher values result in more topic changes.
// A value of 0 indicates no penalty, i.e., the model is free to explore any topic it wants.
