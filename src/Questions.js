import React from 'react';
import {Button} from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab';

class Questions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: '',
      options: [],
      rightAnswer: '',

      wrongAnswerAlertVisible: false,
      rightAnswerAlertVisible: false
    };
  }

  componentDidMount() {
    this.setQuestion();
  }

  setQuestion(){
    this.setState({
      wrongAnswerAlertVisible: false,
      rightAnswerAlertVisible: false
    });

    this.fetchTriviaQuestion().then(result => {
      let questionObject = result.results[0];
      let question = questionObject['question'];
      this.setState({'question': this.decodeHtml(question)});
      this.formatAnswers(questionObject);
    }).catch(err => {
      console.log(err);
    })
  }

  async fetchTriviaQuestion(){
    let response = await fetch('https://opentdb.com/api.php?amount=1');
    return await response.json();
  }

  /*
    https://stackoverflow.com/a/41699140
   */
  decodeHtml(str){
    const map =
      {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'"
      };
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) {return map[m];});
  }

  formatAnswers(questionObject){
    let incorrectAnswers = questionObject['incorrect_answers'];
    let correctAnswer = questionObject['correct_answer'];
    let allAnswers = incorrectAnswers.slice();
    allAnswers.push(correctAnswer);
    allAnswers = this.decodeAllAnswers(allAnswers);
    allAnswers = this.shuffleArray(allAnswers);
    this.setState({'options': allAnswers});
    this.setState({'rightAnswer': correctAnswer});
  }

  decodeAllAnswers(allAnswers){
    const decodedAnswers = [];
    allAnswers.forEach(answer => {
      decodedAnswers.push(this.decodeHtml(answer));
    });
    return decodedAnswers;
  }

  /*
    https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
   */
  shuffleArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  checkAnswer(selectedAnswer){
    if (selectedAnswer === this.state.rightAnswer){
      this.setState({wrongAnswerAlertVisible: false});
      this.setState({rightAnswerAlertVisible: true});
      new Promise(r => setTimeout(r, 1000)).then(_ => {
        this.setQuestion();
      });
    }
    else {
      this.setState({wrongAnswerAlertVisible: true});
    }
  }

  render (){
    return (
      <div>

        <Alert
          style={{
            width: '100%',
            display: this.state.wrongAnswerAlertVisible ? '' : "none",
            position: 'absolute'
          }}
          severity="error">
          <AlertTitle>Wrong Answer</AlertTitle>
          <strong>Please Try Again</strong>
        </Alert>

        <Alert
          style={{
            width: '100%',
            display: this.state.rightAnswerAlertVisible ? '' : 'none',
            position: 'absolute'
          }}
          severity="success">
          <AlertTitle>Correct</AlertTitle>
          <strong>Great Job</strong>
        </Alert>

        <div className="App-header" style={{paddingLeft: '5%', paddingRight: '5%'}}>
          <h3>{`${this.state.question}`}</h3>
        </div>

        <div className="answerDiv">
          <div className="answer">
            <Button
              className="answerButton"
              variant="contained"
              color="secondary"
              onClick={() => this.checkAnswer(this.state.options[0])}>
              {this.state.options[0]}
            </Button>
          </div>
          <div className="answer">
            <Button
              className="answerButton"
              variant="contained"
              color="secondary"
              onClick={() => this.checkAnswer(this.state.options[1])}>
              {this.state.options[1]}
            </Button>
          </div>
        </div>
        <div
          className="answerDivTwo"
          style={{visibility: this.state.options.length === 4 ? 'visible' : 'hidden'}}>
          <div className="answer">
            <Button
              className="answerButton"
              variant="contained"
              color="secondary"
              onClick={() => this.checkAnswer(this.state.options[2])}>
              {this.state.options[2]}
            </Button>
          </div>
          <div className="answer">
            <Button
              className="answerButton"
              variant="contained"
              color="secondary"
              onClick={() => this.checkAnswer(this.state.options[3])}>
              {this.state.options[3]}
            </Button>
          </div>
        </div>

      </div>
    )
  }
}

export default Questions;
