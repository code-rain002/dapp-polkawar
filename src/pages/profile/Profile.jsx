import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dialog, Backdrop, Slide, Card } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../components/TabPanel';
import CustomButton from '../../components/CustomButton';
import { authenticateUser } from './../../actions/authActions';
import web3 from './../../web';
import CreateCharacterForm from '../../components/CreateCharacterForm';
import { tokenOfOwnerByIndex, tokenURICharacter } from './../../actions/smartActions/SmartActions';
import axios from 'axios';
import imageBaseUrl from './../../actions/imageBaseUrl';
import constants from './../../utils/constants';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.pbr.textPrimary,
    textAlign: 'left',
    fontSize: '2.08vw',
    lineHeight: '41.4px',
    fontWeight: 800,
    verticalAlign: 'middle',
  },
  categoryTab: {
    display: 'inline',
    border: '1px solid #616161',
    borderRadius: '20px',
    fontSize: 14,
    fontWeight: 500,
    padding: '6px 18px 6px 18px',
    minWidth: '60px',
    marginLeft: '16px',
    marginRight: '12px',
    height: '40px',
  },
  cover: {
    // backgroundImage: `url('https://miro.medium.com/max/800/1*AGOVtVmLpx_1qrK04zI6Dg.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // height: 300,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  avatarWrapper: {
    borderRadius: '50%',
    border: '5px solid #ffffff',
    height: 150,
    width: 150,
    objectFit: 'cover',
    // marginTop: -80,
    marginBottom: 10,
  },
  title: {
    verticalAlign: 'baseline',
    textAlign: 'center',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 15,
    lineHeight: '20.7px',
  },
  subheading: {
    verticalAlign: 'baseline',
    textAlign: 'center ',
    color: theme.palette.pbr.textSecondary,
    fontWeight: 500,
    fontSize: 14,
    width: '300px',
  },
  buttonWrapper: {
    padding: 20,
  },
  button: {
    color: 'black',
    backgroundColor: 'white',
    textTransform: 'none',
    borderRadius: '50px',
    background: 'linear-gradient(73.28deg,#ffffff 88.45%, #e6e6e6 6.51% )',
  },
  buttonCustom: {
    color: 'white',
    backgroundColor: 'white',
    textTransform: 'none',
    borderRadius: '50px',
    padding: '8px 16px 8px 16px',
    fontWeight: 600,
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
  },
  tabWrapper: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabs: {
    maxWidth: 1000,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '97%',
    },
  },
  tab: {
    backgroundColor: 'black',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  airdropButton: {
    borderRadius: '50px',
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    lineHeight: '24px',
    verticalAlign: 'baseline',
    letterSpacing: '-1px',
    margin: 0,
    marginTop: 5,
    marginLeft: 10,
    color: '#ffffff',
    padding: '8px 16px 8px 16px',
    fontWeight: 400,
    fontSize: 16,
    textTransform: 'none',
  },
  scrollItemPositions: {
    display: 'flex',
    justifyContent: 'start',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'start',
    },
  },
  characterScroll: {
    whiteSpace: 'noWrap',
    overflowX: 'auto',
    paddingTop: 10,
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
    },
  },
  media: {
    height: '100%',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      height: '150px',
    },
  },

  icon: {
    color: 'orange',
    fontSize: 30,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },

  levelText: {
    color: 'white',
    fontWeight: 700,
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 5,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  card: {
    width: 280,
    height: 420,
    borderRadius: 16,
    border: '4px solid #e5e5e5',
    marginBottom: 30,
    backgroundColor: theme.palette.pbr.textPrimaryOpp,
    [theme.breakpoints.down('sm')]: {
      width: 180,
      height: 250,
    },
  },

  title: {
    verticalAlign: 'baseline',
    textAlign: 'center',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 900,
    letterSpacing: 1,
    fontSize: 16,
    lineHeight: '35.7px',
    fontFamily: 'Carter One',
    [theme.breakpoints.down('sm')]: {
      fontWeight: 700,
      fontSize: 16,
    },
  },
  mediaWrapper: {
    height: 240,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 120,
    },
  },
  propTitle: {
    fontSize: 15,
    color: 'yellow',
  },
  propValue: {
    fontSize: 12,
    color: 'white',
  },
}));

