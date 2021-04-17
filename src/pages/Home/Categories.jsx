import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ItemCard from '../../components/ItemCard';
import { FilterList, Tune } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.pbr.textPrimary,
    textAlign: 'left',
    fontSize: '2.08vw',
    lineHeight: '41.4px',
    fontWeight: 800,
    verticalAlign: 'middle',
  },
  categoryTab: {
    display: 'inline',
    border: '1px solid #616161',
    borderRadius: '20px',
    fontSize: 14,
    fontWeight: 500,
    padding: '6px 18px 6px 18px',
    minWidth: '60px',
    marginLeft: '16px',
    marginRight: '12px',
    height: '40px',
    cursor: 'pointer',
  },
  categoryTabActive: {
    display: 'inline',
    border: '1px solid #616161',
    borderRadius: '20px',
    fontSize: 14,
    fontWeight: 500,
    padding: '6px 18px 6px 18px',
    minWidth: '60px',

    marginRight: '12px',
    height: '40px',
    cursor: 'pointer',
    backgroundColor: '#000000',
    color: '#ffffff',
  },
  // filterTabsDesktop: {
  //   display: 'block',
  //   width: 300,
  //   overflowX: 'scroll',
  //   [theme.breakpoints.down('md')]: {
  //     display: 'none',
  //   },
  // },
  // filterTabsMobile: {
  //   display: 'block',
  //   width: 300,
  //   overflowX: 'scroll',
  //   [theme.breakpoints.up('sm')]: {
  //     display: 'none',
  //   },
  // },
}));

