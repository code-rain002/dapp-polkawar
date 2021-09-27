import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import propTypes from "prop-types";
import { connect } from "react-redux";
import {
  authenticateUser,
  checkAuthenticated,
} from "./../../actions/authActions";
import {
  checkWalletAvailable,
  checkCorrectNetwork,
  getUserAddress,
} from "./../../actions/web3Actions";
import Loader from "../../components/Loader";
import ConnectButton from "../../components/ConnectButton";
import CharacterSection from "./CharacterSection";

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
}));

function Profile({ checkAuthenticated, authenticated }) {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);

  useEffect(() => {
    // Initial loading condition test
    async function asyncFn() {
      let walletAvailable = await checkWalletAvailable();

      if (walletAvailable) {
        let networkStatus = await checkCorrectNetwork();
        if (networkStatus) {
          let authenticated = await checkAuthenticated();
          if (authenticated) {
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
  }, [authenticated]);

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
        <div className="mt-5 text-center" style={{ minHeight: "58vh" }}>
          <ConnectButton />
        </div>
      )}
      {actualCase === 4 && authenticated && (
        <div className={classes.background}>
          <div className="container">
            <CharacterSection />
          </div>
        </div>
      )}
    </div>
  );
}

Profile.propTypes = {
  authenticateUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = {
  authenticateUser,
  checkAuthenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
