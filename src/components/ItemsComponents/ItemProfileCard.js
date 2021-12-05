import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, Slide, Backdrop, Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import imageBaseUrl from "../../actions/imageBaseUrl";
import {
  tokenURI,
  checkApproved,
} from "../../actions/smartActions/SmartActions";
import axios from "axios";
import SellModal from "./SellModal";
import Loader from "../Loader";
import { getUserAddress } from "../../actions/web3Actions";
import constants from "../../utils/constants";
import itemConnection from "../../utils/itemConnection";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { AccessAlarm } from "@material-ui/icons";
import Moment from "react-moment";
import { getItemDetails } from "./../../actions/itemActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  card1: {
    width: 200,
    height: 290,
    borderRadius: 20,
    border: "4px solid #e5e5e5",
    marginBottom: 30,
    backgroundColor: "rgba(41, 42, 66, 0.3)",

    [theme.breakpoints.down("md")]: {
      width: 160,
      height: 220,
    },
  },
  cardHeader: {
    height: 60,
    backgroundColor: theme.palette.pbr.primary,
  },
  title1: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 400,
    letterSpacing: 1,
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      fontWeight: 400,
      fontSize: 12,
    },
  },
  mediaWrapper1: {
    height: 120,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      height: 50,
    },
  },
  media: {
    height: "100%",
    marginLeft: 5,
    marginRight: 5,
    [theme.breakpoints.down("md")]: {
      height: 40,
    },
  },

  icon: {
    color: "orange",
    fontSize: 30,
  },
  levelImage: {
    height: "14px",
    [theme.breakpoints.down("sm")]: {
      height: "10px",
    },
  },
  levelText: {
    color: "white",
    fontWeight: 300,
    fontSize: 12,
    paddingTop: 5,
    paddingRight: 5,
    display: "block",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
      paddingTop: 10,
      paddingRight: 5,
    },
  },
  levelWrapper: {
    paddingRight: 7,
    color: "white",
    fontWeight: 300,
    fontSize: 11,
  },
  priceBadgeWrapper: {
    fontFamily: "Balsamiq Sans",

    background: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))`,
    padding: "9px 10px 2px 10px",
    borderRadius: 7,
    height: "100%",
    height: 30,
    width: "fit-content",
    [theme.breakpoints.down("md")]: {
      marginTop: 0,
      textAlign: "center",
      background: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))`,
      padding: "2px 10px 2px 10px",
      borderRadius: 7,
      height: "100%",
      lineHeight: "16px",
      width: "fit-content",
    },
  },

  pricingText: {
    fontFamily: "Balsamiq Sans",
    color: "white",
    fontSize: 12,
    fontWeight: 400,
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
      fontWeight: 400,
    },
  },
  sellButton: {
    textAlign: "center",
    background: `linear-gradient(to right,#AF2C59, #C43262)`,
    padding: "8px 16px 8px 16px",
    marginRight: 10,
    borderRadius: 50,
    color: "white",
    fontSize: 12,
    fontWeight: 400,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "4px 8px 4px 8px",
      fontSize: 12,
    },
  },
  bidButton: {
    textAlign: "center",
    background: `linear-gradient(to right,#6F2F9B, #8D37A9)`,
    padding: "8px 16px 8px 16px",
    borderRadius: 50,
    color: "white",
    fontSize: 12,
    fontWeight: 400,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "4px 8px 4px 8px",
      fontSize: 12,
    },
  },
  openButton: {
    textAlign: "center",
    background: `linear-gradient(to right,green, #1b5e20)`,
    padding: "8px 16px 8px 16px",
    borderRadius: 50,
    color: "white",
    fontSize: 14,
    fontWeight: 500,
    textTransform: "none",
    marginTop: 20,
    [theme.breakpoints.down("sm")]: {
      padding: "4px 8px 4px 8px",
      fontSize: 12,
      marginTop: 0,
    },
  },
  ownedText: {
    color: "white",
    textAlign: "center",
    fontSize: 10,
    padding: 0,
    margin: 0,
  },
  ownerCount: {
    color: "white",
    textAlign: "center",
    fontSize: 10,
    padding: 0,
    margin: 0,
  },
  background: {
    height: "100%",
    width: 500,
    backgroundColor: "white",
    borderRadius: 10,
    paddingBottom: 20,
    [theme.breakpoints.down("md")]: {
      maxWidth: 300,
    },
  },
  bidPopupCard: {
    height: 400,
    width: 400,
    padding: 30,
    background: `linear-gradient(to right,#6F2F9B, #8D37A9)`,
    borderRadius: 10,
    paddingBottom: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      maxWidth: 300,
      height: 300,
    },
  },
  padding: {
    paddingTop: 20,
    paddingLeft: 20,
  },

  messageTitle: {
    paddingTop: 15,
    fontWeight: 400,
    verticalAlign: "baseline",
    letterSpacing: "-0.8px",
    margin: 0,
    textAlign: "center",
    color: "black",
    fontSize: 25,
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
      fontWeight: 400,
    },
  },
}));
function ItemProfileCard({ item, getItemDetails }) {
  const classes = useStyles();
  const [itemJson, setItemJson] = useState(null);
  const [sellPopup, setSellPopup] = useState(false);
  const [bidPopup, setBidPopup] = useState(false);
  const [approvePopup, setApprovePopup] = useState(false);
  const [approved, setApproved] = useState(false);
  const [buttonsCase, setButtonsCase] = useState(0);
  const [actualCase, setActualCase] = useState(0);
  const [loading, setLoading] = useState(true);
  const [disableApprovePopup, setDisableApprovePopup] = useState(false);
  const [disableSellPopup, setDisableSellPopup] = useState(false);

  const toggleSellPopup = (value) => {
    setSellPopup(value);
  };
  const toggleBidPopup = (value) => {
    setBidPopup(value);
  };

  const toggleApprovePopup = (value) => {
    setApprovePopup(value);
  };

  useEffect(() => {
    async function asyncFn() {
      //To load Item information from Database
      let itemId = item.itemId;
      let itemData = await getItemDetails(itemId);
      setItemJson(itemData);
      isApproved();
      checkApproveButtonConditions();
      setLoading(false);
    }

    asyncFn();
  }, []);

  const checkApproveButtonConditions = async () => {
    // 1. Show Sell and Bid Buttons if approved || Flash Sale
    // 2. Show Bid buttons
    // 3. Show Sell and Bid Buttons

    if (item !== null && item !== undefined) {
      if (item.event === "flashsale") {
        const resellStarted =
          +new Date(process.env.REACT_APP_START_RESELL) - +new Date();
        const resellEnd =
          +new Date(process.env.REACT_APP_END_RESELL) - +new Date();

        if (resellStarted <= 0 && resellEnd >= 0) {
          //Time of resell
          setButtonsCase(1);
        } else {
          setButtonsCase(2);
        }
      } else {
        //  Not a flash sale item
        setButtonsCase(3);
      }
    }
  };

  const isApproved = async () => {
    let tokenId = item.tokenId;

    let approvedAddress = await checkApproved(tokenId);
    let ownerAddress = constants.sale_owner_address;

    if (approvedAddress.toString() === ownerAddress.toString()) {
      setApproved(true);
    } else {
      setApproved(false);
    }
  };

  const approveFn = async () => {
    toggleApprovePopup(true);
    setActualCase(1);
    setDisableApprovePopup(true);

    let userAddress = await getUserAddress();

    let tokenId = item.tokenId;
    const response = await itemConnection.methods
      .approve(constants.sale_owner_address, tokenId)
      .send(
        { from: userAddress, gasPrice: 25000000000 },
        function (error, transactionHash) {
          if (transactionHash) {
            setActualCase(3);
          } else {
            setActualCase(2);
          }
        }
      )
      .on("receipt", async function (receipt) {
        setDisableApprovePopup(false);
        window.location.reload();
        setActualCase(5);
      })
      .on("error", async function (error) {
        setActualCase(4);
        setDisableApprovePopup(false);
      });
    console.log(response);
  };

  return (
    <div>
      {itemJson !== null && (
        <Card className={classes.card1} elevation={0}>
          {loading && (
            <div>
              <Loader />
            </div>
          )}
          {!loading && (
            <div>
              <div>
                <div className="d-flex justify-content-center mt-2">
                  <div className="d-flex justify-content-center align-items-center">
                    <h6 className={classes.levelText}>Level : </h6>
                    <div className={classes.levelWrapper}>
                      {itemJson.level ? itemJson.level : "0"}
                    </div>
                  </div>
                </div>
                <div className={classes.mediaWrapper1}>
                  <img
                    alt="item"
                    src={
                      itemJson.hashImage
                        ? `${imageBaseUrl}/${itemJson.hashImage}`
                        : itemJson.hashimage
                        ? `${imageBaseUrl}/${itemJson.hashimage}`
                        : `${imageBaseUrl}/${itemJson.image}`
                    }
                    className={classes.media}
                  />
                </div>
                <div>
                  <h4 className={classes.title1}>{itemJson.name}</h4>
                </div>
                <div className="d-flex justify-content-center">
                  <div className={classes.priceBadgeWrapper}>
                    <h6 style={{ color: "white", fontSize: 12 }}>
                      {" "}
                      <strong> Date : </strong>
                      <span className={classes.pricingText}>
                        {" "}
                        <Moment format="DD/MM/YYYY">{item.buyDate}</Moment>{" "}
                      </span>
                    </h6>
                  </div>
                </div>
                <div className="text-center mt-2">
                  {buttonsCase === 1 && (
                    <div>
                      {approved && (
                        <div>
                          <Button
                            variant="contained"
                            className={classes.sellButton}
                            onClick={() => toggleSellPopup(true)}
                          >
                            <span>Sell</span>
                          </Button>
                          <Button
                            variant="contained"
                            className={classes.bidButton}
                            onClick={() => toggleBidPopup(true)}
                          >
                            <span>Bid</span>
                          </Button>
                        </div>
                      )}

                      {!approved && (
                        <div>
                          <Button
                            variant="contained"
                            className={classes.bidButton}
                            onClick={approveFn}
                          >
                            <span>Approve</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  {buttonsCase === 2 && (
                    <Button
                      variant="contained"
                      className={classes.bidButton}
                      onClick={() => toggleBidPopup(true)}
                    >
                      <span>Bid</span>
                    </Button>
                  )}

                  {buttonsCase === 3 && (
                    <div>
                      <Button
                        variant="contained"
                        className={classes.sellButton}
                        onClick={() => toggleSellPopup(true)}
                      >
                        <span>Sell</span>
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.bidButton}
                        onClick={() => toggleBidPopup(true)}
                      >
                        <span>Bid</span>
                      </Button>
                    </div>
                  )}
                </div>
                <Dialog
                  for="sale"
                  className={classes.modal}
                  open={sellPopup}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => toggleSellPopup(false)}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  disableBackdropClick={disableSellPopup}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <div style={{ backgroundColor: "black" }}>
                    <div>
                      <SellModal
                        closePopup={() => toggleSellPopup(false)}
                        item={item}
                        setDisableSellPopup={setDisableSellPopup}
                      />
                    </div>
                  </div>
                </Dialog>
                <Dialog
                  for="bidding"
                  className={classes.modal}
                  open={bidPopup}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => toggleBidPopup(false)}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <div style={{ backgroundColor: "black" }}>
                    <div className={classes.bidPopupCard}>
                      <div>
                        <AccessAlarm
                          style={{ fontSize: 44, color: "yellow" }}
                        />
                      </div>
                      <h6
                        style={{ fontSize: 32, color: "white", marginTop: 10 }}
                      >
                        Coming Soon...
                      </h6>
                      <p
                        style={{
                          fontSize: 15,
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        Stay tuned! Bidding feature will be available very soon.
                      </p>
                    </div>
                  </div>
                </Dialog>
                <Dialog
                  for="approve"
                  className={classes.modal}
                  open={approvePopup}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => toggleApprovePopup(false)}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  disableBackdropClick={disableApprovePopup}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <div style={{ backgroundColor: "black" }}>
                    <div>
                      <div className={classes.background}>
                        <div className="container text-center">
                          <div className="d-flex justify-content-between">
                            <div className={classes.padding}>
                              <h5 className={classes.ModalTitle}>
                                Transaction Status
                              </h5>
                            </div>{" "}
                          </div>
                          <Divider style={{ backgroundColor: "grey" }} />
                        </div>
                        {actualCase === 1 && (
                          <div className="text-center my-3">
                            <div className="text-center">
                              <Loader />
                            </div>
                            <h5 className={classes.messageTitle}>
                              Waiting for confirmation!
                            </h5>
                          </div>
                        )}
                        {actualCase === 2 && (
                          <div className="text-center my-3">
                            <img
                              src="./images/failed.png"
                              height="100px"
                              alt="error"
                            />
                            <h5 className={classes.messageTitle}>
                              Transaction denied!
                            </h5>
                          </div>
                        )}
                        {actualCase === 3 && (
                          <div className="text-center my-3">
                            <div className="text-center">
                              <Loader />
                            </div>
                            <h5 className={classes.messageTitle}>
                              Transaction submitted, please wait...
                            </h5>
                          </div>
                        )}
                        {actualCase === 4 && (
                          <div className="text-center my-3">
                            <img
                              src="./images/failed.png"
                              height="100px"
                              alt="error"
                            />
                            <h5 className={classes.messageTitle}>
                              Transaction Failed!
                            </h5>
                          </div>
                        )}
                        {actualCase === 5 && (
                          <div className="my-3 d-flex flex-column justify-content-start">
                            <div className="text-center my-3">
                              <img
                                src="./images/success.png"
                                height="100px"
                                alt="success"
                              />
                            </div>
                            <h5 className={classes.messageTitle}>
                              Transaction Success!
                            </h5>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
ItemProfileCard.propTypes = {
  authenticateUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = { getItemDetails };

export default connect(mapStateToProps, mapDispatchToProps)(ItemProfileCard);
