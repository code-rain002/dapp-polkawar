import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, Backdrop, Slide } from "@material-ui/core";
import CustomeTable from "../../components/CustomTable";
import CheckoutModel from "../../components/ItemsComponents/CheckoutModel";
import GallerySlider from "../../components/ItemsComponents/GallerySlider";
import { getItemDetails } from "./../../actions/itemActions";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "./../../components/Loader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  background: {
    overflowX: "hidden",
    background: `linear-gradient(0deg, rgba(26, 35, 126, 0.31), rgba(28,22, 86, 0.1))`,
    padding: 30,
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 10,
    [theme.breakpoints.down("md")]: {
      margin: 0,
      marginTop: 10,
      borderRadius: 0,
      padding: 0,
    },
  },
  title: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: "#fdd835",
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 32,
    lineHeight: "40.7px",
    [theme.breakpoints.down("md")]: {
      fontSize: 22,
      lineHeight: "30.7px",
    },
  },
  price: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: "#ffffff",
    fontWeight: 300,
    fontSize: 20,
    lineHeight: "30.7px",
  },
  description: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: theme.palette.pbr.textSecondary,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "35.7px",
    maxWidth: 500,
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
  categoryTab: {
    display: "inline-block",
    border: "1px solid #73309C",

    borderRadius: "20px",
    fontSize: 16,
    fontWeight: 500,
    padding: "8px 20px 8px 20px",
    minWidth: "60px",
    marginTop: 10,
    marginBottom: 10,
    cursor: "pointer",
    color: theme.palette.pbr.textPrimary,
    [theme.breakpoints.down("md")]: {
      padding: "6px 14px 6px 14px",
      fontSize: 13,
      height: "35px",
      marginRight: "5px",
    },
  },
  buyHistory: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 22,
    lineHeight: "30.7px",
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
    },
  },
  levelText: {
    color: "white",
    fontWeight: 600,
    fontSize: 15,
    paddingTop: 10,
    paddingRight: 10,
  },
  imageWrapper: {
    padding: 20,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  laterButton: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,#fff9c4, #fff59d)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    marginTop: 5,
    marginLeft: 10,
    color: "black",
    padding: "14px 30px 14px 30px",
    fontWeight: 400,
    fontSize: 20,
    textTransform: "none",
    textDecoration: "none",

    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },
  buyButton: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,yellow, orange)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    marginTop: 5,
    color: "black",
    padding: "14px 30px 14px 30px",
    fontWeight: 400,
    fontSize: 20,
    textTransform: "none",
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    outline: "none",
  },

  media: {
    height: 35,
    marginLeft: 5,

    [theme.breakpoints.down("sm")]: {
      height: 30,
    },
  },
}));

function Details({ getItemDetails, singleItem }) {
  const classes = useStyles();
  let { id } = useParams();

  const [open, setOpen] = React.useState(false);
  const [item, setItem] = useState();
  const [actualCase, setActualCase] = useState(0);

  const handleModal = (value) => {
    setOpen(value);
  };

  useEffect(() => {
    async function asyncFn() {
      // Getting item information from Database
      let itemJson = await getItemDetails(id);
      if (itemJson !== null && itemJson !== undefined) {
        setItem(itemJson);
        setActualCase(1);
      }
    }
    asyncFn();
  }, [singleItem]);

  return (
    <div className={classes.background}>
      {actualCase === 0 && (
        <div className="text-center">
          <Loader />
        </div>
      )}
      {actualCase === 1 && (
        <div className="container row g-0 ">
          <div className="col-12 col-md-7">
            <div className={classes.imageWrapper}>
              <GallerySlider gallery={[item.hashImage, ...item.gallery]} />
            </div>
          </div>
          <div className="col-12 col-md-5 p-3">
            <h5 className={classes.title}>{item.name}</h5>
            <h6 className={classes.price}>
              {item.price} {item.currency}{" "}
              <span>
                <img
                  src="/token.png"
                  className={classes.media}
                  alt="logo-pwar"
                />
              </span>
            </h6>
            <div className={classes.categoryTab}>{item.category}</div>
            <div>
              {" "}
              <div className="d-flex justify-content-start align-items-center mt-2">
                <h6 className={classes.levelText}>Level : </h6>
                <div className={classes.iconWrapper}>
                  {Array.from(Array(item.level)).map((character) => {
                    return (
                      <img src="/images/level.png" height="18px" alt="level" />
                    );
                  })}
                </div>
              </div>
            </div>
            <p className={classes.description}>{item.description}</p>{" "}
            <div className="my-3 d-flex justify-content-start">
              <div style={{ paddingRight: 10 }}>
                <Button
                  variant="contained"
                  className={classes.buyButton}
                  onClick={() => handleModal(true)}
                >
                  Purchase Item
                </Button>
              </div>
              <div>
                <Button variant="contained" className={classes.laterButton}>
                  Save for later
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <h6 className={classes.buyHistory}>Purchase History</h6>
              <hr style={{ color: "yellow" }} />
              <CustomeTable owner={item.owner} />
            </div>
          </div>
          <Dialog
            className={classes.modal}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <div style={{ backgroundColor: "black" }}>
              <CheckoutModel value={open} onClose={handleModal} item={item} />
            </div>
          </Dialog>{" "}
        </div>
      )}
    </div>
  );
}

Details.propTypes = {
  getItemDetails: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  singleItem: state.items.item,
});

const mapDispatchToProps = { getItemDetails };

export default connect(mapStateToProps, mapDispatchToProps)(Details);
