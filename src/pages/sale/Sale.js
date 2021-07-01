import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Slide } from '@material-ui/core';
import { getItem } from './../../actions/itemActions';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemSaleCard from '../../components/ItemSaleCard';

import Timer from '../../components/Timer';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
      flexDirection: 'column',
      justifyContent: 'start',
      height: '100%',
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
  },
  banner: {
    height: 280,
    width: 900,
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(3, 3, 3, 0.02) ),url("/images/banner.jpg")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
      fontSize: 22,
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
      fontSize: 22,
      lineHeight: '30.7px',
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
      fontSize: 22,
      lineHeight: '30.7px',
    },
  },
  price: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '30.7px',
  },
  description: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textSecondary,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '25.7px',
    maxWidth: 500,
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
  categoryTab: {
    display: 'inline-block',
    border: '1px solid #616161',
    borderRadius: '20px',
    fontSize: 16,
    fontWeight: 500,
    padding: '8px 20px 8px 20px',
    minWidth: '60px',
    marginTop: 10,
    marginBottom: 10,
    cursor: 'pointer',
    color: theme.palette.pbr.textPrimary,
    [theme.breakpoints.down('md')]: {
      padding: '6px 14px 6px 14px',
      fontSize: 13,
      height: '35px',
      marginRight: '5px',
    },
  },
  buyHistory: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 22,
    lineHeight: '30.7px',
    [theme.breakpoints.down('md')]: {
      fontSize: 20,
    },
  },
  levelText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 15,
    paddingTop: 10,
    paddingRight: 10,
  },
  imageWrapper: {
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
}));

function Details() {
  const classes = useStyles();

  let saleItems = [
    {
      name: 'Lightening Sword',
      price: '2.0',
      currency: 'BNB',
      description: 'Base Damage: 30, Bonus: +7%, Accuracy: +5',
      level: 3,
      image: 'QmZ8K4DxcKJjYUsSqQDBXzXBeaWcpt96Yuy9Cg3nu2hXx5',
      category: 'sword',
      gallery: [
        'QmV5ePoHh2XGzPmhxy5b3NGriauCfHqxoT7M2pLSWzujVu',
        'QmWo1CTuCVie2N8EKhFaBXA5FUP9Luj1sjJBZLUyy8ssb4',
        'QmeeG3xVTnGt19hVcZcfruw15aWSGohPudebX8U7nNez9X',
      ],
    },
    {
      name: 'Knife',
      price: '2.0',
      currency: 'BNB',
      description: 'Base Damage: 32, Bonus: +5%, Accuracy: +4',
      level: 3,
      image: 'Qmb69r56kXY4Z6w3ZJUuu7qSyNZYhdfLVPjckzhmKgQihB',
      category: 'big knife',
    },
    {
      name: 'Bow',
      price: '2.0',
      currency: 'BNB',
      description: 'Base Damage: 29, Bonus: +9%, Accuracy: +4',
      level: 3,
      image: 'QmXhj7e9X3SYRegodCWPDqWo5wvHeCFCELr7bWgvKQxcBR',
      category: 'bow & arrow',
      gallery: [
        'QmVYVp3RhTL2BgdLg4CPejuxPDcMRjiWv6f218vPZa4xYg',
        'QmYu9frvTRuySJYupkYthz77fMH9dg1ugiri4fHUuuGRTX',
        'QmPQwFLd5YukQUqF7RGxTvaJQUGemqKqH9mYVea5uETmNR',
      ],
    },
    {
      name: 'Light Gun',
      price: '2.0',
      currency: 'BNB',
      description: 'Base Damage: 36, Bonus: +5%, Accuracy: +3',
      level: 3,
      image: 'QmPgyQnuzXdLzWHJ9J21HSPF3oBjtAZXtS7jLvVRu7NBGv',
      category: 'gun',
    },
    {
      name: 'Tessen',
      price: '2.0',
      currency: 'BNB',
      description: 'Base Damage: 26, Bonus: +8%, Accuracy: +4',
      level: 3,
      image: 'Qmd8HcuLGaJ8t2v77hhYNFpVgPHniDKiwTE6FwZzyjEURm',
      category: 'tessen',
    },
  ];
  return (
    <div>
      <div className="text-center">
        <h1 className={classes.title}>
          Flash Sale <img src="images/thunder.png" height="20px" alt="thunder" />
        </h1>
        {/* <h6 className={classes.para}>100 limited edition NFTs are on sale 72 Hrs only at discounted price.</h6> */}
      </div>
      <div className={classes.mainCard}>
        <div className={classes.sectionCard1}>
          <div className={classes.banner}></div>
          <div className={classes.timerBox}>
            <h1 className={classes.ends}>Sale Ends in: </h1>
            <h6 style={{ color: 'white' }}>
              <Timer endTime={'July 2, 2021 00:00:00 UTC'} />
            </h6>
          </div>
          <div className="row mt-3">
            {saleItems.map((singleItem) => {
              return (
                <div className="col-12">
                  <div className="d-flex flex-column justify-content-center">
                    <ItemSaleCard item={singleItem} />
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

Details.propTypes = {
  getItem: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  singleItem: state.items.item,
});

const mapDispatchToProps = { getItem };

export default connect(mapStateToProps, mapDispatchToProps)(Details);
