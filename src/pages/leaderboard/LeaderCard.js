import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Moment from "react-moment";
import { LazyLoadImage } from "react-lazy-load-image-component";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    width: 260,
    width: "100%",
    height: 380,
    marginBottom: 30,
    backgroundColor: "rgba(41, 42, 66, 0.3)",
    border: "3px solid #454545",
    borderRadius: "30px",
    display: "inline-block",
    [theme.breakpoints.down("md")]: {
      width: 150,
      height: 220,
    },
  },
  lowerSection: {
    width: 280,
    height: 200,
    paddingTop: 20,
    [theme.breakpoints.down("md")]: {
      width: 180,
      height: 150,
    },
  },
  xpSection: {
    position: "absolute",
    top: 20,
    left: 20,
    [theme.breakpoints.down("md")]: {
      top: 15,
      left: 15,
    },
  },
  xpCircle: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  xpValue: {
    color: "white",
    fontWeight: 800,
    fontSize: 20,
    padding: 0,
    margin: 0,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 10,
    },
  },
  xpText: {
    marginTop: 5,
    color: "yellow",
    fontWeight: 600,
    fontSize: 12,
    padding: 0,
    margin: 0,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 10,
    },
  },
  levelSection: {
    position: "absolute",
    top: 20,
    right: 20,
    [theme.breakpoints.down("md")]: {
      top: 15,
      right: 10,
    },
  },
  levelCircle: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  levelValue: {
    color: "white",
    fontWeight: 800,
    fontSize: 20,
    padding: 0,
    margin: 0,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 10,
    },
  },
  levelText: {
    marginTop: 5,
    color: "yellow",
    fontWeight: 600,
    fontSize: 12,
    padding: 0,
    margin: 0,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 10,
    },
  },

  mediaWrapper: {
    height: 280,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      height: 132,
    },
  },
  media: {
    height: "100%",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    [theme.breakpoints.down("md")]: {
      paddingTop: 5,
      height: 150,
    },
  },
  xp: {
    color: "white",
    fontSize: 20,
    fontWeight: 600,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
    },
  },
  title: {
    color: "white",
    fontWeight: 900,
    fontSize: 22,
    textAlign: "center",
    letterSpacing: 1.3,
    padding: 0,
    margin: 0,
    [theme.breakpoints.down("md")]: {
      paddingTop: 5,
      fontWeight: 700,
      fontSize: 14,
    },
  },
  daysAgo: {
    color: "white",
    fontWeight: 400,
    fontSize: 12,
    fontFamily: "Montserrat",
    textAlign: "center",
    padding: 0,
    margin: 0,
    [theme.breakpoints.down("md")]: {
      fontWeight: 300,
      fontSize: 10,
    },
  },
  icon: {
    color: "orange",
    fontSize: 30,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
}));
export default function CharacterCard({ item }) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card} elevation={0}>
        <div className={classes.xpSection}>
          <div className={classes.xpCircle}>
            <h6 className={classes.xpValue}>{item.properties["xp"]} </h6>
          </div>
          <div className="text-center">
            <p className={classes.xpText}>XP </p>
          </div>
        </div>

        <div className={classes.levelSection}>
          <div className={classes.levelCircle}>
            <h6 className={classes.levelValue}>{item.level} </h6>
          </div>
          <div className="text-center">
            <p className={classes.levelText}>Level </p>
          </div>
        </div>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ paddingRight: 10 }}
        >
          <div className={classes.mediaWrapper}>
            <LazyLoadImage
              src={`character/${item.name.toLowerCase()}_lv${Math.ceil(
                parseInt(item.level) / 10
              )}.png`}
              className={classes.media}
              alt="character"
            />
          </div>
          <div className={classes.lowerSection}>
            <div className="text-center pt-2">
              <div className="text-center">
                <h4 className={classes.title}>{item.username}</h4>
              </div>
              <p className="text-center">
                <Moment fromNow className={classes.daysAgo}>
                  {item.createdDate}
                </Moment>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
