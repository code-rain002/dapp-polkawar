import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getFlashItems, getUserItems } from './../../actions/itemActions';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemSaleCard from '../../components/ItemSaleCard';

import Timer from '../../components/Timer';

const useStyles = makeStyles((theme) => ({
  mainCard: {
    height: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {

      height: '100%',
      width: '100%',
    },
  },
  sectionCard1: {
    backgroundColor: 'transparent',
    marginTop: 20,
    height: 550,
    width: 900,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 20,
    borderRadius: 20,
    filter: `drop-shadow(0 0 0.9rem #1a237e)`,
    [theme.breakpoints.down('md')]: {
      width: 300,
    },
  },
  banner: {
    height: 280,
    width: 900,
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(3, 3, 3, 0.02) ),url("/images/banner.jpg")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100px',
    },
  },
  title: {
    verticalAlign: 'baseline',
    color: 'yellow',
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: '2.08vw',
    lineHeight: '40.7px',
    textAlign: 'center',
    paddingTop: 20,
    [theme.breakpoints.down('md')]: {
      fontSize: 20,
      lineHeight: '30.7px',
    },
  },

  para: {
    verticalAlign: 'baseline',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 300,
    letterSpacing: 0.5,
    fontSize: 12,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
  timerBox: {
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'center',

  },
  ends: {
    verticalAlign: 'baseline',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 400,
    letterSpacing: 0.5,
    fontSize: 15,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: 20,

    },
  },


}));

function FlashSale({ getFlashItems, getUserItems, flash, }) {
  const classes = useStyles();

  useEffect(() => {
    async function asyncFn() {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      let userAddress = accounts[0];
      getFlashItems();
      getUserItems(userAddress);
    }
    asyncFn();
  }, []);

  let nftHashList = {
    Sword: 'Qma1PHjHqtf8BgMUKwLw2jpWpPdxJwMbPzmPXttApTWGes',
    Gun: 'QmctTBBWEpCSvcW5UqESPKxpnRq2YFSNujsxin6jcw6Vp3',
    'Big Knife': 'QmSeaVVXmWdpgK8UbNNKRxyCLjRQHQL54V4d1ejMHP1jSr',
    Tessen: 'QmQKCSr4r2oR9HwfDt9KZ3uGDRdMJFTZHEXEyiTWhPLN7a',
    Bow: 'QmZ1sRwD8H56Y5Szaor78vemhfrihNAmCtPuEipK4wRqJK',
  };
  return (
    <div>
      <div className="text-center">
        <h1 className={classes.title}>
          Flash Sale <img src="images/thunder.png" height="20px" alt="thunder" />
        </h1>
        <h6 className={classes.para}>You must HODL or STAKE 2000 PWAR Tokens to participate in flash sale.</h6>
      </div>
      <div className={classes.mainCard}>
        <div className={classes.sectionCard1}>
          <div className={classes.banner}></div>
          <div className={classes.timerBox}>
            <h1 className={classes.ends}>Sale Ends in: </h1>
            <h6 style={{ color: 'white' }}>
              <Timer endTime={'July 8, 2021 00:00:00 UTC'} />
            </h6>
          </div>
          <div className="row mt-3">
            {flash.length !== 0 &&
              flash.map((singleItem) => {
                return (
                  <div className="col-12">
                    <div className="d-flex flex-column justify-content-center">
                      <ItemSaleCard item={singleItem} nftHashList={nftHashList} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

FlashSale.propTypes = {
  getFlashItems: propTypes.func.isRequired,
  getUserItems: propTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  flash: state.items.flash,
  useritems: state.items.useritems,

});

const mapDispatchToProps = { getFlashItems, getUserItems };

export default connect(mapStateToProps, mapDispatchToProps)(FlashSale);
