import { useState, useEffect } from "react";
import { Button, Divider, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createNewBid } from "../../actions/bidActions";
import Loader from "../Loader";
import { connect } from "react-redux";
import axios from "axios";
import baseUrl from "../../actions/baseUrl";
import bidContract from "../../utils/bidConnection";
import { Refresh } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 500,
    height: 350,

    border: "1px solid #1a237e",
    borderRadius: 14,
    padding: "25px 10px 25px 10px",
    backgroundColor: "white",
    [theme.breakpoints.down("md")]: {
      width: 350,
      padding: "5px 2px 5px 2px",
    },
  },
  title: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: "black",
    fontWeight: 600,
    letterSpacing: 0.9,
    fontSize: 22,
    lineHeight: "50px",
  },
  label: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: "#8D37A9",
    fontWeight: 600,
    letterSpacing: 0.5,
    fontSize: 18,
    fontFamily: "Balsamiq Sans",
  },
  menuItem: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: "black",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 14,
  },
  icon: {
    color: "black",
  },
  iconWrapper: {
    border: "1px solid #e5e5e5",
    borderRadius: "50%",
  },
  buttonProceed: {
    color: "white",
    marginTop: 20,
    backgroundColor: "white",
    textTransform: "none",
    borderRadius: "100px",
    padding: "12px 16px 12px 16px",
    fontWeight: 500,
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    fontSize: 16,
  },

  textField: {
    color: "white",
    border: "1px solid #ffffff",
    textAlign: "left",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: 400,
    paddingRight: 10,
  },
  submitButton: {
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
  reloadButton: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,#6F2F9B, #8D37A9)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    marginTop: 5,
    marginLeft: 10,
    color: "#eeeeee",
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
  dialogText: {
    textAlign: "center",
    color: "red",
    fontFamily: "Balsamiq Sans",
    fontSize: 14,
  },
  dialogImage: {
    height: 150,
    paddingTop: 20,
    paddingBottom: 20,
  },
}));

