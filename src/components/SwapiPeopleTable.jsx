import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import TableHead from '@material-ui/core/TableHead';
import TablePaginationActionsWrapped from './PaginationActions'
import SimpleDialogWrapped from './SimpleDialog'
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  root: {
    width: "100%"
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  },
  button: {
    margin: theme.spacing.unit
  }
});

const peopleUrl = "https://swapi.co/api/people/"

class SwapiPeopleTable extends React.Component {  
                 constructor(props) {                  
                   super(props);
                   this.state = {
                    count: 0,
                    people: [],
                    isBusy: false,
                    isBusyHw: false,
                    url: '',
                    page: 0,
                    rowsPerPage: 10,
                    selectedValue: {},
                     open: false
                  };
                 }
                 componentWillMount() {
                  this.updatePeople()
                 }
                 updatePeople(){
                   this.setState({isBusy: true})
                   const swapiPage = this.state.page + 1
                   console.log(swapiPage);

                   axios.get(peopleUrl, {
                     params: {
                       page: swapiPage
                     }
                   }).then(response => {
                       const data = response.data  
                       this.setState({
                         count: data.count,
                         people: data.results,
                         isBusy: false
                       });
                       this.state.people.forEach(p => {
                        this.updateHomeworld(p)
                        this.updateFilms(p)
                        this.updateSpecies(p)
                        this.updateVehicles(p)
                        this.updateStarships(p)
                       })
                     });
                    }

                updateHomeworld(p){
                  axios.get(p.homeworld).then(response => {
                    const data = response.data
                    const peopleIndex = this.state.people.indexOf(p)
                    this.state.people[peopleIndex].homeworld = data;
                    this.forceUpdate()
                  });
                }

                updateFilms(p) {
                  p.films.forEach(f => {
                    axios.get(f).then(response => {
                      const data = response.data
                      const peopleIndex = this.state.people.indexOf(p)
                      const filmIndex = this.state.people[peopleIndex].films.indexOf(f)
                      this.state.people[peopleIndex].films[filmIndex] = data;
                      this.forceUpdate()
                    });
                  })                  
                }

                updateSpecies(p) {
                  p.species.forEach(s => {
                    axios.get(s).then(response => {
                      const data = response.data;
                      const peopleIndex = this.state.people.indexOf(p);
                      const specieIndex = this.state.people[peopleIndex].species.indexOf(s);
                      this.state.people[peopleIndex].species[specieIndex] = data;
                      this.forceUpdate();
                    });
                  });    
                }

                updateVehicles(p) {
                  p.vehicles.forEach(v => {
                    axios.get(v).then(response => {
                      const data = response.data;
                      const peopleIndex = this.state.people.indexOf(p);
                      const vehicleIndex = this.state.people[peopleIndex].vehicles.indexOf(v);
                      this.state.people[peopleIndex].vehicles[vehicleIndex] = data;
                      this.forceUpdate();
                    });
                  });
                }

                updateStarships(p) {
                  p.starships.forEach(v => {
                    axios.get(v).then(response => {
                      const data = response.data;
                      const peopleIndex = this.state.people.indexOf(p);
                      const starshipIndex = this.state.people[peopleIndex].starships.indexOf(v);
                      this.state.people[peopleIndex].starships[starshipIndex] = data;

                      this.forceUpdate();
                    });
                  });
                }

                handleChangePage = (event, page) => {
                  this.setState({ page: page }, p => {
                    this.updatePeople();           
                  })
                };

                handleChangeRowsPerPage = event => {
                  this.setState({ rowsPerPage: 10 }, p => { });
                };

                 render() {
                   const { classes } = this.props;
                   const { people, page, rowsPerPage, count } = this.state;
                   return <div>
                     <Paper className={classes.root}>
                       <Table className={classes.table}>
                         <TableHead>
                           <TableRow>
                             <TablePagination colSpan={8} count={count} rowsPerPage={rowsPerPage} page={page} onChangePage={this.handleChangePage} ActionsComponent={TablePaginationActionsWrapped} onChangeRowsPerPage={this.handleChangeRowsPerPage} />
                           </TableRow>
                           <TableRow>
                             <TableCell>Name</TableCell>
                             <TableCell numeric>
                               Height
                             </TableCell>
                             <TableCell numeric>
                               Mass
                             </TableCell>
                             <TableCell>Homeworld</TableCell>
                             <TableCell>Films</TableCell>
                             <TableCell>Species</TableCell>
                             <TableCell>Vehicles</TableCell>
                             <TableCell>Starships</TableCell>
                           </TableRow>
                         </TableHead>

                         <TableBody>
                           {people.map(n => {
                             return <TableRow key={n.url}>
                               <TableCell component="th" scope="row">
                                 {n.name}
                               </TableCell>
                               <TableCell numeric>
                                 {n.height}
                               </TableCell>
                               <TableCell numeric>
                                 {n.mass}
                               </TableCell>
                               <TableCell>
                                 {!n.homeworld.name ? <CircularProgress /> : n.homeworld.name}
                               </TableCell>
                               <TableCell>
                                 <ul>
                                   {n.films.map(f => {
                                     return !f.title ? <CircularProgress /> : <li>{f.title}</li>;
                                   })}
                                 </ul>
                               </TableCell>
                               <TableCell>
                                 <ul>
                                   {n.species.map(s => {
                                     return !s.name ? <CircularProgress /> : <li>{s.name}</li>;
                                   })}
                                 </ul>
                               </TableCell>
                               <TableCell>
                                 <ul>
                                   {n.vehicles.map(v => {
                                     return !v.name ? <CircularProgress /> : <li>{v.name}</li>;
                                   })}
                                 </ul>
                               </TableCell>
                               <TableCell>
                                 <ul>
                                   {n.starships.map(s => {
                                     return !s.name ? <CircularProgress /> : <li>{s.name}</li>;
                                   })}
                                 </ul>
                               </TableCell>
                             </TableRow>;
                           })}
                         </TableBody>

                         <TableFooter>
                           <TableRow>
                             <TablePagination colSpan={8} count={count} rowsPerPage={rowsPerPage} page={page} onChangePage={this.handleChangePage} ActionsComponent={TablePaginationActionsWrapped} onChangeRowsPerPage={this.handleChangeRowsPerPage} />
                           </TableRow>
                         </TableFooter>
                       </Table>
                       {this.state.isBusy ? <LinearProgress /> : null}
                     </Paper>
                     <SimpleDialogWrapped
                       selectedValue={this.state.selectedValue}
                       open={this.state.open}
                       onClose={this.handleClose} />
                   </div>
                 }
               }

SwapiPeopleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SwapiPeopleTable);