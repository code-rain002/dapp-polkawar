import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ItemCard from '../../../components/ItemCard';
import CustomizedMenus from '../../../common/CustomizedMenus';
import { getItems, getCategories } from './../../../actions/itemActions';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

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
    fontSize: 13,
    fontWeight: 500,
    padding: '8px 15px 8px 15px',
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
    fontSize: 13,
    fontWeight: 500,
    padding: '8px 15px 8px 15px',
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

function Categories({ getItems, items, categories }) {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  const [collection, setCollection] = useState([]);
  const [itemCategories, setItemCategories] = useState([]);

  const FilterList = (value) => {
    setSelected(value);
  };

  //Calling actions
  //Get all items

  useEffect(() => {
    getCategories();
    getItems();
  }, []);

  useEffect(() => {
    if (items !== null) {
      setCollection(items);
    }
    if (categories !== null) {
      setItemCategories(categories);
    }
  }, [items, categories]);

  return (
    <div className="mt-5">
      <div className={classes.sectionDesktop}>
        <div className="mb-4">
          <div>
            <div style={{ float: 'right', width: '150px', marginTop: 15 }}>
              <div className="d-flex justify-content-end">
                <CustomizedMenus />
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
                <p
                  className={selected === 4 ? classes.categoryTabActive : classes.categoryTab}
                  onClick={() => FilterList(4)}>
                  Guns
                </p>
                <p
                  className={selected === 5 ? classes.categoryTabActive : classes.categoryTab}
                  onClick={() => FilterList(5)}>
                  Sceptre
                </p>
                <p
                  className={selected === 6 ? classes.categoryTabActive : classes.categoryTab}
                  onClick={() => FilterList(6)}>
                  Ceramic vase
                </p>
                <p
                  className={selected === 7 ? classes.categoryTabActive : classes.categoryTab}
                  onClick={() => FilterList(7)}>
                  Armor
                </p>
                <p
                  className={selected === 8 ? classes.categoryTabActive : classes.categoryTab}
                  onClick={() => FilterList(8)}>
                  Hats
                </p>
                <p
                  className={selected === 9 ? classes.categoryTabActive : classes.categoryTab}
                  onClick={() => FilterList(9)}>
                  Wings
                </p>
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
            <CustomizedMenus />
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
          <div
            className={selected === 4 ? classes.categoryTabActive : classes.categoryTab}
            onClick={() => FilterList(4)}>
            Guns
          </div>
          <div
            className={selected === 5 ? classes.categoryTabActive : classes.categoryTab}
            onClick={() => FilterList(5)}>
            Sceptre
          </div>
          <div
            className={selected === 6 ? classes.categoryTabActive : classes.categoryTab}
            onClick={() => FilterList(6)}>
            CeramicVase
          </div>
          <div
            className={selected === 7 ? classes.categoryTabActive : classes.categoryTab}
            onClick={() => FilterList(7)}>
            Armor
          </div>
          <div
            className={selected === 8 ? classes.categoryTabActive : classes.categoryTab}
            onClick={() => FilterList(8)}>
            Hats
          </div>
          <div
            className={selected === 9 ? classes.categoryTabActive : classes.categoryTab}
            onClick={() => FilterList(9)}>
            Wings
          </div>
        </div>
      </div>

      <div className="row mt-3">
        {collection !== null
          ? collection.map((item, index) => {
              return (
                <div className="col-12 col-md-3" key={index}>
                  <div className="d-flex justify-content-center">
                    <ItemCard item={item} />
                  </div>
                </div>
              );
            })
          : 'Loading'}
      </div>
    </div>
  );
}
Categories.propTypes = {
  getItems: propTypes.func.isRequired,
  getCategories: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items.items,
  categories: state.items.categories,
});

const mapDispatchToProps = { getItems, getCategories };

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
