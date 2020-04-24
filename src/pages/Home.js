import React from 'react';
import {Button} from "@material-ui/core";

import Sidebar from "../components/Sidebar"
import history from "../history";

class Home extends React.Component {
  render (){
    return (
      <div>
        <Sidebar/>
        <div>
          <h2>
            Mohit's Trivia Game!
          </h2>
          <Button
            variant="contained"
            color="primary"
            style={{width: "60%", marginTop: "50px"}}
            onClick={() => history.push('questions')}>
            Start
          </Button>
        </div>
      </div>
    )
  }
}

export default Home;
