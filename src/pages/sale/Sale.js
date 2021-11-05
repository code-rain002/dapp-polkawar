import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getFlashItems, getUserItems } from "./../../actions/itemActions";
import { checkIsPurchased } from "./../../actions/smartActions/SmartActions";
import propTypes from "prop-types";
import { connect } from "react-redux";
import ItemSaleCard from "../../components/ItemsComponents/ItemSaleCard";
import Timer from "../../components/Timer";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import constants from "./../../utils/constants";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100%",
    [theme.breakpoints.down("md")]: {
      height: "100%",
    },
  },
  mainCard: {
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
  sectionCard1: {
    backgroundColor: "transparent",
    marginTop: 20,
    height: 550,
    width: 900,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 20,
    borderRadius: 20,
    filter: `drop-shadow(0 0 0.9rem #1a237e)`,
    [theme.breakpoints.down("md")]: {
      maxWidth: 350,
      marginRight: 0,
      marginLeft: 0,
    },
  },
  banner: {
    height: 280,
    width: 900,
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(3, 3, 3, 0.02) ),url("/images/banner.jpg")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    [theme.breakpoints.down("md")]: {
      width: "90vw",
      height: "100%",
    },
  },
  title: {
    verticalAlign: "baseline",
    color: "yellow",
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: "2.08vw",
    lineHeight: "40.7px",
    textAlign: "center",
    paddingTop: 20,
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
      lineHeight: "30.7px",
    },
  },

  para: {
    verticalAlign: "baseline",
    fontFamily: "Balsamiq Sans",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 500,
    letterSpacing: 0.5,
    fontSize: 14,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
  timerBox: {
    paddingTop: 35,
    display: "flex",
    justifyContent: "center",
  },
  ends: {
    verticalAlign: "baseline",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 400,
    letterSpacing: 0.5,
    fontSize: 28,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
    },
  },

  listItem: {
    fontWeight: 600,
    color: "white",
    fontSize: 16,
    textAlign: "left",
    paddingTop: 15,
    fontFamily: "Balsamiq Sans",
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
  saleButton: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,yellow, orange)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    marginTop: 5,
    marginLeft: 10,
    color: "black",
    padding: "10px 16px 10px 16px",
    fontWeight: 400,
    fontSize: 16,
    textTransform: "none",
    textDecoration: "none",
  },
  timerTime: {
    color: "white",
    fontSize: 28,
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
    },
  },
  profileButton: {
    textAlign: "center",
    background: `linear-gradient(to bottom,#ffffff, yellow)`,
    padding: "8px 16px 8px 16px",
    borderRadius: 50,
    color: "black",
    fontSize: 14,
    fontWeight: 500,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 14px 8px 14px",
      fontSize: 14,
    },
  },
  thanksHeading: {
    color: "yellow",
    textAlign: "center",
    fontSize: 32,
    [theme.breakpoints.down("md")]: {
      fontSize: 24,
    },
  },
  thanksText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    width: 500,
    [theme.breakpoints.down("md")]: {
      fontSize: 15,
      fontWeight: 400,
      width: "100%",
    },
  },
}));

var saleEndDate = process.env.REACT_APP_SALE_END_DATE;
var saleStartDate = process.env.REACT_APP_SALE_START_DATE;
var resaleStartDate = process.env.REACT_APP_START_RESELL;
var resaleEndDate = process.env.REACT_APP_END_RESELL;

