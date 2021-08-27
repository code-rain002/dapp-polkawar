import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PowerStats from "../../../components/PowerStatsBar";
import { Button, Dialog, Slide, Backdrop } from "@material-ui/core";
import DailyRewards from "./DailyRewards";
import { connect } from "react-redux";
import { checkPwarHolding } from "../../../actions/smartActions/SmartActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  section: {
    height: "100%",
    width: 300,
    padding: 20,
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
  category: {
    fontSize: 15,
    width: "fit-content",
    padding: "2px 5px 2px 5px",
    color: "white",
    fontWeight: 300,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },

  wrapper: {
    paddingTop: 7,
    paddingBottom: 7,
  },
  powerWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    color: "grey",
    fontSize: 12,
  },
  claimXpButton: {
    borderRadius: "50px",
    background: `linear-gradient(to bottom,yellow, orange)`,
    lineHeight: "24px",
    verticalAlign: "baseline",
    letterSpacing: "-1px",
    margin: 0,
    marginTop: 5,
    marginLeft: 10,
    color: "black",
    padding: "18px 50px 18px 50px",
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
    width: "100%",
    margin: 0,
    padding: 0,
  },
}));

function CharacterStats({ character, characterProperties, maxStats }) {
  const classes = useStyles();

  const [claimXpPopup, setClaimXpPopup] = useState(false);
  const [freezePopup, setFreezePopup] = useState(false);
  const [claimXPMessage, setClaimXPMessage] = useState("");

  let colors1 = ["#ba68c8", "#9c27b0", "#7b1fa2", "#7b1fa2"];
  let colors2 = ["#ffee58", "#fbc02d", "#f57f17"];

  const nextXp = (currentXp) => {
    let characterLevel = parseInt(character.level);
    let nextLevel = characterLevel + 1;
    let a = (nextLevel * nextLevel) / 0.02 - currentXp;

    return a;
  };

  const enableClaimPopup = async () => {
    let holding = await checkPwarHolding();
    console.log(holding);
    if (holding >= 2000) {
      setClaimXpPopup(true);
      setClaimXPMessage("");
    } else {
      setClaimXpPopup(false);
      setClaimXPMessage("Need to HOLD Or STAKE 2000 PWAR");
    }
  };
  return (
    <div className={classes.background}>
      <h3 htmlFor="category" className={classes.title}>
        STATS
      </h3>
      {characterProperties !== null && characterProperties !== undefined && (
        <div className="row">
          <div className="col-md-6">
            {Object.entries(characterProperties)
              .splice(0, 4)
              .map(([key, value], index) => {
                return (
                  <div className={classes.wrapper}>
                    {index === 0 && (
                      <div>
                        <div className="d-flex justify-content-between">
                          <h6 htmlFor="category" className={classes.category}>
                            {key.toUpperCase()}({value})
                          </h6>
                          <h6
                            htmlFor="category"
                            className={classes.category}
                            style={{ color: "yellow" }}
                          >
                            <small style={{ fontSize: 12 }}>
                              {" "}
                              Upgrade requires: {nextXp(value)} XP
                            </small>
                          </h6>
                        </div>
                        <div htmlFor="power" className={classes.powerWrapper}>
                          <PowerStats
                            value={value}
                            color={colors1[index]}
                            maxValue={value + nextXp(value)}
                          />
                        </div>
                      </div>
                    )}
                    {index !== 0 && (
                      <div>
                        {" "}
                        <div>
                          <h6 htmlFor="category" className={classes.category}>
                            {key.toUpperCase()}({value})
                          </h6>
                        </div>
                        <div htmlFor="power" className={classes.powerWrapper}>
                          <PowerStats
                            value={value}
                            color={colors1[index]}
                            maxValue={maxStats[key]}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <div className="col-md-6">
            {Object.entries(characterProperties)
              .splice(4, 7)
              .map(([key, value], index) => {
                return (
                  <div>
                    {key === "speed" && (
                      <div className={classes.wrapper}>
                        <h6 htmlFor="category" className={classes.category}>
                          {key.toUpperCase()}({value.toFixed(2)})
                        </h6>
                        <div htmlFor="power" className={classes.powerWrapper}>
                          <PowerStats
                            value={value}
                            color={colors2[index]}
                            maxValue={maxStats[key]}
                          />
                        </div>
                      </div>
                    )}
                    {key !== "speed" && (
                      <div className={classes.wrapper}>
                        <h6 htmlFor="category" className={classes.category}>
                          {key.toUpperCase()}({value})
                        </h6>
                        <div htmlFor="power" className={classes.powerWrapper}>
                          <PowerStats
                            value={value}
                            color={colors2[index]}
                            maxValue={maxStats[key]}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <div className="text-center mt-3">
        <Button
          variant="contained"
          className={classes.claimXpButton}
          onClick={enableClaimPopup}
        >
          Claim XP
        </Button>
      </div>
      <div className="text-center mt-3">
        <h6 style={{ color: "#ffebee" }}> {claimXPMessage}</h6>
      </div>
      <Dialog
        className={classes.modal}
        open={claimXpPopup}
        TransitionComponent={Transition}
        keepMounted={false}
        onClose={() => setClaimXpPopup(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableBackdropClick={freezePopup}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div style={{ backgroundColor: "black" }}>
          <DailyRewards
            togglePopup={() => setClaimXpPopup(false)}
            character={character}
            freezePopup={freezePopup}
            setFreezePopup={setFreezePopup}
          />
        </div>
      </Dialog>{" "}
    </div>
  );
}
const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterStats);
