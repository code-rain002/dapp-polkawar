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
  IconButton,
} from "@material-ui/core";
import { getUserCharacters } from "../../actions/characterActions";
import Loader from "../../components/Loader";
import CreateCharacterForm from "../../components/CharacterComponents/CreateCharacterForm";
import imageBaseUrl from "../../actions/imageBaseUrl";
import { FileCopy } from "@material-ui/icons";
import CharacterOverview from "./profileComponents/CharacterOverview";
import CharacterStats from "./profileComponents/CharacterStats";
import CharacterItems from "./profileComponents/CharacterItems";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
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

  titleHeading: {
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
  section: {
    height: "100%",
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
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
  media: {
    height: 500,
  },
  ranking: {
    backgroundColor: "#4caf50",
    borderRadius: 7,
    fontSize: 16,
    width: "fit-content",
    padding: "3px 7px 3px 7px",
    color: "white",
    fontWeight: 400,
    fontFamily: "Montserrat",
  },
  chracterType: {
    fontSize: 60,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 800,
    fontFamily: "Balsamiq Sans",
    margin: 0,
    padding: 0,
  },
  username: {
    marginTop: 10,
    fontSize: 18,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 500,
    fontFamily: "Balsamiq Sans",
    margin: 0,
    padding: 0,
  },
  address: {
    marginTop: 5,
    fontSize: 12,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 400,
    fontFamily: "Montserrat",
    color: "#bdbdbd",
    margin: 0,
    padding: 0,
  },
  copyIcon: {
    fontSize: 14,
    marginLeft: 10,
    color: "#dcedc8",
  },
}));

function CharacterSection({ getUserCharacters, usercharacters }) {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);
  const [characterPopup, setCharacterPopup] = useState(false);
  const [stopPopupClick, setStopPopupClick] = useState(false);

  useEffect(() => {
    async function asyncFn() {
      await getUserCharacters();
    }
    asyncFn();
  }, []);

  useEffect(() => {
    if (usercharacters !== null && usercharacters !== undefined) {
      if (usercharacters.length === 0) {
        setActualCase(1);
      } else {
        setActualCase(2);
      }
    } else {
      setActualCase(0);
    }
  }, [usercharacters]);

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
        <div className="text-center mt-5">
          <div className="my-3">
            <img src="./images/swords.png" height="100px" alt="character" />
          </div>
          <div className="text-center">
            <h6 className={classes.titleHeading}>No character found</h6>
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
          <div className="row">
            <div className="col-md-6">
              {usercharacters.map((character, index) => {
                return (
                  <div>
                    <div>
                      <h6 htmlFor="ranking" className={classes.ranking}>
                        {" "}
                        # {character.tokenId}
                      </h6>
                      <h1
                        htmlFor="characterType"
                        className={classes.chracterType}
                      >
                        {character.name}{" "}
                        <img
                          src="images/swords.png"
                          height="30px"
                          alt="level"
                        />
                      </h1>
                    </div>

                    <h6 htmlFor="username" className={classes.username}>
                      {character.username}
                    </h6>
                    <h6 htmlFor="username" className={classes.address}>
                      {[..."0xBE83D4d9F1e6ceF1224aF277f280a6afA46b8dCc"].splice(
                        0,
                        7
                      )}{" "}
                      {"..."}
                      {[..."0xBE83D4d9F1e6ceF1224aF277f280a6afA46b8dCc"].splice(
                        [..."0xBE83D4d9F1e6ceF1224aF277f280a6afA46b8dCc"]
                          .length - 7,
                        7
                      )}
                      <IconButton style={{ padding: 0 }}>
                        {" "}
                        <FileCopy className={classes.copyIcon} />
                      </IconButton>
                    </h6>

                    <div className={classes.background}>
                      <div className={classes.section}>
                        <div>
                          <img
                            src={`${imageBaseUrl}/${character.hashImage}`}
                            className={classes.media}
                            alt="character"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-md-6">
              <div>
                <div className="my-3">
                  <CharacterOverview character={usercharacters[0]} />
                </div>
                <div className="my-3">
                  <CharacterStats character={usercharacters[0]} />
                </div>
                <div className="my-3">
                  <CharacterItems character={usercharacters[0]} />
                </div>
              </div>
            </div>
          </div>
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
  usercharacters: state.characters.usercharacters,
});

const mapDispatchToProps = { getUserCharacters };

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSection);
