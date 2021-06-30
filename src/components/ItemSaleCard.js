import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import imageBaseUrl from './../actions/imageBaseUrl';

const useStyles = makeStyles((theme) => ({
  card1: {
    width: 900,
    height: 250,
    borderRadius: 14,
    border: '1px solid #e5e5e5',
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: theme.palette.pbr.textPrimaryOpp,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 250,
    },
  },

  media: {
    height: 200,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      height: 150,
    },
  },
  title: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 700,
    letterSpacing: 1,
    fontSize: 22,
    lineHeight: '35.7px',
    fontFamily: 'Balsamiq Sans',
    [theme.breakpoints.down('md')]: {
      fontWeight: 700,
      fontSize: 12,
    },
  },
  section2: {
    paddingLeft: 15,
  },
  priceStrike: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 400,
    letterSpacing: '0.1px',
    fontSize: 20,
    lineHeight: '30px',
    fontFamily: 'Balsamiq Sans',
    [theme.breakpoints.down('md')]: {
      fontWeight: 300,
      fontSize: 15,
    },
  },
  price: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: 'yellow',
    fontWeight: 700,
    letterSpacing: '0.1px',
    fontSize: 20,
    lineHeight: '30px',
    fontFamily: 'Balsamiq Sans',
    paddingLeft: 10,
    [theme.breakpoints.down('md')]: {
      fontWeight: 300,
      fontSize: 15,
    },
  },
  ownerCount: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
    padding: 0,
    margin: 0,
  },
  icon: {
    color: 'orange',
    fontSize: 30,
  },
  levelImage: {
    height: '16px',
    [theme.breakpoints.down('sm')]: {
      height: '12px',
    },
  },
  levelText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 15,
    paddingTop: 10,
    paddingRight: 10,
    display: 'block',

    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      paddingTop: 10,
      paddingRight: 5,
    },
  },

  priceBadgeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    paddingTop: 20,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 5,
    },
  },
  pricingBadge: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    padding: '2px 10px 2px 10px',
    borderRadius: 50,
    width: 400,
    fontFamily: 'Balsamiq Sans',
    fontWeight: 700,
    fontSize: 18,
    height: 36,
    color: 'white',
    [theme.breakpoints.down('md')]: {
      width: 400,
      textAlign: 'center',
      background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
      padding: '2px 7px 2px 7px',

      height: 26,
      lineHeight: '16px',
    },
  },

  pricingText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      fontWeight: 600,
    },
  },

  buyNowButton: {
    textAlign: 'center',
    background: `linear-gradient(to bottom,#ffffff, yellow)`,
    padding: '8px 16px 8px 16px',
    borderRadius: 50,
    color: 'black',
    fontSize: 14,
    fontWeight: 500,
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '4px 8px 4px 8px',
      fontSize: 10,
    },
  },
}));

export default function ItemSaleCard({ item }) {
  const classes = useStyles();

  return (
    <div>
      <Link>
        <Card className={classes.card1} elevation={0}>
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-start">
              <div className="text-center">
                <img
                  alt="item"
                  src={`${imageBaseUrl}/QmZ8K4DxcKJjYUsSqQDBXzXBeaWcpt96Yuy9Cg3nu2hXx5`}
                  className={classes.media}
                />
              </div>
              <div className={classes.section2}>
                <h6 className={classes.title}>{item.name}</h6>
                <div className="d-flex justify-content-start">
                  <h6 className={classes.priceStrike}>
                    <strike>
                      {item.price} {item.currency}
                    </strike>
                  </h6>
                  <h6 className={classes.price}>0.5 {item.currency}</h6>
                </div>
                <div className="d-flex justify-content-start align-items-center">
                  <h6 className={classes.levelText}>Level : </h6>
                  <div className={classes.iconWrapper}>
                    {Array.from(Array(item.level)).map((character) => {
                      return (
                        <img
                          alt="level"
                          src="https://pngimg.com/uploads/star/star_PNG1597.png"
                          className={classes.levelImage}
                        />
                      );
                    })}
                  </div>
                </div>{' '}
                <div className="d-flex justify-content-between mt-2">
                  <div className={classes.priceBadgeWrapper}>
                    <h4 className={classes.pricingBadge}>19 Available</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <Button variant="contained" className={classes.buyNowButton}>
                <span>Buy Now</span>
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
