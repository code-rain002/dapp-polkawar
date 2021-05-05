import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

export default function SimpleGrow() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grow in={checked}>
          <div>
            <h3 className="text-center " style={{ color: 'white', fontSize: 18 }}>
              Congratulations! You have won.
            </h3>
            <div>
              <h5 style={{ color: 'white', fontSize: 28 }}>Armor</h5>
            </div>
          </div>
        </Grow>
      </div>
    </div>
  );
}
