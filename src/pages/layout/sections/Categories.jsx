import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ItemCard from "../../../components/ItemsComponents/ItemCard";
import CustomizedMenus from "../../../common/CustomizedMenus";
import { getItems, getCategories } from "./../../../actions/itemActions";
import propTypes from "prop-types";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.pbr.textPrimary,
    textAlign: "left",
    fontSize: "2.08vw",
    lineHeight: "41.4px",
    fontWeight: 800,
    verticalAlign: "baseline",
  },
  categoryTab: {
    display: "inline",
    border: "1px solid #616161",
    width: "fit-content",
    borderRadius: "20px",
    fontSize: 13,
    fontWeight: 500,
    padding: "8px 15px 8px 15px",
    marginRight: "12px",
    cursor: "pointer",
    height: "40px",
    textTransform: "capitalize",

    color: theme.palette.pbr.textPrimary,
    [theme.breakpoints.down("md")]: {
      padding: "6px 14px 6px 14px",
      fontSize: 13,
      height: "35px",
      marginRight: "5px",
    },
  },
  categoryTabActive: {
    display: "inline",
    width: "fit-content",
    border: "1px solid #616161",
    borderRadius: "20px",
    fontSize: 13,
    fontWeight: 500,
    padding: "8px 15px 8px 15px",
    height: "40px",
    marginRight: "12px",
    cursor: "pointer",
    textTransform: "capitalize",
    backgroundColor: theme.palette.pbr.textPrimary,
    color: "#fffffff",
    [theme.breakpoints.down("md")]: {
      padding: "6px 14px 6px 14px",
      fontSize: 13,
      height: "35px",
      marginRight: "5px",
    },
  },
  sectionDesktop: {
    display: "block",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  sectionMobile: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  icon: {
    fontSize: 18,
  },

  filterTabsDesktop: {
    paddingTop: 15,
    paddingBottom: 15,

    whiteSpace: "noWrap",
    overflowX: "auto",
  },
  filterTabsMobile: {
    paddingTop: 15,
    paddingBottom: 15,

    whiteSpace: "noWrap",
    overflowX: "auto",
  },
}));

function Categories({ getItems, getCategories, items, categories }) {
  const classes = useStyles();

  const [collection, setCollection] = useState([]);
  const [itemCategories, setItemCategories] = useState([]);
  const [numbers, setNumbers] = useState([1, 5, 4, 2, 3]);
  const [selectedCat, setSelectedCat] = useState("All");
  const [pageNo, setPageNo] = useState(0);

  const FilterList = (value) => {
    setSelectedCat(value);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (items !== null) {
      setCollection(items);
    }
    if (categories !== null) {
      setItemCategories(categories);
    }
  }, [items, categories]);

  useEffect(() => {
    fetchMoreItems();
  }, [selectedCat]);

  const fetchMoreItems = async () => {
    if (selectedCat.toLowerCase() === "all") {
      getItems(selectedCat.toLowerCase(), pageNo);
      setPageNo((pageNo) => pageNo + 1);
    } else {
      setPageNo(0);
      getItems(selectedCat.toLowerCase(), pageNo);
    }
  };

  const sortItems = (type) => {
    let data = [];

    if (type === "p1") {
      data = items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }
    if (type === "p2") {
      data = items.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    if (type === "l1") {
      data = items.sort((a, b) => parseInt(a.level) - parseInt(b.level));
    }
    if (type === "l2") {
      data = items.sort((a, b) => parseInt(b.level) - parseInt(a.level));
    }
    setCollection([...data]);
  };
  return (
    <div className="mt-5">
      <div className={classes.sectionDesktop}>
        <div className="mb-4">
          <div>
            <div style={{ float: "right", width: "150px", marginTop: 15 }}>
              <div className="d-flex justify-content-end">
                <CustomizedMenus sortFn={sortItems} />
              </div>
            </div>

            <div style={{ float: "left", width: "fit-content" }}>
              <h1 className="heading">
                Explore
                <span>
                  <img src="images/thunder.png" height="30px" alt="thunder" />
                </span>
              </h1>
            </div>
            <div style={{ width: "100%" }}>
              <div className={classes.filterTabsDesktop}>
                <p
                  className={
                    selectedCat === "All"
                      ? classes.categoryTabActive
                      : classes.categoryTab
                  }
                  onClick={() => FilterList("All")}
                >
                  All
                </p>
                {itemCategories.map((cat, index) => {
                  return (
                    <p
                      key={index}
                      className={
                        selectedCat === cat.name
                          ? classes.categoryTabActive
                          : classes.categoryTab
                      }
                      onClick={() => FilterList(cat.name)}
                    >
                      {cat.name}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.sectionMobile}>
        <div className="d-flex justify-content-between align-items-center ">
          <div>
            <h1 className="heading">
              Explore{" "}
              <span>
                <img src="images/thunder.png" height="20px" alt="thunder" />
              </span>
            </h1>
          </div>
          <div>
            <CustomizedMenus sortFn={sortItems} />
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={classes.filterTabsMobile}>
            <p
              className={
                selectedCat === "All"
                  ? classes.categoryTabActive
                  : classes.categoryTab
              }
              onClick={() => FilterList("All")}
            >
              All
            </p>

            {itemCategories.map((cat, index) => {
              return (
                <p
                  key={index}
                  className={
                    selectedCat === cat.name
                      ? classes.categoryTabActive
                      : classes.categoryTab
                  }
                  onClick={() => FilterList(cat.name)}
                >
                  {cat.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreItems}
        hasMore={true}
      >
        <div className="row mt-3">
          {items.map((item, index) => (
            <div className="col-12 col-md-3" key={item._id}>
              <div className="d-flex justify-content-center">
                <ItemCard item={item} key={index} />
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
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
