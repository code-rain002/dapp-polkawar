import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Slide } from "@material-ui/core";
import { getUserItems } from "./../../actions/itemActions";
import Loader from "../Loader";
import imageBaseUrl from "../../actions/imageBaseUrl";
import CustomButton from "../CustomButton";
import ItemProfileCard from "./ItemProfileCard";
import ProfileMysteryCard from "../BidComponents/ProfileMysteryCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: "300px",
    display: "flex",
    justifyContent: "center",
    marginBottom: 30,
    backgroundColor: "transparent",
    [theme.breakpoints.down("sm")]: {
      minHeight: "300px",
      marginBottom: 10,
    },
  },
  sectionTitle: {
    verticalAlign: "baseline",
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 32,
    lineHeight: "40.7px",
    textAlign: "left",
    paddingTop: 20,
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
      lineHeight: "30.7px",
    },
  },
  characterScroll: {
    whiteSpace: "noWrap",
    overflowX: "auto",
    paddingTop: 10,
    [theme.breakpoints.down("md")]: {
      paddingTop: 0,
    },
  },
  mediaWrapper: {
    height: 300,

    [theme.breakpoints.down("md")]: {
      height: 200,
    },
  },
  media: {
    height: "100%",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    [theme.breakpoints.down("sm")]: {
      height: "240px",
    },
  },
  button: {
    color: "white",
    backgroundColor: "white",
    textTransform: "none",
    borderRadius: "50px",
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
  },

  title: {
    verticalAlign: "baseline",
    textAlign: "center",
    color: theme.palette.pbr.textPrimary,
    fontWeight: 900,
    letterSpacing: 1,
    fontSize: 16,
    lineHeight: "35.7px",
    fontFamily: "Carter One",
    overflowWrap: "break-word",
    [theme.breakpoints.down("sm")]: {
      fontWeight: 700,
      fontSize: 13,
    },
  },
  subheading: {
    verticalAlign: "baseline",
    textAlign: "center ",
    color: theme.palette.pbr.textSecondary,
    fontWeight: 500,
    fontSize: 14,
    width: "300px",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  propTitle: {
    fontSize: 16,
    color: "yellow",
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  propValue: {
    fontSize: 14,
    color: "white",
    paddingLeft: 10,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
}));

function ItemSection({ getUserItems, useritems }) {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);

  useEffect(() => {
    async function asyncFn() {
      await getUserItems();
    }
    asyncFn();
  }, []);

  useEffect(() => {
    if (useritems !== null && useritems !== undefined) {
      if (useritems.length === 0) {
        setActualCase(1);
      } else {
        setActualCase(2);
      }
    } else {
      setActualCase(0);
    }
  }, [useritems]);

  const sortedArray = () => {
    let sorted = useritems.sort((a, b) => {
      return new Date(a.buyDate) - new Date(b.buyDate);
    });
    return sorted;
  };
  return (
    <div>
      <h3 htmlFor="category" className={classes.sectionTitle}>
        ITEMS BAG
      </h3>
      {actualCase === 0 && (
        <div>
          <Loader />
        </div>
      )}
      {actualCase === 1 && (
        <div>
          <div className="text-center">
            <div className="my-3">
              <img src="images/dice.png" height="70px" alt="equipment" />
            </div>
            <div className="text-center">
              <h6 className={classes.title}>No items found</h6>
              <div className="d-flex justify-content-center">
                <p className={classes.subheading}>
                  Come back again! <br />
                  Or buy items from our marketplace.
                </p>
              </div>
            </div>
            <div className={classes.buttonWrapper}>
              <CustomButton title="Browse marketplace" link={"/"} />
            </div>
          </div>
        </div>
      )}
      {actualCase === 2 && (
        <div>
          <div className="row mt-4">
            {sortedArray().map((item, index) => {
              return (
                <div key={index} className="col-12 col-md-3">
                  <div className="d-flex justify-content-center">
                    {item.event === "auction" && (
                      <ProfileMysteryCard item={item} />
                    )}
                    {item.event !== "auction" && (
                      <ItemProfileCard item={item} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>{" "}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  useritems: state.items.useritems,
});

const mapDispatchToProps = { getUserItems };

export default connect(mapStateToProps, mapDispatchToProps)(ItemSection);
