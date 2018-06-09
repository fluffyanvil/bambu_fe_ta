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
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import TableHead from '@material-ui/core/TableHead';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);

const styles = theme => ({
  root: {
    width: "100%"
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
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
                   const { classes } = this.props;
                   const { people, page, rowsPerPage, count } = this.state;
                   return <Paper className={classes.root}>
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
                             {/* <TableCell>Hair color</TableCell>
                            <TableCell>Skin color</TableCell>
                            <TableCell>Eye color</TableCell>
                            <TableCell>Birth year</TableCell>
                            <TableCell>Gender</TableCell> */}
                             <TableCell>Homeworld</TableCell>
                             <TableCell>Films</TableCell>
                             <TableCell>Species</TableCell>
                             <TableCell>Vehicles</TableCell>
                             <TableCell>Starships</TableCell>
                             {/* <TableCell>Created</TableCell>
                            <TableCell>Edited</TableCell> */}
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
                                 {/* <TableCell numeric>{n.hair_color}</TableCell>
                                 <TableCell>{n.skin_color}</TableCell>
                                 <TableCell>{n.eye_color}</TableCell>
                                 <TableCell>{n.birth_year}</TableCell>
                                 <TableCell>{n.gender}</TableCell> */}
                                 <TableCell>
                                   {n.homeworld}
                                 </TableCell>
                                 <TableCell>
                                   <ul>
                                     {n.films.map(f => {
                                       return <li>{f}</li>;
                                     })}
                                   </ul>
                                 </TableCell>
                                 <TableCell>
                                   {n.species}
                                 </TableCell>
                                 <TableCell>
                                   <ul>
                                     {n.vehicles.map(v => {
                                       return <li>{v}</li>;
                                     })}
                                   </ul>
                                 </TableCell>
                                 <TableCell>
                                   <ul>
                                     {n.starships.map(s => {
                                       return <li>{s}</li>;
                                     })}
                                   </ul>
                                 </TableCell>
                                 {/* <TableCell>{n.created}</TableCell>
                                 <TableCell>{n.edited}</TableCell> */}
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
                     </Paper>;
                 }
               }

SwapiPeopleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SwapiPeopleTable);