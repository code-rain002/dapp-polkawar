import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ItemCard from '../../../components/ItemCard';
import { FilterList, Tune } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.pbr.textPrimary,
    textAlign: 'left',
    fontSize: '2.08vw',
    lineHeight: '41.4px',
    fontWeight: 800,
    verticalAlign: 'baseline',
  },
  categoryTab: {
    display: 'inline',
    border: '1px solid #616161',
    width: 'fit-content',

    borderRadius: '20px',
    fontSize: 15,
    fontWeight: 500,
    padding: '8px 20px 8px 20px',
    marginRight: '12px',
    cursor: 'pointer',
    height: '40px',

    color: theme.palette.pbr.textPrimary,
    [theme.breakpoints.down('md')]: {
      padding: '6px 14px 6px 14px',
      fontSize: 13,
      height: '35px',
      marginRight: '5px',
    },
  },
  categoryTabActive: {
    display: 'inline',
    width: 'fit-content',
    border: '1px solid #616161',
    borderRadius: '20px',
    fontSize: 15,
    fontWeight: 500,
    padding: '8px 20px 8px 20px',
    height: '40px',
    marginRight: '12px',
    cursor: 'pointer',
    backgroundColor: theme.palette.pbr.textPrimary,
    color: '#fffffff',
    [theme.breakpoints.down('md')]: {
      padding: '6px 14px 6px 14px',
      fontSize: 13,
      height: '35px',
      marginRight: '5px',
    },
  },
  sectionDesktop: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  sectionMobile: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  icon: {
    fontSize: 18,
  },

  filterTabsDesktop: {
    paddingTop: 15,
    paddingBottom: 15,

    whiteSpace: 'noWrap',
    overflowX: 'auto',
  },
  filterTabsMobile: {
    display: 'inline-block',
    paddingTop: 15,
    paddingBottom: 15,
    width: '100%',
    overflowX: 'scroll',
  },
}));

