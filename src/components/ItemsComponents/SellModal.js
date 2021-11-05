import { useState } from "react";
import { Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { HomeWork, Store } from "@material-ui/icons";
import { updateUserItemOwner } from "../../actions/itemActions";
import { connect } from "react-redux";
import saleContract from "../../utils/saleConnection";
import { getUserAddress } from "./../../actions/web3Actions";
import Loader from "../Loader";
import Moment from "react-moment";
import constants from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100%",
    width: 500,
    backgroundColor: "white",
    borderRadius: 10,
    paddingBottom: 20,
    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  padding: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  buttonSystem: {
    background: `linear-gradient(to right,#6F2F9B, #8D37A9)`,
    borderRadius: "50px",
    lineHeight: "24px",
    fontFamily: "Balsamiq Sans",
    fontWeight: 400,
    verticalAlign: "baseline",
    letterSpacing: "0px",
    margin: 0,
    color: "#ffffff",
    padding: "12px 20px 12px 20px",
    fontSize: 18,
    textTransform: "none",
  },
  buttonMarketplace: {
    borderRadius: "50px",
    background: `linear-gradient(to right,#AF2C59, #C43262)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "0px",
    margin: 0,
    fontFamily: "Balsamiq Sans",
    fontWeight: 400,
    color: "#ffffff",
    padding: "12px 20px 12px 20px",
    fontSize: 18,
    textTransform: "none",
  },

  highlight: {
    color: theme.palette.pbr.primary,
    paddingLeft: 5,
  },

  icon: {
    fontSize: 16,
    marginRight: 7,
    color: "#ffffff",
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
  },
  title: {
    fontWeight: 400,
    verticalAlign: "baseline",
    letterSpacing: "-0.8px",
    margin: 0,
    paddingBottom: 10,
    textAlign: "left",
    color: "black",
    fontSize: 22,
  },
  subtitle: {
    fontWeight: 400,
    verticalAlign: "baseline",
    letterSpacing: "-0.8px",
    margin: 0,
    paddingTop: 10,
    paddingBottom: 5,
    textAlign: "left",
    color: " #757575",

    fontSize: 14,
  },
  para: {
    marginTop: 10,
    padding: 10,
    fontWeight: 400,
    verticalAlign: "baseline",
    letterSpacing: "-0.4px",
    lineHeight: "34px",
    margin: 0,
    fontFamily: "Balsamiq Sans",
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    color: "black",
    fontSize: 18,
  },
}));
function SellModal({ item, updateUserItemOwner, setDisableSellPopup }) {
  const classes = useStyles();
  const [actualCase, setActualCase] = useState(0);
  const [marketPlaceMessage, setMarketPlaceMessage] = useState(false);
  const [resellStarted, setResellStarted] = useState(true);
  const [resellEnded, setResellEnded] = useState(false);

  let resaleStartTime = process.env.REACT_APP_START_RESELL;
  let resaleEndTime = process.env.REACT_APP_END_RESELL;

  const resellToSystem = async () => {
    let startStatus = checkResellTime();
    let endedStatus = checkResellEndedTime();

    if (startStatus && !endedStatus) {
      setActualCase(5);
    }
    if (endedStatus) {
      setResellEnded(true);
    } else {
      setResellEnded(false);
    }
    if (!startStatus) {
      setResellStarted(false);
    }
  };

  const confirmResell = async () => {
    //Calling Smart Contract
    setDisableSellPopup(true);
    setActualCase(1);
    setResellStarted(true);

    let userAddress = await getUserAddress();
    const response = await saleContract.methods
      .resellItemForSystem()
      .send(
        { from: userAddress, gasPrice: 25000000000 },
        function (error, transactionHash) {
          if (transactionHash) {
            setActualCase(2);
          } else {
            //console.log('Rejected by user!');
            setActualCase(1);
          }
        }
      )
      .on("receipt", async function (receipt) {
        //Now time to update owner details
        console.log("receipt:" + receipt);
        let response = await updateUserItemOwner(item._id);
        console.log(response);
        setActualCase(4);
        setDisableSellPopup(false);

        window.location.reload();
      })
      .on("error", async function (error) {
        setActualCase(3);
        setDisableSellPopup(false);
        //window.location.reload();

        console.log(error);
      });
    console.log(response);
  };

  const sellOnMarketPlace = () => {
    setMarketPlaceMessage(!marketPlaceMessage);
  };
  const checkResellTime = () => {
    //PUT Resell start date time
    const difference = +new Date(resaleStartTime) - +new Date();
    if (difference > 0) {
      return false;
    } else {
      return true;
    }
  };
  const checkResellEndedTime = () => {
    //PUT Resell start date time
    const difference = +new Date(resaleEndTime) - +new Date();
    if (difference > 0) {
      return false;
    } else {
      return true;
    }
  };

  const isToday = (date) => {
    // Create date from input value
    var inputDate = new Date(date);

    // Get today's date
    var todaysDate = new Date();

    // call setHours to take the time out of the comparison
    if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className={classes.background}>
      <div className="container text-center">
        <div className="d-flex justify-content-between">
          <div className={classes.padding}>
            <h5 className={classes.title}>Sell Your NFT</h5>
          </div>{" "}
        </div>
        <Divider style={{ backgroundColor: "grey" }} />

        <div className="my-5">
          {actualCase === 0 && (
            <div className="my-3 d-flex flex-column justify-content-start">
              <div style={{ paddingBottom: 20 }}>
                <Button
                  variant="contained"
                  className={classes.buttonMarketplace}
                  onClick={sellOnMarketPlace}
                >
                  <Store style={{ marginRight: 10 }} />
                  Sell on Marketplace
                </Button>
                {marketPlaceMessage && (
                  <div>
                    <h6
                      style={{
                        paddingTop: 5,
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      {" "}
                      Coming soon...
                    </h6>
                  </div>
                )}
              </div>
              <div>
                {item !== null && item !== undefined && (
                  <div>
                    {item.event === "flashsale" && isToday(item.buyDate) && (
                      <Button
                        variant="contained"
                        className={classes.buttonSystem}
                        onClick={resellToSystem}
                      >
                        <HomeWork style={{ marginRight: 10 }} />
                        Resell to the system
                      </Button>
                    )}
                  </div>
                )}
                {!resellStarted && (
                  <div>
                    <h6
                      style={{
                        paddingTop: 7,
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      {" "}
                      Resell will start at{" "}
                      <Moment format="DD-MM-YYYY HH:mm">
                        {process.env.REACT_APP_START_RESELL}
                      </Moment>{" "}
                    </h6>
                  </div>
                )}
                {resellEnded && (
                  <div>
                    <h6
                      style={{
                        paddingTop: 5,
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      {" "}
                      Resell time ended...
                    </h6>
                  </div>
                )}
              </div>
            </div>
          )}
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
              <div className="text-center">
                <Loader />
              </div>
              <h5 className={classes.messageTitle}>
                Transaction submitted, please wait...
              </h5>
              <p style={{ textAlign: "center", paddingTop: 10, color: "red" }}>
                * Do not reload otherwise you will lose.
              </p>
            </div>
          )}
          {actualCase === 3 && (
            <div className="text-center my-3">
              <img src="./images/failed.png" height="100px" alt="error" />
              <h5 className={classes.messageTitle}>Transaction Failed</h5>
            </div>
          )}
          {actualCase === 4 && (
            <div className="my-3 d-flex flex-column justify-content-start">
              <div className="text-center my-3">
                <img src="./images/success.png" height="100px" alt="success" />
              </div>
              <h5 className={classes.messageTitle}>Transaction Success</h5>
            </div>
          )}
          {actualCase === 5 && (
            <div className="my-3 d-flex flex-column justify-content-start">
              <h5 className={classes.messageTitle}> Please confirm </h5>
              <p className={classes.para}>
                If you resell to the system, you will get {constants.resellBNB}{" "}
                BNB and your NFT item will be lost. And you will not receive
                reward of{" "}
                <span style={{ color: "#6F2F9B", fontWeight: "600" }}>
                  {constants.rewardsPWAR} PWAR
                </span>{" "}
                on {constants.rewardDate}.
              </p>
              <div className="mt-3">
                <Button
                  variant="contained"
                  className={classes.buttonSystem}
                  onClick={confirmResell}
                >
                  Yes, Resell please
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = { updateUserItemOwner };

export default connect(mapStateToProps, mapDispatchToProps)(SellModal);
