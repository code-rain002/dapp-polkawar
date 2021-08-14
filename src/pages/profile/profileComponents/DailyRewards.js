import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import { Button, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    minHeight: "100%",
    background: `linear-gradient(0deg, rgba(114, 29, 158, 0.95), rgba(253,151, 80, 0.95) ),url("https://mir-s3-cdn-cf.behance.net/project_modules/disp/1f1fb3108866211.5fc73ca0439e6.gif")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: 10,
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
  subtitle: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "white",
    fontWeight: 500,
    fontSize: 18,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
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
  xp: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "#ffffff",
    fontWeight: 800,
    fontSize: 16,
    lineHeight: "15px",
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
  costPwar: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "#ffffff",
    fontWeight: 400,
    fontSize: 11,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 10,
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
    height: 175,
    border: "1px solid #ffffff",
    borderRadius: 10,
    backgroundColor: `#68605A`,
    background: `linear-gradient(0deg, rgba(104,96,90, 0.95), rgba(40,40,40, 0.95) )`,
    padding: 10,
    marginBottom: 10,
  },
  rewardCardToday: {
    width: "100%",
    height: 175,

    border: "5px solid yellow",
    borderRadius: 10,
    backgroundColor: `#68605A`,
    background: `linear-gradient(0deg, rgba(104,96,90, 0.95), rgba(40,40,40, 0.95) )`,
    padding: 10,
    marginBottom: 10,
  },
  rewardCardUnclaimed: {
    width: "100%",
    height: 175,
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
  scroll: {
    height: 440,
    overflowY: "scroll",

    [theme.breakpoints.down("sm")]: {
      height: 300,
    },
  },
  showMeButton: {
    textTransform: "none",
    borderRadius: "50px",
    border: "1px solid white",
    color: "white",
    padding: "3px 10px 3px 10px",
    backgroundColor: "#9B1047",
    fontSize: 12,
  },
  approveButton: {
    textTransform: "none",
    borderRadius: "50px",
    border: "1px solid white",
    color: "white",
    padding: "3px 10px 3px 10px",
    background: `linear-gradient(to bottom,#7b1fa2, #6a1b9a)`,
    fontSize: 12,
  },
}));
export default function DailyRewards({ togglePopup }) {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);
  const [approved, setApproved] = useState(false);

  let dayOfClaim = 2;
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
        <div className="d-flex justify-content-between">
          <div></div>
          <div>
            <h5 className={classes.title}>Claim XP</h5>
            <p className={classes.subtitle}>
              Build your character and get ready for the battle
            </p>
          </div>
          <div>
            {" "}
            <IconButton onClick={togglePopup}>
              <Close />
            </IconButton>
          </div>
        </div>
      </div>{" "}
      <div className="d-flex justify-content-center">
        <div className={classes.rewardBlockWrapper}>
          <div className={classes.scroll}>
            <div className="row">
              {Array.from(Array(60)).map((element, index) => {
                return (
                  <div className="col-md-3">
                    {!approved && (
                      <div className={classes.rewardCardClaimed}>
                        <div className="text-center">
                          <img
                            src="./images/xp.png"
                            className={classes.media}
                          />
                        </div>
                        <div>
                          <h6 className={classes.xp}>
                            {10 * (index + 1)} XP
                            <br />{" "}
                            <small className={classes.costPwar}>
                              (cost 30 PWAR)
                            </small>
                          </h6>
                        </div>
                        <div>
                          <h6 className={classes.day}>Day {index + 1}</h6>
                        </div>
                        <div className="text-center">
                          <Button
                            variant="contained"
                            className={classes.approveButton}
                          >
                            {" "}
                            Approve
                          </Button>
                        </div>
                      </div>
                    )}
                    <div>
                      {approved && (
                        <div>
                          {index < dayOfClaim && (
                            <div className={classes.rewardCardClaimed}>
                              <div className="text-center">
                                <img
                                  src="./images/xp.png"
                                  className={classes.media}
                                />
                              </div>
                              <div>
                                <h6 className={classes.xp}>
                                  {10 * (index + 1)} XP
                                  <br />{" "}
                                  <small className={classes.costPwar}>
                                    (cost 30 PWAR)
                                  </small>
                                </h6>
                              </div>
                              <div>
                                <h6 className={classes.day}>Day {index + 1}</h6>
                              </div>
                              <div
                                className="text-center"
                                style={{ color: "red", fontSize: 16 }}
                              >
                                <Close />
                              </div>
                            </div>
                          )}
                          {index === dayOfClaim && (
                            <div className={classes.rewardCardToday}>
                              <div className="text-center">
                                <img
                                  src="./images/xp.png"
                                  className={classes.media}
                                />
                              </div>
                              <div>
                                <h6 className={classes.xp}>
                                  {10 * (index + 1)} XP <br />{" "}
                                  <small className={classes.costPwar}>
                                    (cost 30 PWAR)
                                  </small>
                                </h6>
                              </div>
                              <div>
                                <h6 className={classes.day}>Day {index + 1}</h6>
                              </div>
                              <div className="text-center">
                                <Button
                                  variant="contained"
                                  className={classes.showMeButton}
                                >
                                  {" "}
                                  Show Me
                                </Button>
                              </div>
                            </div>
                          )}
                          {index > dayOfClaim && (
                            <div className={classes.rewardCardUnclaimed}>
                              <div className="text-center">
                                <img
                                  src="./images/xp.png"
                                  className={classes.media}
                                />
                              </div>
                              <div>
                                <h6 className={classes.xp}>
                                  {10 * (index + 1)} XP <br />{" "}
                                  <small className={classes.costPwar}>
                                    (cost 30 PWAR)
                                  </small>
                                </h6>
                              </div>
                              <div>
                                <h6 className={classes.day}>Day {index + 1}</h6>
                              </div>
                            </div>
                          )}
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
    </div>
  );
}
