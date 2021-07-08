import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containerStyles: {
    height: 22,
    width: 400,
    backgroundColor: '#bdbdbd',
    borderRadius: 50,
    [theme.breakpoints.down('md')]: {
      width: 100,
      height: 20,
    },
  },

  labelStyles: {
    color: 'white',
    fontFamily: 'Balsamiq Sans',
    fontWeight: 700,
    fontSize: 14,
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
      lineHeight: '20px'
    },

  },
  labelStylesBlack: {
    color: 'red',
    fontFamily: 'Balsamiq Sans',
    fontWeight: 700,
    fontSize: 14,
    paddingLeft: 5,
    paddingTop: 5,
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
      lineHeight: '20px'

    },
  }
}));

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;
  const classes = useStyles();

  const fillerStyles = {
    height: '100%',
    width: `${(100 * completed) / 20}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'center',
    transition: 'width 1s ease-in-out',
  };


  return (
    <div className={classes.containerStyles}>
      <div style={fillerStyles}>
        {completed !== 0 && <span className={classes.labelStyles}>{completed} Left</span>}

      </div>
      {completed === 0 && <span className={classes.labelStylesBlack}>{completed} Left</span>}

    </div>
  );
};

export default ProgressBar;
