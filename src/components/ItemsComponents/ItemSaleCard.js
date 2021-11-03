import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, Slide, Backdrop, Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import imageBaseUrl from "../../actions/imageBaseUrl";
import ProgressBar from "../ProgressBar";
import { addUserItem } from "../../actions/itemActions";
import propTypes from "prop-types";
import { connect } from "react-redux";
import saleContract from "../../utils/saleConnection";
import axios from "axios";
import baseUrl from "../../actions/baseUrl";
import Loader from "../Loader";
import { getFlashItems } from "../../actions/itemActions";
import { getUserAddress } from "../../actions/web3Actions";
import web3 from "../../web";
import constants from "../../utils/constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  card1: {
    width: 900,
    height: 250,
    borderRadius: 20,
    border: "1px solid #e5e5e5",
    marginBottom: 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(3, 3, 3, 0.8) ),url("/images/wave.png")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: theme.palette.pbr.textPrimaryOpp,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "100%",
    },
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
  padding: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  media: {
    height: 200,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    [theme.breakpoints.down("md")]: {
      height: 100,
      marginLeft: 0,
      marginRight: 0,
    },
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
  title: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: "white",
    fontWeight: 500,
    letterSpacing: 0.1,
    fontSize: 22,
    lineHeight: "35.7px",

    [theme.breakpoints.down("md")]: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: "20.7px",
    },
  },
  description: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: "white",
    fontWeight: 300,
    letterSpacing: 0.1,
    fontSize: 16,
    lineHeight: "25.7px",
    fontFamily: "Balsamiq Sans",
    [theme.breakpoints.down("md")]: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: "20.7px",
    },
  },

  ModalTitle: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: "black",
    fontWeight: 500,
    letterSpacing: 0.1,
    fontSize: 22,
    lineHeight: "35.7px",

    [theme.breakpoints.down("md")]: {
      fontWeight: 700,
      fontSize: 16,
      lineHeight: "20.7px",
    },
  },
  section2: {
    paddingLeft: 15,
  },
  priceStrike: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 400,
    letterSpacing: "0.1px",
    fontSize: 18,
    lineHeight: "30px",
    fontFamily: "Balsamiq Sans",
    [theme.breakpoints.down("md")]: {
      fontWeight: 300,
      fontSize: 14,
      lineHeight: "20px",
    },
  },
  price: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: "yellow",
    fontWeight: 700,
    letterSpacing: "0.1px",
    fontSize: 20,
    lineHeight: "30px",
    fontFamily: "Balsamiq Sans",
    paddingLeft: 10,
    [theme.breakpoints.down("md")]: {
      fontWeight: 300,
      fontSize: 16,
      paddingLeft: 5,
      lineHeight: "20px",
    },
  },
  ownerCount: {
    color: "white",
    textAlign: "center",
    fontSize: 10,
    padding: 0,
    margin: 0,
  },
  icon: {
    color: "orange",
    fontSize: 30,
  },
  levelImage: {
    height: "16px",
    [theme.breakpoints.down("sm")]: {
      height: "12px",
    },
  },
  levelText: {
    color: "white",
    fontWeight: 300,
    fontSize: 15,
    paddingTop: 10,
    paddingRight: 10,

    [theme.breakpoints.down("md")]: {
      fontSize: 12,
      paddingRight: 5,
      lineHeight: "10px",
    },
  },

  buyNowButton: {
    textAlign: "center",
    background: `linear-gradient(to bottom,#ffffff, yellow)`,
    padding: "8px 16px 8px 16px",
    borderRadius: 50,
    color: "black",
    fontSize: 14,
    fontWeight: 500,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "6px 8px 6px 8px",
      fontSize: 12,
    },
  },
  soldOutButton: {
    textAlign: "center",
    background: `linear-gradient(to bottom,pink, red)`,
    padding: "8px 16px 8px 16px",
    borderRadius: 50,
    color: "black",
    fontSize: 14,
    fontWeight: 500,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "6px 8px 6px 8px",
      fontSize: 12,
    },
  },
  buttonDisplayMobile: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  buttonDisplayDesktop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  profileButton: {
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
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      padding: "8px 16px 8px 16px",
    },
  },
  endedButton: {
    borderRadius: "50px",
    background: `linear-gradient(to right,red, red)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    marginTop: 5,
    marginLeft: 10,
    color: "white",
    padding: "10px 16px 10px 16px",
    fontWeight: 400,
    fontSize: 16,
    textTransform: "none",
    textDecoration: "none",

    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      padding: "8px 16px 8px 16px",
    },
  },
  imageSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 240,
    [theme.breakpoints.down("md")]: {
      width: 100,
    },
  },
}));

function ItemSaleCard({
  item,
  saleEnds,
  saleCase,
  addUserItem,
  getFlashItems,
}) {
  const classes = useStyles();
  const [actualCase, setActualCase] = useState(0);
  const [popup, setPopup] = useState(false);
  const [disablePopup, setDisablePopup] = useState(false);

  useEffect(() => {
    async function asyncFn() {
      let apiResponse = await checkSlotsAvailable(item.itemId);
      let slotsAvailable = apiResponse.data;

      if (parseInt(slotsAvailable) <= 5 && parseInt(slotsAvailable) > 0) {
        setInterval(() => {
          getFlashItems();
        }, 5000);
      } else {
      }
    }

    asyncFn();
  }, []);

  const signTransaction = (nfthash, userAddress) => {
    let url = `${baseUrl}/flashsale-sign`;

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

  const checkSlotsAvailable = async (itemId) => {
    let url = `${baseUrl}/flashsale-slots/${itemId}`;
    let response = await axios.get(url);
    return response.data;
  };

  const buyItem = async () => {
    setPopup(true);
    setActualCase(1);
    //1. Getting user address
    let userAddress = await getUserAddress();

    //3. Signing the transaction
    let signResponse = await signTransaction(item.hashItem, userAddress);
    setDisablePopup(true);

    console.log(item._id);
    //4. Checking available slots
    let slotsAvailable = await checkSlotsAvailable(item.itemId);

    if (parseInt(slotsAvailable) > 0) {
      const response = await saleContract.methods
        .purchaseItem(
          item.itemId,
          item.hashItem,
          signResponse.v,
          signResponse.r,
          signResponse.s,
          signResponse.messageHash
        )
        .send(
          {
            from: userAddress,
            value: 1000000000000000000 * parseFloat(constants.itemPrice),
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
          let events = receipt.events;
          let returnValues = events.purchaseEvent.returnValues;
          let tokenId = parseInt(returnValues[1]);
          const utcDateTimestamp = new Date();
          let utcDate = utcDateTimestamp.toUTCString();
          let userItemData = {
            fs_item_id: item._id,
            token_id: tokenId,
            price: "0.7",
            token_type: 2,
            event: "flashsale",
            owner: userAddress,
            buydate: utcDate,
            item_id: item.itemId,
          };
          let response = await addUserItem(userItemData);
          if (response) {
            setActualCase(5);
            //window.location.reload();
          } else {
            setActualCase(4);
          }
        })
        .on("error", async function (error) {
          setActualCase(4);
          setDisablePopup(false);
        });
    } else {
      // SET Popup
      setActualCase(6);
    }
  };

  return (
    <div>
      <Card className={classes.card1} elevation={5}>
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start">
            <div className={classes.imageSection}>
              <img
                alt="item"
                src={`${imageBaseUrl}/${item.hashImage}`}
                className={classes.media}
              />
            </div>
            <div className={classes.section2}>
              <h6 className={classes.title}>{item.name}</h6>
              <h6 className={classes.description}>{item.description}</h6>
              <div className="d-flex justify-content-start">
                <h6 className={classes.priceStrike}>
                  <strike>
                    {item.original_price} {item.currency}
                  </strike>
                </h6>
                <h6 className={classes.price}>
                  {item.sell_price} {item.currency}
                </h6>
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <h6 className={classes.levelText}>Level : </h6>
                <div className={classes.iconWrapper}>
                  {Array.from(Array(item.level)).map((character) => {
                    return (
                      <img
                        alt="level"
                        src="/images/level.png"
                        className={classes.levelImage}
                      />
                    );
                  })}
                </div>
              </div>{" "}
              <div className="mt-3">
                <ProgressBar
                  bgcolor={"#BF1088"}
                  completed={item.remaining_quantity}
                />
              </div>
              <div className={classes.buttonDisplayMobile}>
                <div
                  className="d-flex flex-column justify-content-start align-items-start"
                  style={{ paddingTop: 10 }}
                >
                  {parseInt(item.remaining_quantity) <= 0 ? (
                    <Button
                      variant="contained"
                      className={classes.soldOutButton}
                    >
                      <span>Sold Out</span>
                    </Button>
                  ) : (
                    <div>
                      {!saleEnds && (
                        <div>
                          {saleCase === 0 && (
                            <Button
                              variant="contained"
                              className={classes.buyNowButton}
                            >
                              <span>Coming soon</span>
                            </Button>
                          )}
                          {saleCase === 1 && (
                            <Button
                              variant="contained"
                              className={classes.buyNowButton}
                              onClick={buyItem}
                            >
                              <span>Buy Now</span>
                            </Button>
                          )}
                        </div>
                      )}

                      {saleEnds && (
                        <div>
                          {" "}
                          <Button
                            variant="contained"
                            className={classes.endedButton}
                          >
                            <span>Sale Ended</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={classes.buttonDisplayDesktop}
            style={{ paddingRight: 20 }}
          >
            {parseInt(item.remaining_quantity) <= 0 ? (
              <Button variant="contained" className={classes.soldOutButton}>
                <span>Sold Out</span>
              </Button>
            ) : (
              <div>
                {!saleEnds && (
                  <div>
                    {saleCase === 0 && (
                      <Button
                        variant="contained"
                        className={classes.buyNowButton}
                      >
                        <span>Coming soon</span>
                      </Button>
                    )}
                    {saleCase === 1 && (
                      <Button
                        variant="contained"
                        className={classes.buyNowButton}
                        onClick={buyItem}
                      >
                        <span>Buy Now</span>
                      </Button>
                    )}
                  </div>
                )}

                {saleEnds && (
                  <div>
                    {" "}
                    <Button variant="contained" className={classes.endedButton}>
                      <span>Sale Ended</span>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Dialog
          className={classes.modal}
          open={popup}
          TransitionComponent={Transition}
          keepMounted={false}
          onClose={() => setPopup(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          disableBackdropClick={disablePopup}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div style={{ backgroundColor: "black" }}>
            <div className={classes.background}>
              <div className="container text-center">
                <div className="d-flex justify-content-between">
                  <div className={classes.padding}>
                    <h5 className={classes.ModalTitle}>Purchase Status</h5>
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
                  <img src="./images/failed.png" height="100px" alt="error" />
                  <h5 className={classes.messageTitle}>Transaction denied!</h5>
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
                  <p
                    style={{
                      textAlign: "center",
                      paddingTop: 10,
                      color: "red",
                    }}
                  >
                    * Do not reload otherwise you will lose.
                  </p>
                </div>
              )}
              {actualCase === 4 && (
                <div className="text-center my-3">
                  <img src="./images/failed.png" height="100px" alt="error" />
                  <h5 className={classes.messageTitle}>Transaction Failed!</h5>
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
                  <h5 className={classes.messageTitle}>Transaction Success!</h5>
                  <div className="text-center mt-3">
                    <Link to="/profile">
                      <Button
                        className={classes.profileButton}
                        variant="contained"
                      >
                        View item in Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
              {actualCase === 6 && (
                <div className="my-3 d-flex flex-column justify-content-start">
                  <div className="text-center my-3">
                    <img
                      src="./images/failed.png"
                      height="100px"
                      alt="success"
                    />
                  </div>
                  <h5 className={classes.messageTitle}>
                    This is item sold out!
                  </h5>
                  <div className="text-center mt-3">
                    <Button
                      className={classes.profileButton}
                      variant="contained"
                      onClick={() => window.location.reload()}
                    >
                      Please reload
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Dialog>{" "}
      </Card>
    </div>
  );
}

ItemSaleCard.propTypes = {
  addUserItem: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items.items,
});

const mapDispatchToProps = { addUserItem, getFlashItems };

export default connect(mapStateToProps, mapDispatchToProps)(ItemSaleCard);
