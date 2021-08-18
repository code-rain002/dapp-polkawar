import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export default function CharacterStats({ color, value, maxValue }) {
  const classes = useStyles();

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: color,
    },
  }))(LinearProgress);

  let statsValue = (value * 100) / maxValue;
  return (
    <div>
      <BorderLinearProgress variant="determinate" value={statsValue} />
    </div>
  );
}
