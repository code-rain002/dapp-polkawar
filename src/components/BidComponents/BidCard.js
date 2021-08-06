import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Timer from "../Timer";
import { Link } from "react-router-dom";
import imageBaseUrl from "../../actions/imageBaseUrl";

const useStyles = makeStyles((theme) => ({
  card1: {
    width: 500,
    height: "100%",
    borderRadius: 20,
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(3, 3, 3, 0.72) ),url("./images/cardbg.jpeg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: "4px solid #e5e5e5",
    marginBottom: 30,
    backgroundColor: theme.palette.pbr.textPrimaryOpp,
    [theme.breakpoints.down("md")]: {
      width: 300,
      height: "100%",
    },
  },

  title1: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 700,
    letterSpacing: 1,
    fontSize: 20,

    [theme.breakpoints.down("sm")]: {
      fontWeight: 700,
      fontSize: 14,
    },
  },
  mediaWrapper1: {
    height: 300,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      height: 160,
    },
  },
  media: {
    height: "100%",
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    [theme.breakpoints.down("md")]: {
      height: 140,
    },
  },

  priceBadgeWrapper: {
    fontFamily: "Balsamiq Sans",
    textAlign: "center",
    paddingTop: 10,
    borderRadius: 30,
    height: "100%",
    width: "fit-content",
    [theme.breakpoints.down("md")]: {
      marginTop: 0,
      textAlign: "center",
      paddingTop: 5,
      borderRadius: 50,
      height: "100%",
      lineHeight: "16px",
      width: "fit-content",
    },
  },

  bidButton: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,yellow, orange)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",

    marginTop: 5,

    color: "black",
    padding: "14px 50px 14px 50px",
    fontWeight: 400,
    fontSize: 18,
    textTransform: "none",
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 17,
    },
  },
}));
function BidCard({ item }) {
  const classes = useStyles();

  const [timerStatus, setTimerStatus] = useState(0);

  useEffect(() => {
    updateBidTimerStatus();
  }, []);

  const updateBidTimerStatus = () => {
    const differenceStart = +new Date(item.time_start) - +new Date();
    const differenceEnd = +new Date(item.time_end) - +new Date();

    console.log(differenceStart);
    console.log(differenceEnd);

    if (differenceEnd <= 0) {
      setTimerStatus(1);
      console.log("Bid ends");
    } else {
      if (differenceStart > 0) {
        setTimerStatus(3);
        console.log("Bid not started");
      } else {
        setTimerStatus(4);
        console.log("Bid started");
      }
    }
  };

  return (
    <div className="mb-3">
      <div className="text-center" />
      {item !== null && item !== undefined && (
        <Card className={classes.card1} elevation={0}>
          <div>
            {" "}
            <div className="d-flex justify-content-center" />
            <div className={classes.mediaWrapper1}>
              <img
                alt="item"
                src={
                  item.itemId === "0"
                    ? "https://cloudflare-ipfs.com/ipfs/Qmcr4GGFEU26zRGWtTZhbncRLitaVgaLqVuypvPT52Qep1"
                    : `${imageBaseUrl}/${item.image}`
                }
                className={classes.media}
              />
            </div>
            <div>
              <h4 className={classes.title1}>{item.name}</h4>
            </div>
            <div className="d-flex justify-content-center">
              <div className={classes.priceBadgeWrapper}>
                <h6 style={{ color: "white" }}>
                  <strong>
                    {timerStatus === 4 && "Auction ends in"}
                    {timerStatus === 3 && "Auction starts in"}

                    {timerStatus === 1 && "Auction Status"}
                    {timerStatus === 0 && "Auction Status"}
                  </strong>{" "}
                </h6>
                <div>
                  {timerStatus === 4 && <Timer endTime={item.time_end} />}
                  {timerStatus === 3 && <Timer endTime={item.time_start} />}

                  {timerStatus === 1 && <Timer endTime={item.time_end} />}
                  {timerStatus === 0 && "checking..."}
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <Link to={`/bid/${item.itemId}`}>
                <Button variant="contained" className={classes.bidButton}>
                  <span>Bid Now</span>
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
BidCard.propTypes = {
  authenticateUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BidCard);
