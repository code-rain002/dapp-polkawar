import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  background: {},
  section: {
    height: "100%",
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 26,
    width: "fit-content",
    paddingBottom: 10,
    paddingTop: 10,
    color: "white",
    fontWeight: 800,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
  },
  category: {
    fontSize: 16,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 300,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 18,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 500,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
  },
}));

export default function CharacterStats() {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <h3 htmlFor="category" className={classes.title}>
        STATS
      </h3>
      <div className={classes.section}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h6 htmlFor="category" className={classes.category}>
            XP
          </h6>
          <h6 htmlFor="type" className={classes.categoryText}>
            0
          </h6>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h6 htmlFor="category" className={classes.category}>
            HP
          </h6>
          <h6 htmlFor="type" className={classes.categoryText}>
            30
          </h6>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h6 htmlFor="category" className={classes.category}>
            MP
          </h6>
          <h6 htmlFor="type" className={classes.categoryText}>
            30
          </h6>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h6 htmlFor="category" className={classes.category}>
            Patk
          </h6>
          <h6 htmlFor="type" className={classes.categoryText}>
            6
          </h6>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h6 htmlFor="category" className={classes.category}>
            Pdef
          </h6>
          <h6 htmlFor="type" className={classes.categoryText}>
            7
          </h6>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h6 htmlFor="category" className={classes.category}>
            Speed
          </h6>
          <h6 htmlFor="type" className={classes.categoryText}>
            0.7
          </h6>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h6 htmlFor="category" className={classes.category}>
            Accuracy
          </h6>
          <h6 htmlFor="type" className={classes.categoryText}>
            3
          </h6>
        </div>
      </div>
    </div>
  );
}
