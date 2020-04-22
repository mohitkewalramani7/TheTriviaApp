import React from 'react';
import {Button} from "@material-ui/core";
import history from "./history";

class Home extends React.Component {
  render (){
    return (
      <div className="App-header">
        <p>
          Mohit's Trivia Game!
        </p>
        <Button
          variant="contained"
          color="primary"
          style={{width: "60%", marginTop: "50px"}}
          onClick={() => history.push('Questions')}>
          Start
        </Button>
      </div>
    )
  }
}

export default Home;
