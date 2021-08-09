import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grow } from "@material-ui/core";
import { connect } from "react-redux";
import Loader from "./../../components/Loader";
import CountdownTimer from "./../../components/CountdownTimer";
import ConnectButton from "../../components/ConnectButton";
import imageBaseUrl from "./../../actions/imageBaseUrl";
import {
  checkCorrectNetwork,
  checkWalletAvailable,
  getUserAddress,
} from "./../../actions/web3Actions";
import {
  getParticipants,
  tokenURI,
} from "./../../actions/smartActions/SmartActions";
import { authenticateUser } from "./../../actions/authActions";
import { addUserItem } from "./../../actions/itemActions";
import airdropContract from "../../utils/airdropConnection";
import TransactionStatus from "../../components/TransactionStatus";

const useStyles = makeStyles((theme) => ({
  spacing: {
    overflowX: "hidden",
    padding: 30,

    // background: 'url("https://wallpaperaccess.com/full/3819332.gif")',

    [theme.breakpoints.down("md")]: {
      padding: 10,
    },
  },

  buttonMain: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    color: "#ffffff",
    padding: "12px 20px 12px 20px",
    fontWeight: 500,
    fontSize: 18,
    textTransform: "none",
  },
  timerButton: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,

    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    color: "#ffffff",
    padding: "12px 20px 12px 20px",
    fontWeight: 400,
    fontSize: 18,
    textTransform: "none",
  },
  airdropHeading: {
    color: "yellow",
    fontSize: 22,
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
  },
  airdropText: {
    color: "white",
    fontSize: 32,
    [theme.breakpoints.down("md")]: {
      fontSize: 22,
    },
  },
  itemImage: {
    height: 200,

    [theme.breakpoints.down("md")]: {
      height: 150,
    },
  },
  itemImagePwar: {
    height: 160,

    [theme.breakpoints.down("md")]: {
      height: 120,
    },
  },
  itemName: {
    color: "white",
    fontSize: 28,
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
    },
  },
  plusSign: {
    color: "white",
    fontSize: 60,
    height: 200,
    width: 150,
    [theme.breakpoints.down("md")]: {
      fontSize: 40,
      height: 120,
      width: 100,
    },
  },
}));

