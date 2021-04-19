import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Card, CardHeader, Typography } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  media: {
    height: '100%',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },

  icon: {
    color: 'orange',
    fontSize: 30,
  },

  levelText: {
    color: 'white',
    fontWeight: 700,
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 5,
  },
  card: {
    width: 300,
    height: 420,
    borderRadius: 16,
    border: '4px solid #e5e5e5',
    marginBottom: 30,
    backgroundColor: theme.palette.pbr.textPrimaryOpp,
  },
  cardHeader: {
    height: 60,
    backgroundColor: theme.palette.pbr.primary,
  },
  title: {
    verticalAlign: 'baseline',
    textAlign: 'center',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 900,
    letterSpacing: 1,
    fontSize: 26,
    lineHeight: '35.7px',
    fontFamily: 'Carter One',
  },
  mediaWrapper: {
    height: 220,
    textAlign: 'center',
  },
}));
export default function CharacterCard({ item, index }) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card} elevation={0}>
        {/* <div className="d-flex justify-content-center align-items-center mt-2">
            <div className={classes.iconWrapper}>
              <img src="images/uniform.png" height="28px" />
            </div>
            <h6 className={classes.levelText}>{item.level} </h6>
          </div> */}
        <div className="d-flex flex-row justify-content-center align-items-end" style={{ paddingRight: 10 }}>
          <div className="d-flex justify-content-center align-items-center mt-2">
            <h6 style={{ color: 'white', fontSize: 14, paddingTop: 10, paddingRight: 5 }}>Level: </h6>

            <div className={classes.iconWrapper}>
              <img src="images/swords.png" height="24px" />
            </div>
            <h6 className={classes.levelText}>{item.level} </h6>
          </div>
          {/* <h6 style={{ color: 'white', fontSize: 12 }}>Level </h6> */}
        </div>
        <div className={classes.mediaWrapper}>
          <img src={item.imageUrl} className={classes.media} />
        </div>
        <div className="mt-5">
          <h4 className={classes.title}>{item.item_name}</h4>
          {/* <p style={{ color: 'white', textAlign: 'center', fontSize: 10, padding: 0, margin: 0 }}>Owned by</p>
            <p style={{ color: 'white', textAlign: 'center', fontSize: 13, padding: 0, margin: 0 }}>{item.owner}</p> */}
        </div>
      </Card>
    </div>
  );
}
