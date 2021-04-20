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
  charactersWrapper: {
    width: 'auto',
    overflowX: 'scroll',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      overflowX: 'hidden',
    },
  },
}));

export default function HotCharacters() {
  const classes = useStyles();
  const [chunkedTopSellers, setChunkedTopSellers] = useState([]);
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

  // useEffect(() => {
  //   setChunkedTopSellers(chunkArray(topSellers, 3));
  // }, []);

  // function chunkArray(arr, chunk_size) {
  //   var results = [];

  //   while (arr.length) {
  //     results.push(arr.splice(0, chunk_size));
  //   }

  //   return results;
  // }
  return (
    <Fragment>
      <div>
        <h1 className="heading">
          Hot characters
          {/* <span className="highlight"></span> in <span className="highlight">1 day</span> */}
        </h1>
      </div>

      <div className="row  mt-3">
        {topCharacters.map((character, index) => {
          return (
            <div className="col-6 col-md-3 " key={index}>
              <div className="d-flex justify-content-center">
                <CharacterCard item={character} />
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
