import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PowerStats from "../../../components/PowerStatsBar";

const useStyles = makeStyles((theme) => ({
  section: {
    height: "100%",
    width: 300,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
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
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
    },
  },
  category: {
    fontSize: 15,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 300,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },

  wrapper: {
    paddingTop: 7,
    paddingBottom: 7,
  },
  powerWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    color: "grey",
    fontSize: 12,
  },
}));

export default function CharacterStats({ character }) {
  const classes = useStyles();

  let properties = character.properties;

  let colors1 = ["#ba68c8", "#9c27b0", "#7b1fa2", "#7b1fa2"];
  let colors2 = ["#ffee58", "#fbc02d", "#f57f17"];

  const nextXp = (currentXp) => {
    let characterLevel = character.level;
    let nextLevel = characterLevel + 1;
    let a = (nextLevel * nextLevel) / 0.02 - currentXp;

    return a;
  };
  return (
    <div className={classes.background}>
      <h3 htmlFor="category" className={classes.title}>
        STATS
      </h3>
      <div className="row">
        <div className="col-md-6">
          {Object.entries(properties)
            .splice(0, 4)
            .map(([key, value], index) => {
              return (
                <div className={classes.wrapper}>
                  {index === 0 && (
                    <div className="d-flex justify-content-between">
                      {" "}
                      <h6 htmlFor="category" className={classes.category}>
                        {key.toUpperCase()}({value})
                      </h6>
                      <h6
                        htmlFor="category"
                        className={classes.category}
                        style={{ color: "yellow" }}
                      >
                        <small> Upgrade requires: {nextXp(value)} XP</small>
                      </h6>
                    </div>
                  )}
                  {index !== 0 && (
                    <div>
                      <h6 htmlFor="category" className={classes.category}>
                        {key.toUpperCase()}({value})
                      </h6>
                    </div>
                  )}
                  <div htmlFor="power" className={classes.powerWrapper}>
                    <PowerStats value={value} color={colors1[index]} />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="col-md-6">
          {Object.entries(properties)
            .splice(4, 7)
            .map(([key, value], index) => {
              return (
                <div className={classes.wrapper}>
                  <h6 htmlFor="category" className={classes.category}>
                    {key.toUpperCase()}({value})
                  </h6>
                  <div htmlFor="power" className={classes.powerWrapper}>
                    <PowerStats value={value} color={colors2[index]} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
