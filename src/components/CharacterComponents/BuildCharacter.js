import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 500,
    border: "1px solid #e5e5e5",
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.41), rgba(3, 3, 3, 0.1) ),url("./images/claim_xp.jpg")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: 10,
    borderRadius: 14,
    backgroundColor: "white",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  wrapper: {
    height: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: 300,
    },
  },
  title: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "white",
    fontWeight: 600,
    letterSpacing: 0.9,
    fontSize: 26,
    lineHeight: "40px",
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
    },
  },
  subtitle: {
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.31), rgba(3, 3, 3, 0.1) )`,
    padding: 10,
    verticalAlign: "baseline",
    textAlign: "center",
    color: "white",
    lineHeight: 1.5,
    fontWeight: 500,
    fontSize: 18,
    fontFamily: "Balsamiq Sans",
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },

  buttonProceed: {
    color: "black",
    marginTop: 10,
    backgroundColor: "white",
    textTransform: "none",
    borderRadius: "100px",
    padding: "12px 40px 12px 40px",
    fontWeight: 500,
    background: `linear-gradient(to bottom,#ffee58, #fdd835)`,
    fontSize: 16,
    filter: `drop-shadow(0 0 0.75rem crimson)`,
    [theme.breakpoints.down("md")]: {
      padding: "8px 16px 8px 16px",
    },
  },
}));
export default function BuildCharacter() {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);

  return (
    <div className={classes.card}>
      <div className={classes.wrapper}>
        <div>{/* <h5 className={classes.title}>Daily XP</h5> */}</div>{" "}
        <div>
          <div style={{ paddingTop: 100 }}>
            <h6 className={classes.subtitle}>
              Daily XP claim for characters to level up <br />{" "}
              <strong>Ready for the</strong>
              Battle.
            </h6>
          </div>
          <div className="text-center">
            <Link to="/profile">
              {" "}
              <Button
                variant="contained"
                elevation={100}
                className={classes.buttonProceed}
              >
                Claim XP
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
