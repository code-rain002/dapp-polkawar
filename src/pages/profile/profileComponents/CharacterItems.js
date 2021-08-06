import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getUserItems } from "../../../actions/itemActions";
import ItemProfileCard from "./../../../components/ItemsComponents/ItemProfileCard";
import ProfileMysteryCard from "../../../components/BidComponents/ProfileMysteryCard";
import Loader from "../../../components/Loader";

const useStyles = makeStyles((theme) => ({
  background: {},
  sectionWrapper: {},
  section: {
    height: "100%",
    padding: 10,
    display: "flex",
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
  },
  subtitle: {
    fontSize: 16,
    width: "fit-content",
    paddingBottom: 10,
    paddingLeft: 10,
    color: "#bdbdbd",
    fontWeight: 500,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
  },
  media: {
    height: 60,
  },
  itemWrapper: {
    borderRadius: 10,
    border: "1px solid #616161",
    padding: 10,
  },

  detailsWrapper: {
    padding: 10,
  },
  itemName: {
    fontSize: 20,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 500,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
  },
  itemLevel: {
    marginTop: 10,
    fontSize: 14,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 500,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
  },
  notFound: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: theme.palette.pbr.textSecondary,
    fontWeight: 500,
    fontSize: 14,
    width: "300px",
    fontFamily: "Balsamiq Sans",
  },
}));

function CharacterItems({ getUserItems, useritems }) {
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

  return (
    <div className={classes.background}>
      <h3 htmlFor="category" className={classes.title}>
        ITEMS
      </h3>
      {actualCase === 0 && (
        <div>
          <Loader />
        </div>
      )}
      {actualCase === 1 && (
        <div>
          <div>
            <p className={classes.notFound}>Items not found.</p>
          </div>
        </div>
      )}
      <div className="row">
        {useritems.map((item, index) => {
          return (
            <div key={index} className="col-12 col-md-6">
              <div className="d-flex justify-content-center">
                {item.event === "auction" && <ProfileMysteryCard item={item} />}
                {item.event !== "auction" && <ItemProfileCard item={item} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className={classes.sectionWrapper}>
        <h3 htmlFor="category" className={classes.subtitle}>
          Weapons
        </h3>
        <div className={classes.section}>
          <div
            className="d-flex justify-content-start"
            style={{ paddingRight: 40 }}
          >
            <div htmlFor="item" className={classes.itemWrapper}>
              <img src="items/gun.png" alt="item" className={classes.media} />
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
          <div
            className="d-flex justify-content-start"
            style={{ paddingRight: 40 }}
          >
            <div htmlFor="item" className={classes.itemWrapper}>
              <img src="items/sword.png" alt="item" className={classes.media} />
            </div>
            <div className={classes.detailsWrapper}>
              <h6 htmlFor="type" className={classes.itemName}>
                Sword
              </h6>
              <h6 htmlFor="type" className={classes.itemLevel}>
                Level : 1
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.sectionWrapper}>
        <h3 htmlFor="category" className={classes.subtitle}>
          Wings
        </h3>
        <div className={classes.section}>
          <div
            className="d-flex justify-content-start"
            style={{ paddingRight: 40 }}
          >
            <div htmlFor="item" className={classes.itemWrapper}>
              <img src="items/wing.png" alt="item" className={classes.media} />
            </div>
            <div className={classes.detailsWrapper}>
              <h6 htmlFor="type" className={classes.itemName}>
                Wing
              </h6>
              <h6 htmlFor="type" className={classes.itemLevel}>
                Level : 1
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.sectionWrapper}>
        <h3 htmlFor="category" className={classes.subtitle}>
          Armor
        </h3>
        <div className={classes.section}>
          <div
            className="d-flex justify-content-start"
            style={{ paddingRight: 40 }}
          >
            <div htmlFor="item" className={classes.itemWrapper}>
              <img src="items/armor.png" alt="item" className={classes.media} />
            </div>
            <div className={classes.detailsWrapper}>
              <h6 htmlFor="type" className={classes.itemName}>
                Armor
              </h6>
              <h6 htmlFor="type" className={classes.itemLevel}>
                Level : 1
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.sectionWrapper}>
        <h3 htmlFor="category" className={classes.subtitle}>
          Helmet
        </h3>
        <div className={classes.section}>
          <div
            className="d-flex justify-content-start"
            style={{ paddingRight: 40 }}
          >
            <div htmlFor="item" className={classes.itemWrapper}>
              <img
                src="items/helmet.png"
                alt="item"
                className={classes.media}
              />
            </div>
            <div className={classes.detailsWrapper}>
              <h6 htmlFor="type" className={classes.itemName}>
                Helmet
              </h6>
              <h6 htmlFor="type" className={classes.itemLevel}>
                Level : 1
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.sectionWrapper}>
        <h3 htmlFor="category" className={classes.subtitle}>
          Mount
        </h3>
        <div className={classes.section}>
          <div
            className="d-flex justify-content-start"
            style={{ paddingRight: 40 }}
          >
            <div htmlFor="item" className={classes.itemWrapper}>
              <img src="items/mount.png" alt="item" className={classes.media} />
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
      </div>
    */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  useritems: state.items.useritems,
});

const mapDispatchToProps = { getUserItems };

export default connect(mapStateToProps, mapDispatchToProps)(CharacterItems);
