import React, { useState } from "react";
import { Button, Dialog, Backdrop, Slide } from "@material-ui/core";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { authenticateUser } from "./../actions/authActions";
import {
  checkCorrectNetwork,
  checkWalletAvailable,
} from "../actions/web3Actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    backgroundColor: "white",
    textTransform: "none",
    borderRadius: "50px",
    padding: "8px 16px 8px 16px",
    fontWeight: 600,
    background: `linear-gradient(to right,#D9047C, #BF1088)`,
    fontSize: 14,
  },
  metamaskButton: {
    color: "black",
    width: "100%",
    background: `linear-gradient(to bottom,yellow, orange)`,
    textTransform: "none",
    borderRadius: "50px",
    padding: "16px 32px 16px 32px",
    border: '1px solid #bdbdbd',
    fontWeight: 600,
    fontSize: 16,
  },
  c98Button: {
    color: "black",
    width: "100%",
    background: `linear-gradient(to bottom,yellow, orange)`,
    textTransform: "none",
    borderRadius: "50px",
    padding: "16px 32px 16px 32px",
    border: '1px solid #bdbdbd',
    fontWeight: 600,
    fontSize: 16,
  },
  heading: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
    paddingBottom: 20
  },
}));

function ConnectButton({ authenticateUser }) {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [popup, setPopup] = useState(false);

  const connectWallet = async () => {

    let walletStatus = await checkWalletAvailable();
    console.log(walletStatus)
    if (walletStatus) {
      let networkStatus = await checkCorrectNetwork();
      if (networkStatus) {
        authenticateUser();
        setError("");
      } else {
        setError("Only support BSC network");
      }
    } else {
      setError("Wallet Not Available.");
    }
  };


  return (
    <div className="my-5 text-center">
      <div className="mt-5 text-center">
        <h4 style={{ color: "yellow", fontSize: 16 }}>Missing Account!</h4>
        <p style={{ color: "white", fontSize: 14 }}>
          Connect your wallet first and then only you can claim airdrop.
        </p>
      </div>
      <div className="mt-3">
        <Button className={classes.button} onClick={connectWallet}>
          Connect your wallet
        </Button>

        <div className="mt-2" style={{ color: "yellow" }}>
          {error}
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

        BackdropProps={{
          timeout: 500,
        }}
        PaperProps={{
          style: {
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.81), rgba(3, 3, 3, 0.72) ),url("https://w0.peakpx.com/wallpaper/919/43/HD-wallpaper-wallet-neon-icon-violet-background-neon-symbols-wallet-neon-icons-wallet-sign-financial-signs-wallet-icon-financial-icons.jpg")`,

            border: '2px solid #bdbdbd', borderRadius: 18, backgroundColor: "black",
          }
        }}
      >
        <div style={{ width: 400, }}>
          <div style={{ padding: 30, paddingTop: 50, paddingBottom: 50 }}>
            <h3 className={classes.heading}>Choose Wallet</h3>
            <div className="mb-3">
              <Button className={classes.metamaskButton} onClick={() => connectWallet(0)}>Metamask</Button>
            </div>
            <div>
              <Button className={classes.c98Button} onClick={() => connectWallet(1)}>Coin98</Button>
            </div>
          </div>
        </div>
      </Dialog > {" "}
    </div >
  );
}

ConnectButton.propTypes = {
  authenticateUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = { authenticateUser };

export default connect(mapStateToProps, mapDispatchToProps)(ConnectButton);
