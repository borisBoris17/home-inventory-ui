import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

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
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    width: '30%'
  },
  buttonDiv: {
    marginTop: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function MainMenu(props) {
  const { classes } = props;

  return (
    <div>
        <Paper className={classes.root}>
            <Typography variant="headline" component="h3">
                Enter New Home
            </Typography>
            <Grid container>
                <Grid item sm={12}>
                    <TextField
                        id="home-name"
                        label="Home Name"
                        className={classes.textField}
                        margin="normal"
                    />            
                </Grid>
            </Grid>
        </Paper>
        <Button variant="raised" color="secondary" className={classes.button}>
            Save Home
        </Button>
    </div>
  );
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainMenu);