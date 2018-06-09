import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from "@material-ui/core/LinearProgress";
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActionsWrapped from './TablePaginationActionsWrapped'
import axios from "axios";


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  }
});

const peopleUrl = "https://swapi.co/api/people/"

export default class SwapiPeopleTable extends Component {
                 constructor(props) {
                   super(props);

                   this.state = {
                    count: 0,
                    people: [],
                    isBusy: false,
                    url: '',
                    page: 0,
                    rowsPerPage: 10
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
                   })
                     .then(response => {
                       const data = response.data  
                       this.setState({
                         count: data.count,
                         people: data.results,
                         isBusy: false
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
                   const { people, page, rowsPerPage, count } = this.state;
                   return <Paper className={styles.root}>
                       <Table className={styles.table}>
                         <TableHead>
                           <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell numeric>Height</TableCell>
                            <TableCell numeric>Mass</TableCell>
                            <TableCell>Hair color</TableCell>
                            <TableCell>Skin color</TableCell>
                            <TableCell>Eye color</TableCell>
                            <TableCell>Birth year</TableCell>
                            <TableCell>Gender</TableCell>
                            {/* <TableCell>Homeworld</TableCell>
                            <TableCell>Species</TableCell>
                            <TableCell>Vehicles</TableCell>
                            <TableCell>Starships</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Edited</TableCell> */}
                           </TableRow>
                         </TableHead>
                         <TableBody>
                           {people.map(n => {
                             return <TableRow key={n.url}>
                                 <TableCell component="th" scope="row">{n.name}</TableCell>
                                 <TableCell numeric>{n.height}</TableCell>
                                  <TableCell numeric>{n.mass}</TableCell>
                                 <TableCell numeric>{n.hair_color}</TableCell>
                                 <TableCell>{n.skin_color}</TableCell>
                                 <TableCell>{n.eye_color}</TableCell>
                                 <TableCell>{n.birth_year}</TableCell>
                                 <TableCell>{n.gender}</TableCell>
                                 {/* <TableCell>{n.homeworld}</TableCell>
                                 <TableCell>{n.films}</TableCell>
                                 <TableCell>{n.species}</TableCell>
                                 <TableCell>{n.vehicles}</TableCell>
                                 <TableCell>{n.starships}</TableCell>
                                 <TableCell>{n.created}</TableCell>
                                 <TableCell>{n.edited}</TableCell> */}
                               </TableRow>;
                           })}
                         </TableBody>
                         <TableFooter>
                          <TableRow>
                            <TablePagination
                              colSpan={3}
                              count={count}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onChangePage={this.handleChangePage}
                              ActionsComponent={TablePaginationActionsWrapped}
                              onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                          </TableRow>
                          
                        </TableFooter>
                       </Table>
                       
                       {this.state.isBusy ? <LinearProgress /> : null}
                     </Paper>;
                 }
               }
