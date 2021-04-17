import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, CardHeader, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 50,
    height: 50,
    [theme.breakpoints.down('sm')]: {
      width: 40,
      height: 40,
    },
  },
  itemWrapper: {
    // border: '1px solid #e9e9e9',
    // borderRadius: 10,
    // marginBottom: 10,
    // padding: 5,
    width: 300,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 20,
    },
  },
  number: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textSecondary,
    fontWeight: 500,
    fontSize: 14,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },

  title: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 16,
    lineHeight: '20.7px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      fontWeight: 600,
    },
  },
  subheading: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textSecondary,
    fontWeight: 500,
    fontSize: 14,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      fontWeight: 500,
    },
  },
  avatarWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: 'white',
    borderRadius: '50%',
    height: 20,
    [theme.breakpoints.down('sm')]: {
      top: 25,
    },
  },
}));
export default function UserFlatCard({ item, index }) {
  const classes = useStyles();

  return (
    <div className={classes.itemWrapper}>
      <div className="d-flex flex-row align-items-center">
        <div>
          <Typography variant="body1" className={classes.number}>
            {index}
          </Typography>
        </div>

        <CardHeader
          avatar={
            <div className={classes.avatarWrapper}>
              <Avatar aria-label="seller" className={classes.avatar} src={item.imageUrl} />
              <img src="images/badge.svg" className={classes.badge} />
            </div>
          }
          title={
            <Typography variant="h6" className={classes.title}>
              {item.name}
            </Typography>
          }
          subheader={
            <Typography variant="body2" className={classes.subheading}>
              {item.balance} ETH
            </Typography>
          }
        />
      </div>
    </div>
  );
}
