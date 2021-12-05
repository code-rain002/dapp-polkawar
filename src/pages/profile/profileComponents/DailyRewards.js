import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Close } from "@material-ui/icons";
import { Button, IconButton } from "@material-ui/core";
import { checkPwarApproved } from "../../../actions/smartActions/SmartActions";
import pwarConnection from "../../../utils/pwrConnection";
import xpConnection from "../../../utils/xpConnection";
import constants from "../../../utils/constants";
import { getUserAddress } from "../../../actions/web3Actions";
import {
  getXpByOwner,
  updateXpOfOwner,
} from "../../../actions/characterActions";
import {
  postNewLog,
  getLogEnumActionEvents,
} from "./../../../actions/logActions";
import Loader from "../../../components/Loader";
import Timer from "../../../components/Timer";
import ClaimTimer from "../../../components/ClaimTimer";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    minHeight: "100%",
    background: `linear-gradient(0deg, rgba(114, 29, 158, 0.95), rgba(253,151, 80, 0.95) ),url("https://mir-s3-cdn-cf.behance.net/project_modules/disp/1f1fb3108866211.5fc73ca0439e6.gif")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: 10,
    border: "1px solid #ffffff",
    borderRadius: 14,
    [theme.breakpoints.down("md")]: {
      width: "fit-content",
      minHeight: 500,
      padding: 0,
      paddingLeft: 3,
      paddingRight: 3,
    },
  },

  title: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "white",
    fontWeight: 800,
    fontSize: 36,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
    },
  },
  subtitle: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "white",
    fontWeight: 500,
    fontSize: 18,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },

  para: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "#ffffff",
    fontWeight: 500,
    fontSize: 22,
    marginTop: 40,
    fontFamily: "Balsamiq Sans",
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },
  xp: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "#ffffff",
    fontWeight: 800,
    fontSize: 16,
    lineHeight: "15px",
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
  costPwar: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "#ffffff",
    fontWeight: 400,
    fontSize: 11,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("md")]: {
      fontSize: 10,
    },
  },
  day: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: "#ffffff",
    fontWeight: 500,
    fontSize: 11,
    fontFamily: "Balsamiq Sans",
    [theme.breakpoints.down("md")]: {
      fontSize: 11,
    },
  },

  rewardBlockWrapper: {
    width: 1200,
    marginTop: 20,

    [theme.breakpoints.down("md")]: {
      width: "fit-content",
    },
  },
  rewardCardClaimed: {
    width: 150,
    height: 175,
    border: "3px solid #81c784",
    borderRadius: 10,
    backgroundColor: `#68605A`,
    background: `linear-gradient(0deg, rgba(104,96,90, 0.95), rgba(40,40,40, 0.95) )`,
    padding: 10,
    marginBottom: 10,
    [theme.breakpoints.down("md")]: {
      width: 180,
      padding: 5,
      height: 170,
    },
  },
  rewardCardToday: {
    width: 150,
    height: 175,
    border: "5px solid yellow",
    borderRadius: 10,
    backgroundColor: `#68605A`,
    background: `linear-gradient(0deg, rgba(104,96,90, 0.95), rgba(40,40,40, 0.95) )`,
    padding: 10,
    marginBottom: 10,
    [theme.breakpoints.down("md")]: {
      width: 180,
      padding: 5,
      height: 170,
    },
  },
  rewardCardUnclaimed: {
    width: 150,
    height: 175,
    border: "1px solid #ffffff",
    borderRadius: 10,
    backgroundColor: `#68605A`,
    background: `linear-gradient(0deg, rgba(104,96,90, 0.95), rgba(40,40,40, 0.95) )`,
    padding: 10,
    marginBottom: 10,
    opacity: 0.5,
    [theme.breakpoints.down("md")]: {
      width: 180,
      padding: 5,
      height: 170,
    },
  },
  media: {
    height: 50,
    marginBottom: 10,
  },
  claimedImage: {
    textAlign: "center",
  },
  scroll: {
    height: 440,
    overflowY: "scroll",

    [theme.breakpoints.down("sm")]: {
      height: 340,
      overflowX: "hidden",
    },
  },
  showMeButton: {
    textTransform: "none",
    borderRadius: "50px",
    border: "1px solid white",
    color: "white",
    padding: "3px 10px 3px 10px",
    backgroundColor: "#9B1047",
    fontSize: 12,
  },
  approveButton: {
    textTransform: "none",
    borderRadius: "50px",
    border: "1px solid white",
    color: "white",
    padding: "3px 10px 3px 10px",
    background: `linear-gradient(to bottom,#7b1fa2, #6a1b9a)`,
    fontSize: 12,
  },
  icon: {
    fontSize: 18,
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
  },
  infoMessage: {
    fontSize: 14,
    color: "yellow",
    textAlign: "center",
  },
}));

