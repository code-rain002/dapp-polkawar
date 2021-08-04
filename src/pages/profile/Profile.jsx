import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import propTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  Backdrop,
  Slide,
  Card,
  Paper,
  IconButton,
} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../../components/TabPanel";
import CustomButton from "../../components/CustomButton";
import {
  authenticateUser,
  checkAuthenticated,
} from "./../../actions/authActions";
import { getUserItems } from "./../../actions/itemActions";
import CreateCharacterForm from "../../components/CharacterComponents/CreateCharacterForm";
import {
  tokenOfOwnerByIndex,
  tokenURICharacter,
} from "./../../actions/smartActions/SmartActions";
import axios from "axios";
import imageBaseUrl from "./../../actions/imageBaseUrl";
import {
  checkWalletAvailable,
  checkCorrectNetwork,
  getUserAddress,
} from "./../../actions/web3Actions";
import Loader from "../../components/Loader";
import ConnectButton from "../../components/ConnectButton";
import ItemProfileCard from "../../components/ItemsComponents/ItemProfileCard";
import ProfileMysteryCard from "../../components/BidComponents/ProfileMysteryCard";
import CharacterSection from "../../components/CharacterComponents/CharacterSection";
import ItemSection from "../../components/ItemsComponents/ItemSection";
import StatsCard from "./profileComponents/CharacterOverview";
import CharacterOverview from "./profileComponents/CharacterOverview";
import CharacterStats from "./profileComponents/CharacterStats";
import CharacterDisplay from "./profileComponents/CharacterDisplay";
import CharacterItems from "./profileComponents/CharacterItems";
import { FileCopy } from "@material-ui/icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  background: {
    minHeight: "100vh",
    padding: 20,
  },
  heading: {
    color: theme.palette.pbr.textPrimary,
    textAlign: "left",
    fontSize: "2.08vw",
    lineHeight: "41.4px",
    fontWeight: 800,
    verticalAlign: "middle",
  },
  categoryTab: {
    display: "inline",
    border: "1px solid #616161",
    borderRadius: "20px",
    fontSize: 14,
    fontWeight: 500,
    padding: "6px 18px 6px 18px",
    minWidth: "60px",
    marginLeft: "16px",
    marginRight: "12px",
    height: "40px",
  },
  cover: {
    // backgroundImage: `url('https://miro.medium.com/max/800/1*AGOVtVmLpx_1qrK04zI6Dg.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // height: 300,
    textAlign: "center",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  avatarWrapper: {
    borderRadius: "50%",
    border: "5px solid #ffffff",
    height: 150,
    width: 150,
    objectFit: "cover",
    // marginTop: -80,
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      height: 100,
      width: 100,
    },
  },

  subheading: {
    verticalAlign: "baseline",
    textAlign: "center ",
    color: theme.palette.pbr.textSecondary,
    fontWeight: 500,
    fontSize: 14,
    width: "300px",
  },
  buttonWrapper: {
    padding: 20,
  },
  button: {
    color: "white",
    backgroundColor: "white",
    textTransform: "none",
    borderRadius: "50px",
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
  },
  buttonCustom: {
    color: "white",
    backgroundColor: "white",
    textTransform: "none",
    borderRadius: "50px",
    padding: "8px 16px 8px 16px",
    fontWeight: 600,
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
  },
  tabWrapper: {
    width: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tabs: {
    maxWidth: 1000,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "97%",
    },
  },
  tab: {
    backgroundColor: "black",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  airdropButton: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    marginTop: 5,
    marginLeft: 10,
    color: "#ffffff",
    padding: "8px 16px 8px 16px",
    fontWeight: 400,
    fontSize: 16,
    textTransform: "none",
  },
  scrollItemPositions: {
    display: "flex",
    justifyContent: "start",
    [theme.breakpoints.down("md")]: {
      justifyContent: "start",
    },
  },
  characterScroll: {
    whiteSpace: "noWrap",
    overflowX: "auto",
    paddingTop: 10,
    [theme.breakpoints.down("md")]: {
      paddingTop: 0,
    },
  },
  media: {
    height: "100%",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    [theme.breakpoints.down("sm")]: {
      height: "240px",
    },
  },

  icon: {
    color: "orange",
    fontSize: 30,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },

  levelText: {
    color: "white",
    fontWeight: 700,
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 5,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  card: {
    minHeight: "300px",
    display: "flex",
    justifyContent: "center",
    marginBottom: 30,
    backgroundColor: "transparent",
    [theme.breakpoints.down("sm")]: {
      minHeight: "300px",
      marginBottom: 10,
    },
  },

  title: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 900,
    letterSpacing: 1,
    fontSize: 16,
    lineHeight: "35.7px",
    fontFamily: "Carter One",
    overflowWrap: "break-word",
    [theme.breakpoints.down("sm")]: {
      fontWeight: 700,
      fontSize: 14,
    },
  },
  titleAddress: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 900,
    letterSpacing: 1,
    fontSize: 16,
    lineHeight: "35.7px",
    fontFamily: "Carter One",
    overflowWrap: "break-word",
    [theme.breakpoints.down("sm")]: {
      fontWeight: 700,
      fontSize: 8,
    },
  },
  mediaWrapper: {
    height: 300,
    width: 300,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      height: 180,
      width: "100%",
    },
  },
  propTitle: {
    fontSize: 16,
    color: "yellow",
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  propValue: {
    fontSize: 14,
    color: "white",
    paddingLeft: 10,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  itemImage: {
    height: 90,
    [theme.breakpoints.down("sm")]: {
      height: 65,
    },
  },
  itemMediaWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#212121",
    margin: 5,
  },
  itemMediaWrapperSelected: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    border: "3px solid #ffffff",
    backgroundColor: "#212121",
    margin: 5,
  },
  ranking: {
    backgroundColor: "#4caf50",
    borderRadius: 7,
    fontSize: 16,
    width: "fit-content",
    padding: "3px 7px 3px 7px",
    color: "white",
    fontWeight: 400,
    fontFamily: "Montserrat",
  },
  chracterType: {
    fontSize: 60,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 800,
    fontFamily: "Balsamiq Sans",
    margin: 0,
    padding: 0,
  },
  username: {
    marginTop: 10,
    fontSize: 18,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 500,
    fontFamily: "Balsamiq Sans",
    margin: 0,
    padding: 0,
  },
  address: {
    marginTop: 5,
    fontSize: 12,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 400,
    fontFamily: "Montserrat",
    color:'#bdbdbd',
    margin: 0,
    padding: 0,
  },
  copyIcon:{
    fontSize:14,
    marginLeft:10,
    color:'#dcedc8'
  }
}));