export default function Categories() {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  const items = [
    {
      id: 1,
      owner: 'Elvin Que',
      avatar: 'https://www.transparentpng.com/thumb/sword/ItXk4y-sword-transparent.png',
      item_name: 'Sward ',
      price: '0.7',
      level: 3,
      item_count: '0.7',
      bid: '0.5',
      wishlisted: '76',
      imageUrl: 'https://www.transparentpng.com/thumb/sword/ItXk4y-sword-transparent.png',
    },
    {
      id: 2,
      owner: 'Dareen Leh',
      avatar: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
      item_name: 'Katana',
      price: '0.8',
      level: 2,

      item_count: '0.7',
      bid: '0.5',
      wishlisted: '763',
      imageUrl: 'https://i.pinimg.com/originals/c7/56/cb/c756cb1964fbb8108c21adf34cabc2af.png',
    },
    {
      id: 3,
      owner: 'Elvin Que',
      avatar: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
      item_name: 'Bow and Arrow',
      price: '0.7',
      level: 1,

      item_count: '0.7',
      bid: '0.5',
      wishlisted: '76',
      imageUrl: 'https://cdn2.iconfinder.com/data/icons/flat-icons-19/512/Hunting_bow.png',
    },
    {
      id: 4,
      owner: 'Elvin Que',
      avatar:
        'https://lh3.googleusercontent.com/proxy/TtrgyCSW1oZphe2UJmk2eNxTjVmwIXhi3dWbn2K689Dx08_P-WT0AtJ3JmCQdAJehMvicxbavmDb3axnqjEwdKImUsF563243VVanY2UCvfPsEM2Fu04-D46TDE',
      item_name: 'Sward ',
      price: '0.7',
      item_count: '0.7',
      bid: '0.5',
      level: 4,

      wishlisted: '76',
      imageUrl: 'https://www.transparentpng.com/thumb/sword/ItXk4y-sword-transparent.png',
    },
    {
      id: 5,
      owner: 'Dareen Leh',
      avatar: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
      item_name: 'Katana',
      price: '0.8',
      item_count: '0.7',
      bid: '0.5',
      level: 5,

      wishlisted: '763',
      imageUrl: 'https://i.pinimg.com/originals/c7/56/cb/c756cb1964fbb8108c21adf34cabc2af.png',
    },
    {
      id: 6,
      owner: 'Elvin Que',
      avatar: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
      item_name: 'Bow and Arrow',
      price: '0.7',
      item_count: '0.7',
      bid: '0.5',
      level: 2,

      wishlisted: '76',
      imageUrl: 'https://cdn2.iconfinder.com/data/icons/flat-icons-19/512/Hunting_bow.png',
    },
    {
      id: 7,
      owner: 'Elvin Que',
      avatar:
        'https://lh3.googleusercontent.com/proxy/TtrgyCSW1oZphe2UJmk2eNxTjVmwIXhi3dWbn2K689Dx08_P-WT0AtJ3JmCQdAJehMvicxbavmDb3axnqjEwdKImUsF563243VVanY2UCvfPsEM2Fu04-D46TDE',
      item_name: 'Sward ',
      price: '0.7',
      level: 4,

      item_count: '0.7',
      bid: '0.5',
      wishlisted: '76',
      imageUrl: 'https://www.transparentpng.com/thumb/sword/ItXk4y-sword-transparent.png',
    },
    {
      id: 8,
      owner: 'Dareen Leh',
      avatar: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
      item_name: 'Katana',
      price: '0.8',
      level: 3,

      item_count: '0.7',
      bid: '0.5',
      wishlisted: '763',
      imageUrl: 'https://i.pinimg.com/originals/c7/56/cb/c756cb1964fbb8108c21adf34cabc2af.png',
    },
  ];

  const FilterList = (value) => {
    setSelected(value);
  };
  return (
    <div className="mt-5">
      <div className={classes.sectionDesktop}>
        <div className="mb-4">
          <div>
            <div style={{ float: 'right', width: 'fit-content', marginTop: 15 }}>
              <div className={classes.categoryTab}>
                <Tune /> Filter
              </div>
            </div>

            <div style={{ float: 'left', width: 'fit-content' }}>
              <h1 className="heading">
                Explore{' '}
                <span>
                  <img src="images/thunder.png" height="30px" />
                </span>
              </h1>
            </div>
            <div style={{ width: '100%' }}>
              <div className={classes.filterTabsDesktop}>
                <p
                  className={selected === 0 ? classes.categoryTabActive : classes.categoryTab}
                  onClick={() => FilterList(0)}>
                  All
                </p>

                <p
                  className={selected === 1 ? classes.categoryTabActive : classes.categoryTab}
                  onClick={() => FilterList(1)}>
                  Sword
                </p>

                <p
                  className={selected === 2 ? classes.categoryTabActive : classes.categoryTab}
                  onClick={() => FilterList(2)}>
                  Paper Fan
                </p>
                <p
                  className={selected === 3 ? classes.categoryTabActive : classes.categoryTab}
                  onClick={() => FilterList(3)}>
                  Bow & Arrow
                </p>
                <p className={classes.categoryTab} onClick={() => FilterList(4)}>
                  Guns
                </p>
                <p className={classes.categoryTab}>Sceptre</p>
                <p className={classes.categoryTab}>Ceramic vase</p>
                <p className={classes.categoryTab}>Armor</p>
                <p className={classes.categoryTab}>Hats</p>
                <p className={classes.categoryTab}>Wings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.sectionMobile}>
        <div className="d-flex justify-content-between align-items-center ">
          <div>
            <h1 className="heading">
              Explore{' '}
              <span>
                <img src="images/thunder.png" height="20px" />
              </span>
            </h1>
          </div>
          <div>
            <IconButton className={classes.categoryTab}>
              <Tune className={classes.icon} />
            </IconButton>
          </div>
        </div>
        <div className={classes.filterTabsMobile}>
          <div
            className={selected === 0 ? classes.categoryTabActive : classes.categoryTab}
            onClick={() => FilterList(0)}>
            All
          </div>
          <div
            className={selected === 1 ? classes.categoryTabActive : classes.categoryTab}
            onClick={() => FilterList(1)}>
            Sword
          </div>
          <div
            className={selected === 2 ? classes.categoryTabActive : classes.categoryTab}
            onClick={() => FilterList(2)}>
            PaperFan
          </div>
          <div
            className={selected === 3 ? classes.categoryTabActive : classes.categoryTab}
            onClick={() => FilterList(3)}>
            BowArrow
          </div>
          <div className={classes.categoryTab} onClick={() => FilterList(4)}>
            Guns
          </div>
          <div className={classes.categoryTab}>Sceptre</div>
          <div className={classes.categoryTab}>CeramicVase</div>
          <div className={classes.categoryTab}>Armor</div>
          <div className={classes.categoryTab}>Hats</div>
          <div className={classes.categoryTab}>Wings</div>
        </div>
      </div>

      <div className="row mt-3">
        {items.map((item, index) => {
          return (
            <div className="col-6 col-md-3" key={index}>
              <div className="d-flex justify-content-center">
                {' '}
                <ItemCard item={item} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
