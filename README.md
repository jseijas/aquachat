# Aquachat

Aquachat es un bot que tiene una base de conocimientos para contestar preguntas acerca del agua.
En concreto las preguntas se encuentran en el fichero qna.tsv (formato hoja de cálculo) y son 46 preguntas e ejemplo extraídas directamente de la web de Aguas de Barcelona: http://www.aiguesdebarcelona.cat/respuestas-a-tus-dudas

Además, está integrado con analíticas, y permite tener transcripciones en vivo y en directo de las conversaciones de los usuarios, e incluso para ciertas conversaciones parar el bot para pasar la respuesta a un agente humano.

Coste de despliegue (servidor, base de datos, etc): 0€
Costes de mantenimiento mensuales: 0€

Todos los componentes usados son gratuitos: NLP (API.ai), servidor (Heroku), base de datos (AWS), conectores de canales (Microsoft), base de conocimientos (Microsoft) y analítica (Dashbot).

La integración continua se realiza directamente con TravisCI y github, tan simple como hacer un push a github, y si pasa las reglas se despliega automáticamente.

El bot está desarrollado usando la framework de bots flow-bot, open source, que encontraréis en: https://github.com/jseijas/flow-bot

Para el bootstraping del bot se utilizó el generador de yeoman generator-flowbot, que encontraréis en: https://github.com/jseijas/generator-flowbot

## Entrenando el bot desde el propio bot

Si miráis en el código en ./bot/actions/constructor.js veréis que las líneas 18-20 están comentadas. Descomentándolas abriréis la posibilidad de entrenar vuestros bots diciéndoles "train" y él mismo os preguntará lo que tenéis que indicar y entrenará el QnA.

## ¿Las preguntas deben ser exactamente como están en el excel?

No! Poniendo un texto aproximado trata de buscar la pregunta más aproximada, y devuelve para cada pregunta un "score" que indica la probabilidad. El umbral está puesto en 50%. De todas formas no será tan acertada como un NLP completo ya sea comercial, o vuestra propia implementación en Naive Bayes, Logistic Regression Classifier o Convolutional Network.

## Integraciones

- Está conectada a un MongoDB para guardar la estructura de base de datos, y más en concreto las variables de usuario o diálogo para contextualizar cada conversación.
- API.ai, LUIS.ai o Wit.ai para entender el lenguaje natural de los usuarios.
- Un NLP (Natural Language Processing) a medida para entender el lenguaje catalán.
- QnA para la base de conocimientos.
- Dashbot para las analíticas del bot.
- Facebook como una plataforma de comunicación con el usuario (pedirme permisos a jseijas@gmail.com): https://m.me/aquachat
- Slack como una plataforma de comunicación con el usuario (usuario @aquachat en el slack de la hackathon)
- Skype como una plataforma de comunicación con el usuario: https://join.skype.com/bot/8c02e9d9-406c-4fe5-9e64-7d99d5257db8
- Telegram como una plataforma de comunicación con el usuario (usuario @aquabot_bot): https://telegram.me/aquabot_bot
- Cortana como una plataforma de comunicación con el usuario (no publicada en el market de windows, así que contactar conmigo si se quiere probar).
- Microsoft Teams como una plataforma de comunicación con el usuario (contactar conmigo si se quiere probar)
- Plugin web: puedes probarlo en: https://aquachat.herokuapp.com/
- Skype for business, bing, twitter, groupme, kik, sms, mail, LINE, WeChat, RTM o REST API (contactar conmigo si se quiere probar)

## Instalación

Require tener instalado Node versión 6.* o superior.
Clona este repo. 
Necesitarás indicar varias credenciales:
- BOT_APP_ID: Microsoft Bot APP id.
- BOT_APP_PASSWORD: Microsoft Bot APP password.
- QNA_BASE_ID: Microsoft QNA base id.
- QNA_SUBSCRIPTION_KEY: Microsoft QNA subscription key.
- DASHBOT_API_KEY_FACEBOOK: API key de dashbot para facebook.
- DASHBOT_API_KEY_GENERIC: API key de dashbot para canales genéricos
- DASHBOT_API_KEY_SLACK: API key de dashbot para slack
- MONGO_URL: URL de mongoDB en el formato mongodb://<user>:<pass>@<server>:<port>/<database>

Entonces simplemente ejecuta:

```bash
npm install
npm start
```
## Agentes de voz distintos de Cortana
Para usar la aplicación en agentes de voz tales como Amazon Echo o Google Home, un poco de desarrollo adicional es necesario. En nuestro caso la implementación con Amazon Echo se hizo de manera separada siguiendo los pasos del meetup "Hello Alexa": 
https://github.com/jseijas/hello-alexa

