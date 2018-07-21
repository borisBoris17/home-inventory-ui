import React, { Component } from 'react';
import { redirect } from 'react-router-dom'

import HomeService from '../../Services/HomeService';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import ErrorMessage from '../ErrorMessage';

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
  tableHeaderCell: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    width: '45%',
  },
  buttonColumn: {
    width: '10%'
  }
});

class HomeSearch extends Component {
  state = {
    name: '',
    occupants: '',
    homes: [],
    hasError: false,
    hasResults: false
  };

  componentDidMount() {
    document.title = 'Home Search';
  }

  componentDidCatch() {
    this.setState({
      hasError: true,  
    });
  }

  searchHomes() {
    HomeService.searchHomes(this.state.name, this.state.occupants)
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
        homeId: this.state.name,
        hasError: false,
      });
    } else {
      this.setState({
        hasError: true,
        redirect: false,
      });
    }
    return response;
  }

  handleResponse(responseJson) {
    this.setState({
      hasResults: false
    });
    if (!this.state.hasError) {
      this.setState({
        homes: responseJson,
        hasError: false,
      });
      if (this.state.homes.length >= 0) {
        this.setState({
          hasResults: true
        });
      }
    }
  }

  selectHome(homeId) {
    window.location = "homeEdit/" + homeId
  }

  render() {
    const { classes } = this.props;
      return (
        <div className="HomeSearch">
            <Paper className={classes.root}>
                {this.state.hasError ? <ErrorMessage /> : null}
                <Typography variant="headline" component="h3">
                    Search for Home
                </Typography>
                <Grid container>
                    <Grid item md={3}/>
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
                    <Grid item md={3}/>
                </Grid>
            </Paper>
            <Grid container>
                <Grid item sm={2} md={3}/>
                <Grid item xs={12} sm={4} md={3}>
                    <Button variant="raised" color="secondary" className={classes.saveButton} onClick={this.searchHomes.bind(this)}>
                        Search
                    </Button>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Button variant="raised" href="/mainMenu" color="secondary" className={classes.cancelButton}>
                        Cancel
                    </Button>
                </Grid>
                <Grid item sm={2} md={3}/>
            </Grid>
            {this.state.hasResults ? <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox" className={classes.tableHeaderCell}>Name</TableCell>
                        <TableCell padding="checkbox" className={classes.tableHeaderCell}>Occupants</TableCell>
                        <TableCell className={classes.buttonColumn}/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.homes.map(n => {
                        return (
                          <TableRow className={classes.table} key={n._id}>
                            <TableCell className={classes.tableCell}>{n.name}</TableCell>
                            <TableCell className={classes.tableCell}>{n.occupants}</TableCell>
                            <TableCell className={classes.tableCell}>
                              <Button variant="raised" color="secondary" className={classes.selectButton} onClick={(e) => this.selectHome(n._id)}>
                                  Select
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                </Table>
            </Paper> : null }
        </div>
      );
  }
}
export default withStyles(styles)(HomeSearch);