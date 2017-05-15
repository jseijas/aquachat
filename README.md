# Aquachat

Aquachat is a bot with a knowledge base in order to answer questions about the water of Barcelona, but this source code allows you to deploy your own bots with different knowledge bases.
The training questions are in the file qna.tsv, currently are in spanish, and are 46 questions extracted directly for the web of "Aguas de Barcelona": http://www.aiguesdebarcelona.cat/respuestas-a-tus-dudas

Also, it's integrated with Dashbot, a bot analytics platform, that allows to have information about the engaged persons, the real time transcripts, and even "pause" the bot in one conversation in order to be answered by a human.

The different component used by the bot:
- API.ai for the NLP: 0€ initial inversion 0€ monthly
- Heroku as the deployment platform: 0€ initial inversion 0€ monthly
- AWS mongoDB sandbox: 0€ initial inversion 0€ monthly (but limited to 500MB of data)
- Microsoft Bot platform for the connectors: 0€ initial inversion 0€ monthly
- Microsoft QnA for the knowledge: 0€ intial inversion 0€ monthly
- Dashbot for the analytics: 0€ initial inversion 0€ monthly for the free version

It's developed in Node.JS using the flow-bot SDK for bots: https://github.com/jseijas/flow-bot
The bootstrap of the application, to get a new bot up and running in one minute: https://github.com/jseijas/generator-flowbot
Loopback as the REST Framework and connection to almost any database: https://loopback.io/

## Training your bot... from your bot!

If you look into the source code you'll find at ./bot/actions/constructor.js that the lines 18-20 are commented. If you uncomment that part, you'll have the command "train" in order to add knowledge to your bot directly from the conversation.
You can combine this command with the information of the users in order to allow only certain users to have this feature.

## Must the users write the questions exactly as they are defined?

Nope! It works also with another ways of asking the questions. The QnA platform return an score for each possible intent. We have defined 2 thresholds: 50% or more means that this is the question that you're looking for. For scores from 10% to 50%, the bot says that don't understand but "perhaps you meant...". Less than 10% means that the bot does not understand.

This solution is no so accurate as using a complete NLP solution, but is pretty good enough and easy to use. For something more acurrate then you should use an NLP solution such as LUIS.ai, API.ai or Wit.ai (included in the flow-bot framework) or your own NLP solution based on Convolutional Networks, Logistic Regression Classifiers, Naive Bayes, or whatever algorithm you want to implement.

## Bot channels

- The bot is deployed in Facebook Messenger but in developer mode, so you'll need permissions to use it. If you want to give a try contact me. The link: https://m.me/aquachat
- The bot is deployed in slack as @aquachat in the hackath2on2017.slack.com team.
- Also is deployed at skype: https://join.skype.com/bot/8c02e9d9-406c-4fe5-9e64-7d99d5257db8
- Telegram: https://telegram.me/aquabot_bot
- Web plugin: https://aquachat.herokuapp.com/
- Cortana Skill: You'll need a Windows 10 with retion EEUU, american english language as default and the last Windows 10 updates. Also, is not published in the Cortana Skills market, so you should contact me in order to add you to the testing group.
- It can be also deployed in Microsoft Teams, Skype for Business, twitter, groupme, kik, sms, mail, LINE, WeChat, Bing or even an RTM or REST API.

## Installation

You'll need NodeJS installed with version 6+.
Clone this repo.
Set the credentials (environment variables):
- BOT_APP_ID: Microsoft Bot APP id.
- BOT_APP_PASSWORD: Microsoft Bot APP password.
- QNA_BASE_ID: Microsoft QNA base id.
- QNA_SUBSCRIPTION_KEY: Microsoft QNA subscription key.
- DASHBOT_API_KEY_FACEBOOK: Facebook Dashbot API key.
- DASHBOT_API_KEY_GENERIC: Dashbot API key for generic channels.
- DASHBOT_API_KEY_SLACK: Dashbot API key for Slack.
- MONGO_URL: mongoDB URL in format mongodb://<user>:<pass>@<server>:<port>/<database>

Then run:

```bash
npm install
npm start
```
## Voice Agents different from Cortana

We have also done a voice agent for Amazon Echo, using the instructions at https://github.com/jseijas/hello-alexa
A Google Home Action can be developed with API.ai.
