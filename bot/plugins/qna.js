const request = require('request');

function QnA(bot) {
  this.bot = bot;
  this.baseId = process.env.QNA_BASE_ID;
  this.subscriptionKey = process.env.QNA_SUBSCRIPTION_KEY;
}

QnA.prototype.getAnswer = function(question, cb) {
  let url = 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/'+this.baseId+'/generateAnswer';
  let options = {
    url: url,
    json: { question: question, top: 1 },
    headers: { 'Ocp-Apim-Subscription-Key': this.subscriptionKey }
  }
  request.post(options, (error, response, body) => {
    if (error) {
      return cb(error);
    }
    if (response.statusCode != 200) {
      return cb(body);
    }
    return cb(null, body);
  });
}

QnA.prototype.train = function(question, answer, cb) {
  let url = 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/'+this.baseId;
  let options = {
    url: url,
    json: { 
      add: {
        qnaPairs:[{
          question: question,
          answer: answer
        }]
      }
    },
    headers: { 'Ocp-Apim-Subscription-Key': this.subscriptionKey }
  }
  request.patch(options, (error, response, body) => {
    if (error) {
      return cb(error);
    }
    if (response.statusCode != 200 && response.statusCode != 204) {
      return cb(body);
    }
    let optionsPut = {
      url: url,
      headers: { 'Ocp-Apim-Subscription-Key': this.subscriptionKey }
    }
    request.put(options, (error, response, body) => {
      if (error) {
        return cb(error);
      }
      if (response.statusCode != 200) {
        return cb(body);
      }
      return cb(null, body);
    });
  });
}

module.exports = QnA;