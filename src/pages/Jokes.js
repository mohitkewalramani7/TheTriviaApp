import React from 'react';
import {Button} from "@material-ui/core";

import Sidebar from "../components/Sidebar"

export default class Jokes extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      setup: '',
      punchline: ''
    }
  }

  componentDidMount(){
    this.setupJoke()
  }

  setupJoke(){
    this.fetchJoke().then(result => {
      this.setState({
        setup: result['setup'],
        punchline: result['punchline']
      });
    })
  }

  async fetchJoke(){
    let response = await fetch('https://official-joke-api.appspot.com/random_joke');
    return await response.json();
  }

  populatePunchline(){
    document.getElementById('punchline').innerText
      = this.state.punchline;
  }

  setupNewJoke(){
    document.getElementById('punchline').innerText = "";
    this.setupJoke();
  }

  render(){
    return (
      <div>
        <Sidebar/>
        <div>
          <h1 style={{marginBottom: '100px'}}>
            Here's a joke for you
          </h1>
          <h4>{this.state.setup}</h4>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.populatePunchline()}>
            See Answer
          </Button>
          <h4 id="punchline" style={{height: '30px'}}> </h4>
          <Button
            style={{marginTop: '100px'}}
            variant="contained"
            color="primary"
            onClick={() => this.setupNewJoke()}>
            See another joke
          </Button>
        </div>
      </div>
    )
  }

}
