import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getPwarBalance } from "../../../actions/smartActions/SmartActions";

const useStyles = makeStyles((theme) => ({
  balanceSection: {
    display: "flex",
    justifyContent: "flex-end ",
    padding: 10,
  },
  balance: {
    fontSize: 32,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 800,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
    display: "flex",

    alignItems: "center",
  },
  mediaWrapper: {
    height: 80,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  overview: {
    borderRadius: 20,
    border: "1px solid #37474f",
    height: "100%",
    padding: 20,
    display: "flex",
    justifyContent: "space-around",
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

export default function CharacterOverview({ character }) {
  const classes = useStyles();

  const [balance, setBalance] = useState("loading...");

  useEffect(() => {
    async function asyncFn() {
      let pwarBalance = await getPwarBalance();
      setBalance(pwarBalance);
    }
    asyncFn();
  }, []);

  return (
    <div className={classes.background}>
      <div className={classes.balanceSection}>
        <h4 className={classes.balance}>{balance} PWAR</h4>
        <div className={classes.mediaWrapper}>
          <img src="/token.png" height="80px" alt="level" />
        </div>
      </div>
      <div className={classes.overview}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h6 htmlFor="category" className={classes.category}>
            Class
          </h6>
          <h6 htmlFor="type" className={classes.categoryText}>
            {character.name}
          </h6>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h6 htmlFor="category" className={classes.category}>
            Level
          </h6>
          <h6 htmlFor="type" className={classes.categoryText}>
            {character.level}{" "}
          </h6>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h6 htmlFor="category" className={classes.category}>
            Upgrade Date
          </h6>
          <h6 htmlFor="type" className={classes.categoryText}>
            ...
          </h6>
        </div>
      </div>
    </div>
  );
}
