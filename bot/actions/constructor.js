const builder = require('botbuilder');

const decodeHtmlEntity = function(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
};

module.exports = function(next) {
  let qna = this.getPlugin('QnA');
  let root = new builder.IntentDialog()
    .matches(/^(hola|holi|hey|buenos días|buenas tardes|buenas noches|yolo)/i, (session) => {
       session.endDialog('¡Hola! ¡Adelante y pregúntame algo sobre el agua de Barcelona!');
     })
    .matches(/^help/i, (session) => {
       session.endDialog('It\'s simple. You ask me something, and I try to answer');
    })
  //   .matches(/^train/i, (session) => {
  //     session.beginDialog('/train');
  //   })
  .onDefault((session, args) => {
      qna.getAnswer(session.message.text, function(error, result) {
        if (error) {
          console.log(error);
        }
        if (error || !result.answers || result.answers.length === 0) {
          return session.endDialog('Lo siento, no tengo respuesta a esa pregunta :( ¡Pero tomaremos nota para agregar la respuesta!');
        }
        let answer = result.answers[0];
        if (answer.score >= 50) {
          console.log(answer.answer);
          return session.endDialog(decodeHtmlEntity(answer.answer));
        } else if (answer.score >= 10) {
          return session.endDialog('No estoy seguro... tal vez quieras decir "'+answer.questions[0]+'"');
        } else {
          return session.endDialog('Lo siento, no tengo respuesta a esa pregunta :( ¡Pero tomaremos nota para agregar la respuesta!');
        }
      }.bind(this));
    });
  this.bot.dialog('/', root);
  next();
};
