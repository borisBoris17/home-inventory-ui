import React, { Component } from 'react';

import HomeService from '../Services/HomeService';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({

});

class HomeEdit extends Component {
    state = {
      homeId: this.props.match.params.homeId
    };
    
    render() {
      const { classes } = this.props;

      return (
        <div>
            <Paper>
                <div>{this.state.homeId}</div>
            </Paper>
        </div>
      );
    }
} 
export default withStyles(styles)(HomeEdit);
