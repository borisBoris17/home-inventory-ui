import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

const styles = theme => ({
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

class MainMenu extends Component {

  componentDidMount() {
    document.title = 'Home Inventory';
  }

  render() {
      const { classes } = this.props;

      return (
        <div>
            <Grid container className={classes.buttonDiv}>
                <Grid item sm={12}>
                    <Button variant="raised" href="/homeEntry" color="secondary" className={classes.button}>
                        Start New Home
                    </Button>
                    <input
                        accept="homeEntry"
                        className={classes.input}
                        id="outlined-button-file"
                        multiple
                        type="file"
                    />
                </Grid>
                <Grid item sm={12}>
                    <Button variant="raised" href="/homeSearch" color="secondary" className={classes.button}>
                        Select Existing Home
                    </Button>
                </Grid>
            </Grid>
        </div>
      );
  }
}
export default withStyles(styles)(MainMenu);