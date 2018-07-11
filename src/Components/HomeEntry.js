﻿import React, { Component } from 'react';

import HomeService from '../Services/HomeService'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import ErrorMessage from './ErrorMessage';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
  }),
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    textAlign: 'left',
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    width: '30%'
  },
  cancelButton: {
    margin: theme.spacing.unit,
    width: '90%',
    marginLeft: theme.spacing.unit,
  },
  saveButton: {
    margin: theme.spacing.unit,
    width: '90%',
    marginRight: theme.spacing.unit,
  },
  buttonDiv: {
    marginTop: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  displayNone: {
    display: 'none'
  },
});

class HomeEntry extends Component {
  state = {
    name: '',
    occupants: '',
    hasError: false
  };

  componentDidMount() {
    document.title = 'Home Entry';
  }

  componentDidCatch() {
    this.setState({
      hasError: true,  
    });
  }

  postHome() {
    HomeService.postHome(this.state.name, this.state.occupants)
        .then((response) => {
            response.json()
            if(response.status == 200) {
              this.setState({
                hasError: false,
              });
            } else {
              this.setState({
                hasError: true,
              });
            }   
        })
        .then((responseJson) => {
            if (!this.state.hasError) {
              this.setState({
                name: responseJson.name,
                occupants: responseJson.occupants,
              });
            }
        })
        .catch((error) => {
          console.log('message');
        });
  }

  render() {
    const { classes } = this.props;

    return (
        <div className="HomeEntry">
            <Paper className={classes.root}>
                {this.state.hasError ? <ErrorMessage /> : null}
                <Typography variant="headline" component="h3">
                    Enter New Home
                </Typography>
                <Grid container>
                    <Grid item sm={0} md={3}/>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            id="home-name"
                            label="Home Name"
                            className={classes.textField}
                            value={this.state.name}
                            margin="normal"
                            onChange={(event) => this.setState({name: event.target.value})}
                        />            
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            id="home-occupants"
                            label="Occupants"
                            className={classes.textField}
                            value={this.state.occupants}
                            margin="normal"
                            onChange={(event) => this.setState({occupants: event.target.value})}
                        />            
                    </Grid>
                    <Grid item sm={0} md={3}/>
                </Grid>
            </Paper>
            <Grid container>
                <Grid item sm={0} sm={2} md={3}/>
                <Grid item xs={12} sm={4} md={3}>
                    <Button variant="raised" cxdsw color="secondary" className={classes.saveButton} onClick={this.postHome.bind(this)}>
                        Save Home
                    </Button>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Button variant="raised" cxdsw href="/mainMenu" color="secondary" className={classes.cancelButton}>
                        Cancel
                    </Button>
                </Grid>
                <Grid item sm={0} sm={2} md={3}/>
            </Grid>
        </div>
      );
    }
}
export default withStyles(styles)(HomeEntry);