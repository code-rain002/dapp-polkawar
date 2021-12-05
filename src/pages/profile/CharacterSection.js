import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Button, Dialog, Backdrop, Slide, Grow } from "@material-ui/core";
import {
  getUserCharacter,
  getMaxStatsOfCharacter,
  getCharacterRank,
} from "../../actions/characterActions";
import Loader from "../../components/Loader";
import CreateCharacterForm from "../../components/CharacterComponents/CreateCharacterForm";
import CharacterOverview from "./profileComponents/CharacterOverview";
import CharacterStats from "./profileComponents/CharacterStats";
import ItemSection from "../../components/ItemsComponents/ItemSection";
import CharacterAvatar from "./profileComponents/CharacterAvatar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    verticalAlign: "baseline",
    color: "yellow",
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: "2.08vw",
    lineHeight: "40.7px",
    textAlign: "center",
    paddingTop: 20,
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
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
    height: 350,
    [theme.breakpoints.down("md")]: {
      height: 200,
    },
  },
  media: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginRight: 5,
      width: 120,
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
    letterSpacing: 0.5,
    fontSize: 20,
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
    fontFamily: "Balsamiq Sans",
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
    width: "100%",
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      padding: 2,
    },
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

  ranking: {
    backgroundColor: "#4caf50",
    borderRadius: 7,
    fontSize: 16,
    width: "fit-content",
    padding: "3px 7px 3px 7px",
    color: "white",
    fontWeight: 400,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  chracterType: {
    fontSize: 60,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 400,

    margin: 0,
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 35,
    },
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
    [theme.breakpoints.down("sm")]: {
      fontSize: 15,
    },
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
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  copyIcon: {
    fontSize: 14,
    marginLeft: 10,
    color: "#dcedc8",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
}));

function CharacterSection({
  getUserCharacter,
  getMaxStatsOfCharacter,
  usercharacter,
  getCharacterRank,
  rank,
}) {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);
  const [characterPopup, setCharacterPopup] = useState(false);
  const [stopPopupClick, setStopPopupClick] = useState(false);
  const [characterProperties, setCharacterProperties] = useState(null);
  const [apiHit, setApiHit] = useState(false);
  const [characterString, setCharacterString] = useState({
    weapon: -1,
    weapon1: -1,
    helmet: -1,
    armor: -1,
    wing: -1,
    mount: -1,
  });
  const [maxStats, setMaxStats] = useState({
    hp: 100,
    mp: 100,
    Patk: 100,
    Pdef: 100,
    speed: 1,
    accuracy: 20,
  });

  useEffect(() => {
    async function asyncFn() {
      let res = await getUserCharacter();
      let resMaxStats = await getMaxStatsOfCharacter();

      await getCharacterRank();

      setMaxStats(resMaxStats);
      if (res) {
        setApiHit(true);
      } else {
        setApiHit(false);
      }
    }
    asyncFn();
  }, []);

  useEffect(() => {
    if (usercharacter !== null && usercharacter !== undefined && apiHit) {
      if (usercharacter.length === 0) {
        setActualCase(1);
      } else {
        setCharacterProperties(usercharacter.properties);
        setActualCase(2);
      }
    } else {
      setActualCase(0);
    }
  }, [usercharacter, apiHit]);

  const toggleCharacterPopup = (value) => {
    setCharacterPopup(value);
  };

  return (
    <div>
      {(actualCase === 0 || actualCase === 1) && (
        <div>
          <h1 className={classes.pageTitle}>
            My Home <img src="images/thunder.png" height="20px" alt="thunder" />
          </h1>
        </div>
      )}
      {actualCase === 0 && (
        <div>
          <Loader />
        </div>
      )}
      {actualCase === 1 && (
        <div>
          <div className="text-center mt-5">
            <div className="my-3">
              <img src="./images/char.png" height="100px" alt="character" />
            </div>
            <div className="text-center">
              <h6 className={classes.titleHeading}>
                Character not yet created
              </h6>
              <div className="d-flex justify-content-center">
                <p className={classes.subheading}>
                  Create your character now! <br />& personalise your gaming
                  experience.
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
        </div>
      )}
      <div style={{ overflowX: "hidden" }}>
        {actualCase === 2 && (
          <div className="row">
            <div className="col-md-7">
              <Grow in={true} timeout={500}>
                <CharacterAvatar
                  usercharacter={usercharacter}
                  characterProperties={characterProperties}
                  setCharacterProperties={setCharacterProperties}
                  characterString={characterString}
                  setCharacterString={setCharacterString}
                  rank={rank}
                />
              </Grow>
            </div>
            <div className="col-md-5">
              <div>
                <Grow in={true} timeout={1000}>
                  <div className="my-3">
                    <CharacterOverview character={usercharacter} />
                  </div>
                </Grow>
                <Grow in={true} timeout={1500}>
                  <div className="my-3">
                    <CharacterStats
                      character={usercharacter}
                      characterProperties={characterProperties}
                      maxStats={maxStats}
                    />
                  </div>
                </Grow>
              </div>
            </div>
          </div>
        )}
        <div>
          <ItemSection />
        </div>
      </div>
      <Dialog
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
  usercharacter: state.characters.usercharacter,
  rank: state.characters.rank,
});

const mapDispatchToProps = {
  getUserCharacter,
  getMaxStatsOfCharacter,
  getCharacterRank,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSection);
