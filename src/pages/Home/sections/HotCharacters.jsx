import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CharacterCard from '../../../components/CharacterCard';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.pbr.textPrimary,
    textAlign: 'left',
    fontSize: '2.08vw',
    lineHeight: '41.4px',
    fontWeight: 800,
    verticalAlign: 'middle',
  },

  scrollItemPositions: {
    display: 'flex',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'start',
    },
  },
  characterScroll: {
    whiteSpace: 'noWrap',
    overflowX: 'auto',
    paddingTop: 10,
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
    },
  },
}));

export default function HotCharacters() {
  const classes = useStyles();
  const topCharacters = [
    {
      id: 1,
      item_name: 'Paul Walling',
      level: 39,
      imageUrl: 'http://pngimg.com/uploads/ninja/ninja_PNG18.png',
    },
    {
      id: 2,
      item_name: 'Julia Sen',
      level: 13,
      imageUrl: 'https://casinoburst.com/wp-content/uploads/2017/11/NetEnt-Game-Character.png',
    },
    {
      id: 3,
      item_name: 'Robert Clawn',
      level: 267,
      imageUrl:
        'https://profiles.bugcrowdusercontent.com/avatars/0c9ebb2ded806d7ffda75cd0b95eb70c/Ninja1024x1024-1024x1024.png',
    },
    {
      id: 4,
      item_name: 'Kakie Jhan',
      level: 54,
      imageUrl: 'https://s3.amazonaws.com/gameartpartnersimagehost/wp-content/uploads/edd/2015/08/Featured-Image6.png',
    },
  ];

  return (
    <Fragment>
      <div>
        <h1 className="heading">Hot characters</h1>
      </div>

      <div className={classes.characterScroll}>
        <div className={classes.scrollItemPositions}>
          {topCharacters.map((character, index) => {
            return (
              <div className="p-3">
                <CharacterCard item={character} />
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}
