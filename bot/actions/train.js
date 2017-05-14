module.exports = function(session, args, next) {
  let dialog = session.dialogData.view.dialog;
  let qna = this.getPlugin('QnA');
  qna.train(dialog.question, dialog.answer, (error, body) => {
    if (error) {
      console.log(error);
      session.endDialog('There was a problem during the training');
    } else {
      session.endDialog('Bot trained!');
    }
  });
};
