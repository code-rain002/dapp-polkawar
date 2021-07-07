import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containerStyles: {
    height: 22,
    width: 400,
    backgroundColor: '#e0e0de',
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
        <span className={classes.labelStyles}>{`${completed} Left`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
