import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CharacterCard from '../../../components/CharacterCard';
import { getCharacters } from './../../../actions/characterActions';

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
    justifyContent: 'start',
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

function HotCharacters({ characters, getCharacters }) {
  const classes = useStyles();
  const [charactersList, setCharactersList] = useState([]);

  useEffect(() => {
    getCharacters();
  }, []);

  useEffect(() => {
    if (characters !== null) {
      setCharactersList(characters);
    }
  }, [characters]);

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
          {charactersList.map((character, index) => {
            return (
              <div style={{ paddingRight: 15, flexBasis: '25%' }}>
                <CharacterCard item={character} />
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

HotCharacters.propTypes = {
  getCharacters: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  characters: state.characters.characters,
});

const mapDispatchToProps = { getCharacters };

export default connect(mapStateToProps, mapDispatchToProps)(HotCharacters);
