import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  errorMsg: {
    color: 'red'
  },
});

class ErrorMessage extends Component {
  
  state = {
    hasError: true
  };

  render() {
    const { classes } = this.props;
    
        return (
        <div className="ErrorMessage">
            <Typography variant="headline" component="h3" className={classes.errorMsg}>
                There was an error!
            </Typography>
        </div> 
        );
  }

} export default withStyles(styles)(ErrorMessage);