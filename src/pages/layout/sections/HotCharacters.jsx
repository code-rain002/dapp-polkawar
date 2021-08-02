import React, { Fragment, useEffect, useState } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CharacterCard from "../../../components/CharacterCard";
import { getCharacters } from "./../../../actions/characterActions";
import {
  checkCorrectNetwork,
  checkWalletAvailable,
} from "../../../actions/web3Actions";

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

function HotCharacters({ characters, getCharacters, authenticated }) {
  const classes = useStyles();
  const [charactersList, setCharactersList] = useState([]);
  

  useEffect( () => {
    async function asyncFn(){
      let walletStatus = await checkWalletAvailable();
    if (walletStatus) {
      let networkStatus = await checkCorrectNetwork();
      if (networkStatus) {
        await getCharacters();
      
      } 
    }
    }
    asyncFn()
  }, [authenticated]);

  useEffect(() => {
    if (characters !== null) {
      updateCharacters();
    }
  }, [characters]);

  const updateCharacters = () => {
    let names = [
      "Paul Williams",
      "Nafa Jain",
      "Darren Jil",
      "Shubham Sharma",
      "Jay",
      "Akram",
      "Zin Loof",
      "Engitan Suc",
      "Crypto Boss",
      "Devil King",
    ];
    let updatedData = characters.map((character, index) => {
      character.name = names[index];
      return character;
    });
    let filteredData = updatedData.filter((character) => {
      return character.level !== "0";
    });
    setCharactersList(filteredData);
  };
  return (
    <Fragment>
      <h1 className="heading">Hot characters</h1>
      
      <div className={classes.characterScroll}>
        <div className={classes.scrollItemPositions}>
  

          {charactersList.map((character, index) => {
            return (
              <div style={{ paddingRight: 15, flexBasis: "25%" }} key={index}>
                <CharacterCard item={character} />
              </div>
            );
          })}
        </div>
      </div>
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

const mapDispatchToProps = { getCharacters };

export default connect(mapStateToProps, mapDispatchToProps)(HotCharacters);
