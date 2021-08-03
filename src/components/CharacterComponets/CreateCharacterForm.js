import { useState } from "react";
import { Button, Divider, MenuItem, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import characterContract from "../../utils/characterConnection";
import Loader from "../Loader";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 500,
    border: "1px solid #e5e5e5",
    borderRadius: 14,
    padding: "25px 10px 25px 10px",
    backgroundColor: "white",
    [theme.breakpoints.down("md")]: {
      width: 350,
      padding: "5px 2px 5px 2px",
    },
  },
  title: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: "black",
    fontWeight: 600,
    letterSpacing: 0.9,
    fontSize: 22,
    lineHeight: "50px",
  },
  label: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: theme.palette.pbr.primary,
    fontWeight: 500,
    letterSpacing: 0.5,
    fontSize: 18,
  },
  menuItem: {
    verticalAlign: "baseline",
    textAlign: "left",
    color: "black",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 14,
  },

  iconWrapper: {
    border: "1px solid #e5e5e5",
    borderRadius: "50%",
  },
  buttonProceed: {
    color: "white",
    marginTop: 20,
    backgroundColor: "white",
    textTransform: "none",
    borderRadius: "100px",
    padding: "12px 16px 12px 16px",
    fontWeight: 500,
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    fontSize: 16,
  },

  icon: {
    fontSize: 16,
    marginRight: 7,
    color: "#ffffff",
  },
  textField: {
    color: "white",
    border: "1px solid #ffffff",
    textAlign: "left",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: 400,
  },
}));

function CreateCharacterForm({
  stopPopupClicking,
  onClose,
  user,
  getCharacter,
}) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [nameError, setNameError] = useState("");

  const [failed, setFailed] = useState(false);
  const [error, setError] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [characterClass, setCharacterClass] = useState("Warrior");

  const changeClass = async (e) => {
    setCharacterClass(e.target.value);
  };

  const submitForm = async () => {
    //Calling smart contract function.
    let level0Characters = {
      Archer: "QmX6PKEGDCtrdwSjxsJB4575dpYcv1sQoZMCADrCyCGJYC",
      Magician: "QmeCUJbbR9JPKnX2Tk9jFFHrvkNoYsVh8exwJbZ8M2pf3z",
      Warrior: "QmP9yV42APdrWfTPLA4KtQiVjVc2qNxdPsxS5YdFiXdbcU",
    };
    let characterURI = level0Characters[characterClass];

    if (characterName.length > 0) {
      stopPopupClicking(true);
      setLoading(true);
      setError("Character is creating... please wait");
      const transaction = await new Promise((resolve, reject) => {
        characterContract.methods
          .createItem(user.address, characterURI)
          .send(
            { from: user.address, gasPrice: 25000000000 },
            function (error, transactionHash) {
              if (transactionHash) {
                resolve(transactionHash);
              } else {
                console.log("Rejected by user!");
                setError("Transaction Rejected!");
                setFailed(true);
                setCompleted(true);
                stopPopupClicking(false);
                reject();
              }
            }
          )
          .on("receipt", function (receipt) {
            setError("Transaction Completed");
            getCharacter();
            window.location.reload();
          });
      });

      console.log("Response" + transaction);

      if (transaction) {
        setError("Please Wait!");
        getCharacter();
        console.log("Submitted");
        setCompleted(false);
        stopPopupClicking(true);

        //Integration of username update

        //Integration of ownTokenID
      } else {
        setError("Transaction Failed");
        setFailed(true);
        setCompleted(true);
        stopPopupClicking(false);
      }
    } else {
      setNameError("Character name should be long enough!");
    }
  };
  return (
    <div className={classes.card}>
      {!loading ? (
        <div className="container text-center">
          <div>
            <h5 className={classes.title}>Create Character</h5>
          </div>{" "}
          <Divider style={{ backgroundColor: "black" }} />
          <div className="p-2 mt-3 float-left">
            <TextField
              label={<p className={classes.label}>Character Name</p>}
              value={characterName}
              placeholder="Enter your character name"
              className={classes.textField}
              onChange={(e) => setCharacterName(e.target.value)}
              fullWidth
            />
            <div className="float-left">
              <p
                style={{
                  color: "grey",
                  textAlign: "left",
                  fontSize: 12,
                  fontWeight: 300,
                }}
              >
                {nameError}
              </p>
            </div>
          </div>
          <div className="p-2 mt-3 float-left">
            <TextField
              select
              label={<p className={classes.label}>Class</p>}
              value={characterClass}
              className={classes.textField}
              onChange={changeClass}
              fullWidth
            >
              <MenuItem value={"Warrior"} className={classes.menuItem}>
                Warrior
              </MenuItem>
              <MenuItem value={"Magician"} className={classes.menuItem}>
                Magician
              </MenuItem>
              <MenuItem value={"Archer"} className={classes.menuItem}>
                Archer
              </MenuItem>
            </TextField>
          </div>
          <div>
            <Button
              variant="contained"
              className={classes.buttonProceed}
              onClick={submitForm}
            >
              Create Now
            </Button>
          </div>
        </div>
      ) : (
        <div className="container text-center">
          <div>
            <h5 className="text-center">Transaction Status</h5>
            <Divider style={{ backgroundColor: "black" }} />
            {completed ? (
              failed ? (
                <div className="text-center my-5">
                  <img src="./images/failed.png" height="100px" alt="error" />
                </div>
              ) : (
                <div className="text-center my-5">
                  <img
                    src="./images/success.png"
                    height="100px"
                    alt="success"
                  />
                </div>
              )
            ) : (
              <div className="text-center">
                <Loader />
              </div>
            )}

            <h5 className="text-center">{error}</h5>
            {/* <div>
              <Button variant="contained" className={classes.buttonProceed} onClick={onClose}>
                Close Now
              </Button>
            </div> */}
          </div>{" "}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCharacterForm);
