import React, { Fragment, useEffect, useState } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CharacterCard from "../../../components/CharacterComponents/CharacterCard";
import { getTopCharacters } from "./../../../actions/characterActions";
import { Dialog, Divider, Slide, Backdrop } from "@material-ui/core";
import BuildCharacter from "../../../components/CharacterComponents/BuildCharacter";
import { readCache, addDataIntoCache } from "./../../../actions/cacheActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.pbr.textPrimary,
    textAlign: "left",
    fontSize: "2.08vw",
    lineHeight: "41.4px",
    fontWeight: 800,
    verticalAlign: "middle",
  },

  scrollItemPositions: {
    display: "flex",
    justifyContent: "start",
    [theme.breakpoints.down("md")]: {
      justifyContent: "start",
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
}));

function HotCharacters({ characters, getTopCharacters, authenticated }) {
  const classes = useStyles();
  const [claimPopup, setClaimPopup] = useState(false);

  useEffect(() => {
    async function asyncFn() {
      await getTopCharacters();
      let popupDisplayTime = await readCache();

      //Wait for Next 24 hours for popup to appear
      let nextPopupTime = popupDisplayTime + 86400000;
      let currentTime = parseInt(Date.now());

      //If next popup is less than current time means enable popup
      if (nextPopupTime <= currentTime) {
        setClaimPopup(true);
        addDataIntoCache();
      }
    }
    asyncFn();
  }, [authenticated]);

  return (
    <Fragment>
      <h1 className="heading">
        Top characters{" "}
        <span>
          <img src="images/thunder.png" height="30px" alt="thunder" />
        </span>
      </h1>
      {characters !== null && characters !== undefined && (
        <div className={classes.characterScroll}>
          <div className={classes.scrollItemPositions}>
            {characters.map((character, index) => {
              return (
                <div style={{ paddingRight: 15, flexBasis: "50%" }} key={index}>
                  <CharacterCard item={character} />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Dialog
        className={classes.modal}
        open={claimPopup}
        TransitionComponent={Transition}
        keepMounted={false}
        onClose={() => setClaimPopup(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div style={{ backgroundColor: "black" }}>
          <BuildCharacter />
        </div>
      </Dialog>{" "}
    </Fragment>
  );
}

HotCharacters.propTypes = {
  getCharacters: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  characters: state.characters.characters,
});

const mapDispatchToProps = { getTopCharacters };

export default connect(mapStateToProps, mapDispatchToProps)(HotCharacters);