function BidForm({ item, createNewBid, setStopPopupClick }) {
  const classes = useStyles();
  const [actualCase, setActualCase] = useState(0);
  const [bidAmount, setBidAmount] = useState("0");
  const [boxId, setBoxId] = useState(0);
  const [error, setError] = useState("");

  let mysteryBoxJsonList = ["Qma5vpAbdmiPj8aCkNbMEGppH9qNDk1uRR9HT3VrK1NEzi"];

  useEffect(() => {
    console.log(item);
    if (item !== null) {
      console.log("Null nahin hai");
      setBoxId(item.itemId);
      setActualCase(0);
    } else {
      setActualCase(-1);

      console.log("Null  hai");
    }
  }, []);

  const bidConditionCheck = () => {
    let highestBid = item.current_price;
    let currentBid = bidAmount;
    console.log(item.current_price);
    console.log(parseFloat(currentBid) > parseFloat(highestBid));
    if (parseFloat(currentBid) > parseFloat(highestBid)) {
      return true;
    } else {
      return false;
    }
  };

  const signTransaction = (nfthash, userAddress) => {
    let url = `${baseUrl}/flashsale-sign`;
    console.log(url);
    let body = {
      nft: nfthash,
      address: userAddress,
    };
    let data = axios
      .post(url, body)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
    return data;
  };

  const submitForm = async () => {
    let errorStatus = bidConditionCheck();
    if (errorStatus) {
      setError("");

      // 1. Getting user account
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      let userAddress = accounts[0];

      // 2. Getting nft hash json of item
      let boxHash = mysteryBoxJsonList[boxId];
      console.log("boxId: " + boxId);

      // 3. Signing jsonHash
      let signResponse = await signTransaction(boxHash, userAddress);
      //console.log(signResponse);

      // 4. Converting amount Wei
      let amount = bidAmount * 1000000000000000000;

      //5. Setting Actual case to waiting -0
      setActualCase(1);

      // 6. Hitting Contract

      const response = await new Promise((resolve, reject) => {
        bidContract.methods
          .bid(
            boxId,
            signResponse.v,
            signResponse.r,
            signResponse.s,
            signResponse.messageHash
          )
          .send(
            { from: userAddress, value: amount, gasPrice: 25000000000 },
            function (error, transactionHash) {
              console.log("purchaseItem Called");
              setStopPopupClick(true);
              if (transactionHash) {
                setActualCase(3);

                resolve(transactionHash);
              } else {
                console.log("Rejected by user!");
                setActualCase(2);
                reject();
              }
            }
          )
          .on("receipt", async function (receipt) {
            console.log("4. Purchase Success");

            let newBidResponse = await createNewBid(
              boxId,
              userAddress,
              bidAmount
            );
            if (newBidResponse) {
              setActualCase(6);
              window.location.reload();
            } else {
              setActualCase(5);
            }
          })
          .on("error", async function (error) {
            setActualCase(4);
          });
      });
      console.log(response);
    } else {
      setError("Please enter a valid and higher bid.");
    }
  };
  return (
    <div className={classes.card}>
      {actualCase === -1 && (
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="text-center">
            <Loader />
          </div>
        </div>
      )}
      {actualCase === 0 && (
        <div className="container text-center">
          <div>
            <h5 className={classes.title}>Place A Bid</h5>
          </div>

          <Divider style={{ backgroundColor: "black" }} />
          <h6
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 16,
              fontWeight: 300,
              paddingTop: 20,
              fontFamily: "Balsamiq Sans",
            }}
          >
            Enter your bidding amount you wish to pay for the mystery box.
          </h6>
          <div className="mt-2">
            <div className="p-2 float-left">
              <div className="d-flex justify-content-between align-items-end">
                <TextField
                  label={<p className={classes.label}>Bid Amount</p>}
                  type="text"
                  value={bidAmount}
                  placeholder="Enter bid amount"
                  className={classes.textField}
                  onChange={(e) => setBidAmount(e.target.value)}
                  fullWidth
                  // error={!bidConditionCheck()}
                />
                <h6
                  style={{
                    color: "black",
                    textAlign: "left",
                    fontSize: 16,
                    fontWeight: 300,
                  }}
                >
                  BNB
                </h6>
              </div>
              <div className="float-left">
                <p
                  style={{
                    color: "red",
                    textAlign: "left",
                    fontSize: 14,
                    fontWeight: 300,
                    fontFamily: "Balsamiq Sans",
                  }}
                >
                  {error}
                </p>
              </div>
            </div>
            <div className="text-center">
              <Button
                variant="contained"
                className={classes.submitButton}
                onClick={submitForm}
              >
                Place Bid Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {actualCase === 1 && (
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="text-center my-3">
            <div className="text-center">
              <Loader />
            </div>
            <h5 className={classes.messageTitle}>Waiting for confirmation!</h5>
          </div>
        </div>
      )}
      {actualCase === 2 && (
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="text-center my-3">
            <img
              src="/images/failed.png"
              height="100px"
              alt="error"
              className={classes.dialogImage}
            />
            <h5 className={classes.messageTitle}>Transaction Rejected</h5>
            <div className="text-center">
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
                className={classes.reloadButton}
              >
                <Refresh />
                Reload
              </Button>
            </div>
          </div>
        </div>
      )}
      {actualCase === 3 && (
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="text-center my-3">
            <div className="text-center">
              <Loader />
            </div>
            <h5 className={classes.messageTitle}>
              Transaction submitted, please wait...
            </h5>
            <p className={classes.dialogText}>
              <span style={{ color: "#e65100" }}>
                * Do not reload otherwise you may lose funds.
              </span>
            </p>
          </div>
        </div>
      )}
      {actualCase === 4 && (
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="text-center my-3">
            <img
              src="/images/failed.png"
              height="100px"
              alt="error"
              className={classes.dialogImage}
            />
            <h5 className={classes.messageTitle}>Transaction Failed</h5>
            <div className="text-center">
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
                className={classes.reloadButton}
              >
                <Refresh />
                Reload
              </Button>
            </div>
          </div>{" "}
        </div>
      )}
      {actualCase === 5 && (
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="text-center my-3">
            <img
              src="/images/failed.png"
              height="100px"
              alt="error"
              className={classes.dialogImage}
            />
            <h5 className={classes.messageTitle}>
              Transaction Success with Error
            </h5>

            <p className={classes.dialogText}>
              * Contact admin and share the transaction hash.
            </p>
            <div className="text-center">
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
                className={classes.reloadButton}
              >
                <Refresh />
                Reload
              </Button>
            </div>
          </div>
        </div>
      )}
      {actualCase === 6 && (
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="text-center my-3">
            <img
              src="/images/success.png"
              height="100px"
              alt="success"
              className={classes.dialogImage}
            />
            <h5 className={classes.messageTitle}>Transaction Success</h5>
            <div className="text-center">
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
                className={classes.reloadButton}
              >
                <Refresh />
                Reload
              </Button>
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

const mapDispatchToProps = { createNewBid };

export default connect(mapStateToProps, mapDispatchToProps)(BidForm);