function Profile({ authenticateUser, user, authenticated }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [characterPopup, setCharacterPopup] = useState(false);
  const [stopPopupClick, setStopPopupClick] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleCharacterPopup = (value) => {
    setCharacterPopup(value);
  };

  const checkNetwork = () => {
    if (web3.currentProvider.networkVersion === constants.network_id) {
      return true;
    } else {
      return false;
    }
  };

  const connectWallet = () => {
    if (checkNetwork()) {
      web3.eth.requestAccounts().then((accounts) => {
        const accountAddress = accounts[0];
        authenticateUser(accountAddress);
        setError('');
      });
    } else {
      setError('Only support BSC network');
    }
  };

  const getCharacter = async () => {
    if (checkNetwork()) {
      web3.eth.requestAccounts().then(async (accounts) => {
        const accountAddress = accounts[0];
        let ownerTokenId = await tokenOfOwnerByIndex(accountAddress, 0);
        let characterHash = await tokenURICharacter(ownerTokenId);
        await axios.get(`${imageBaseUrl}${characterHash}`).then((res) => {
          let tempObject = [res.data];
          setCharacters(tempObject);

          console.log(tempObject);
        });
      });
    } else {
      setError('Only support BSC network');
    }
  };
  useEffect(() => {
    if (user !== null) {
      setUserData(user);
      getCharacter();
    }
  }, [authenticated, user]);

  useEffect(() => {
    getCharacter();
  }, []);

  return authenticated ? (
    <div>
      <div className="text-center mt-3">
        <img
          src={user.avatar ? user.avatar : 'images/avatar.jpg'}
          height="100px"
          alt="profile"
          className={classes.avatarWrapper}
        />
      </div>
      <h6 className={classes.title}>( {user.address} )</h6>
      <h6 className={classes.title}>{user.username}</h6>
      <div className="mt-3"></div>
      <div className={classes.tabWrapper}>
        <Paper square className={classes.tabs}>
          <Tabs
            style={{ color: 'black' }}
            value={value}
            indicatorColor="primary"
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto">
            <Tab label="Characters" className={classes.tab} />
            <Tab label="On Sale" className={classes.tab} />
            <Tab label="Equipment Bag" className={classes.tab} />
            <Tab label="History battles" className={classes.tab} />
            <Tab label="Activities" className={classes.tab} />
          </Tabs>
        </Paper>
        <div style={{ maxWidth: 1000 }}>
          {' '}
          <TabPanel value={value} index={0}>
            <div className={classes.characterScroll}>
              <div className={classes.scrollItemPositions}>
                {characters.length !== 0 ? (
                  characters.map((character, index) => {
                    return (
                      <div style={{ paddingRight: 15, flexBasis: '25%' }} key={index}>
                        <div>
                          <Card className={classes.card} elevation={0}>
                            <div
                              className="d-flex flex-row justify-content-center align-items-end"
                              style={{ paddingRight: 10 }}>
                              <div className="d-flex justify-content-center align-items-center mt-2">
                                <h6 style={{ color: 'white', fontSize: 14, paddingTop: 10, paddingRight: 5 }}>
                                  Level:{' '}
                                </h6>

                                <div className={classes.iconWrapper}>
                                  <img src="images/swords.png" height="24px" alt="level" />
                                </div>
                                <h6 className={classes.levelText}>{character.level} </h6>
                              </div>
                            </div>
                            <div className="text-center">
                              <h6 style={{ color: 'yellow', fontSize: 14 }}>{character.name} </h6>
                            </div>
                            <div className={classes.mediaWrapper}>
                              <img
                                src={`${imageBaseUrl}/${character.image}`}
                                className={classes.media}
                                alt="character"
                              />
                            </div>
                            <div className="mt-1">
                              <h4 className={classes.title}>{user.username}</h4>
                            </div>
                            <div className="mt-2 d-flex flex-row justify-content-center align-items-center">
                              {console.log(character)}
                              {/* {Object.entries(character.properties).map(([key, value]) => {
                                <div>
                                  <div className="text-center">
                                    <span className={classes.propTitle}>{key}</span>
                                  </div>
                                  <div className="text-center">
                                    <p className={classes.propValue}>{value}</p>
                                  </div>
                                </div>;
                              })}{' '} */}
                            </div>
                          </Card>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center">
                    <div className="my-3">
                      <img src="images/character.png" height="100px" alt="character" />
                    </div>
                    <div className="text-center">
                      <h6 className={classes.title}>No character found</h6>
                      <div className="d-flex justify-content-center">
                        <p className={classes.subheading}>
                          Create your character! <br />
                          and personalise your gaming experience
                        </p>
                      </div>
                    </div>
                    <div className={classes.buttonWrapper}>
                      <Button variant="contained" className={classes.button} onClick={toggleCharacterPopup}>
                        Create Character
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {user.onSale.length !== 0 ? (
              <div>Sale Items List</div>
            ) : (
              <div className="text-center">
                <div className="my-3">
                  <img src="images/man.png" height="100px" alt="sale" />
                </div>
                <div className="text-center">
                  <h6 className={classes.title}>No items found</h6>
                  <div className="d-flex justify-content-center">
                    <p className={classes.subheading}>
                      Come back soon! Or try to browse something for you on our marketplace
                    </p>
                  </div>
                </div>
                <div className={classes.buttonWrapper}>
                  <CustomButton title="Put on sale" />
                </div>
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {user.ownTokenIds.length !== 0 ? (
              <div>Equipments List</div>
            ) : (
              <div className="text-center">
                <div className="my-3">
                  <img src="images/dice.png" height="100px" alt="equipment" />
                </div>
                <div className="text-center">
                  <h6 className={classes.title}>No items found</h6>
                  <div className="d-flex justify-content-center">
                    <p className={classes.subheading}>
                      Come back soon! Or try to browse something for you on our marketplace
                    </p>
                  </div>
                </div>
                <div className={classes.buttonWrapper}>
                  <CustomButton title="Browse marketplace" link={'/'} />
                </div>
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {user.battles.length !== 0 ? (
              <div>Battles List</div>
            ) : (
              <div className="text-center">
                <div className="my-3">
                  <img src="images/battle.png" height="100px" alt="battle" />
                </div>
                <div className="text-center">
                  <h6 className={classes.title}>No items found</h6>
                  <div className="d-flex justify-content-center">
                    <p className={classes.subheading}>
                      Come back soon! Or try to browse something for you on our marketplace
                    </p>
                  </div>
                </div>
                <div className={classes.buttonWrapper}>
                  <CustomButton title="Challenge players" alt="battle" />
                </div>
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={4}>
            {user.activity.length !== 0 ? (
              <div>Activity List</div>
            ) : (
              <div className="text-center">
                <div className="my-3">
                  <img src="images/flag.png" height="100px" alt="activity" />
                </div>
                <div className="text-center">
                  <h6 className={classes.title}>No Activity found</h6>
                  <div className="d-flex justify-content-center">
                    <p className={classes.subheading}>
                      Come back soon! Or try to browse something for you on our marketplace
                    </p>
                  </div>
                </div>
                <div className={classes.buttonWrapper}>
                  <CustomButton title="Join battle" />
                </div>
              </div>
            )}
          </TabPanel>
        </div>
      </div>
      <div></div>
      <Dialog
        className={classes.modal}
        open={characterPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => toggleCharacterPopup(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableBackdropClick={stopPopupClick}
        BackdropProps={{
          timeout: 500,
        }}>
        <div style={{ backgroundColor: 'black' }}>
          <CreateCharacterForm
            user={user}
            onClose={() => toggleCharacterPopup(false)}
            getCharacter={getCharacter}
            stopPopupClicking={setStopPopupClick}
          />
        </div>
      </Dialog>{' '}
    </div>
  ) : (
    <div className="mt-5 text-center">
      <Button className={classes.airdropButton} onClick={connectWallet}>
        Connect your wallet
      </Button>
      <p className="mt-2 text-center" style={{ color: 'yellow' }}>
        {error}
      </p>
    </div>
  );
}

Profile.propTypes = {
  authenticateUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
});

const mapDispatchToProps = { authenticateUser };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
