import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import imageBaseUrl from './../actions/imageBaseUrl';
import ProgressBar from './ProgressBar';
import { addUserItem } from './../actions/itemActions';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import saleContract from './../utils/saleConnection';
import axios from 'axios';
import baseUrl from './../actions/baseUrl';
import Loader from './Loader';

const useStyles = makeStyles((theme) => ({
  card1: {
    width: 900,
    height: 250,
    borderRadius: 14,
    border: '1px solid #e5e5e5',
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(3, 3, 3, 0.8) ),url("/images/wave.png")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundColor: theme.palette.pbr.textPrimaryOpp,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 250,
    },
  },

  media: {
    height: 200,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      height: 150,
    },
  },
  title: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 700,
    letterSpacing: 1,
    fontSize: 22,
    lineHeight: '35.7px',
    fontFamily: 'Balsamiq Sans',
    [theme.breakpoints.down('md')]: {
      fontWeight: 700,
      fontSize: 12,
    },
  },
  section2: {
    paddingLeft: 15,
  },
  priceStrike: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 400,
    letterSpacing: '0.1px',
    fontSize: 18,
    lineHeight: '30px',
    fontFamily: 'Balsamiq Sans',
    [theme.breakpoints.down('md')]: {
      fontWeight: 300,
      fontSize: 15,
    },
  },
  price: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: 'yellow',
    fontWeight: 700,
    letterSpacing: '0.1px',
    fontSize: 20,
    lineHeight: '30px',
    fontFamily: 'Balsamiq Sans',
    paddingLeft: 10,
    [theme.breakpoints.down('md')]: {
      fontWeight: 300,
      fontSize: 15,
    },
  },
  ownerCount: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
    padding: 0,
    margin: 0,
  },
  icon: {
    color: 'orange',
    fontSize: 30,
  },
  levelImage: {
    height: '16px',
    [theme.breakpoints.down('sm')]: {
      height: '12px',
    },
  },
  levelText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 15,
    paddingTop: 10,
    paddingRight: 10,
    display: 'block',

    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      paddingTop: 10,
      paddingRight: 5,
    },
  },

  quantityWrapper: {
    position: 'relative',
    width: 400,
    height: 20,

    backgroundColor: `#f8bbd0`,
    padding: '2px 10px 2px 10px',
    borderRadius: 50,

    [theme.breakpoints.down('sm')]: {
      paddingTop: 5,
    },
  },
  quantityStatsWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 100,
    height: 20,
    padding: '2px 10px 2px 10px',
    borderRadius: 50,
    backgroundColor: '#BF1088',
  },
  quantityText: {
    paddingTop: 10,
    paddingLeft: 5,
    color: 'white',
    fontFamily: 'Balsamiq Sans',
    fontWeight: 700,
    fontSize: 18,
    [theme.breakpoints.down('md')]: {
      width: 400,
      textAlign: 'center',
      background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
      padding: '2px 7px 2px 7px',

      height: 26,
      lineHeight: '16px',
    },
  },

  pricingText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      fontWeight: 600,
    },
  },

  buyNowButton: {
    textAlign: 'center',
    background: `linear-gradient(to bottom,#ffffff, yellow)`,
    padding: '8px 16px 8px 16px',
    borderRadius: 50,
    color: 'black',
    fontSize: 14,
    fontWeight: 500,
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '4px 8px 4px 8px',
      fontSize: 10,
    },
  },
  soldOutButton: {
    textAlign: 'center',
    background: `linear-gradient(to bottom,pink, red)`,
    padding: '8px 16px 8px 16px',
    borderRadius: 50,
    color: 'black',
    fontSize: 14,
    fontWeight: 500,
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '4px 8px 4px 8px',
      fontSize: 10,
    },
  },
}));

function ItemSaleCard({ item, addUserItem, user, signFlashSale, nftHashList }) {
  const classes = useStyles();
  const [actualCase, setActualCase] = useState(0);

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

  const buyItem = async () => {
    let userAddress = user.address;
    let nftHashJson = nftHashList[item.name];

    let signResponse = await signTransaction(nftHashJson, userAddress);
    console.log(signResponse);


    const response = await new Promise((resolve, reject) => {
      saleContract.methods
        .purchaseItem(nftHashJson, signResponse.v, signResponse.r, signResponse.s, signResponse.messageHash)
        .send({ from: userAddress, value: 500000000000000000 }, function (error, transactionHash) {
          console.log('purchaseItem Called');
          if (transactionHash) {
            setActualCase(2);
            resolve(transactionHash);
          } else {
            console.log('Rejected by user!');
            setActualCase(1);
            reject();
          }
        })
        .on('receipt', async function (receipt) {
          console.log('4. Purchase Success');
          setActualCase(4);
          let events = receipt.events;
          let returnValues = events.purchaseEvent.returnValues;
          let tokenId = parseInt(returnValues[1]);
          const utcDateTimestamp = new Date(Date());
          let utcDate = utcDateTimestamp.toUTCString();
          let userItemData = {
            _id: item._id,
            token_id: tokenId,
            token_type: 2,
            event: 'flashsale',
            owner: user.address,
            buydate: utcDate,
          };
          let response = await addUserItem(userItemData);
          if (response) {
            setActualCase(4);
          } else {
            setActualCase(3);
          }

        })
        .on('error', async function (error) {
          setActualCase(3);
          console.log(error);
        });
    });
    console.log(response);

  };
  return (
    <div>
      <Link>
        <Card className={classes.card1} elevation={0}>
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-start">
              <div className="text-center">
                <img alt="item" src={`${imageBaseUrl}/${item.image}`} className={classes.media} />
              </div>
              <div className={classes.section2}>
                <h6 className={classes.title}>{item.name}</h6>
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
                          src="https://pngimg.com/uploads/star/star_PNG1597.png"
                          className={classes.levelImage}
                        />
                      );
                    })}
                  </div>
                </div>{' '}
                <div className="mt-3">
                  <ProgressBar bgcolor={'#BF1088'} completed={item.remaining_quantity} />
                </div>
              </div>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingRight: 20 }}>
              {parseInt(item.remaining_quantity) === 0 ? (
                <Button variant="contained" className={classes.soldOutButton}>
                  <span>Sold Out</span>
                </Button>
              ) : (
                <div>
                  {actualCase === 0 && <Button variant="contained" className={classes.buyNowButton} onClick={buyItem}>
                    <span>Buy Now</span>
                  </Button>}
                  {actualCase === 1 && <div className="mt-3">
                    <Button variant="contained" className={classes.buyNowButton} onClick={buyItem}>
                      <span>Buy Now</span>
                    </Button>
                  </div>}
                  {actualCase === 2 && <div className="text-center mt-3">
                    <Loader />
                  </div>}
                  {actualCase === 3 && <div className="text-center mt-3">
                    <h6 style={{ color: 'red' }}>Transaction Failed, Please reload!</h6>
                  </div>}
                  {actualCase === 4 && <div className="text-center mt-3">
                    <h6 style={{ color: '#4caf50' }}>Purchase Success! </h6>
                  </div>}
                </div>
              )}

              {actualCase === 1 && (
                <div className="mt-3">
                  <h6 style={{ color: '#4caf50' }}>Purchase Success! </h6>
                </div>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}

ItemSaleCard.propTypes = {
  addUserItem: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  items: state.items.items,
});

const mapDispatchToProps = { addUserItem };

export default connect(mapStateToProps, mapDispatchToProps)(ItemSaleCard);
