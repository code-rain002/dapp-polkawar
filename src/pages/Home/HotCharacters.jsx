import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserFlatCard from '../../components/UserFlatCard';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.pbr.textPrimary,
    textAlign: 'left',
    fontSize: '2.08vw',
    lineHeight: '41.4px',
    fontWeight: 800,
    verticalAlign: 'middle',
  },
}));

export default function HotCharacters() {
  const classes = useStyles();
  const [chunkedTopSellers, setChunkedTopSellers] = useState([]);
  const topSellers = [
    {
      name: 'Saltbae Nusret',
      balance: '43',
      imageUrl: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
    },
    {
      name: 'Saltbae Nusret',
      balance: '37',
      imageUrl:
        'https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmVJf6amJWKpZRVNLxxR2k2HZANTeY83rPFSQuhACJpTp3&w=100',
    },
    {
      name: 'Saltbae Nusret',
      balance: '43',
      imageUrl: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
    },
    {
      name: 'Elon Nusret',
      balance: '43',
      imageUrl:
        'https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmUTqvHHaDoXGdvpEkuDp2KMXip5BZK5hkc4fmfD4k2awQ&w=100',
    },
    {
      name: 'Mr Cookies',
      balance: '43',
      imageUrl:
        'https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmXSkZw93KeQTv9eKAdbLTHPirQ4bmjwWKwvyxrWYf7q4G&w=100',
    },
    {
      name: 'Saltbae Nusret',
      balance: '43',
      imageUrl: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
    },
    {
      name: 'Saltbae Nusret',
      balance: '43',
      imageUrl:
        'https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmXSkZw93KeQTv9eKAdbLTHPirQ4bmjwWKwvyxrWYf7q4G&w=100',
    },
    {
      name: 'Saltbae Nusret',
      balance: '43',
      imageUrl: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
    },
    {
      name: 'Ahmad Zain',
      balance: '43',
      imageUrl:
        'https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmUTqvHHaDoXGdvpEkuDp2KMXip5BZK5hkc4fmfD4k2awQ&w=100',
    },
    {
      name: 'Saltbae Nusret',
      balance: '43',
      imageUrl: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
    },
    {
      name: 'Habibi Workshop',
      balance: '43',
      imageUrl:
        'https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmXSkZw93KeQTv9eKAdbLTHPirQ4bmjwWKwvyxrWYf7q4G&w=100',
    },
    {
      name: 'Saltbae Nusret',
      balance: '43',
      imageUrl: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
    },
  ];

  useEffect(() => {
    setChunkedTopSellers(chunkArray(topSellers, 3));
  }, []);

  function chunkArray(arr, chunk_size) {
    var results = [];

    while (arr.length) {
      results.push(arr.splice(0, chunk_size));
    }

    return results;
  }
  return (
    <Fragment>
      <div>
        <h1 className="heading">
          Hot <span className="highlight">characters</span> in <span className="highlight">1 day</span>
        </h1>
      </div>

      <div className="d-flex justify-content-start" style={{ width: 'auto', overflowX: 'scroll' }}>
        {chunkedTopSellers.map((colItems, rowIndex) => {
          return (
            <div style={{ width: '100%' }}>
              {colItems.map((item, index) => (
                <div>
                  <UserFlatCard index={index + 1 + rowIndex * 3} item={item} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