function DailyRewards({
  character,
  togglePopup,
  getXpByOwner,
  updateXpOfOwner,
  freezePopup,
  setFreezePopup,
  postNewLog,
  getLogEnumActionEvents,
}) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [approved, setApproved] = useState(false);
  const [approveCase, setApproveCase] = useState(0);
  const [claimCase, setClaimCase] = useState(0);
  const [dayOfClaim, setDayOfClaim] = useState(0);
  const [enableTodayClaim, setEnableTodayClaim] = useState(false);
  const [nextClaimTime, setNextClaimTime] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(false);

  let xpContractAddress = constants.xp_owner_address;

  useEffect(() => {
    async function asyncFn() {
      await isApproved();
      let xpDetails = await getXpByOwner();

      if (xpDetails) {
        let nextClaimTime = parseInt(xpDetails.lastClaim) + 86400000;
        setNextClaimTime(nextClaimTime);
        if (nextClaimTime < Date.now()) {
          setEnableTodayClaim(true);
        } else {
          setEnableTodayClaim(false);
        }
        setDayOfClaim(xpDetails.claimNo);
      } else {
        setEnableTodayClaim(true);
        setDayOfClaim(0);
      }
      setLoading(false);
    }
    asyncFn();
  }, []);

  const isApproved = async () => {
    let allowance = await checkPwarApproved(xpContractAddress);

    if (parseInt(allowance) > 0) {
      setApproved(true);
    } else {
      setApproved(false);
    }
  };

  const approveFn = async () => {
    setFreezePopup(true);
    let userAddress = await getUserAddress();
    const response = await pwarConnection.methods
      .approve(xpContractAddress, "100000000000000000000000000")
      .send(
        { from: userAddress, gasPrice: 10000000000 },
        function (error, transactionHash) {
          if (transactionHash) {
            setApproveCase(1);
          } else {
            setApproveCase(2);
          }
        }
      )
      .on("receipt", async function (receipt) {
        setApproveCase(3);
        setFreezePopup(false);
        window.location.reload();
      })
      .on("error", async function (error) {
        setFreezePopup(false);
        setApproveCase(2);
      });
  };

  const claimXp = async (clickedIndex) => {
    setFreezePopup(true);
    setDisplayInfo(true);
    let events = await getLogEnumActionEvents();
    let txHash;

    let characterLevel = parseInt(character.level);

    let userAddress = await getUserAddress();
    let blockNo;
    const response = await xpConnection.methods
      .claimXP(characterLevel)
      .send(
        { from: userAddress, gasPrice: 10000000000 },
        async function (error, transactionHash) {
          if (transactionHash) {
            txHash = transactionHash;
            let logData = {
              owner: userAddress,
              status: "success",
              source: "frontend",
              transactionHash: txHash,
              action: events.claimxp,
              info: `1. Transaction submitted for claimxp of ${
                (clickedIndex + 1) * 10
              } XP.`,
            };

            await postNewLog(logData);
            setClaimCase(1);
          } else {
            setClaimCase(2);
          }
        }
      )
      .on("receipt", async function (receipt) {
        blockNo = receipt.blockNumber;

        let logData = {
          owner: userAddress,
          status: "success",
          source: "frontend",
          transactionHash: txHash,
          action: events.claimxp,
          info: `2. Transaction successful for claimxp of ${
            (clickedIndex + 1) * 10
          } XP.`,
        };

        await postNewLog(logData);

        let backendResponse = await updateXpOfOwner(blockNo);
        if (backendResponse) {
          let logData = {
            owner: userAddress,
            status: "success",
            source: "frontend",
            transactionHash: txHash,
            action: events.claimxp,
            info: `3. MongoDB updated for claimxp of ${
              (clickedIndex + 1) * 10
            } XP, current level: ${characterLevel}.`,
          };

          await postNewLog(logData);
          setClaimCase(3);
          setFreezePopup(false);
          window.location.reload();
        } else {
          let logData = {
            owner: userAddress,
            status: "failed",
            source: "frontend",
            transactionHash: txHash,
            action: events.claimxp,
            info: `3. MongoDB failed to update for claimxp of ${
              (clickedIndex + 1) * 10
            } XP.`,
          };

          await postNewLog(logData);
          setFreezePopup(false);
          setClaimCase(4);
        }
      })
      .on("error", async function (error) {
        let logData = {
          owner: userAddress,
          status: "failed",
          source: "frontend",
          transactionHash: txHash,
          action: events.claimxp,
          info: `4. Transaction at metamask is failed for claimxp of ${
            (clickedIndex + 1) * 10
          } XP.`,
        };

        await postNewLog(logData);
        setFreezePopup(false);
        setClaimCase(2);
      });
  };
  return (
    <div>
      {loading && (
        <div className={classes.card}>
          <div className="text-center">
            <Loader />
          </div>
        </div>
      )}
      {!loading && (
        <div className={classes.card}>
          <div>
            <div className="d-flex justify-content-end">
              <IconButton onClick={freezePopup ? null : togglePopup}>
                <Close className={classes.icon} />
              </IconButton>
            </div>
            <div className="d-flex justify-content-center">
              <div>
                <h5 className={classes.title}>Claim XP</h5>
                <div className={classes.subtitle}>
                  Build your character and get ready for the battle
                </div>
                {displayInfo && (
                  <div className={classes.infoMessage}>
                    Please don't close the window, you may loose XP.
                  </div>
                )}
              </div>
            </div>
          </div>{" "}
          <div className="d-flex justify-content-center">
            <div className={classes.rewardBlockWrapper}>
              <div className={classes.scroll}>
                <div className="row g-0">
                  {Array.from(Array(60)).map((element, index) => {
                    return (
                      <div
                        className="col-md-4"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {!approved && (
                          <div className={classes.rewardCardClaimed}>
                            <div className="text-center">
                              <img
                                src="./images/xp.png"
                                className={classes.media}
                              />
                            </div>
                            <div>
                              <h6 className={classes.xp}>
                                {10 * (index + 1)} XP
                                <br />{" "}
                                <small className={classes.costPwar}>
                                  ({10 * (index + 1)} PWAR)
                                </small>
                              </h6>
                            </div>
                            <div>
                              <h6 className={classes.day}>Day {index + 1}</h6>
                            </div>
                            <div className="text-center">
                              {approveCase === 0 && (
                                <Button
                                  variant="contained"
                                  className={classes.approveButton}
                                  onClick={approveFn}
                                >
                                  {" "}
                                  Approve
                                </Button>
                              )}
                              {approveCase === 1 && (
                                <div className="text-center">
                                  <img
                                    src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-27.jpg"
                                    height="25px"
                                    alt="loader"
                                  />
                                </div>
                              )}
                              {approveCase === 2 && (
                                <small
                                  className={classes.costPwar}
                                  style={{ color: "red" }}
                                >
                                  Failed
                                </small>
                              )}

                              {approveCase === 3 && (
                                <small
                                  className={classes.costPwar}
                                  style={{ color: "green" }}
                                >
                                  Approved
                                </small>
                              )}
                            </div>
                          </div>
                        )}
                        <div>
                          {approved && (
                            <div>
                              {index < dayOfClaim && (
                                <div className={classes.rewardCardClaimed}>
                                  <div className="text-center">
                                    <img
                                      src="./images/xp.png"
                                      className={classes.media}
                                    />
                                  </div>
                                  <div>
                                    <h6 className={classes.xp}>
                                      {10 * (index + 1)} XP
                                      <br />{" "}
                                      <small className={classes.costPwar}>
                                        ({10 * (index + 1)} PWAR)
                                      </small>
                                    </h6>
                                  </div>
                                  <div>
                                    <h6 className={classes.day}>
                                      Day {index + 1}
                                    </h6>
                                  </div>
                                  <div
                                    className="text-center"
                                    style={{ color: "#81c784", fontSize: 16 }}
                                  >
                                    Claimed
                                  </div>
                                </div>
                              )}
                              {index === dayOfClaim && (
                                <div className={classes.rewardCardToday}>
                                  <div className="text-center">
                                    <img
                                      src="./images/xp.png"
                                      className={classes.media}
                                    />
                                  </div>
                                  <div>
                                    <h6 className={classes.xp}>
                                      {10 * (index + 1)} XP <br />{" "}
                                      <small className={classes.costPwar}>
                                        ({10 * (index + 1)} PWAR)
                                      </small>
                                    </h6>
                                  </div>
                                  <div>
                                    <h6 className={classes.day}>
                                      Day {index + 1}
                                    </h6>
                                  </div>
                                  <div className="text-center">
                                    {claimCase === 0 && (
                                      <div>
                                        {!enableTodayClaim && (
                                          <div>
                                            <ClaimTimer
                                              endTime={nextClaimTime}
                                            />
                                          </div>
                                        )}
                                        {enableTodayClaim && (
                                          <Button
                                            variant="contained"
                                            className={classes.showMeButton}
                                            onClick={() => claimXp(index)}
                                          >
                                            {" "}
                                            Claim
                                          </Button>
                                        )}
                                      </div>
                                    )}
                                    {claimCase === 1 && (
                                      <div className="text-center">
                                        <img
                                          src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-27.jpg"
                                          height="25px"
                                          alt="loader"
                                        />
                                      </div>
                                    )}
                                    {claimCase === 2 && (
                                      <small
                                        className={classes.costPwar}
                                        style={{ color: "red" }}
                                      >
                                        Failed
                                      </small>
                                    )}

                                    {claimCase === 3 && (
                                      <small
                                        className={classes.costPwar}
                                        style={{ color: "green" }}
                                      >
                                        Claimed
                                      </small>
                                    )}
                                  </div>
                                </div>
                              )}
                              {index > dayOfClaim && (
                                <div className={classes.rewardCardUnclaimed}>
                                  <div className="text-center">
                                    <img
                                      src="./images/xp.png"
                                      className={classes.media}
                                    />
                                  </div>
                                  <div>
                                    <h6 className={classes.xp}>
                                      {10 * (index + 1)} XP <br />{" "}
                                      <small className={classes.costPwar}>
                                        ({10 * (index + 1)} PWAR)
                                      </small>
                                    </h6>
                                  </div>
                                  <div>
                                    <h6 className={classes.day}>
                                      Day {index + 1}
                                    </h6>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = {
  getXpByOwner,
  updateXpOfOwner,
  postNewLog,
  getLogEnumActionEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyRewards);
