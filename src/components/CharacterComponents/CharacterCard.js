import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import imageBaseUrl from "../../actions/imageBaseUrl";

const useStyles = makeStyles((theme) => ({
  media: {
    height: "100%",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    [theme.breakpoints.down("sm")]: {
      height: "150px",
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
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 5,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  card: {
    width: 280,
    height: 420,
    borderRadius: 16,
    border: "4px solid #e5e5e5",
    marginBottom: 30,
    backgroundColor: theme.palette.pbr.textPrimaryOpp,
    [theme.breakpoints.down("sm")]: {
      width: 180,
      height: 250,
    },
  },

  title: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 900,
    letterSpacing: 1,
    fontSize: 26,
    lineHeight: "35.7px",
    fontFamily: "Carter One",
    [theme.breakpoints.down("sm")]: {
      fontWeight: 700,
      fontSize: 16,
    },
  },
  mediaWrapper: {
    height: 240,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      height: 120,
    },
  },
}));
export default function CharacterCard({ item, index }) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card} elevation={0}>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ paddingRight: 10 }}
        >
          <div className="d-flex justify-content-center align-items-center mt-2">
            <h6
              style={{
                color: "white",
                fontSize: 14,
                paddingTop: 10,
                paddingRight: 5,
              }}
            >
              Level:{" "}
            </h6>

            <div className={classes.iconWrapper}>
              <img src="images/swords.png" height="24px" alt="level" />
            </div>
            <h6 className={classes.levelText}>{item.level} </h6>
          </div>
          <div className="text-center">
            {" "}
            <h6 style={{ color: "yellow", fontSize: 14 }}>
              {item.category}
            </h6>{" "}
          </div>
        </div>
        <div className={classes.mediaWrapper}>
          <img
            src={`${imageBaseUrl}/${item.hashImage}`}
            className={classes.media}
            alt="character"
          />
        </div>
        <div className="mt-5">
          <h4 className={classes.title}>{item.username}</h4>
        </div>
      </Card>
    </div>
  );
}
