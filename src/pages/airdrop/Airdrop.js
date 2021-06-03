import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grow } from '@material-ui/core';
import { connect } from 'react-redux';
import { isJoinAirdrop, getTotalParticipants, tokenURI } from './../../actions/smartActions/SmartActions';
import { authenticateUser } from './../../actions/authActions';
import Loader from './../../components/Loader';
import CountdownTimer from './../../components/CountdownTimer';
import ConnectButton from '../../components/ConnectButton';
import imageBaseUrl from './../../actions/imageBaseUrl';
import { checkCorrectNetwork, checkWalletAvailable } from './../../actions/web3Actions';

const useStyles = makeStyles((theme) => ({
  spacing: {
    overflowX: 'hidden',
    padding: 30,
    // background: 'url("https://wallpaperaccess.com/full/3819332.gif")',

    [theme.breakpoints.down('md')]: {
      padding: 10,
    },
  },

  buttonMain: {
    borderRadius: '50px',
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    lineHeight: '24px',
    verticalAlign: 'baseline',
    letterSpacing: '-1px',
    margin: 0,
    color: '#ffffff',
    padding: '12px 20px 12px 20px',
    fontWeight: 500,
    fontSize: 18,
    textTransform: 'none',
  },
  timerButton: {
    borderRadius: '50px',
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,

    lineHeight: '24px',
    verticalAlign: 'baseline',
    letterSpacing: '-1px',
    margin: 0,
    color: '#ffffff',
    padding: '12px 20px 12px 20px',
    fontWeight: 400,
    fontSize: 18,
    textTransform: 'none',
  },
  airdropHeading: {
    color: 'yellow',
    fontSize: 22,
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
  },
  airdropText: {
    color: 'white',
    fontSize: 32,
    [theme.breakpoints.down('md')]: {
      fontSize: 22,
    },
  },
  itemImage: {
    height: 200,

    [theme.breakpoints.down('md')]: {
      height: 150,
    },
  },
  itemImagePwar: {
    height: 160,

    [theme.breakpoints.down('md')]: {
      height: 120,
    },
  },
  itemName: {
    color: 'white',
    fontSize: 28,
    [theme.breakpoints.down('md')]: {
      fontSize: 20,
    },
  },
  plusSign: {
    color: 'white',
    fontSize: 60,
    height: 200,
    width: 150,
    [theme.breakpoints.down('md')]: {
      fontSize: 40,
      height: 120,
      width: 100,
    },
  },
}));

