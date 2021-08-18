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
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  mediaWrapper: {
    height: 80,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  media: {
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    [theme.breakpoints.down("sm")]: {
      height: 50,
    },
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
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
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
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
}));

export default function CharacterOverview({ character }) {
  const classes = useStyles();

  const [balance, setBalance] = useState("loading...");

  useEffect(() => {
    async function asyncFn() {
      let pwarBalance = await getPwarBalance();
      if (pwarBalance) {
        setBalance(parseFloat(pwarBalance).toFixed(2));
      }
    }
    asyncFn();
  }, []);

  return (
    <div className={classes.background}>
      <div className={classes.balanceSection}>
        <h4 className={classes.balance}>{balance} PWAR</h4>
        <div className={classes.mediaWrapper}>
          <img src="/token.png" className={classes.media} alt="logo-pwar" />
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
            <strong style={{ color: "yellow", fontSize: 22 }}>
              {" "}
              {character.level}{" "}
            </strong>
          </h6>
        </div>
      </div>
    </div>
  );
}
