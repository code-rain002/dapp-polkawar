import { useState } from "react";
import { Button } from "@material-ui/core";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { authenticateUser } from "./../actions/authActions";
import {
  checkCorrectNetwork,
  checkWalletAvailable,
} from "../actions/web3Actions";

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
}));

function ConnectButton({ authenticateUser }) {
  const classes = useStyles();
  const [error, setError] = useState("");

  const connectWallet = async () => {
    let walletStatus = await checkWalletAvailable();

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
    </div>
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
