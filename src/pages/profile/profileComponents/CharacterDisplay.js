import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import imageBaseUrl from "../../../actions/imageBaseUrl";

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
  media: {
    height: 500,
  },
}));

export default function CharacterDisplay() {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <div className={classes.section}>
        <div>
          <img
            src="/character/warrior_lv0.png"
            className={classes.media}
            alt="character"
          />
        </div>
      </div>
    </div>
  );
}
