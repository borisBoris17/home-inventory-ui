import React, { Component } from 'react';

import HomeService from '../../Services/HomeService';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Card from 'material-ui/Card';
import Grid from "material-ui/Grid/Grid";
import Button from "material-ui/Button/Button";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        width: '90%',
        marginTop: theme.spacing.unit * 3,
        marginLeft: 'auto',
        marginRight: 'auto',
    }),
    homeCard: {
        marginRight: 8,
        textAlign: 'left',
    },
    homeCardTitle: {
        fontSize: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        borderBottomStyle: 'solid'
    },
    roomsCard: {
        marginLeft: 8,
    },
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

class HomeEdit extends Component {
    state = {
      home: {
          id: this.props.match.params.homeId,
          name: '',
          occupants: ''
      },
      hasError: false
    };

    componentDidMount() {
        HomeService.findHomeById(this.state.home.id)
            .then((response) => this.handleError(response))
            .then((response) => response.json())
            .then((responseJson) => this.handleResponse(responseJson))
            .catch((error) => {
                console.log(error);
            });
    }

    handleError(response) {
        if(response.status == 200) {
            this.setState({
                home: {
                    id: this.state.name
                },
                hasError: false,
            });
        } else {
            this.setState({
                hasError: true,
            });
        }
        return response;
    }

    handleResponse(responseJson) {
        if (!this.state.hasError) {
            this.setState({
                home: {
                    id: responseJson._id,
                    name: responseJson.name,
                    occupants: responseJson.occupants,
                }
            });
        }
    }
    
    render() {
      const { classes } = this.props;

      return (
        <div>
            <Paper className={classes.root}>
                <Grid container>
                    <Grid item xs={12} sm={4} md={3}>
                        <Card className={classes.homeCard}>
                            <Typography className={classes.homeCardTitle} color="secondary" >
                                Home
                            </Typography>
                            <Typography>
                                Name
                            </Typography>
                            <Typography>
                                {this.state.home.name}
                            </Typography>
                            <Typography>
                                Occupants
                            </Typography>
                            <Typography>
                                {this.state.home.occupants}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                        <Card className={classes.roomsCard}>
                            <Typography>
                                Name
                            </Typography>
                            <Typography>
                                {this.state.home.name}
                            </Typography>
                            <Typography>
                                Occupants
                            </Typography>
                            <Typography>
                                {this.state.home.occupants}
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </div>
      );
    }
} 
export default withStyles(styles)(HomeEdit);
