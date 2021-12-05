import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Grow } from "@material-ui/core";
import { getAllBidItems } from "./../../actions/bidActions";
import BidCard from "../../components/BidComponents/BidCard";
import { Close, MonetizationOn } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  sectionCard: {
    background: `linear-gradient(0deg, rgba(26, 35, 126, 0.31), rgba(28,22, 86, 0.1))`,
    padding: 30,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 10,
    minHeight: 600,
    [theme.breakpoints.down("md")]: {
      margin: 0,
      borderRadius: 0,
      padding: 0,
    },
  },

  title: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 32,
    lineHeight: "40.7px",
    [theme.breakpoints.down("md")]: {
      fontSize: 26,
      marginTop: 10,
    },
  },
  para: {
    verticalAlign: "baseline",
    fontFamily: "Balsamiq Sans",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 500,
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
  rulesButton: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,#ffffff, #fffde7)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    marginTop: 5,
    marginLeft: 10,
    color: "black",
    padding: "12px 30px 12px 30px",
    fontWeight: 300,
    fontSize: 20,
    textTransform: "none",
    textDecoration: "none",

    [theme.breakpoints.down("md")]: {
      padding: "8px 15px 8px 15px",
      fontSize: 18,
    },
  },
  listItem: {
    fontWeight: 600,
    color: "white",
    fontSize: 17,
    textAlign: "left",
    paddingTop: 15,
    fontFamily: "Balsamiq Sans",
  },
}));

function Bid({ getAllBidItems, items }) {
  const classes = useStyles();
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    getAllBidItems();
  }, []);

  const toggleRules = () => {
    setShowRules(!showRules);
  };
  return (
    <div className={classes.sectionCard}>
      <div className="text-center">
        <h1 className={classes.title}>
          PolkaWar NFT Auction Program{" "}
          <img src="images/thunder.png" height="20px" alt="thunder" />
        </h1>
        <h6 className={classes.para}>
          Participate in NFT auction and win tons of rewards.
        </h6>
      </div>
      <div className="text-center mt-3">
        <Button
          variant="contained"
          className={classes.rulesButton}
          onClick={toggleRules}
        >
          <span>
            {showRules ? (
              <span>
                <Close style={{ marginRight: 5, fontSize: 22 }} />
                Close Rules
              </span>
            ) : (
              <span>
                <MonetizationOn
                  style={{ marginRight: 5, fontSize: 22, color: "#ff6d00" }}
                />
                Rules & Rewards
              </span>
            )}
          </span>
        </Button>
      </div>

      {showRules && (
        <Grow in={true} timeout={1000}>
          <div>
            <div className="mt-5" for="rules">
              <div className="d-flex justify-content-center mt-3">
                <div style={{ maxWidth: 600 }}>
                  <h6
                    style={{ color: "yellow", fontSize: 20, textAlign: "left" }}
                  >
                    Bidding Rules
                  </h6>
                  <ol>
                    <li className={classes.listItem}>
                      You must HODL or STAKE 2000 PWAR.
                    </li>
                    <li className={classes.listItem}>
                      You can participate in multiple bid at different prices.
                    </li>
                    <li className={classes.listItem}>
                      When someone bids higher than you, your bid will no longer
                      be valid and you will get your previous bid amount back.
                    </li>
                  </ol>
                  <h6
                    style={{
                      color: "yellow",
                      fontSize: 20,
                      textAlign: "left",
                      marginTop: 30,
                    }}
                  >
                    Expected Rewards
                  </h6>
                  <h6
                    style={{ color: "white", fontSize: 14, textAlign: "left" }}
                  >
                    You will get one out of 10 below mentioned rewards.
                  </h6>

                  <ul>
                    <li className={classes.listItem}>
                      0.5 BNB + 500 PWAR + 1 NFT Level 1
                    </li>
                    <li className={classes.listItem}>
                      1 BNB + 1000 PWAR + 1 NFT Level 1
                    </li>
                    <li className={classes.listItem}>
                      2 BNB + 2000 PWAR + 1 NFT Level 1
                    </li>
                    <li className={classes.listItem}>
                      3 BNB + 3000 PWAR + 1 NFT Level 2
                    </li>
                    <li className={classes.listItem}>
                      4 BNB + 4000 PWAR + 1 NFT Level 2
                    </li>
                    <li className={classes.listItem}>
                      5 BNB + 5000 PWAR + 1 NFT Level 2
                    </li>
                    <li className={classes.listItem}>
                      7 BNB + 7000 PWAR + 1 NFT Level 3
                    </li>
                    <li className={classes.listItem}>
                      10 BNB + 10000 PWAR + 1 NFT Level 3
                    </li>
                    <li className={classes.listItem}>
                      20 BNB + 20000 PWAR + 1 NFT Level 3
                    </li>
                    <li className={classes.listItem}>
                      50 BNB + 50000 PWAR + 1 NFT Level 3
                    </li>
                    <li className={classes.listItem}>
                      100 BNB + 100000 PWAR + 1 NFT Level 3
                    </li>

                    <li className={classes.listItem}>
                      200 BNB + 200000 PWAR + 1 NFT Level 3
                    </li>
                    <li className={classes.listItem}>
                      300 BNB + 300000 PWAR + 1 NFT Level 3
                    </li>
                    <li className={classes.listItem}>
                      400 BNB + 400000 PWAR + 1 NFT Level 3
                    </li>
                    <li className={classes.listItem}>
                      500 BNB + 500000 PWAR + 1 NFT Level 3
                    </li>
                  </ul>
                </div>
              </div>{" "}
            </div>
          </div>
        </Grow>
      )}
      <div>
        {items !== null && (
          <div className="row mt-5">
            {items
              .slice(0)
              .reverse()
              .map((singleItem, index) => {
                return (
                  <div className="col-12 col-md-6" key={index}>
                    <div className="d-flex flex-row justify-content-center">
                      <BidCard item={singleItem} />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

Bid.propTypes = {
  getAllBidItems: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.bids.items,
});

const mapDispatchToProps = { getAllBidItems };

export default connect(mapStateToProps, mapDispatchToProps)(Bid);
