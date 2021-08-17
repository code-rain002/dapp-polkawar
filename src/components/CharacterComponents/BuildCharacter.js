import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 500,
    border: "1px solid #e5e5e5",
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.41), rgba(3, 3, 3, 0.1) ),url("./images/claim_bg.png")`,
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
    height: 450,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
    verticalAlign: "baseline",
    textAlign: "center",
    color: "white",
    fontWeight: 500,
    fontSize: 17,
    fontFamily: "Balsamiq Sans",
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },

  buttonProceed: {
    color: "white",
    marginTop: 20,
    backgroundColor: "white",
    textTransform: "none",
    borderRadius: "100px",
    padding: "12px 16px 12px 16px",
    fontWeight: 500,
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    fontSize: 16,
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
        <div>
          <h5 className={classes.title}>Daily XP</h5>
          {/* <Divider
            style={{ height: 2, backgroundColor: "white", marginBottom: 10 }}
          />
          <h6 className={classes.subtitle}>Claim XP, Build Character</h6> */}
        </div>{" "}
        <div>
          <div>
            <h6 className={classes.subtitle}>
              Daily XP claim for characters to level up - Ready for the Battle.
            </h6>
          </div>
          <div className="text-center">
            <Link to="/profile">
              {" "}
              <Button variant="contained" className={classes.buttonProceed}>
                Claim XP
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
