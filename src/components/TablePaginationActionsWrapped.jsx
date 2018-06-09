import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';

const actionsStyles = theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing.unit * 2.5,
    },
  });

  export default class TablePaginationActions extends Component {
    // propTypes = {
    //   count: PropTypes.number.isRequired,
    //   onChangePage: PropTypes.func.isRequired,
    //   page: PropTypes.number.isRequired,
    //   rowsPerPage: PropTypes.number.isRequired
    // }
    constructor(props) {
      super(props);
    }
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
        Math.max(0, Math.ceil(this.props.count / 10) - 1),
      );
    };
  
    render() {
      const { count, page, rowsPerPage} = this.props;
      return (
        <div className={actionsStyles.root}>
          <IconButton
            onClick={this.handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="First Page"
          >
          <FirstPageIcon />
          </IconButton>
          <IconButton
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
          >
          <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
          >
          <KeyboardArrowRight />
          </IconButton>
          <IconButton
            onClick={this.handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
          >
          <LastPageIcon />
          </IconButton>
        </div>
      );
    }
  }

  