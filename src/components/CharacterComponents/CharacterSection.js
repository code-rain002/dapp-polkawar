import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import propTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  Backdrop,
  Slide,
  Card,
  Paper,
} from "@material-ui/core";
import { getUserCharacters } from "./../../actions/characterActions";
import Loader from "../Loader";
import CreateCharacterForm from "./CreateCharacterForm";
import imageBaseUrl from "../../actions/imageBaseUrl";

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
      fontSize: 14,
    },
  },
  subheading: {
    verticalAlign: "baseline",
    textAlign: "center ",
    color: theme.palette.pbr.textSecondary,
    fontWeight: 500,
    fontSize: 14,
    width: "300px",
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

function CharacterSection({ getUserCharacters, characters }) {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);
  const [selectedChar, setSelectedChar] = useState(false);
  const [characterPopup, setCharacterPopup] = useState(false);
  const [stopPopupClick, setStopPopupClick] = useState(false);

  useEffect(() => {
    async function asyncFn() {
      await getUserCharacters();
    }
    asyncFn();
  }, []);

  useEffect(() => {
    if (characters !== null && characters !== undefined) {
      if (characters.length === 0) {
        setActualCase(1);
      } else {
        setActualCase(2);
      }
    } else {
      setActualCase(0);
    }
  }, [characters]);

  const toggleCharacterPopup = (value) => {
    setCharacterPopup(value);
  };

  return (
    <div>
      {actualCase === 0 && (
        <div>
          <Loader />
        </div>
      )}
      {actualCase === 1 && (
        <div className="text-center">
          <div className="my-3">
            <img src="./images/swords.png" height="100px" alt="character" />
          </div>
          <div className="text-center">
            <h6 className={classes.title}>No character found</h6>
            <div className="d-flex justify-content-center">
              <p className={classes.subheading}>
                Create your character! <br />
                and personalise your gaming experience
              </p>
            </div>
          </div>
          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={toggleCharacterPopup}
            >
              Create Character
            </Button>
          </div>
        </div>
      )}
      {actualCase === 2 && (
        <div>
          {characters.map((character, index) => {
            return (
              <Card className={classes.card} elevation={0}>
                <div className="d-flex flex-column" style={{ paddingRight: 5 }}>
                  <div>
                    <h6 className={classes.title}>Items</h6>
                  </div>
                </div>
                <div className="text-center">
                  <div className={classes.mediaWrapper}>
                    <img
                      src={`${imageBaseUrl}/${character.hashImage}`}
                      className={classes.media}
                      alt="character"
                    />
                  </div>
                </div>
                <div style={{ paddingLeft: 30 }}>
                  <h6 className={classes.title}>Statistics</h6>
                  <div className="d-flex flex-column justify-content-center">
                    {character.properties !== undefined && (
                      <div>
                        {Object.entries(characters[0].properties).map(
                          ([key, value]) => {
                            return (
                              <div className="mb-2 d-flex flex-row justify-content-start align-items-center">
                                <h6 className={classes.propTitle}>{key}: </h6>
                                <h6 className={classes.propValue}> {value}</h6>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
      <Dialog
        className={classes.modal}
        open={characterPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => toggleCharacterPopup(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableBackdropClick={stopPopupClick}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div style={{ backgroundColor: "black" }}>
          <CreateCharacterForm
            onClose={() => toggleCharacterPopup(false)}
            stopPopupClicking={setStopPopupClick}
          />
        </div>
      </Dialog>{" "}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  characters: state.characters.usercharacters,
});

const mapDispatchToProps = { getUserCharacters };

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSection);