export default function Categories() {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  const items = [
    {
      owner: 'Elvin Que',
      avatar: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
      item_name: 'Tokyo Dreams V Drift City',
      price: '0.7',
      item_count: '0.7',
      bid: '0.5',
      wishlisted: '76',
      imageUrl:
        'https://lh3.googleusercontent.com/qVyFHhC26xsecU3FxGCyD3H68RaL4MAOeyCBiXejq8P7HpRgpm5RnK-R5QKkF00zCaK8eoMuUOtV7KSLSLPRgqz4WSnV7veeshe6YVY=s250',
    },
    {
      owner: 'Dareen Leh',
      avatar: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
      item_name: 'Urnab Reign 89 City',
      price: '0.8',
      item_count: '0.7',
      bid: '0.5',
      wishlisted: '763',
      imageUrl:
        'https://lh3.googleusercontent.com/hlTMxaE7IaHGhc2ShzADLIyNGkgjOX2fUFZ_7x9bwZ4IZJ055lSkL3qS1fFBWHzlRh6ETLPCiSCqlhj66mcsNPw5tLwGv3Y_gG-lyg=s250',
    },
    {
      owner: 'Elvin Que',
      avatar: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
      item_name: 'Tokyo Dreams V Drift City',
      price: '0.7',
      item_count: '0.7',
      bid: '0.5',
      wishlisted: '76',
      imageUrl: 'https://afxprops.com/wp-content/uploads/2015/04/H3.jpg',
    },
    {
      owner: 'Dareen Leh',
      avatar: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
      item_name: 'Urnab Reign 89 City',
      price: '0.8',
      item_count: '0.7',
      bid: '0.5',
      wishlisted: '763',
      imageUrl:
        'https://lh3.googleusercontent.com/hlTMxaE7IaHGhc2ShzADLIyNGkgjOX2fUFZ_7x9bwZ4IZJ055lSkL3qS1fFBWHzlRh6ETLPCiSCqlhj66mcsNPw5tLwGv3Y_gG-lyg=s250',
    },
    {
      owner: 'Elvin Que',
      avatar: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
      item_name: 'Tokyo Dreams V Drift City',
      price: '0.7',
      item_count: '0.7',
      bid: '0.5',
      wishlisted: '76',
      imageUrl: 'https://thumbs.dreamstime.com/b/d-illustration-thor-hammer-isolated-blue-background-124443036.jpg',
    },
    {
      owner: 'Dareen Leh',
      avatar: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
      item_name: 'Urnab Reign 89 City',
      price: '0.8',
      item_count: '0.7',
      bid: '0.5',
      wishlisted: '763',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyHjMwKcSIgukQn1ytQhzduVsfO-wZPRF2P4GD_DBZbFpkKzTe_cUd7L5uviyYan_T8_A&usqp=CAU',
    },
    {
      owner: 'Elvin Que',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyHjMwKcSIgukQn1ytQhzduVsfO-wZPRF2P4GD_DBZbFpkKzTe_cUd7L5uviyYan_T8_A&usqp=CAU',
      item_name: 'Tokyo Dreams V Drift City',
      price: '0.7',
      item_count: '0.7',
      bid: '0.5',
      wishlisted: '76',
      imageUrl:
        'https://cdn.dribbble.com/users/577743/screenshots/14263896/media/a83846fb883dabdb3b6925444e60b8ab.jpg?compress=1&resize=400x300',
    },
    {
      owner: 'Dareen Leh',
      avatar: 'https://static.newsbreak.com/people/200/per_thumb_31bb51c2b3d04a2aa57efe38543dee2a.jpg',
      item_name: 'Urnab Reign 89 City',
      price: '0.8',
      item_count: '0.7',
      bid: '0.5',
      wishlisted: '763',
      imageUrl:
        'https://cdna.artstation.com/p/assets/images/images/019/318/894/large/kilian-leonard-krause-glamdringfinal.jpg?1562952824',
    },
  ];

  const FilterList = (value) => {
    setSelected(value);
  };
  return (
    <Fragment>
      <div className="d-flex justify-content-between mt-5">
        <h1 className="heading">
          Explore{' '}
          <span>
            <img src="images/thunder.png" height="30px" />
          </span>{' '}
          <span>
            <div
              className={selected === 0 ? classes.categoryTabActive : classes.categoryTab}
              onClick={() => FilterList(0)}>
              All
            </div>
            <div
              className={selected === 1 ? classes.categoryTabActive : classes.categoryTab}
              onClick={() => FilterList(1)}>
              Swords
            </div>
            <div
              className={selected === 2 ? classes.categoryTabActive : classes.categoryTab}
              onClick={() => FilterList(2)}>
              Hammers
            </div>
            <div
              className={selected === 3 ? classes.categoryTabActive : classes.categoryTab}
              onClick={() => FilterList(3)}>
              Characters
            </div>
            <div className={classes.categoryTab} onClick={() => FilterList(4)}>
              Arrows
            </div>
            <div className={classes.categoryTab}>Caps</div>
            <div className={classes.categoryTab}>Kits</div>
            <div className={classes.categoryTab}>Katana</div>
          </span>
        </h1>
        <div className={classes.categoryTab}>
          <Tune />
        </div>
      </div>
      {/* <div>
        <div className={selected === 0 ? classes.categoryTabActive : classes.categoryTab} onClick={() => FilterList(0)}>
          All
        </div>
        <div className={selected === 1 ? classes.categoryTabActive : classes.categoryTab} onClick={() => FilterList(1)}>
          Swords
        </div>
        <div className={selected === 2 ? classes.categoryTabActive : classes.categoryTab} onClick={() => FilterList(2)}>
          Hammers
        </div>
        <div className={selected === 3 ? classes.categoryTabActive : classes.categoryTab} onClick={() => FilterList(3)}>
          Characters
        </div>
        <div className={classes.categoryTab} onClick={() => FilterList(4)}>
          Arrows
        </div>
        <div className={classes.categoryTab}>Caps</div>
        <div className={classes.categoryTab}>Kits</div>
      </div>
       */}
      <div className="row mt-3">
        {items.map((item, index) => {
          return (
            <div className="col-12 col-md-3" key={index}>
              <ItemCard item={item} />
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
