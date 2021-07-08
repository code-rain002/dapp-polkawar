import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, Slide, Backdrop, Divider, IconButton } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import imageBaseUrl from './../actions/imageBaseUrl';
import { tokenURI } from './../actions/smartActions/SmartActions';
import axios from 'axios';
import SellModal from '../components/SellModal';
import Loader from '../components/Loader';
import { checkApproved } from './../actions/smartActions/SmartActions';
import constants from './../utils/constants';
import itemConnection from './../utils/itemConnection';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Close } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  card1: {
    width: 300,
    height: 400,
    borderRadius: 20,
    border: '4px solid #e5e5e5',
    marginBottom: 30,
    backgroundColor: theme.palette.pbr.textPrimaryOpp,
    [theme.breakpoints.down('sm')]: {
      width: 200,
      height: 290,
    },
  },
  cardHeader: {
    height: 60,
    backgroundColor: theme.palette.pbr.primary,
  },
  title1: {
    verticalAlign: 'baseline',
    textAlign: 'center',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 900,
    letterSpacing: 1,
    fontSize: 22,
    lineHeight: '35.7px',
    fontFamily: 'Carter One',
    [theme.breakpoints.down('sm')]: {
      fontWeight: 700,
      fontSize: 12,
    },
  },
  mediaWrapper1: {
    height: 200,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 100,
    },
  },
  media: {
    height: '100%',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      height: 100,
    },
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
  iconWrapper: {
    paddingRight: 7,
  },
  priceBadgeWrapper: {
    display: 'inline-block',
    paddingTop: 20,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 5,
    },
  },
  pricingBadge: {
    textAlign: 'left',
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    padding: '2px 10px 2px 10px',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    height: 36,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
      padding: '2px 7px 2px 7px',
      borderTopRightRadius: 50,
      borderBottomRightRadius: 50,
      height: 26,
      lineHeight: '16px',
    },
  },

  pricingTextStrike: {
    color: 'yellow',
    fontSize: 13,
    fontWeight: 400,
    fontFamily: 'Balsamiq Sans',
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      fontWeight: 600,
    },
  },
  pricingText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 400,

    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      fontWeight: 600,
    },
  },
  sellButton: {
    textAlign: 'center',
    background: `linear-gradient(to right,#AF2C59, #C43262)`,
    padding: '8px 16px 8px 16px',
    marginRight: 10,
    borderRadius: 50,
    color: 'white',
    fontSize: 14,
    fontWeight: 500,
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '4px 8px 4px 8px',
      fontSize: 12,
    },
  },
  bidButton: {
    textAlign: 'center',
    background: `linear-gradient(to right,#6F2F9B, #8D37A9)`,
    padding: '8px 16px 8px 16px',
    borderRadius: 50,
    color: 'white',
    fontSize: 14,
    fontWeight: 500,
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '4px 8px 4px 8px',
      fontSize: 12,
    },
  },

  ownedText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
    padding: 0,
    margin: 0,
  },
  ownerCount: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
    padding: 0,
    margin: 0,
  },
  background: {
    height: '100%',
    width: 500,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 20,
    [theme.breakpoints.down('md')]: {
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
    [theme.breakpoints.down('md')]: {
      height: 100,
      marginLeft: 0,
      marginRight: 0,
    },
  },

  messageTitle: {
    paddingTop: 15,
    fontWeight: 400,
    verticalAlign: 'baseline',
    letterSpacing: '-0.8px',
    margin: 0,
    textAlign: 'center',
    color: 'black',
    fontSize: 25,
    [theme.breakpoints.down('md')]: {
      fontSize: 20,
      fontWeight: 400,
    },
  },
}));
function ItemProfileCard({ item, user }) {
  const classes = useStyles();
  const [itemJson, setItemJson] = useState(null);
  const [sellPopup, setSellPopup] = useState(false);
  const [approvePopup, setApprovePopup] = useState(false);
  const [approved, setApproved] = useState(false);
  const [actualCase, setActualCase] = useState(0);
  const [loading, setLoading] = useState(true);

  const toggleSellPopup = (value) => {
    setSellPopup(value);
  };
  const toggleApprovePopup = (value) => {
    setApprovePopup(value);
  };

  useEffect(() => {
    async function asyncFn() {
      //To load Item JSON Information

      let tokenId = item.tokenId;
      let itemString = await tokenURI(tokenId);
      await axios.get(`${imageBaseUrl}${itemString}`).then((res) => {
        setItemJson(res.data);
        isApproved();

      });
      setLoading(false);
    }

    asyncFn();

  }, []);

  const isApproved = async () => {
    let tokenId = item.tokenId;


    let approvedAddress = await checkApproved(tokenId);
    let ownerAddress = constants.saleContractAddress;
    if (approvedAddress.toString() === ownerAddress.toString()) {
      setApproved(true);
    } else {
      setApproved(false);
    }
  };

  const approveFn = async () => {
    toggleApprovePopup(true)
    setActualCase(1);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    let userAddress = accounts[0];

    let tokenId = item.tokenId;
    const response = await new Promise((resolve, reject) => {


      itemConnection.methods
        .approve(constants.saleContractAddress, tokenId)
        .send({ from: userAddress }, function (error, transactionHash) {

          if (transactionHash) {
            setActualCase(3);
            resolve(transactionHash);
          } else {
            //console.log('Rejected by user!');
            setActualCase(2);
            reject();
          }
        })
        .on('receipt', async function (receipt) {
          console.log('1.reloading');
          window.location.reload();
          setActualCase(5);

        })
        .on('error', async function (error) {
          console.log(error);
          setActualCase(4);
        });
    });

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
              {' '}
              <div className="d-flex justify-content-between mt-2">
                <div className={classes.priceBadgeWrapper}>
                  <h4 className={classes.pricingBadge}>
                    <span className={classes.pricingTextStrike}><strike>{itemJson.original_price}</strike> </span>
                    <span className={classes.pricingText}>{itemJson.sell_price} BNB</span>
                  </h4>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <h6 className={classes.levelText}>Level : </h6>
                  <div className={classes.iconWrapper}>
                    {Array.from(Array(parseInt(itemJson.level))).map((character) => {
                      return (
                        <img
                          alt="level"
                          src="https://pngimg.com/uploads/star/star_PNG1597.png"
                          className={classes.levelImage}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={classes.mediaWrapper1}>
                <img alt="item" src={`${imageBaseUrl}/${itemJson.image}`} className={classes.media} />
              </div>
              <div>
                <h4 className={classes.title1}>{itemJson.name}</h4>
              </div>
              <div className="text-center mt-4">
                {approved ? (
                  <div>
                    <Button variant="contained" className={classes.sellButton} onClick={() => toggleSellPopup(true)}>
                      <span>Sell</span>
                    </Button>
                    <Button variant="contained" className={classes.bidButton}>
                      <span>Bid</span>
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button variant="contained" className={classes.bidButton} onClick={approveFn}>
                      <span>Approve</span>
                    </Button>
                  </div>
                )}
              </div>
              <Dialog
                className={classes.modal}
                open={sellPopup}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => toggleSellPopup(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}>
                <div style={{ backgroundColor: 'black' }}>
                  <div>
                    <SellModal closePopup={() => toggleSellPopup(false)} item={item} />
                  </div>
                </div>
              </Dialog>
              <Dialog
                className={classes.modal}
                open={approvePopup}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => toggleApprovePopup(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}>
                <div style={{ backgroundColor: 'black' }}>
                  <div >
                    <div className={classes.background}>
                      <div className="container text-center">
                        <div className="d-flex justify-content-between">
                          <div className={classes.padding}>
                            <h5 className={classes.ModalTitle}>Transaction Status</h5>
                          </div>{' '}
                          <div style={{ paddingRight: 10, paddingTop: 10 }}>
                            <IconButton>
                              <Close onClick={() => toggleApprovePopup(false)} />
                            </IconButton>
                          </div>{' '}
                        </div>
                        <Divider style={{ backgroundColor: 'grey' }} /></div>
                      {actualCase === 1 &&
                        (<div className="text-center my-3">
                          <div className="text-center">
                            <Loader />
                          </div>
                          <h5 className={classes.messageTitle}>Waiting for confirmation!</h5>
                        </div>)
                      }
                      {actualCase === 2 &&
                        (<div className="text-center my-3">
                          <img src="https://icon-library.com/images/17c52fbb9e.svg.svg" height="100px" alt='error' />
                          <h5 className={classes.messageTitle}>Transaction denied!</h5>
                        </div>)
                      }
                      {actualCase === 3 &&
                        (<div className="text-center my-3">
                          <div className="text-center">
                            <Loader />
                          </div>
                          <h5 className={classes.messageTitle}>Transaction submitted, please wait...</h5>
                        </div>)
                      }
                      {actualCase === 4 &&
                        (<div className="text-center my-3">
                          <img src="https://icon-library.com/images/17c52fbb9e.svg.svg" height="100px" alt='error' />
                          <h5 className={classes.messageTitle}>Transaction Failed!</h5>
                        </div>)
                      }
                      {actualCase === 5 &&
                        (< div className="my-3 d-flex flex-column justify-content-start">
                          <div className="text-center my-3">
                            <img src="https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png" height="100px" alt='success' />
                          </div>
                          <h5 className={classes.messageTitle}>Transaction Success!</h5>

                        </div>)
                      }
                    </div>
                  </div>

                </div>
              </Dialog>
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
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ItemProfileCard);
