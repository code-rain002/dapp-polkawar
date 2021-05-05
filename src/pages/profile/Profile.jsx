import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ButtonBase } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../components/TabPanel';
import CustomButton from '../../components/CustomButton';
import { authenticateUser } from './../../actions/authActions';
import web3 from './../../web';

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
    fontSize: 16,
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
}));

function Profile({ authenticateUser, user, authenticated }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const address = '0x9D7117a07fca9F22911d379A9fd5118A5FA4F448';
  const [userData, setUserData] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const connectWallet = () => {
    web3.eth.requestAccounts().then((accounts) => {
      const accountAddress = accounts[0];
      console.log(accountAddress);
      authenticateUser(accountAddress);
    });
  };

  useEffect(() => {
    if (user !== null) {
      setUserData(user);
    }
  }, [authenticated, user]);

  return authenticated ? (
    <div>
      {/* <div className={classes.cover}>
        <div className={classes.buttonWrapper}>
          <Button variant="contained" className={classes.button}>
            Add Cover
          </Button>
        </div>
      </div> */}
      <div className="text-center mt-5">
        <img
          src={user.avatar ? user.avatar : 'images/avatar.jpg'}
          height="100px"
          alt="profile"
          className={classes.avatarWrapper}
        />
      </div>
      <h6 className={classes.title}>{user.username}</h6>
      <h6 className={classes.title}>( {user.address} )</h6>
      <div className="d-flex justify-content-center">
        <div className={classes.buttonWrapper}>
          <Button variant="contained" className={classes.button}>
            Edit Profile
          </Button>
        </div>
        <div className={classes.buttonWrapper}>
          <Button variant="contained" className={classes.button}>
            Share
            <Share />
          </Button>
        </div>
      </div>
      <div className={classes.tabWrapper}>
        <Paper square className={classes.tabs}>
          <Tabs
            style={{ color: 'black' }}
            value={value}
            indicatorColor="primary"
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto">
            <Tab label="Character" className={classes.tab} />
            <Tab label="On Sale" className={classes.tab} />
            <Tab label="Equipment Bag" className={classes.tab} />
            <Tab label="History battle" className={classes.tab} />
            <Tab label="Activity" className={classes.tab} />
          </Tabs>
        </Paper>
        <div style={{ maxWidth: 1000 }}>
          {' '}
          <TabPanel value={value} index={0}>
            {user.characters.length !== 0 ? (
              <div>Characters List</div>
            ) : (
              <div className="text-center">
                <div className="my-3">
                  <img src="images/character.png" height="100px" alt="character" />
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
            {user.equipments.length !== 0 ? (
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
    </div>
  ) : (
    <div className="mt-5 text-center">
      <Button className={classes.airdropButton} onClick={connectWallet}>
        Connect your wallet
      </Button>
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
