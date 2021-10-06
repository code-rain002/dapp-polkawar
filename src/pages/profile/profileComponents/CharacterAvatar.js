import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Grow } from "@material-ui/core";
import imageBaseUrl from "../../../actions/imageBaseUrl";
import { FileCopy } from "@material-ui/icons";
import CharacterItems from "./CharacterItems";

const useStyles = makeStyles((theme) => ({
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

function CharacterAvatar({
  usercharacter,
  characterProperties,
  setCharacterProperties,
  characterString,
  setCharacterString,
}) {
  const classes = useStyles();

  const getCharacterImage = () => {
    let sumOfValues = Object.keys(characterString).reduce(
      (sum, key) => sum + parseFloat(characterString[key] || 0),
      0
    );
    if (sumOfValues === -6 || characterString["weapon"] === -1) {
      return `${imageBaseUrl}/${usercharacter.hashImage}`;
    } else {
      if (
        characterString["helmet"] === -1 &&
        characterString["armor"] === -1 &&
        characterString["wing"] === -1 &&
        characterString["mount"] === -1
      ) {
        return `${imageBaseUrl}/${usercharacter.hashImage}`;
      } else {
        let characterImage;

        if (usercharacter.name === "Magician") {
          console.log(characterString);
          if (
            characterString["weapon"] === -1 ||
            characterString["weapon1"] === -1
          ) {
            characterImage = `${imageBaseUrl}/${usercharacter.hashImage}`;
          } else {
            let weapon0 =
              characterString["weapon"] > characterString["weapon1"]
                ? characterString["weapon1"]
                : characterString["weapon"];
            let weapon1 =
              characterString["weapon"] > characterString["weapon1"]
                ? characterString["weapon"]
                : characterString["weapon1"];
            characterImage = `./characterWithItems_lv1/${usercharacter.name}_${weapon0}_${weapon1}_${characterString["helmet"]}_${characterString["armor"]}_${characterString["wing"]}_${characterString["mount"]}.png`;
          }
        } else {
          characterImage = `./characterWithItems_lv1/${usercharacter.name}_${characterString["weapon"]}_-1_${characterString["helmet"]}_${characterString["armor"]}_${characterString["wing"]}_${characterString["mount"]}.png`;
        }

        return characterImage;
      }
    }
  };

  const getAddressString = () => {
    let address = usercharacter.owner;
    return address.slice(0, 4) + "..." + address.slice(address.length - 4);
  };

  return (
    <div>
      <Grow in={true} timeout={500}>
        <div>
          {usercharacter !== null && usercharacter !== undefined && (
            <div>
              <div>
                <h6 htmlFor="ranking" className={classes.ranking}>
                  {" "}
                  # {usercharacter.tokenId}
                </h6>
                <h1
                  htmlFor="usercharacterType"
                  className={classes.chracterType}
                >
                  {usercharacter.name}{" "}
                  <img src="images/swords.png" height="30px" alt="level" />
                </h1>
              </div>

              <h6 htmlFor="username" className={classes.username}>
                {usercharacter.username}
              </h6>
              <h6 htmlFor="address" className={classes.address}>
                {getAddressString()}

                <IconButton style={{ padding: 0 }}>
                  <FileCopy
                    className={classes.copyIcon}
                    onClick={() =>
                      navigator.clipboard.writeText(usercharacter.owner)
                    }
                  />
                </IconButton>
              </h6>

              <div className={classes.section}>
                <div>
                  <img
                    src={getCharacterImage()}
                    className={classes.media}
                    alt="character"
                  />
                </div>
                <div>
                  <CharacterItems
                    character={usercharacter}
                    characterProperties={characterProperties}
                    setCharacterProperties={setCharacterProperties}
                    characterString={characterString}
                    setCharacterString={setCharacterString}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Grow>
    </div>
  );
}

export default CharacterAvatar;
