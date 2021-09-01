import React, { useState, useEffect } from "react";
import { Grow, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { tokenURI } from "../../actions/smartActions/SmartActions";
import imageBaseUrl from "../../actions/imageBaseUrl";
import Loader from "../Loader";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  title: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 24,
    lineHeight: "40.7px",
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
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
      fontSize: 13,
    },
  },

  imageWrapper: {
    height: 90,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: 60,
    },
  },
  pwarWrapper: {
    height: 90,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: 60,
    },
  },
  bnbImage: {
    height: 70,
    [theme.breakpoints.down("md")]: {
      height: 50,
    },
  },
  pwarImage: {
    height: 80,
    [theme.breakpoints.down("md")]: {
      height: 70,
    },
  },
  itemImage: {
    height: 80,
    [theme.breakpoints.down("md")]: {
      height: 50,
    },
  },

  itemName: {
    paddingTop: 10,
    color: "white",
    fontSize: 20,
    fontWeight: 300,
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
    },
  },
  plusSign: {
    paddingTop: 20,
    textAlign: "center",
    color: "white",
    fontSize: 40,
    height: 120,
    width: 150,
    [theme.breakpoints.down("md")]: {
      fontSize: 30,
      height: 120,
      width: 100,
    },
  },
}));

function BidRewards({ programId, useritems, closepopup }) {
  const classes = useStyles();

  const [comboId, setComboId] = useState(-1);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  let mysteryRewards = [
    {
      id: 0,
      rewards: {
        bnb: "0.5",
        pwar: "500",
        nft_level: 1,
      },
    },
    {
      id: 1,
      rewards: {
        bnb: "1",
        pwar: "1000",
        nft_level: 1,
      },
    },
    {
      id: 2,
      rewards: {
        bnb: "2",
        pwar: "2000",
        nft_level: 1,
      },
    },
    {
      id: 3,
      rewards: {
        bnb: "3",
        pwar: "3000",
        nft_level: 2,
      },
    },
    {
      id: 4,
      rewards: {
        bnb: "4",
        pwar: "4000",
        nft_level: 2,
      },
    },
    {
      id: 5,
      rewards: {
        bnb: "5",
        pwar: "5000",
        nft_level: 2,
      },
    },
    {
      id: 6,
      rewards: {
        bnb: "7",
        pwar: "7000",
        nft_level: 3,
      },
    },
    {
      id: 7,
      rewards: {
        bnb: "10",
        pwar: "10000",
        nft_level: 3,
      },
    },
    {
      id: 8,
      rewards: {
        bnb: "20",
        pwar: "20000",
        nft_level: 3,
      },
    },
    {
      id: 9,
      rewards: {
        bnb: "50",
        pwar: "50000",
        nft_level: 3,
      },
    },
    {
      id: 10,
      rewards: {
        bnb: "100",
        pwar: "100000",
        nft_level: 3,
      },
    },
    {
      id: 11,
      rewards: {
        bnb: "200",
        pwar: "200000",
        nft_level: 3,
      },
    },
    {
      id: 12,
      rewards: {
        bnb: "200",
        pwar: "200000",
        nft_level: 3,
      },
    },
    {
      id: 13,
      rewards: {
        bnb: "300",
        pwar: "300000",
        nft_level: 3,
      },
    },
    {
      id: 14,
      rewards: {
        bnb: "400",
        pwar: "400000",
        nft_level: 3,
      }
    },
    {
      id: 15,
      rewards: {
        bnb: "500",
        pwar: "500000",
        nft_level: 3,
      },
    },
  ];

  useEffect(() => {
    async function asyncFn() {
      //To load Item JSON Information
      if (useritems !== null && useritems !== undefined) {
        let singleItem = useritems.filter(
          (element) =>
            element.pId === programId.toString() &&
            element.event === "auction-reward"
        );

        if (singleItem.length > 0) {
          let nftItem_Id = singleItem[0].tokenId;
          let combo_Id = singleItem[0].comboId;
          setComboId(combo_Id);
          console.log(combo_Id);
          let itemString = await tokenURI(nftItem_Id);
          await axios.get(`${imageBaseUrl}${itemString}`).then((res) => {
            setItem(res.data);
            console.log(res.data);
            setLoading(false);
          });
        }
      }
    }

    asyncFn();
  }, []);

  return (
    <div className={classes.container}>
      <Grow in={true} timeout={1000}>
        <div>
          {loading && (
            <div className="text-center">
              <Loader />
            </div>
          )}
          {!loading && (
            <div className="container">
              <div className="d-flex justify-content-end">
                <IconButton>
                  <Close onClick={closepopup} style={{ color: "white" }} />
                </IconButton>
              </div>
              <div>
                <div className="d-flex justify-content-center">
                  <div className="text-center">
                    <h1 className={classes.title}>
                      Auction Rewards
                      <img
                        src="/images/thunder.png"
                        height="25px"
                        alt="thunder"
                      />
                    </h1>
                    <h6 className={classes.para}>
                      You have unlocked following rewards by opening the mystery
                      box.
                    </h6>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="d-flex justify-content-center">
                  <div>
                    <div className="mt-1">
                      <div className={classes.imageWrapper}>
                        <img
                          src={`/images/bnb.png`}
                          className={classes.bnbImage}
                          alt="binance"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      {comboId !== -1 && (
                        <h5 className={classes.itemName}>
                          {mysteryRewards[comboId].rewards["bnb"]} BNB
                        </h5>
                      )}
                    </div>
                  </div>

                  <div className={classes.plusSign}>+</div>
                  <div style={{ paddingLeft: 10 }}>
                    {" "}
                    <div className="mt-1">
                      <div className={classes.pwarWrapper}>
                        <div className="text-center">
                          <img
                            src={`/token.png`}
                            className={classes.pwarImage}
                            alt="pwar"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        {comboId !== -1 && (
                          <h5 className={classes.itemName}>
                            {mysteryRewards[comboId].rewards["pwar"]} PWAR
                          </h5>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={classes.plusSign}>+</div>
                  <div style={{ paddingLeft: 10 }}>
                    <div className="mt-1">
                      <div className={classes.imageWrapper}>
                        {item !== null && (
                          <div className="text-center">
                            <img
                              src={`${imageBaseUrl}/${item.image}`}
                              className={classes.itemImage}
                              alt="pwar"
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <h5 className={classes.itemName}>{item.name}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Grow>
    </div>
  );
}

export default BidRewards;
