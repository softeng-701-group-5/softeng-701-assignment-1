import React from 'react';
import { InputBase } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(1),
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
  },
}));

const SearchBox = ({ setSearch }) => {
  const classes = useStyles();
  const [buttonData, setbuttonData] = React.useState([
    {
      key: '',
      label: 'Search',
      on: false,
    },
  ]);

  React.useEffect(() => {
    setSearch(buttonData.filter(button => button.on).map(button => button.key));
  }, [buttonData, setSearch]);

  // Toggle the different icons when the button is clicked
  const handleClick = searchedContent => {
    setbuttonData(
      buttonData.map(button =>
        searchedContent === 'Clear' || searchedContent.length === 0
          ? { ...button, on: false }
          : { ...button, on: true, key: searchedContent }
      )
    );
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        type="search"
        placeholder="Search"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{
          'aria-label': 'search',
        }}
        id="search"
        multiline={false}
        fullWidth={true}
        onChange={() =>
          handleClick(document.getElementById('search').value.toLowerCase())
        }
      />
    </div>
  );
};

export { SearchBox };