function Airdrop({ authenticated, authenticateUser, addUserItem }) {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);
  const [isClaimed, setIsClaimed] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  const [itemJson, setItemJson] = useState(null);
  const [claimCase, setClaimCase] = useState(0);
  const [itemId, setItemId] = useState(null);
  const [activate, setActivate] = React.useState(false);

  let mapping = {
    "Armor for Archers": "1",
    "Armor for Magician": "2",
    "Armor for warriors": "3",
    "Helmet for Archers": "10",
    "Helmet for Magician": "11",
    "Helmet for Warriors": "12",
    "Wing for Archers": "19",
    "Wing for Magician": "20",
    "Wing Warrior": "21",
    Mount: "28",
    "The Sword": "29",
    "The Big Knife": "32",
    "The Tessen": "35",
    "The Bow for Archer": "38",
    "The Gun": "41",
    "The Sceptre Vase of Magician": "44",
    "The Magic Vase of Magician": "47",
  };

  useEffect(() => {
    async function asyncFn() {
      checkWalletAvailable();
      let res = await checkCorrectNetwork();
    }
    asyncFn();
  }, []);

  useEffect(() => {
    async function asyncFn() {
      console.log("Started");

      const walletAvailable = await checkWalletAvailable();
      if (walletAvailable) {
        console.log("wallet available");
        const correctNetwork = checkCorrectNetwork();
        if (correctNetwork) {
          console.log("Correct Netwrk");

          let accountAddress = await getUserAddress();
          authenticateUser(accountAddress);

          if (authenticated) {
            console.log("Authenticated");

            await getParticipantDetails();
          } else {
            if (typeof window.ethereum === "undefined") {
              setActualCase(3);
            }
          }
        } else {
          setActualCase(2);
        }
      } else {
        setActualCase(1);
      }
    }
    asyncFn();
  }, [authenticated]);

  const getParticipantDetails = async () => {
    //Check participants true of false
    console.log("getParticipantDetails");

    let accountAddress = await getUserAddress();
    let participantData = await getParticipants(accountAddress);

    let tokenId = participantData.tokenId;
    let isClaimed = participantData.isClaimed;

    setIsClaimed(isClaimed);

    if (parseInt(tokenId) > 0) {
      setTokenId(parseInt(tokenId));
      let itemString;
      itemString = await tokenURI(tokenId);
      if (itemString) {
        await axios.get(`${imageBaseUrl}${itemString}`).then((res) => {
          setItemJson(res.data);

          let pinataJson = res.data;
          let itemName = pinataJson.description;
          let compatibleId = mapping[itemName];
          setItemId(compatibleId);
          setActualCase(4);
        });
        return true;
      } else {
        let data = {
          hashimage: "QmYqV2jhYyZJBmvx5kU6KycFkTTG2F2MGCGtiMJrS8g4dE",
          description: "Sword",
          level: "1",
        };

        setItemJson(data);

        setActualCase(4);
        return true;
      }
    } else {
      setActualCase(5);
      return false;
    }
  };

  const claimAirdrop = async () => {
    // Calling Smart Contract
    setClaimCase(1);

    let userAddress = await getUserAddress();

    const response = await airdropContract.methods
      .claimAirdrop()
      .send(
        { from: userAddress, gasPrice: 25000000000 },
        function (error, transactionHash) {
          if (transactionHash) {
            setClaimCase(3);
          } else {
            setClaimCase(2);
          }
        }
      )
      .on("receipt", async function (receipt) {
        console.log("4. Claim Success");
        console.log(receipt);

        let nftTokenId = tokenId;
        const utcDateTimestamp = new Date();
        let utcDate = utcDateTimestamp.toUTCString();

        let userItemData = {
          token_id: nftTokenId,
          price: "0.0",
          token_type: 2,
          event: "airdrop",
          owner: userAddress,
          buydate: utcDate,
          item_id: itemId,
        };
        let response = await addUserItem(userItemData);
        if (response) {
          setClaimCase(6);
          window.location.reload();
        } else {
          setClaimCase(5);
        }
      })
      .on("error", async function (error) {
        setClaimCase(4);
      });
    console.log(response);
  };

  return (
    <div className={classes.spacing}>
      {actualCase === 0 && (
        <div className="text-center mt-5">
          <Loader />
        </div>
      )}
      {actualCase === 1 && (
        <div className="mt-5 text-center">
          <h4 style={{ color: "yellow" }}>Metamask Missing</h4>
          <p style={{ color: "white" }}>Install metamask first</p>
        </div>
      )}
      {actualCase === 2 && (
        <div className="mt-5 text-center">
          <h4 style={{ color: "yellow" }}>Wrong Network</h4>
          <p style={{ color: "white" }}>We only support Binance Smart Chain</p>
        </div>
      )}
      {actualCase === 3 && (
        <div className="mt-5 text-center">
          <ConnectButton />
        </div>
      )}
      {actualCase === 4 && (
        <div className="text-center mt-1">
          <div className="row g-0">
            <div className="col-md-3" />
            <div className="col-md-6">
              {" "}
              <h3 className="text-center " style={{ color: "yellow" }}>
                Claim Airdrop
              </h3>
            </div>
            <div className="col-md-3">
              {" "}
              <div className="text-center">
                <h6 className={classes.airdropHeading}>Airdrop Participants</h6>
                <p className={classes.airdropText}>3000/3000</p>
              </div>
            </div>
          </div>

          <div className={classes.root}>
            <div className={classes.container}>
              <Grow in={true} timeout={1000}>
                <div>
                  <div className="container">
                    <div>
                      <h3
                        className="text-center "
                        style={{ color: "white", fontSize: 20 }}
                      >
                        Congratulations! You have won.
                      </h3>
                      <div className="d-flex justify-content-center align-items-end">
                        {itemJson !== null && (
                          <div>
                            <div className="mt-3">
                              <img
                                src={`${imageBaseUrl}/${itemJson.hashimage}`}
                                className={classes.itemImage}
                                alt="nft-item"
                              />
                            </div>
                            <div>
                              <h5 className={classes.itemName}>
                                {itemJson.description}
                              </h5>
                            </div>
                          </div>
                        )}

                        <div className={classes.plusSign}>+</div>
                        <div style={{ paddingLeft: 20 }}>
                          {" "}
                          <div className="mt-5">
                            <img
                              src={`/token.png`}
                              className={classes.itemImagePwar}
                              alt="pwar"
                            />
                            <div className="mt-3">
                              <h5 className={classes.itemName}>25 PWAR</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
                        <h3 style={{ fontSize: 21, color: "white" }}>
                          Claim your airdrop
                        </h3>
                        {!isClaimed && claimCase === 0 && (
                          <Button
                            variant="outlined"
                            onClick={claimAirdrop}
                            className={classes.buttonMain}
                          >
                            Claim Now
                          </Button>
                        )}
                        <div className="mt-3">
                          {claimCase !== 0 && claimCase !== 7 && (
                            <TransactionStatus
                              actualCase={claimCase}
                              color={"#ffc107"}
                            />
                          )}
                        </div>
                        <div>
                          {isClaimed && (
                            <p
                              style={{
                                color: "green",
                                fontSize: 36,
                                textAlign: "center",
                              }}
                            >
                              Airdrop Claimed!
                            </p>
                          )}
                        </div>
                        <div className="mt-5">
                          <p
                            style={{
                              color: "yellow",
                              fontSize: 16,
                              textAlign: "center",
                            }}
                          >
                            Airdrop requirements:
                          </p>
                          <p
                            style={{
                              color: "white",
                              fontSize: 14,
                              textAlign: "left",
                            }}
                          >
                            1. You will receive 1 NFT item and 25 PWAR tokens.
                          </p>
                          <div
                            style={{
                              color: "white",
                              fontSize: 14,
                              textAlign: "left",
                            }}
                          >
                            2. Do following tasks
                            <ul>
                              <li>
                                <a href="https://t.me/polkawarchat">
                                  Join Telegram
                                </a>
                              </li>
                              <li>
                                <a href="https://twitter.com/polkawarnft">
                                  Follow Twitter
                                </a>
                              </li>
                              <li>
                                <a href="https://medium.com/@polkawar">
                                  Follow Medium
                                </a>
                              </li>
                            </ul>
                          </div>{" "}
                          <p
                            style={{
                              color: "white",
                              fontSize: 14,
                              textAlign: "left",
                            }}
                          >
                            3. You can claim your rewards after 1st August,
                            2021.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </Grow>
            </div>
          </div>
        </div>
      )}
      {actualCase === 5 && (
        <div class="my-5">
          <h6
            className="text-center "
            style={{ color: "yellow", fontSize: 28 }}
          >
            Airdrop Finished
          </h6>
          <div className="d-flex justify-content-center">
            <h6
              className="text-center"
              style={{
                color: "white",
                fontSize: 18,
                fontWieght: 400,
                lineHeight: 2,
                maxWidth: 500,
              }}
            >
              Thanks for the overwhelming response from our community. Airdrop
              participants has reached{" "}
              <strong style={{ color: "yellow" }}>3000 </strong>
              participants. You can buy more PWAR for future events.
            </h6>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
});

const mapDispatchToProps = { authenticateUser, addUserItem };

export default connect(mapStateToProps, mapDispatchToProps)(Airdrop);
