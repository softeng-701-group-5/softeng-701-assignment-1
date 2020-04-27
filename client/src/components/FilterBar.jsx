import React from 'react';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';
import { Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { loadCSS } from 'fg-loadcss';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    marginTop: 20,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const FilterBar = ({ setFilters }) => {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    {
      key: 'reddit',
      label: 'Reddit',
      icon: <Icon className="fab fa-reddit" />,
      on: true,
    },
    {
      key: 'hackernews',
      label: 'Hackernews',
      icon: <Icon className="fab fa-hacker-news" />,
      on: true,
    },
    {
      key: 'github',
      label: 'Github',
      icon: <Icon className="fab fa-github" />,
      on: true,
    },
    {
      key: 'twitter',
      label: 'Twitter',
      icon: <Icon className="fab fa-twitter" />,
      on: true,
    },
    {
      key: 'covidNineteen',
      label: 'Covid19',
      icon: <ErrorTwoToneIcon />,
      on: true,
    },
  ]);

  // Load Font Awesome for icons
  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css')
    );
  }, []);

  React.useEffect(() => {
    setFilters(chipData.filter(chip => chip.on).map(chip => chip.key));
    // eslint-disable-next-line
  }, [chipData]);

  // Toggle on and off when rhs of chip is clicked
  const handleClick = chipSelected => {
    setChipData(
      chipData.map(chip =>
        chip.key === chipSelected.key ? { ...chip, on: !chip.on } : chip
      )
    );
  };

  return (
    <div className={classes.root}>
      {chipData.map(data => {
        return (
          <Chip
            key={data.key}
            icon={data.icon}
            label={data.label}
            onDelete={() => handleClick(data)}
            className={classes.chip}
            deleteIcon={data.on ? <DoneIcon /> : <ClearIcon />}
          />
        );
      })}
    </div>
  );
};

export { FilterBar };
