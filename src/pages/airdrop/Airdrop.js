import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Wheel from '../../components/Wheel';
import imageBaseUrl from './../../actions/imageBaseUrl';
import { Button } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import CountdownTimer from './../../components/CountdownTimer';
import web3 from './../../web';
import { connect } from 'react-redux';
import ConnectButton from '../../components/ConnectButton';
import constants from './../../utils/constants';
import axios from 'axios';
import { isJoinAirdrop, getAirdrop, tokenURI } from './../../actions/smartActions/SmartActions';

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
}));

function Airdrop({ authenticated, user }) {
  const classes = useStyles();
  const [spinned, setSpinned] = useState(false);
  const [airdropJoined, setAirdropJoined] = useState(false);
  const [itemJson, setItemJson] = useState(null);
  const [metamaskAvailable, setMetamaskAvailable] = React.useState(false);
  const [error, setError] = React.useState({ title: '', msg: '' });

  const [activate, setActivate] = React.useState(false);

  const checkNetwork = () => {
    if (web3.currentProvider.networkVersion === constants.network_id) {
      return true;
    } else {
      return false;
    }
  };

  const checkMetamask = () => {
    if (web3 !== undefined) {
      setMetamaskAvailable(true);
      if (!checkNetwork()) {
        setError({
          title: 'Wrong Network!',
          msg: 'Change network to Binance Smart Chain first then only you will be able to spin.',
        });
      }
    } else {
      setMetamaskAvailable(false);
      setError({ title: 'Metamask missing!', msg: 'Install metamask first and then only you will be able to spin.' });
    }
  };
  const isSpinned = async () => {
    if (user) {
      let joined = await isJoinAirdrop(user.address);
      if (joined > 0) {
        setAirdropJoined(true);
        let itemString = await tokenURI(joined);
        await axios.get(`${imageBaseUrl}${itemString}`).then((res) => {
          setItemJson(res.data);
        });
      }
    }
  };
  useEffect(() => {
    checkMetamask();
    isSpinned();
  }, []);
  const items = [
    <div>
      Armor
      <img alt="Armor" src={`${imageBaseUrl}/QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm`} height="70px" />
    </div>,
    <div>
      Helmet
      <img alt="Helmet" src={`${imageBaseUrl}/Qmath2HgLVjGy3CmmzmLshoDThqFrQNj4ueRrd8YEAQgDA`} height="70px" />
    </div>,
    <div>
      Sword
      <img alt="Sword" src={`${imageBaseUrl}/QmYqV2jhYyZJBmvx5kU6KycFkTTG2F2MGCGtiMJrS8g4dE`} height="70px" />
    </div>,
    <div>
      Knife
      <img alt="Knife" src={`${imageBaseUrl}/QmYBRqwjCu95NpTbkwRmseUEKd1wNS4ZvyuQZWPDZaZjNs`} height="70px" />
    </div>,
    <div>
      Tessen
      <img alt="Tessen" src={`${imageBaseUrl}/QmTyG1N1d5XaS28EvuH4nvaFC6S38NgYt87BeySvsoS98n`} height="70px" />
    </div>,
    <div>
      Bow
      <img alt="Bow" src={`${imageBaseUrl}/QmbVbMQiDjhvtLGFNnJ3VoXACHbPJusQBzMQ43mpYvxFsd`} height="70px" />
    </div>,
    <div>
      Gun
      <img alt="Gun" src={`${imageBaseUrl}/QmfZSKVadAmSonNyvDvkLNTb2nL35GJ82CRqDUFhGQ8CgQ`} height="70px" />
    </div>,
    <div>
      Wing
      <img alt="Wing" src={`${imageBaseUrl}/QmbqwfPekXBqC3CCwt5nAiAcEV5ku6ASk7wnRuQfV8kWua`} height="70px" />
    </div>,
    <div>
      Sceptre
      <img alt="Sceptre" src={`${imageBaseUrl}/QmQfKtYBdDB8fDxUo6c53RbZUd7oe3agHjEWqt9kA3P2PD`} height="70px" />
    </div>,
    <div>
      Magic Vase
      <img alt="Magic Vase" src={`${imageBaseUrl}/QmNTNGAQjMbTPukVi7LCwa4fvGzzUzkaUFYHqsLGk2KWGA`} height="70px" />
    </div>,
  ];

  const checkAirdrop = async () => {
    //call getAirdrop function
    console.log('checkAirdrop Execution');
    let execution = await getAirdrop();

    if (execution) {
      setTimeout(async () => {
        let joined = await isJoinAirdrop(user.address);
        if (joined > 0) {
          setAirdropJoined(true);
          let itemDetails = await tokenURI(joined);
          setItemJson(itemDetails);
          console.log('Joined' + joined);
          console.log('itemDetails' + itemDetails);
        }
      }, 3000);
    }
  };

  const claimAirdrop = () => {
    console.log('Claimed');
  };
  return (
    <div className={classes.spacing}>
      {authenticated ? (
        metamaskAvailable && checkNetwork() ? (
          <div>
            {!airdropJoined && (
              <div class="mb-5">
                <h3 className="text-center " style={{ color: 'yellow' }}>
                  Spin! & Get Airdrop
                </h3>

                <div>
                  <Wheel items={items} spinned={spinned} checkAirdrop={checkAirdrop} userAddress={user.address} />
                </div>
              </div>
            )}

            {(spinned || airdropJoined) && (
              <div className="text-center mt-1">
                <div className={classes.root}>
                  <div className={classes.container}>
                    <Grow in={true} timeout={1000}>
                      <div>
                        <div className=" container">
                          <div>
                            <h3 className="text-center " style={{ color: 'white', fontSize: 18 }}>
                              Congratulations! You have won.
                            </h3>
                            <div className="d-flex justify-content-center align-items-end">
                              {itemJson !== null && (
                                <div>
                                  <div className="mt-5">
                                    <img src={`${imageBaseUrl}/${itemJson.hashimage}`} height="200px" />
                                  </div>
                                  <div>
                                    <h5
                                      style={{
                                        color: 'white',
                                        fontSize: 28,
                                      }}>
                                      {itemJson.description}
                                    </h5>
                                  </div>
                                </div>
                              )}

                              <div style={{ color: 'white', fontSize: 60, height: 200, width: 150 }}>+</div>
                              <div style={{ paddingLeft: 20 }}>
                                {' '}
                                <div className="mt-5">
                                  <img src={`/token.png`} height="150px" />
                                  <div className="mt-3">
                                    <h5 style={{ color: 'white', fontSize: 28 }}>25 PWAR</h5>
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
                                <p style={{ color: 'yellow', fontSize: 16, textAlign: 'center' }}>
                                  Airdrop requirements:
                                </p>
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
          </div>
        ) : (
          <div className="mt-5 text-center">
            <h4 style={{ color: 'yellow' }}>{error.title}</h4>
            <p style={{ color: 'white' }}>{error.msg}</p>
          </div>
        )
      ) : (
        <div>
          <ConnectButton />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Airdrop);
