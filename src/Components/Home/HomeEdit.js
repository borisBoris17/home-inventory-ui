import React, {Component} from 'react';

import HomeService from '../../Services/HomeService';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Card from 'material-ui/Card';
import Grid from "material-ui/Grid/Grid";
import Button from "material-ui/Button/Button";
import {TableBody, TableCell, TableHead, TableRow} from "material-ui";
import Table from "material-ui/Table/Table";

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
        textAlign: 'left'
    },
    homeLabel: {
        fontSize: 16,
        margin: theme.spacing.unit
    },
    homeValue: {
        fontSize: 24,
        margin: theme.spacing.unit
    },
    roomsCard: {
        marginLeft: 8,
        textAlign: 'left'
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
            occupants: '',
            rooms: []
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
        if (response.status == 200) {
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
                    rooms: [
                        {
                            name: 'Kitchen',
                            items: []
                        },
                        {
                            name: 'Living Room',
                            items: [
                                {
                                    nonsense: 'nonsense'
                                }
                            ]
                        }
                    ]
                }
            });
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Paper className={classes.root}>
                    <Typography variant="headline" component="h3">
                        Edit Home
                    </Typography>
                    <Grid container>
                        <Grid item xs={12} sm={4} md={3}>
                            <div className={classes.homeCard}>
                                <Typography className={classes.homeLabel} color="secondary">
                                    Name
                                </Typography>
                                <Typography className={classes.homeValue}>
                                    {this.state.home.name}
                                </Typography>
                                <Typography className={classes.homeLabel} color="secondary">
                                    Occupants
                                </Typography>
                                <Typography className={classes.homeValue}>
                                    {this.state.home.occupants}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <div className={classes.roomsCard}>
                                <Typography  className={classes.homeLabel} color="secondary">
                                    Rooms
                                </Typography>
                                {this.state.home.rooms != undefined ? <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="checkbox" className={classes.tableHeaderCell}>
                                                Name
                                            </TableCell>
                                            <TableCell padding="checkbox" className={classes.tableHeaderCell}>
                                                Number of Items
                                            </TableCell>
                                            <TableCell className={classes.buttonColumn}/>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.home.rooms.map(n => {
                                            return (
                                                <TableRow className={classes.table} key={n._id}>
                                                    <TableCell className={classes.tableCell}>{n.name}</TableCell>
                                                    <TableCell
                                                        className={classes.tableCell}>{n.items.length}</TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Button variant="raised" color="secondary"
                                                                className={classes.selectButton}
                                                                onClick={(e) => this.selectHome(n._id)}>
                                                            Select
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table> : null}
                                <Grid container>
                                    <Grid item sm={2} md={3}/>
                                    <Grid item xs={12} sm={4} md={3}>
                                        <Button variant="raised" color="secondary" className={classes.saveButton}>
                                            Add Room
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3}>
                                        <Button variant="raised" href="/mainMenu" color="secondary"
                                                className={classes.cancelButton}>
                                            Return Home
                                        </Button>
                                    </Grid>
                                    <Grid item sm={2} md={3}/>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
                <Grid container>
                <Grid item sm={4} md={4}/>
                <Grid item xs={12} sm={4} md={4}>
                    <Button variant="raised" href="/mainMenu" color="secondary"
                            className={classes.cancelButton}>
                        Return Home
                    </Button>
                </Grid>
                <Grid item sm={4} md={4}/>
            </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(HomeEdit);
