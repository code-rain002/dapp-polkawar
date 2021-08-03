import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Slide, Avatar, Dialog, Backdrop } from "@material-ui/core";
import Loader from "../../components/Loader";
import Timer from "../../components/Timer";
import { getBidItem } from "./../../actions/bidActions";
import {
  isUserBid,
  isUserClaimed,
} from "./../../actions/smartActions/SmartActions";
import BidForm from "../../components/BidComponents/BidForm";
import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";
import { addUserItem } from "./../../actions/itemActions";
import bidContract from "./../../utils/bidConnection";
import imageBaseUrl from "./../../actions/imageBaseUrl";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  sectionCard: {
    background: `linear-gradient(0deg, rgba(26, 35, 126, 0.31), rgba(28,22, 86, 0.1))`,
    padding: 30,
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 10,
    [theme.breakpoints.down("md")]: {
      margin: 0,
      marginTop: 10,
      borderRadius: 0,
      padding: 0,
    },
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  image: {
    width: "80%",
    filter: `drop-shadow(0 0 0.9rem #1a237e)`,
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  section2: {
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
    borderLeft: "1px solid #bdbdbd",
    paddingLeft: 20,
    [theme.breakpoints.down("md")]: {
      borderLeft: "none",
      paddingLeft: 0,
    },
  },
  avatar: {
    color: "orange",
    backgroundColor: "orange",
    borderRadius: "50%",
    border: "1px solid white",
  },
  bidCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: "1px solid #616161",
  },
  bidAmount: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 300,
    letterSpacing: 0.5,
    fontSize: 14,
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },
  time: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: theme.palette.pbr.textSecondary,
    fontWeight: 300,
    letterSpacing: 0.5,
    fontSize: 12,
    [theme.breakpoints.down("md")]: {
      fontSize: 10,
    },
  },
  bidButton: {
    textAlign: "center",
    background: `linear-gradient(to right,#AF2C59, #C43262)`,
    padding: "8px 16px 8px 16px",
    marginRight: 10,
    borderRadius: 50,
    color: "white",
    fontSize: 14,
    fontWeight: 500,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "4px 8px 4px 8px",
      fontSize: 12,
    },
  },

  newbidButton: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,yellow, orange)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    marginTop: 5,
    marginLeft: 10,
    color: "black",
    padding: "18px 50px 18px 50px",
    fontWeight: 400,
    fontSize: 20,
    textTransform: "none",
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },
  cancelbidButton: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,#ffffff, #fffde7)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    marginTop: 5,
    marginLeft: 10,
    color: "black",
    padding: "18px 50px 18px 50px",
    fontWeight: 400,
    fontSize: 20,
    textTransform: "none",
    textDecoration: "none",

    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },
  auctionWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",

    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "space-between",
    },
  },
  title: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 32,
    lineHeight: "40.7px",
    [theme.breakpoints.down("md")]: {
      fontSize: 32,
    },
  },
  statusBoxHeading: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: theme.palette.pbr.textSecondary,
    fontWeight: 500,
    fontSize: 16,
    maxWidth: 500,
    [theme.breakpoints.down("md")]: {
      paddingTop: 5,
      fontSize: 14,
    },
  },
  price: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: "#b39ddb",
    fontWeight: 300,
    fontSize: 16,
  },
  description: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: theme.palette.pbr.textSecondary,
    fontWeight: 500,
    fontSize: 16,

    maxWidth: 500,
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },

  timeline: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 22,
    lineHeight: "30.7px",
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
    },
  },
  noBidText: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 22,
    lineHeight: "50.7px",
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
      lineHeight: "40.7px",
    },
  },
  level: {
    height: "45px",
    [theme.breakpoints.down("md")]: {
      height: "30px",
    },
  },
  scrollDiv: {
    overflowY: "scroll",

    maxHeight: 200,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    outline: "none",
  },

  claimButton: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom, #43a047,#1b5e20)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    color: "white",
    padding: "18px 50px 18px 50px",
    fontWeight: 400,
    fontSize: 20,
    textTransform: "none",
    textDecoration: "none",

    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },
  congratsText: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "#e5e5e5",
    fontWeight: 500,
    fontSize: 16,

    [theme.breakpoints.down("md")]: {
      paddingTop: 5,
      fontSize: 14,
    },
  },
  profileButton: {
    textAlign: "center",
    background: `linear-gradient(to bottom,#ffffff, yellow)`,
    padding: "12px 16px 12px 16px",
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
    fontSize: 28,
    [theme.breakpoints.down("md")]: {
      fontSize: 24,
    },
  },
  thanksText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    width: 500,
    [theme.breakpoints.down("md")]: {
      fontSize: 15,
      fontWeight: 400,
      width: "100%",
    },
  },
}));

