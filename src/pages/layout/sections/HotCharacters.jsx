import React, { Fragment, useEffect, useState } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CharacterCard from "../../../components/CharacterComponents/CharacterCard";
import { getTopCharacters } from "./../../../actions/characterActions";
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

function HotCharacters({ characters, getTopCharacters, authenticated }) {
  const classes = useStyles();
  const [charactersList, setCharactersList] = useState([]);

  useEffect(() => {
    async function asyncFn() {
      let walletStatus = await checkWalletAvailable();
      if (walletStatus) {
        let networkStatus = await checkCorrectNetwork();
        if (networkStatus) {
          await getTopCharacters();
        }
      }
    }
    asyncFn();
  }, [authenticated]);

  // useEffect(() => {
  //   if (characters !== null) {
  //     updateCharacters();
  //   }
  // }, [characters]);

  // const updateCharacters = () => {
  //   let names = [
  //     "Siddiqui Amir",
  //     "Nafa Jain",
  //     "Darren Jil",
  //     "Shubham Sharma",
  //     "Javier John",
  //     "Akram",
  //     "Zin Loof",
  //     "Engitan Suc",
  //     "Crypto Boss",
  //     "Devil King",
  //   ];
  //   let updatedData = characters.map((character, index) => {
  //     character.username = names[index];
  //     return character;
  //   });
  //   let filteredData = updatedData.filter((character) => {
  //     return character.level !== "0";
  //   });
  //   console.log(filteredData);
  //   setCharactersList(updatedData);
  // };
  return (
    <Fragment>
      <h1 className="heading">Top characters</h1>

      {characters !== null && characters !== undefined && (
        <div>
          <div className={classes.characterScroll}>
            <div className={classes.scrollItemPositions}>
              {console.log(charactersList)}
              {characters.map((character, index) => {
                return (
                  <div
                    style={{ paddingRight: 15, flexBasis: "50%" }}
                    key={index}
                  >
                    <CharacterCard item={character} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
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
