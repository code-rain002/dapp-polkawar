import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  background: {},
  section: {
    height: "100%",
    padding: 10,
    display: "flex",
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
  },
  media: {
    height: 60,
  },
  itemWrapper: {
    borderRadius: 10,
    border: "1px solid #616161",
    padding: 10,
  },

  detailsWrapper: {
    padding: 10,
  },
  itemName: {
    fontSize: 20,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 500,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
  },
  itemLevel: {
    marginTop: 10,
    fontSize: 14,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 500,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
  },
}));

export default function CharacterItems() {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <h3 htmlFor="category" className={classes.title}>
        ITEMS
      </h3>
      <div className={classes.section}>
        <div
          className="d-flex justify-content-start"
          style={{ paddingRight: 40 }}
        >
          <div htmlFor="item" className={classes.itemWrapper}>
            <img src="items/gun.png" alt="item" className={classes.media} />
          </div>
          <div className={classes.detailsWrapper}>
            <h6 htmlFor="type" className={classes.itemName}>
              Gun
            </h6>
            <h6 htmlFor="type" className={classes.itemLevel}>
              Level : <img src="images/level.png" height="14px" alt="level" />
            </h6>
          </div>
        </div>
        <div
          className="d-flex justify-content-start"
          style={{ paddingRight: 40 }}
        >
          <div htmlFor="item" className={classes.itemWrapper}>
            <img src="items/sword.png" alt="item" className={classes.media} />
          </div>
          <div className={classes.detailsWrapper}>
            <h6 htmlFor="type" className={classes.itemName}>
              Sword
            </h6>
            <h6 htmlFor="type" className={classes.itemLevel}>
              Level : <img src="images/level.png" height="14px" alt="level" />
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