function Profile({
  authenticateUser,
  checkAuthenticated,
  getUserItems,
  user,
  authenticated,
  useritems,
}) {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);
  const [value, setValue] = useState(0);

  const [characterPopup, setCharacterPopup] = useState(false);
  const [stopPopupClick, setStopPopupClick] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [userAddress, setUserAddress] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function asyncFn() {
      let walletAvailable = await checkWalletAvailable();

      if (walletAvailable) {
        const accountAddress = await getUserAddress();
        let networkStatus = await checkCorrectNetwork();

        if (networkStatus) {
          console.log("2. Correct Network");
          let authenticated = await checkAuthenticated();

          if (authenticated) {
            setUserAddress(accountAddress);
            setActualCase(4);
          } else {
            setActualCase(3);
          }
        } else {
          setActualCase(2);
        }
      } else {
        setActualCase(1);
      }
    }
    asyncFn();
  }, []);

  return (
    <div>
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
      {actualCase === 4 && authenticated && (
        <div className={classes.background}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div>
                  <div>
                    <h6 htmlFor="ranking" className={classes.ranking}>
                      {" "}
                      #436
                    </h6>
                    <h1
                      htmlFor="characterType"
                      className={classes.chracterType}
                    >
                      Warrior{" "}
                      <img src="images/swords.png" height="30px" alt="level" />
                    </h1>
                  </div>

                  <h6 htmlFor="username" className={classes.username}>
                    Tahir Ahmad
                  </h6>
                  <h6 htmlFor="username" className={classes.address}>
                  
                  {[...'0xBE83D4d9F1e6ceF1224aF277f280a6afA46b8dCc'].splice(0, 7)} {"..."}
                                      {[...'0xBE83D4d9F1e6ceF1224aF277f280a6afA46b8dCc'].splice(
                                        [...'0xBE83D4d9F1e6ceF1224aF277f280a6afA46b8dCc'].length - 7,
                                        7
                                      )}
                                    <IconButton style={{padding:0}}>  <FileCopy className={classes.copyIcon}/></IconButton>
                  </h6>
                  
                  <div className="my-3">
                    <CharacterDisplay />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <div className="my-3">
                    <CharacterOverview />
                  </div>
                  <div className="my-3">
                    <CharacterStats />
                  </div>
                  <div className="my-3">
                    <CharacterItems />
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mt-5 text-center">
            <div>
              <div className="text-center mt-3">
                <img
                  src={"images/avatar.jpg"}
                  height="100px"
                  alt="profile"
                  className={classes.avatarWrapper}
                />
              </div>
              <h6 className={classes.titleAddress}>( {userAddress} )</h6>
              {characters.length !== 0 && (
                <div>
                  <div className="d-flex flex-row justify-content-center align-items-start">
                    <div className={classes.title}>{user.username}</div>
                    <div
                      className="d-flex flex-row justify-content-center align-items-start"
                      style={{ paddingLeft: 10 }}
                    >
                      <div className="d-flex justify-content-center align-items-center ">
                        <h6
                          style={{
                            color: "white",
                            fontSize: 14,
                            paddingTop: 10,
                            paddingRight: 5,
                          }}
                        ></h6>

                        <div className={classes.iconWrapper}>
                          <img
                            src="images/swords.png"
                            height="20px"
                            alt="level"
                          />
                        </div>
                        <h6 className={classes.levelText}>
                          {characters[0].level} )
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    {" "}
                    <h6 style={{ color: "yellow", fontSize: 14 }}>
                      {characters[0].name}
                    </h6>{" "}
                  </div>
                </div>
              )}
              <div className="mt-3"></div>
              <div className={classes.tabWrapper}>
                <Paper square className={classes.tabs}>
                  <Tabs
                    style={{ color: "black" }}
                    value={value}
                    indicatorColor="primary"
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <Tab label="Characters" className={classes.tab} />
                    <Tab label="On Sale" className={classes.tab} />
                    <Tab label="Items Bag" className={classes.tab} />
                    <Tab label="History battles" className={classes.tab} />
                    <Tab label="Activities" className={classes.tab} />
                  </Tabs>
                </Paper>
                <div style={{ maxWidth: 1000 }}>
                  <TabPanel value={value} index={0}>
                    <CharacterSection />
                  </TabPanel>

                  <TabPanel value={value} index={1}>
                    <div className="text-center">
                      <div className="my-3">
                        <img
                          src="./images/swords.png"
                          height="100px"
                          alt="sale"
                        />
                      </div>
                      <div className="text-center">
                        <h6 className={classes.title}>No items found</h6>
                        <div className="d-flex justify-content-center">
                          <p className={classes.subheading}>
                            Come back soon! Or try to browse something for you
                            on our marketplace
                          </p>
                        </div>
                      </div>
                      <div className={classes.buttonWrapper}>
                        <CustomButton title="Put on sale" />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <ItemSection />
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <div className="text-center">
                      <div className="my-3">
                        <img
                          src="./images/swords.png"
                          height="100px"
                          alt="battle"
                        />
                      </div>
                      <div className="text-center">
                        <h6 className={classes.title}>No items found</h6>
                        <div className="d-flex justify-content-center">
                          <p className={classes.subheading}>
                            Come back soon! Or try to browse something for you
                            on our marketplace
                          </p>
                        </div>
                      </div>
                      <div className={classes.buttonWrapper}>
                        <CustomButton title="Challenge players" alt="battle" />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    <div className="text-center">
                      <div className="my-3">
                        <img
                          src="./images/swords.png"
                          height="100px"
                          alt="activity"
                        />
                      </div>
                      <div className="text-center">
                        <h6 className={classes.title}>No Activity found</h6>
                        <div className="d-flex justify-content-center">
                          <p className={classes.subheading}>
                            Come back soon! Or try to browse something for you
                            on our marketplace
                          </p>
                        </div>
                      </div>
                      <div className={classes.buttonWrapper}>
                        <CustomButton title="Join battle" />
                      </div>
                    </div>
                  </TabPanel>
                </div>
              </div>
            </div>
          </div>
       */}
        </div>
      )}
    </div>
  );
}

Profile.propTypes = {
  authenticateUser: propTypes.func.isRequired,
  getUserItems: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
  useritems: state.items.useritems,
});

const mapDispatchToProps = {
  authenticateUser,
  getUserItems,
  checkAuthenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
