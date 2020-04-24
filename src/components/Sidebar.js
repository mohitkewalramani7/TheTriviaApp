import React from 'react';
import {Drawer, Hidden, IconButton, List, ListItem, ListItemText, Toolbar} from "@material-ui/core";
import history from "../history";
import SportsIcon from "@material-ui/icons/Sports";
import MoodIcon from "@material-ui/icons/Mood";
import MenuIcon from "@material-ui/icons/Menu";

export default class Sidebar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mobileOpen: false
    }
  }

  handleDrawerToggle(){
    this.setState({mobileOpen: !this.state.mobileOpen});
  };

  render(){
    const drawer = (
      <div>
        <List>
          <ListItem button
                    style={styles.listItem}
                    onClick={() => history.push('/')}
          >
            <SportsIcon/>
            <ListItemText
              style={styles.listItemText}
              primary="Trivia"/>
          </ListItem>

          <ListItem button
                    style={styles.listItem}
                    onClick={() => history.push('jokes')}
          >
            <MoodIcon/>
            <ListItemText
              style={styles.listItemText}
              primary="Jokes"/>
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <div>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => this.handleDrawerToggle()}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </div>

        <div>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor='left'
              open={this.state.mobileOpen}
              onClose={() => this.handleDrawerToggle()}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </div>
      </div>
    )
  }
}

const styles = {
  listItem: {
    paddingLeft: '20px',
    paddingRight: '50px'
  },
  listItemText: {
    marginLeft: '30px'
  }
};
