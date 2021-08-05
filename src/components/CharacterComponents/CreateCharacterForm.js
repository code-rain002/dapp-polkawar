import { useState } from "react";
import { Button, Divider, MenuItem, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import characterContract from "../../utils/characterConnection";
import { connect } from "react-redux";
import { getUserAddress } from "../../actions/web3Actions";
import TransactionStatus from "../TransactionStatus";
import { createUserCharacter } from "./../../actions/characterActions";

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

let charactersInfo = [
  {
    character_id: 1,
    name: "Warrior",
    hashUrl: "QmP9yV42APdrWfTPLA4KtQiVjVc2qNxdPsxS5YdFiXdbcU",
  },
  {
    character_id: 4,
    name: "Magician",
    hashUrl: "QmeCUJbbR9JPKnX2Tk9jFFHrvkNoYsVh8exwJbZ8M2pf3z",
  },
  {
    character_id: 7,
    name: "Archer",
    hashUrl: "QmX6PKEGDCtrdwSjxsJB4575dpYcv1sQoZMCADrCyCGJYC",
  },
];

function CreateCharacterForm({
  stopPopupClicking,
  onClose,
  createUserCharacter,
}) {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);
  const [characterName, setCharacterName] = useState("");
  const [characterClass, setCharacterClass] = useState(0);
  const [nameError, setNameError] = useState("");

  const changeClass = async (e) => {
    setCharacterClass(e.target.value);
  };

  const submitForm = async () => {
    //Calling smart contract function.

    let singleCharacterHash = charactersInfo[characterClass];
    let characterId = singleCharacterHash.character_id;
    console.log(singleCharacterHash.character_id);
    console.log(singleCharacterHash.hashUrl);

    if (characterName.length > 0) {
      stopPopupClicking(true);
      setActualCase(1);
      let userAddress = await getUserAddress();
      const response = await characterContract.methods
        .createItem(userAddress, singleCharacterHash.hashUrl)
        .send(
          { from: userAddress, gasPrice: 15000000000 },
          function (error, transactionHash) {
            if (transactionHash) {
              setActualCase(3);
              return transactionHash;
            } else {
              console.log("Rejected by user!");
              setActualCase(2);
              stopPopupClicking(false);
            }
          }
        )
        .on("receipt", async function (receipt) {
          console.log(receipt);
          let contractTokenId = receipt.events.Transfer.returnValues.tokenId;

          let newCharacterSaveStatus = await createUserCharacter(
            contractTokenId,
            characterId,
            characterName
          );
          console.log(newCharacterSaveStatus);
          if (newCharacterSaveStatus) {
            setActualCase(6);
            //window.location.reload();
          } else {
            setActualCase(5);
          }

          return receipt;
        })
        .on("error", async function (error) {
          setActualCase(4);
        });

      console.log(response);
    } else {
      setNameError("Character name should be long enough!");
    }
  };
  return (
    <div className={classes.card}>
      {actualCase === 0 && (
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
              <MenuItem value={0} className={classes.menuItem}>
                Warrior
              </MenuItem>
              <MenuItem value={1} className={classes.menuItem}>
                Magician
              </MenuItem>
              <MenuItem value={2} className={classes.menuItem}>
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
      )}
      {actualCase !== 0 && (
        <div>
          <TransactionStatus actualCase={actualCase} color={"white"} />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = { createUserCharacter };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCharacterForm);
