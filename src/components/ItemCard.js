import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, CardHeader, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { FavoriteBorderOutlined } from '@material-ui/icons';

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
  },

  card: {
    width: 300,
    height: 450,
    borderRadius: 10,
    border: '1px solid #e5e5e5',
    marginBottom: 30,
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
}));
export default function ItemCard({ item }) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card} elevation={0}>
        <CardHeader
          avatar={<Avatar aria-label="owner" src={item.avatar} />}
          action={
            <div className="d-flex flex-column justify-content-center">
              <IconButton style={{ margin: 0, paddingBottom: 0 }}>
                <FavoriteBorderOutlined />
              </IconButton>
              <p className={classes.wishlisted}>{item.wishlisted}</p>
            </div>
          }
          title={
            <Typography variant="h6" className={classes.owner}>
              {item.owner}
            </Typography>
          }
          subheader="Owner"
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
        </CardContent>
      </Card>
    </div>
  );
}
