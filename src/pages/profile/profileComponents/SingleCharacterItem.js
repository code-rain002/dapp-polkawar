import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import imageBaseUrl from "../../../actions/imageBaseUrl";
import propTypes from "prop-types";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  section: {
    height: "100%",
    marginBottom: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    width: "fit-content",
    paddingBottom: 10,
    paddingTop: 10,
    color: "white",
    fontWeight: 800,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
    },
  },
  subtitle: {
    fontSize: 16,
    width: "fit-content",
    paddingBottom: 10,
    color: "#bdbdbd",
    fontWeight: 500,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  media: {
    height: 60,
    [theme.breakpoints.down("sm")]: {
      height: 30,
    },
  },
  itemWrapper: {
    borderRadius: 10,
    border: "1px solid #616161",
    padding: 5,
    marginLeft: 10,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 5,
    },
  },
  itemWrapperClicked: {
    borderRadius: 10,
    border: "2px solid yellow",
    padding: 5,
    marginLeft: 10,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 5,
    },
  },
  detailsWrapper: {
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      padding: 5,
    },
  },
  itemName: {
    fontSize: 16,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 500,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
    },
  },
  itemLevel: {
    marginTop: 10,
    fontSize: 12,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 500,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 9,
    },
  },
  notFound: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: theme.palette.pbr.textSecondary,
    fontWeight: 500,
    fontSize: 14,
    width: "300px",
    fontFamily: "Balsamiq Sans",
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
    },
  },
}));
function SingleCharacterItem({ item, clickedIndex, itemIndex }) {
  const classes = useStyles();

  return (
    <div>
      {item !== null && item !== undefined && (
        <div className={classes.section}>
          <div className="d-flex justify-content-start ">
            <div
              htmlFor="item"
              className={
                clickedIndex === itemIndex
                  ? classes.itemWrapperClicked
                  : classes.itemWrapper
              }
            >
              <img
                src={`${imageBaseUrl}/${item.hashImage}`}
                alt="item"
                className={classes.media}
              />
            </div>
            <div className={classes.detailsWrapper}>
              <h6 htmlFor="type" className={classes.itemName}>
                {item.name}
              </h6>
              <h6 htmlFor="type" className={classes.itemLevel}>
                Level : {item.level}
              </h6>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
SingleCharacterItem.propTypes = {
  authenticateUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCharacterItem);
