import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


export default class SwapiPeopleTable extends Component {
                 constructor(props) {
                   super(props);

                   this.state = {
                      people: [],
                      isBusy: false
                     };
                 }
                 componentDidMount() {
                   this.setState({isBusy: true})
                   fetch("https://swapi.co/api/people/")
                     .then(response => response.json())
                     .then(data => {
                       this.setState({ people: data.results });
                       this.setState({ isBusy: false })
                     });
                 }
                 render() {
                   const { people } = this.state;
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
                       </Table>
                       {this.state.isBusy ? <LinearProgress /> : null}
                     </Paper>;
                 }
               }
