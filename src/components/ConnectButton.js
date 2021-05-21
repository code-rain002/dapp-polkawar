import { useState } from 'react';
import { Button } from '@material-ui/core';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { authenticateUser } from './../actions/authActions';

import web3 from './../web';

const useStyles = makeStyles((theme) => ({
  button: {
    color: 'white',
    backgroundColor: 'white',
    textTransform: 'none',
    borderRadius: '50px',
    padding: '8px 16px 8px 16px',
    fontWeight: 600,
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    fontSize: 14,
  },
}));

function ConnectButton({ authenticateUser }) {
  const classes = useStyles();
  const [error, setError] = useState('');

  const checkNetwork = () => {
    if (web3.currentProvider.networkVersion === '56') {
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
      setError('Wrong Network!');
    }
  };

  return (
    <div className="my-5 text-center">
      <div className="mt-5 text-center">
        <h4 style={{ color: 'yellow' }}>Missing Wallet!</h4>
        <p style={{ color: 'white' }}>Connect your wallet first and then only you can claim airdrop.</p>
      </div>
      <div className="mt-5">
        <Button className={classes.button} onClick={connectWallet}>
          {web3 !== undefined ? 'Connect your wallet' : 'Missing Metamask!'}
        </Button>
        <div className="mt-2" style={{ color: 'yellow' }}>
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
  user: state.auth.user,
});

const mapDispatchToProps = { authenticateUser };

export default connect(mapStateToProps, mapDispatchToProps)(ConnectButton);