function Airdrop({ authenticated, user, authenticateUser }) {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);
  const [loading, setLoading] = useState(true);
  const [airdropJoined, setAirdropJoined] = useState(false);
  const [airdropParticipants, setAirdropParticipants] = useState(0);
  const [itemJson, setItemJson] = useState(null);

  const [activate, setActivate] = React.useState(false);

  useEffect(async () => {
    checkWalletAvailable();
    let res = await checkCorrectNetwork();
    console.log('airdrop:' + res);
  }, []);

  useEffect(async () => {
    const walletAvailable = await checkWalletAvailable();

    if (walletAvailable) {
      //Get all participants
      getParticipants();
      //console.log('1. Wallet Available');
      const correctNetwork = checkCorrectNetwork();
      if (correctNetwork) {
        //console.log('2. Correct Network');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const accountAddress = accounts[0];
        authenticateUser(accountAddress);

        if (authenticated) {
          //console.log('3. Authenticated True');
          await checkIsJoined();
        } else {
          if (typeof window.ethereum === 'undefined') {
            //console.log('3. Authenticated False');
            setActualCase(3);
          }
        }
      } else {
        //console.log('2. Wrong Network');

        setActualCase(2);
        setLoading(false);
      }
    } else {
      //console.log('1. Wallet not Available');

      setActualCase(1);
      setLoading(false);
    }
  }, [typeof window.ethereum, authenticated]);

  const getParticipants = async () => {
    var f = 110 + 21323 + 328932;
    var airdropParticipantsCount = await getTotalParticipants();
    setAirdropParticipants(f);
    console.log('called');
  };

  const checkIsJoined = async () => {
    //Check participants true of false

    var joined = await isJoinAirdrop(user.address);

    if (parseInt(joined) > 0) {
      setAirdropJoined(true);
      let itemString = await tokenURI(joined);
      await axios.get(`${imageBaseUrl}${itemString}`).then((res) => {
        setItemJson(res.data);
        setLoading(false);
        setActualCase(4);
      });
      return true;
    } else {
      setActualCase(5);
      return false;
    }
  };

  const claimAirdrop = () => {
    console.log('Claimed');
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
          <h4 style={{ color: 'yellow' }}>Metamask Missing</h4>
          <p style={{ color: 'white' }}>Install metamask first</p>
        </div>
      )}
      {actualCase === 2 && (
        <div className="mt-5 text-center">
          <h4 style={{ color: 'yellow' }}>Wrong Network</h4>
          <p style={{ color: 'white' }}>We only support Binance Smart Chain</p>
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
            <div className="col-md-3"></div>
            <div className="col-md-6">
              {' '}
              <h3 className="text-center " style={{ color: 'yellow' }}>
                Claim Airdrop
              </h3>
            </div>
            <div className="col-md-3">
              {' '}
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
                      <h3 className="text-center " style={{ color: 'white', fontSize: 20 }}>
                        Congratulations! You have won.
                      </h3>
                      <div className="d-flex justify-content-center align-items-end">
                        {itemJson !== null && (
                          <div>
                            <div className="mt-3">
                              <img src={`${imageBaseUrl}/${itemJson.hashimage}`} className={classes.itemImage} />
                            </div>
                            <div>
                              <h5 className={classes.itemName}>{itemJson.description}</h5>
                            </div>
                          </div>
                        )}

                        <div className={classes.plusSign}>+</div>
                        <div style={{ paddingLeft: 20 }}>
                          {' '}
                          <div className="mt-5">
                            <img src={`/token.png`} className={classes.itemImagePwar} />
                            <div className="mt-3">
                              <h5 className={classes.itemName}>25 PWAR</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
                        <h3 style={{ fontSize: 21, color: 'white' }}>Claim your airdrop</h3>
                        <Button
                          variant="outlined"
                          onClick={activate ? claimAirdrop : null}
                          className={activate ? classes.buttonMain : classes.timerButton}>
                          {activate ? (
                            'Claim Now'
                          ) : (
                            <div>
                              <CountdownTimer enableClaim={setActivate} />
                            </div>
                          )}
                        </Button>
                        <div className="mt-5">
                          <p style={{ color: 'yellow', fontSize: 16, textAlign: 'center' }}>Airdrop requirements:</p>
                          <p style={{ color: 'white', fontSize: 14, textAlign: 'left' }}>
                            1. You will receive 1 NFT item and 25 PWAR tokens.
                          </p>
                          <p style={{ color: 'white', fontSize: 14, textAlign: 'left' }}>
                            2. Do following tasks
                            <ul>
                              <li>
                                <a href="https://t.me/polkawarchat">Join Telegram</a>
                              </li>
                              <li>
                                <a href="https://twitter.com/polkawarnft">Follow Twitter</a>
                              </li>
                              <li>
                                <a href="https://medium.com/@polkawar">Follow Medium</a>
                              </li>
                            </ul>
                          </p>{' '}
                          <p style={{ color: 'white', fontSize: 14, textAlign: 'left' }}>
                            3. You can claim your rewards after 1st July, 2021.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>{' '}
                </div>
              </Grow>
            </div>
          </div>
        </div>
      )}
      {actualCase === 5 && (
        <div class="my-5">
          <h6 className="text-center " style={{ color: 'yellow', fontSize: 28 }}>
            Airdrop Finished
          </h6>
          <div className="d-flex justify-content-center">
            <h6
              className="text-center"
              style={{ color: 'white', fontSize: 18, fontWieght: 400, lineHeight: 2, maxWidth: 500 }}>
              Thanks for the overwhelming response from our community. Airdrop participants has reached{' '}
              <strong style={{ color: 'yellow' }}>3000 </strong>
              participants. See you at PWAR listing day.
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

const mapDispatchToProps = { authenticateUser };

export default connect(mapStateToProps, mapDispatchToProps)(Airdrop);
