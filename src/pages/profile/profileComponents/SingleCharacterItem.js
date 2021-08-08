import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import imageBaseUrl from "../../../actions/imageBaseUrl";
import { tokenURI } from "../../../actions/smartActions/SmartActions";
import axios from "axios";
import Loader from "../../../components/Loader";
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
      height: 35,
    },
  },
  itemWrapper: {
    borderRadius: 10,
    border: "1px solid #616161",
    padding: 5,
    marginLeft: 10,
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
      fontSize: 12,
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
      fontSize: 10,
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
function SingleCharacterItem({ item }) {
  const classes = useStyles();

  const [itemJson, setItemJson] = useState(null);
  const [actualCase, setActualCase] = useState(0);

  useEffect(() => {
    async function asyncFn() {
      //To load Item JSON Information
      let tokenId = item.tokenId;
      let itemString = await tokenURI(tokenId);
      await axios.get(`${imageBaseUrl}${itemString}`).then((res) => {
        let response = res.data;

        if (response.level !== null && response.level !== undefined) {
          if (response.level === 1) {
            setItemJson(res.data);
            console.log(res.data);
            setActualCase(2);
          }
        } else {
          setActualCase(1);
        }
      });
    }
    asyncFn();
  }, []);

  return (
    <div>
      {itemJson !== null && (
        <div>
          {actualCase === 0 && (
            <div>
              <Loader />
            </div>
          )}
          {actualCase === 2 && (
            <div className={classes.section}>
              <div className="d-flex justify-content-start ">
                <div htmlFor="item" className={classes.itemWrapper}>
                  <img
                    src="items/gun.png"
                    alt="item"
                    className={classes.media}
                  />
                </div>
                <div className={classes.detailsWrapper}>
                  <h6 htmlFor="type" className={classes.itemName}>
                    Gun
                  </h6>
                  <h6 htmlFor="type" className={classes.itemLevel}>
                    Level : 1
                  </h6>
                </div>
              </div>
            </div>
          )}
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