function FlashSale({ getFlashItems, getUserItems, flash, useritems }) {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);
  const [saleEnds, setSaleEnds] = useState(false);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    async function asyncFn() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      let userAddress = accounts[0];
      checkIsAlreadyPurchased();
      getFlashItems();
      getUserItems(userAddress);
    }
    asyncFn();
  }, []);

  useEffect(() => {
    setInterval(() => {
      checkSaleStart();
    }, 1000);
  }, []);

  const checkSaleStart = () => {
    //PUT Sale start date time
    const differenceStart = +new Date(saleStartDate) - +new Date();
    const differenceEnd = +new Date(saleEndDate) - +new Date();

    if (differenceEnd <= 0) {
      setSaleEnds(true);
    } else {
      setSaleEnds(false);
    }

    if (differenceStart > 0) {
      setActualCase(0);
    } else {
      setActualCase(1);
    }
  };

  const checkIsAlreadyPurchased = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let userAddress = accounts[0];
    let response = await checkIsPurchased(userAddress);
    console.log(response);
    if (response) {
      console.log("checkIsPurchased");
      setPurchased(true);
    }
  };

  return (
    <div className={classes.background}>
      <div className="text-center">
        <h1 className={classes.title}>
          Flash Sale{" "}
          <img src="images/thunder.png" height="20px" alt="thunder" />
        </h1>
      </div>

      <div className={classes.mainCard}>
        <div>
          <img
            src="/images/flashsale.jpg"
            alt="flash-sale-poster"
            className={classes.banner}
          />
        </div>
        {actualCase === 0 && (
          <div>
            <div className={classes.timerBox} for="sale starts in">
              <h1 className={classes.ends}>Sale Starts in: </h1>
              <h6 className={classes.timerTime}>
                <Timer endTime={saleStartDate} />
              </h6>
            </div>
          </div>
        )}
        {actualCase === 1 && (
          <div>
            <div className={classes.timerBox} for="sale ends in">
              <h1 className={classes.ends}>Sale Ends in: </h1>
              <h6 className={classes.timerTime}>
                <Timer endTime={saleEndDate} />
              </h6>
            </div>
          </div>
        )}
        <div className="mt-5" htmlFor="rules">
          <h6 style={{ color: "yellow", fontSize: 18, textAlign: "center" }}>
            Flash Sale Rules
          </h6>
          <h6 className={classes.para}>
            Please read the rules carefully before participating into flash
            sale.
          </h6>
          <div className="d-flex justify-content-center mt-3">
            <div style={{ maxWidth: 600 }}>
              <ol>
                <li className={classes.listItem}>
                  You must HODL or STAKE {constants.holdPWAR} PWAR Tokens.
                </li>
                <li className={classes.listItem}>
                  You can only purchase item once during the flash sale.
                </li>
                <li className={classes.listItem}>
                  Only {constants.itemsCount} items will be on sale at
                  discounted price.
                </li>
                <li className={classes.listItem}>
                  Each NFT will cost {constants.itemPrice} BNB. After the Flash
                  Sale event ends, you can resell to the system for{" "}
                  {constants.resellBNB} BNB and your NFT item will be lost.
                </li>

                <li className={classes.listItem}>
                  Reselling of the NFT Item will start from{" "}
                  <span style={{ color: "yellow" }}>{resaleStartDate}</span> and
                  will end{" "}
                  <span style={{ color: "yellow" }}>{resaleEndDate}.</span>
                </li>
                <li className={classes.listItem}>
                  If you don't want to resell, you can hold the item upto{" "}
                  <span style={{ color: "yellow" }}>
                    {constants.rewardDate}
                  </span>{" "}
                  and you will receive{" "}
                  <span style={{ color: "yellow" }}>
                    {constants.rewardsPWAR} PWAR
                  </span>{" "}
                  tokens as a reward.
                </li>
              </ol>
            </div>
          </div>{" "}
        </div>
        {purchased && (
          <div className="mt-5 pb-5">
            <h2 className={classes.thanksHeading}>Thanks for Participating!</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className={classes.thanksText}>
                Great! You have already purchased an item during flash sale. Go
                to your items section of the profile and check your item.
              </p>
            </div>
            <Link to="/profile">
              <div className="text-center">
                <Button variant="contained" className={classes.profileButton}>
                  <span>Go To Profile</span>
                </Button>
              </div>
            </Link>
          </div>
        )}
        {!purchased && (
          <div className="d-flex flex-column mt-4">
            {flash.length !== 0 &&
              flash.map((singleItem) => {
                return (
                  <div>
                    <ItemSaleCard
                      item={singleItem}
                      saleEnds={saleEnds}
                      saleCase={actualCase}
                    />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

FlashSale.propTypes = {
  getFlashItems: propTypes.func.isRequired,
  getUserItems: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  flash: state.items.flash,
  useritems: state.items.useritems,
});

const mapDispatchToProps = { getFlashItems, getUserItems };

export default connect(mapStateToProps, mapDispatchToProps)(FlashSale);
