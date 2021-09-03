import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import imageBaseUrl from "../../actions/imageBaseUrl";
import Moment from "react-moment";
import { LazyLoadImage } from "react-lazy-load-image-component";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    width: 280,
    height: 400,
    marginBottom: 30,
    background: `linear-gradient(black,black) padding-box,linear-gradient(to right, #00EBF9, #C42195) border-box`,
    border: `5px solid transparent`,
    borderRadius: "40px",
    display: "inline-block",

    [theme.breakpoints.down("md")]: {
      width: 180,
      height: 250,
    },
  },
  lowerSection: {
    // background: `linear-gradient(to right, #00EBF9, #C42195)`,
    width: 280,
    height: 200,
    paddingTop: 20,

    [theme.breakpoints.down("md")]: {
      width: 180,
      height: 150,
    },
  },

  levelSection: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  levelCircle: {
    border: "2px solid rgba(255, 233, 36, 0.54)",
    borderRadius: "50%",
    boxShadow: "0.375em 0.375em 0 0 rgba(96, 56, 148, 0.26)",
    height: "35px",
    width: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: "30px",
      width: "30px",
    },
  },
  levelValue: {
    color: "white",
    fontWeight: 800,
    fontSize: 15,
    padding: 0,
    margin: 0,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 10,
    },
  },
  levelText: {
    color: "white",
    fontWeight: 500,
    fontSize: 12,
    padding: 0,
    margin: 0,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 10,
    },
  },

  mediaWrapper: {
    height: 220,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      height: 120,
    },
  },
  media: {
    height: "100%",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    [theme.breakpoints.down("md")]: {
      height: 120,
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
    fontFamily: "Montserrat",
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
    fontWeight: 500,
    fontSize: 14,
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
              src={`${imageBaseUrl}/${item.hashImage}`}
              className={classes.media}
              alt="character"
            />
            <img />
          </div>
          <div className={classes.lowerSection}>
            <div className="text-center pb-2">
              <div className="d-flex justify-content-between">
                <div style={{ backgroundColor: "#ec407a", width: 30 }}></div>
                <h6 className={classes.xp}>XP: {item.properties["xp"]}</h6>{" "}
                <div style={{ backgroundColor: "#ec407a", width: 15 }}></div>
              </div>
            </div>
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
