import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../components/TabPanel';
import CustomButton from '../../components/CustomButton';
import CustomeTable from '../../components/CustomTable';

const useStyles = makeStyles((theme) => ({
  title: {
    verticalAlign: 'baseline',
    textAlign: 'left',
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 32,
    lineHeight: '40.7px',
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
  },
}));

export default function Details() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const item = {
    owner: 'Elvin Que',
    avatar: 'https://www.transparentpng.com/thumb/sword/ItXk4y-sword-transparent.png',
    item_name: 'Metalic Lightening Sward ',
    price: '0.07',
    level: 3,
    item_count: '0.7',
    bid: '0.5',
    wishlisted: '76',
    imageUrl: 'https://www.transparentpng.com/thumb/sword/ItXk4y-sword-transparent.png',
  };
  return (
    <Fragment>
      <div className="row g-0 mt-5">
        <div className="col-12 col-md-7">
          <div className="text-center">
            <img src={item.imageUrl} />
          </div>
        </div>
        <div className="col-12 col-md-5 p-3">
          <div>
            {' '}
            <div className="d-flex justify-content-center align-items-center mt-2">
              <h6 className={classes.levelText}>Level : </h6>
              <div className={classes.iconWrapper}>
                {Array.from(Array(item.level)).map((character) => {
                  return <img src="images/favourites.png" height="16px" />;
                })}
              </div>
            </div>
          </div>
          <h5 className={classes.title}>{item.item_name}</h5>
          <h6 className={classes.price}>
            {item.price} ETH <span style={{ color: '#bdbdbd', paddingLeft: 10 }}>$18.16</span>
          </h6>
          <div className={classes.categoryTab}>
            <img
              src="https://www.freepnglogos.com/uploads/sword-png/sword-weapon-knighthood-vector-graphic-pixabay-21.png"
              height="25px"
              style={{ paddingRight: 10 }}
            />
            Sword
          </div>
          <p className={classes.description}>
            Overload of information makes it harder to focus. When there is more information in our head than we can
            effectively process, our brain starts to rush from one idea to another. Think of it as a form of mental
            multitasking that makes your brain jump from one thought to another.
          </p>{' '}
          <div>
            <h6 className={classes.buyHistory}>Buy History</h6>
            <hr style={{ color: 'yellow' }} />
            <CustomeTable />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
