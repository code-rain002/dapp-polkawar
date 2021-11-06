import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  mediaWrapper: {
    height: 230,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      height: 110,
    },
  },
  media: {
    height: "100%",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    [theme.breakpoints.down("md")]: {
      height: 100,
    },
  },
  title: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 900,
    letterSpacing: 1,
    fontSize: 20,
    paddingTop: 10,
    fontFamily: "Carter One",
    [theme.breakpoints.down("md")]: {
      paddingTop: 5,
      fontWeight: 700,
      fontSize: 14,
    },
  },
  daysAgo: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "#bdbdbd",
    fontWeight: 400,
    letterSpacing: 1,
    fontSize: 12,
    fontFamily: "Balsamiq Sans",
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

  levelText: {
    color: "white",
    fontWeight: 700,
    fontSize: 14,
    paddingTop: 10,
    paddingLeft: 5,
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },
  card: {
    width: 280,
    height: 400,
    borderRadius: 20,
    border: "4px solid #e5e5e5",
    marginBottom: 30,
    backgroundColor: "rgba(41, 42, 66, 0.3)",
    [theme.breakpoints.down("sm")]: {
      width: 180,
      height: 250,
    },
  },
  levelText: {
    color: "white",
    fontSize: 14,
    paddingTop: 10,
    paddingRight: 5,
  },
  xpText: {
    color: "yellow",
    fontSize: 12,
  },
}));
export default function CharacterCard({ item, index }) {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={0}>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ paddingRight: 10 }}
      >
        <div className="d-flex justify-content-center align-items-center mt-2">
          <h6 className={classes.levelText}>Level: </h6>

          <div className={classes.iconWrapper}>
            <img src="images/swords.png" height="24px" alt="level" />
          </div>
          <h6 className={classes.levelText}>{item.level} </h6>
        </div>
        <div className="text-center">
          {" "}
          <h6 className={classes.xpText}>XP: {item.properties["xp"]}</h6>{" "}
        </div>
      </div>
      <div className={classes.mediaWrapper}>
        <LazyLoadImage
          src={`character/${item.name.toLowerCase()}_lv${Math.ceil(
            parseInt(item.level) / 10
          )}.png`}
          className={classes.media}
          alt="character"
        />
      </div>
      <div>
        <h4 className={classes.title}>{item.username}</h4>
        <p className="text-center">
          <Moment fromNow className={classes.daysAgo}>
            {item.createdDate}
          </Moment>
        </p>
      </div>
    </Card>
  );
}
