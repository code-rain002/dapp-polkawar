import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, Backdrop, Slide, Input } from "@material-ui/core";
import faucetContract from "../utils/faucetConnection";
import { getUserAddress } from "../actions/web3Actions";
import Loader from "../components/Loader";

const useStyles = makeStyles((theme) => ({
  background: {
    overflowX: "hidden",
    paddingTop: 50,

    borderRadius: 10,
    [theme.breakpoints.down("md")]: {
      margin: 0,
      paddingTop: 50,
      borderRadius: 0,
      padding: 0,
    },
  },

  claimButton: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,yellow, orange)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    marginTop: 5,
    marginLeft: 10,
    color: "black",
    padding: "8px 20px 8px 20px",
    fontWeight: 400,
    fontSize: 16,
    textTransform: "none",
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      padding: "8px 23px 8px 23px",
    },
  },
  title: {
    verticalAlign: "baseline",
    color: "white",
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: "2.5vw",
    textAlign: "center",

    [theme.breakpoints.down("md")]: {
      fontSize: 20,
      lineHeight: "30.7px",
    },
  },
  image: {
    width: 800,
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
}));

function Faucet() {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);
  const [testnet, setTestnet] = useState(true);
  const [reloadFlag, setReloadFlag] = useState(true);

  useEffect(() => {
    async function asyncFn() {
      //Events to detect changes in account or network.
      if (window.ethereum !== undefined) {
        window.ethereum.on("accountsChanged", async function (accounts) {
          setReloadFlag(!reloadFlag);

          window.location.reload();
        });

        window.ethereum.on("networkChanged", async function (networkId) {
          setReloadFlag(!reloadFlag);
          window.location.reload();
        });
      }
    }
    asyncFn();
  }, []);

  useEffect(async () => {
    const id = await window.ethereum.networkVersion;
    if (id === "97") {
      setTestnet(true);
    } else {
      setTestnet(false);
    }
    console.log(id);
  }, [reloadFlag]);
  const claimTokens = async () => {
    console.log("claim tokens");
    setActualCase(1);
    //1. Getting user address
    let userAddress = await getUserAddress();

    const response = await faucetContract.methods
      .claimTokens()
      .send(
        {
          from: userAddress,
          gasPrice: 25000000000,
        },
        function (error, transactionHash) {
          if (transactionHash) {
            setActualCase(3);
          } else {
            setActualCase(2);
          }
        }
      )
      .on("receipt", async function (receipt) {
        console.log("4. Purchase Success");
        setActualCase(5);
      })
      .on("error", async function (error) {
        setActualCase(4);
      });
  };

  return (
    <div className={classes.background}>
      <div className="text-center">
        <h1 className={classes.title}>
          Claim Game Tokens
          <img src="images/thunder.png" height="30px" alt="thunder" />
        </h1>
        <div className="d-flex justify-content-center">
          <p
            style={{
              color: "white",
              fontWeight: 400,
              fontFamily: "Work Sans",
              width: "80%",
              textAlign: "center",
            }}
          >
            Claim your PolkaWar test tokens and experience the game when launch.
          </p>
        </div>
      </div>
      <div className="text-center">
        <img src="images/game.jpg" className={classes.image} />
      </div>
      {testnet && (
        <div className="text-center mt-3 mb-5">
          {actualCase === 0 && (
            <Button className={classes.claimButton} onClick={claimTokens}>
              Claim Tokens
            </Button>
          )}
          {actualCase >= 1 && actualCase <= 3 && (
            <div className="text-center">
              <Loader />
            </div>
          )}
          {actualCase === 4 && (
            <div>
              <h4 style={{ color: "yellow" }}>Failed!</h4>
              <h6 style={{ color: "white", fontFamily: "Work Sans" }}>
                Claim failed, please reload the page and try again.
              </h6>
            </div>
          )}
          {actualCase === 5 && (
            <div>
              <h4 style={{ color: "yellow" }}>
                Congrats!{" "}
                <img src="images/success.png" style={{ height: 20 }} />
              </h4>
              <h6 style={{ color: "white", fontFamily: "Work Sans" }}>
                You've claimed 1000 PWAR Test tokens.{" "}
              </h6>
            </div>
          )}
        </div>
      )}

      {!testnet && (
        <div>
          <div className="mt-3">
            <h4 style={{ color: "yellow", textAlign: "center" }}>
              Wrong Network!
            </h4>
            <h6
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Work Sans",
              }}
            >
              Please choose <strong>Binance Smart Chain Test Network </strong>to
              claim.
            </h6>
          </div>
        </div>
      )}
    </div>
  );
}

export default Faucet;
