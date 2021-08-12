import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { element } from "prop-types";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    minHeight: "100%",
    background: `linear-gradient(0deg, rgba(114, 29, 158, 0.95), rgba(253,151, 80, 0.95) ),url("https://mir-s3-cdn-cf.behance.net/project_modules/disp/1f1fb3108866211.5fc73ca0439e6.gif")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: 20,
    border: "1px solid #ffffff",
    borderRadius: 14,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },

  title: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "white",
    fontWeight: 800,
    fontSize: 36,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 25,
    },
  },

  para: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "#ffffff",
    fontWeight: 500,
    fontSize: 22,
    marginTop: 40,
    fontFamily: "Balsamiq Sans",
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
  pwar: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "#ffffff",
    fontWeight: 800,
    fontSize: 16,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
  day: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "#ffffff",
    fontWeight: 500,
    fontSize: 11,
    fontFamily: "Balsamiq Sans",
    [theme.breakpoints.down("md")]: {
      fontSize: 11,
    },
  },

  rewardBlockWrapper: {
    width: 1200,
    marginTop: 20,
  },
  rewardCardClaimed: {
    width: "100%",
    height: 160,
    border: "1px solid #ffffff",
    borderRadius: 10,
    backgroundColor: `#68605A`,
    background: `linear-gradient(0deg, rgba(104,96,90, 0.95), rgba(40,40,40, 0.95) )`,
    padding: 10,
    marginBottom: 10,
  },
  rewardCardToday: {
    width: "100%",
    height: 160,

    border: "5px solid yellow",
    borderRadius: 10,
    backgroundColor: `#68605A`,
    background: `linear-gradient(0deg, rgba(104,96,90, 0.95), rgba(40,40,40, 0.95) )`,
    padding: 10,
    marginBottom: 10,
  },
  rewardCardUnclaimed: {
    width: "100%",
    height: 160,

    border: "1px solid #ffffff",
    borderRadius: 10,
    backgroundColor: `#68605A`,
    background: `linear-gradient(0deg, rgba(104,96,90, 0.95), rgba(40,40,40, 0.95) )`,
    padding: 10,
    marginBottom: 10,
    opacity: 0.5,
  },
  media: {
    height: 50,
    marginBottom: 10,
  },
  claimedImage: {
    textAlign: "center",
  },
}));
export default function DailyRewards() {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);

  const rewardCardConditionClass = (index) => {
    if (index <= 2) {
      if (index === 2) {
        return classes.rewardCardToday;
      } else {
        return classes.rewardCardClaimed;
      }
    }
    return classes.rewardCardUnclaimed;
  };
  return (
    <div className={classes.card}>
      <div>
        <h5 className={classes.title}>Claim XP</h5>
      </div>{" "}
      <div className="d-flex justify-content-center">
        <div className={classes.rewardBlockWrapper}>
          <div className="row">
            {Array.from(Array(8)).map((element, index) => {
              return (
                <div className="col-md-3">
                  <div className={rewardCardConditionClass(index)}>
                    <div className="text-center">
                      <img
                        src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Experience-Points-XP-icon.png"
                        className={classes.media}
                      />
                    </div>
                    <div>
                      <h6 className={classes.pwar}>{10 * (index + 1)} XP</h6>
                    </div>
                    <div>
                      <h6 className={classes.day}>Day {index + 1}</h6>
                    </div>
                    {index < 2 && (
                      <div className="text-center">
                        <Close style={{ color: "red", fontSize: 22 }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
