import React from 'react';
import { Input, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  box: {
    display: 'flex',
    width: '70%',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  search: {
    marginLeft: theme.spacing(5),
    width: 300,
    backgroundColor: '#FFFFFF',
    borderStyle: 'solid',
    borderWidth: 'thick',
    borderColor: '#FFFFFF',
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
    <div className={classes.box}>
      {buttonData.map(data => {
        return (
          <React.Fragment>
            <Input
              type="text"
              id="search"
              placeholder="Search Content"
              className={classes.search}
            />
            <Button
              // Getting the users input on click
              onClick={() =>
                handleClick(
                  document.getElementById('search').value.toLowerCase()
                )
              }
              variant="contained"
              color="#00acee"
              className={classes.button}
              size="small"
            >
              {' '}
              Search{' '}
            </Button>
            <Button
              // Setting the input as clear
              onClick={() => handleClick('Clear')}
              variant="contained"
              color="#00acee"
              className={classes.button}
              size="small"
            >
              {' '}
              Clear{' '}
            </Button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export { SearchBox };
