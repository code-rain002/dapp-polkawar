import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, CardHeader, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { FavoriteBorderOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 50,
    height: 50,
  },
  owner: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 600,
    fontSize: 14,
  },
  title: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 16,
    lineHeight: '20.7px',
  },
  price: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '15.7px',
  },
  items: {
    paddingLeft: 10,
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textSecondary,
    fontWeight: 700,
    fontSize: 14,
  },
  bid: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    fontWeight: 700,
    fontSize: 12,
    color: theme.palette.pbr.textPrimary,
  },

  card: {
    width: 300,
    height: 450,
    borderRadius: 10,
    border: '1px solid #e5e5e5',
    marginBottom: 30,
    backgroundColor: theme.palette.pbr.textPrimaryOpp,
  },

  media: {
    height: '100%',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  mediaWrapper: {
    height: 260,
    textAlign: 'center',
  },
  wishlisted: {
    fontSize: 12,
    padding: 0,
    margin: 0,
    textAlign: 'center',
    fontWeight: 800,
    color: theme.palette.pbr.textSecondary,
  },
  icon: {
    color: theme.palette.pbr.textSecondary,
  },

  //
  card1: {
    width: 300,
    height: 450,
    borderRadius: 20,
    border: '4px solid #e5e5e5',
    marginBottom: 30,
    backgroundColor: theme.palette.pbr.textPrimaryOpp,
  },
  cardHeader: {
    height: 60,
    backgroundColor: theme.palette.pbr.primary,
  },
  title1: {
    verticalAlign: 'baseline',
    textAlign: 'center',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 900,
    letterSpacing: 1,
    fontSize: 26,
    lineHeight: '35.7px',
    fontFamily: 'Carter One',
  },
  mediaWrapper1: {
    height: 220,
    textAlign: 'center',
  },
  icon: {
    color: 'orange',
    fontSize: 30,
  },

  levelText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 15,
    paddingTop: 10,
    paddingRight: 10,
  },
  iconWrapper: {
    paddingRight: 7,
  },
}));
export default function ItemCard({ item }) {
  const classes = useStyles();

  return (
    <div>
      <Link to={`character/${item.id}`}>
        <Card className={classes.card1} elevation={0}>
          <div className="d-flex justify-content-between">
            <div
              style={{
                display: 'inline-block',
                paddingTop: 20,
              }}>
              <h4
                style={{
                  textAlign: 'left',
                  background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
                  padding: '2px 10px 2px 10px',
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  height: 36,
                }}>
                <span
                  style={{
                    color: 'white',
                    fontSize: 15,
                    fontWeight: 700,
                  }}>
                  {item.price} ETH
                </span>
              </h4>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-2">
              <h6 className={classes.levelText}>Level : </h6>
              <div className={classes.iconWrapper}>
                {Array.from(Array(item.level)).map((character) => {
                  return <img src="https://pngimg.com/uploads/star/star_PNG1597.png" height="16px" />;
                })}
              </div>
            </div>
          </div>
          <div className={classes.mediaWrapper1}>
            <img src={item.imageUrl} className={classes.media} />
          </div>
          <div>
            <h4 className={classes.title1}>{item.item_name}</h4>
            <p style={{ color: 'white', textAlign: 'center', fontSize: 10, padding: 0, margin: 0 }}>Owned by</p>
            <p style={{ color: 'white', textAlign: 'center', fontSize: 13, padding: 0, margin: 0 }}>{item.owner}</p>
          </div>
          <div className="text-center mt-4">
            <Button
              variant="contained"
              style={{
                textAlign: 'center',
                background: `linear-gradient(to bottom,#ffffff, #e5e5e5)`,
                padding: '8px 16px 8px 16px',
                borderRadius: 50,
              }}>
              <span
                style={{
                  color: 'black',
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: 'none',
                }}>
                Buy Now
              </span>
            </Button>
          </div>
          {/* <CardHeader
          avatar={<Avatar aria-label="owner" src={item.avatar} />}
          action={
            <div className="d-flex flex-column justify-content-center">
              <IconButton style={{ margin: 0, paddingBottom: 0 }}>
                <FavoriteBorderOutlined className={classes.icon} />
              </IconButton>
              <p className={classes.wishlisted}>{item.wishlisted}</p>
            </div>
          }
          title={
            <Typography variant="h6" className={classes.owner}>
              {item.owner}
            </Typography>
          }
        />
        <div className={classes.mediaWrapper}>
          <img src={item.imageUrl} className={classes.media} />
        </div>
        <CardContent>
          <h4 className={classes.title}>{item.item_name}</h4>
          <h5 className={classes.price}>
            0.5 ETH <span className={classes.items}>5 of 5</span>
          </h5>
          <h6 className={classes.bid}>
            Bid <span className="raindboxText">0.05 WETH</span>
          </h6>
        </CardContent> */}
        </Card>
      </Link>
    </div>
  );
}
