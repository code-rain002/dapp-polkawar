import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  containerStyles: {
    height: 22,
    width: 400,
    backgroundColor: "#bdbdbd",
    borderRadius: 50,
    [theme.breakpoints.down("md")]: {
      width: 180,
      height: 20,
    },
  },

  labelStyles: {
    color: "black",
    fontFamily: "Balsamiq Sans",
    fontWeight: 700,
    fontSize: 14,
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
      lineHeight: "20px",
    },
  },
  labelStylesBlack: {
    color: "red",
    fontFamily: "Balsamiq Sans",
    fontWeight: 700,
    fontSize: 14,
    paddingLeft: 5,
    paddingTop: 5,
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
      lineHeight: "20px",
    },
  },
}));

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const classes = useStyles();

  const fillerStyles = {
    height: "100%",
    width: `${(100 * (completed <= 0 ? 0 : completed)) / 20}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "center",
    transition: "width 1s ease-in-out",
  };

  return (
    <div>
      <div className={classes.containerStyles}>
        <div
          className="text-center"
          style={{ position: "absolute", left: "45%" }}
        >
          {completed >= 0 && (
            <span className={classes.labelStyles}>{completed} Left </span>
          )}
          {completed < 0 && (
            <span className={classes.labelStyles}> 0 Left</span>
          )}
        </div>

        <div style={fillerStyles} />
      </div>
    </div>
  );
};

export default ProgressBar;