function BidDetails({ getBidItem, item, addUserItem }) {
  const classes = useStyles();

  const [timerStatus, setTimerStatus] = useState(0);
  const [userBidStatus, setUserBidStatus] = useState(0);
  const [myHighBid, setMyHighBid] = useState(null);
  const [bidCount, setBidCount] = useState(0);
  const [bidPopup, setBidPopup] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);

  const [claimCase, setClaimCase] = useState(0);
  const [stopPopupClick, setStopPopupClick] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    callBidItemAPI();
  }, []);

  useEffect(() => {
    if (item !== null) {
      setBidCount(item.bidhistory.length);
      myBidStatus();
      updateBidTimerStatus();
      callIsBid();
      checkIsClaimed();
    }
  }, [item]);

  const callBidItemAPI = async () => {
    await getBidItem(id);
  };
  const callIsBid = async () => {
    // 1. Getting user account
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let userAddress = accounts[0];
    let isUserBidded = await isUserBid(userAddress, item.itemId);

    if (isUserBidded) {
      setUserBidStatus(1);
    } else {
      setUserBidStatus(0);
    }
  };

  const myBidStatus = async () => {
    // 1. Getting user account
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let userAddress = accounts[0];
    let myBids = item.bidhistory
      .slice(0)
      .reverse()
      .filter((obj) => {
        return obj.address === userAddress;
      });

    setMyHighBid(myBids[0]);
    return myBids[0];
  };

  const updateBidTimerStatus = () => {
    const differenceStart = +new Date(item.time_start) - +new Date();
    const differenceEnd = +new Date(item.time_end) - +new Date();

    if (differenceEnd <= 0) {
      setTimerStatus(1);

      checkIsWinner();
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
  const checkIsWinner = async () => {
    // 1. Getting user account
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let userAddress = accounts[0];

    //2. Getting last bid user address
    let bidHistoryLength = item.bidhistory.length;

    if (bidHistoryLength > 0) {
      let bidWinner = item.bidhistory[bidHistoryLength - 1];

      if (bidWinner.address === userAddress) {
        setIsWinner(true);
      } else {
        setIsWinner(false);
      }
    }
  };
  const checkIsClaimed = async () => {
    // 1. Calling Smart Action to check isClaimed
    let claimed = await isUserClaimed(item.itemId);

    if (claimed) {
      setIsClaimed(true);
    } else {
      setIsClaimed(false);
    }
  };
  const claimFn = async () => {
    setClaimCase(1);

    // 1. Getting user account
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let userAddress = accounts[0];

    let response = await bidContract.methods
      .claim(item.itemId)
      .send(
        { from: userAddress, gasPrice: 25000000000 },
        function (error, transactionHash) {
          console.log("purchaseItem Called");
          setStopPopupClick(true);
          if (transactionHash) {
            setClaimCase(3);
          } else {
            console.log("Rejected by user!");
            setClaimCase(2);
          }
        }
      )
      .on("receipt", async function (receipt) {
        console.log("4. Claim Success");
        console.log(receipt);

        //2. Getting UTC Time
        const utcDateTimestamp = new Date();
        let utcDate = utcDateTimestamp.toUTCString();

        //3. Getting Events data
        let events = receipt.events;
        let returnValues = events._claim.returnValues;
        let nftTokenId = returnValues._tokenid;

        //4. Getting Highest Bid
        let highestBidUser = item.current_price;

        //5. Getting program ID
        let programId =
          item.itemId !== undefined && item.itemId !== null ? item.itemId : "0";
        let userItemData = {
          token_id: nftTokenId,
          p_id: programId,
          token_type: 2,
          event: "auction",
          owner: userAddress,
          buydate: utcDate,
          price: highestBidUser,
        };
        let response = await addUserItem(userItemData);
        console.log(response);

        if (response) {
          setClaimCase(5);
          window.location.reload();
        } else {
          setClaimCase(6);
        }
        setClaimCase(5);
      })
      .on("error", async function (error) {
        setClaimCase(4);
      });

    console.log(response);
  };
  return (
    <div className={classes.sectionCard}>
      {item === null && (
        <div className="text-center">
          <Loader />
        </div>
      )}
      {item !== null && item !== undefined && (
        <div>
          <div className="row g-0 mt-2">
            <div className="col-12 col-md-6">
              <div className={classes.imageWrapper}>
                <img
                  src={
                    item.itemId === "0"
                      ? `https://cloudflare-ipfs.com/ipfs/Qmcr4GGFEU26zRGWtTZhbncRLitaVgaLqVuypvPT52Qep1`
                      : `${imageBaseUrl}/${item.image}`
                  }
                  className={classes.image}
                  alt="mysterybox"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 p-3">
              <div className={classes.section2}>
                <div>
                  <h5 className={classes.title}>{item.name}</h5>
                </div>
                <p className={classes.description}>{item.description}</p>{" "}
                <h6 className={classes.price}>
                  <span style={{ color: "#bdbdbd", paddingRight: 5 }}>
                    Starting Bid Price:{" "}
                  </span>
                  {item.start_price} {item.currency}
                </h6>
                <div className="mt-5">
                  <h6 className={classes.timeline}>Bids Timeline </h6>
                  <hr style={{ color: "yellow" }} />
                  <div className={classes.scrollDiv}>
                    {item.bidhistory.length === 0 && (
                      <div className={classes.noBidText}>No bid yet</div>
                    )}
                    {item.bidhistory
                      .slice(0)
                      .reverse()
                      .map((row, index) => {
                        return (
                          <div key={index}>
                            {" "}
                            <div className={classes.bidCard}>
                              <div className="d-flex justify-content-start">
                                <div style={{ paddingRight: 15 }}>
                                  <Avatar
                                    alt="Tahir Ahmad"
                                    className={classes.avatar}
                                    src="https://cdn0.iconfinder.com/data/icons/game-elements-3/64/mage-avatar-mystery-user-magician-512.png"
                                  />
                                </div>
                                <div>
                                  <a
                                    href={`https://bscscan.com/address/${row.address}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <h6 className={classes.bidAmount}>
                                      {row.price} BNB
                                      <span style={{ color: "#bdbdbd" }}>
                                        {" "}
                                        by
                                      </span>{" "}
                                      {[...row.address].splice(0, 10)} {"..."}
                                      {[...row.address].splice(
                                        [...row.address].length - 5,
                                        5
                                      )}
                                    </h6>
                                  </a>
                                  <h6 className={classes.time}>
                                    <Moment fromNow>{row.time}</Moment>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div>
                  <hr style={{ color: "yellow" }} />
                  <div className={classes.auctionWrapper}>
                    {bidCount === 0 && (
                      <div for="noBid">
                        <p className={classes.statusBoxHeading}>
                          Initial Bid Price
                        </p>{" "}
                        <div className="d-flex justify-content-start">
                          <div style={{ paddingRight: 15 }}>
                            <Avatar
                              alt="Avatar"
                              className={classes.avatar}
                              src="/token.png"
                            />
                          </div>
                          <div>
                            <h6 className={classes.bidAmount}>
                              {item.current_price} BNB
                            </h6>
                            <h6 className={classes.time}>No bid yet</h6>
                          </div>
                        </div>
                      </div>
                    )}
                    {bidCount !== 0 && (
                      <div for="highestBid">
                        <p className={classes.statusBoxHeading}>
                          Highest Bid Price
                        </p>{" "}
                        <div className="d-flex justify-content-start">
                          <div style={{ paddingRight: 15 }}>
                            <Avatar
                              alt="Avatar"
                              className={classes.avatar}
                              src="https://cdn0.iconfinder.com/data/icons/game-elements-3/64/mage-avatar-mystery-user-magician-512.png"
                            />
                          </div>
                          <div>
                            <h6 className={classes.bidAmount}>
                              {item.current_price} BNB
                            </h6>
                            <h6 className={classes.time}>
                              <Moment fromNow>{item.last_update}</Moment>
                            </h6>
                          </div>
                        </div>
                      </div>
                    )}

                    {userBidStatus === 1 && (
                      <div>
                        {myHighBid !== null && myHighBid !== undefined && (
                          <div for="bidStatus">
                            <p className={classes.statusBoxHeading}>
                              Your bid status
                              <span>
                                {myHighBid.price === item.current_price ? (
                                  <span
                                    style={{ color: "green", paddingLeft: 5 }}
                                  >
                                    (Approved)
                                  </span>
                                ) : (
                                  <span
                                    style={{ color: "red", paddingLeft: 5 }}
                                  >
                                    (Cancelled)
                                  </span>
                                )}
                              </span>
                            </p>{" "}
                            <div className="d-flex justify-content-start">
                              <div style={{ paddingRight: 15 }}>
                                <Avatar
                                  alt="Avatar"
                                  className={classes.avatar}
                                  src="https://cdn0.iconfinder.com/data/icons/game-elements-3/64/mage-avatar-mystery-user-magician-512.png"
                                />
                              </div>
                              <div>
                                <h6 className={classes.bidAmount}>
                                  {myHighBid.price} BNB
                                </h6>
                                <h6 className={classes.time}>
                                  <Moment fromNow>{myHighBid.time}</Moment>
                                </h6>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <div for="auction">
                      <p className={classes.statusBoxHeading}>
                        {timerStatus === 4 && "Auction ends in"}
                        {timerStatus === 3 && "Auction starts in"}

                        {timerStatus === 1 && "Auction Status"}
                        {timerStatus === 0 && "Auction Status"}
                      </p>{" "}
                      <div className="d-flex justify-content-start">
                        {timerStatus === 4 && <Timer endTime={item.time_end} />}
                        {timerStatus === 3 && (
                          <Timer endTime={item.time_start} />
                        )}

                        {timerStatus === 1 && <Timer endTime={item.time_end} />}
                        {timerStatus === 0 && "checking..."}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <hr
                      style={{
                        width: 300,
                        backgroundColor: "#616161",
                        height: 1,
                      }}
                    />
                  </div>

                  {timerStatus === 4 && (
                    <div className="text-center mt-3">
                      {userBidStatus === 0 && (
                        <Button
                          variant="contained"
                          className={classes.newbidButton}
                          onClick={() => setBidPopup(true)}
                        >
                          <span>Place Bid</span>
                        </Button>
                      )}
                      {userBidStatus === 1 && (
                        <Button
                          variant="contained"
                          className={classes.cancelbidButton}
                          onClick={() => setBidPopup(true)}
                        >
                          <span>Place a new Bid</span>
                        </Button>
                      )}
                    </div>
                  )}
                  {isWinner && (
                    <div className="text-center mt-3">
                      <h6 className={classes.congratsText}>
                        Congratulations, You are the winner.
                      </h6>

                      {isClaimed && (
                        <div>
                          <div className="mt-5 pb-5">
                            <h2 className={classes.thanksHeading}>
                              Thanks for Participating!
                            </h2>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <p className={classes.thanksText}>
                                Now you can visit to your profile section
                                <br /> and access your winning mystery box.
                              </p>
                            </div>
                            <Link to="/profile">
                              <div className="text-center">
                                <Button
                                  variant="contained"
                                  className={classes.profileButton}
                                >
                                  <span>Go To Profile</span>
                                </Button>
                              </div>
                            </Link>
                          </div>
                        </div>
                      )}
                      {!isClaimed && (
                        <div>
                          {(claimCase === 0 ||
                            claimCase === 2 ||
                            claimCase === 4) && (
                            <div>
                              <Button
                                variant="contained"
                                className={classes.claimButton}
                                onClick={claimFn}
                              >
                                <span>Claim Rewards</span>
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                      {(claimCase === 1 || claimCase === 3) && (
                        <div>
                          <Loader />
                        </div>
                      )}

                      {claimCase === 2 && (
                        <div>
                          <h6 className={classes.congratsText}>
                            <span style={{ color: "#f44336" }}>
                              Claim Cancelled!
                            </span>
                          </h6>
                        </div>
                      )}
                      {claimCase === 4 && (
                        <div>
                          <h6 className={classes.congratsText}>
                            <span style={{ color: "#f44336" }}>
                              Claim Failed!
                            </span>
                          </h6>
                        </div>
                      )}
                      {claimCase === 5 && (
                        <div>
                          <h6 className={classes.congratsText}>
                            <span style={{ color: "#4caf50" }}>
                              Successfully Claimed!
                            </span>
                          </h6>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Dialog
            className={classes.modal}
            open={bidPopup}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setBidPopup(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            disableBackdropClick={stopPopupClick}
            BackdropProps={{
              timeout: 1000,
            }}
          >
            <div style={{ backgroundColor: "black" }}>
              <BidForm item={item} setStopPopupClick={setStopPopupClick} />
            </div>
          </Dialog>
        </div>
      )}{" "}
    </div>
  );
}

BidDetails.propTypes = {
  getBidItem: propTypes.func.isRequired,
  addUserItem: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.bids.item,
});

const mapDispatchToProps = { getBidItem, addUserItem };

export default connect(mapStateToProps, mapDispatchToProps)(BidDetails);
