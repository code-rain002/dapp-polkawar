import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getItemDetails, getUserItems } from "../../../actions/itemActions";
import Loader from "../../../components/Loader";
import SingleCharacterItem from "./SingleCharacterItem";
import { Grow, IconButton, Slide, Zoom } from "@material-ui/core";
import {
  ArrowLeft,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  background: {
    width: 260,
    [theme.breakpoints.down("sm")]: {
      minWidth: 100,
    },
  },

  sectionWrapper: { padding: 0, margin: 0 },
  scroll: {
    height: 440,
    overflowY: "scroll",
    [theme.breakpoints.down("sm")]: {
      height: 300,
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
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
    },
  },
  subtitle: {
    fontSize: 18,
    width: "fit-content",
    paddingTop: 10,
    paddingBottom: 10,
    color: "white",
    fontWeight: 600,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  notFound: {
    fontSize: 14,
    width: "fit-content",
    paddingBottom: 10,
    paddingTop: 10,
    color: "white",
    fontWeight: 500,
    fontFamily: "Montserrat",
    margin: 0,
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  arrowIcon: {
    color: "white",
    fontSize: 40,
    [theme.breakpoints.down("sm")]: {
      fontSize: 25,
    },
  },
}));

function CharacterItems({
  getUserItems,
  getItemDetails,
  useritems,
  character,
  characterProperties,
  setCharacterProperties,
  characterString,
  setCharacterString,
}) {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);
  const [validLength, setValidLength] = useState(0);
  const [weaponIndex, setWeaponIndex] = useState(0);
  const [helmetIndex, setHelmetIndex] = useState(0);
  const [wingIndex, setWingIndex] = useState(0);
  const [armorIndex, setArmorIndex] = useState(0);
  const [mountIndex, setMountIndex] = useState(0);

  const [validItems, setValidItems] = useState({
    weapon: [],
    armor: [],
    mount: [],
    helmet: [],
    wing: [],
  });
  const [clickIndex, setClickIndex] = useState({
    weapon: -1,
    weapon1: -1,
    armor: -1,
    mount: -1,
    helmet: -1,
    wing: -1,
  });
  const [clickValues, setClickValues] = useState({
    weapon: 0,
    weapon1: 0,
    armor: 0,
    mount: 0,
    helmet: 0,
    wing: 0,
  });

  useEffect(() => {
    async function asyncFn() {
      await getUserItems();
    }
    asyncFn();
  }, []);

  useEffect(() => {
    async function asyncFn() {
      // 1. Fetching character level
      let characterLevel = parseInt(character.level);

      let weapons = [];
      let armors = [];
      let mount = [];
      let helmets = [];
      let wings = [];

      if (useritems !== null && useritems !== undefined) {
        if (useritems.length === 0) {
          setActualCase(1);
        } else {
          let totalItems = 0;
          useritems.map(async (element) => {
            let item = await getItemDetails(element.itemId);

            //2. Checking compatible character items
            if (
              (item.forCharacter === character.name &&
                parseInt(item.level) === 2 &&
                characterLevel >= 11 &&
                characterLevel <= 29) ||
              (item.forCharacter === character.name &&
                parseInt(item.level) === 1 &&
                characterLevel >= 0 &&
                characterLevel <= 10)
            ) {
              // 3. Distributing items into category
              if (
                item.category === "sword" ||
                item.category === "big knife" ||
                item.category === "tessen" ||
                item.category === "bow & arrow" ||
                item.category === "gun" ||
                item.category === "sceptre" ||
                item.category === "magic vase"
              ) {
                weapons = [...weapons, item];
                totalItems = totalItems + 1;
              }
              if (item.category === "helmet") {
                helmets = [...helmets, item];
                totalItems = totalItems + 1;
              }
              if (item.category === "wing") {
                wings = [...wings, item];
                totalItems = totalItems + 1;
              }
              if (item.category === "armor") {
                armors = [...armors, item];
                totalItems = totalItems + 1;
              }
              if (item.category === "mount") {
                mount = [...mount, item];
                totalItems = totalItems + 1;
              }

              setValidLength(totalItems);
            }
          });
          setTimeout(() => {
            setValidItems({
              weapon: weapons,
              armor: armors,
              mount: mount,
              helmet: helmets,
              wing: wings,
            });

            setActualCase(2);
          }, 1500);
        }
      } else {
        setActualCase(0);
      }
    }
    asyncFn();
  }, [useritems]);

  const updateCharacterProperties = (index, category) => {
    // 1. Fetching clicked item property
    let selectedItemProperties = validItems[category][index].properties;

    // 3. updating clicked item values
    let tempClickValues = clickValues;
    tempClickValues[category] = selectedItemProperties;
    setClickValues(tempClickValues);

    if (clickIndex[category] === index) {
      let tempObject = {
        xp:
          characterProperties.xp -
          (selectedItemProperties.xp ? selectedItemProperties.xp : 0),
        hp:
          characterProperties.hp -
          (selectedItemProperties.hp ? selectedItemProperties.hp : 0),
        mp:
          characterProperties.mp -
          (selectedItemProperties.mp ? selectedItemProperties.mp : 0),
        Patk:
          characterProperties.Patk -
          (selectedItemProperties.bDam ? selectedItemProperties.bDam : 0),
        Pdef:
          characterProperties.Pdef -
          (selectedItemProperties.prot ? selectedItemProperties.prot : 0),
        speed:
          characterProperties.speed -
          (selectedItemProperties.speed ? selectedItemProperties.speed : 0),
        accuracy:
          characterProperties.accuracy -
          (selectedItemProperties.accuracy
            ? selectedItemProperties.accuracy
            : 0),
      };
      setCharacterProperties(tempObject);

      // 2. Updating clicked item index
      let tempClickIndex = clickIndex;
      tempClickIndex[category] = -1;
      setClickIndex(tempClickIndex);

      let tempCharacterString = characterString;
      tempCharacterString[category] = -1;
      setCharacterString(tempCharacterString);
    } else {
      let oldXp = 0;
      let oldHp = 0;
      let oldMp = 0;
      let oldPatk = 0;
      let oldPdef = 0;
      let oldSpeed = 0;
      let oldAccuracy = 0;

      if (
        validItems[category][clickIndex[category]] !== undefined &&
        validItems[category][clickIndex[category]] !== null
      ) {
        oldXp = validItems[category][clickIndex[category]].properties.xp
          ? validItems[category][clickIndex[category]].properties.xp
          : 0;
        oldHp = validItems[category][clickIndex[category]].properties.hp
          ? validItems[category][clickIndex[category]].properties.hp
          : 0;
        oldMp = validItems[category][clickIndex[category]].properties.mp
          ? validItems[category][clickIndex[category]].properties.mp
          : 0;
        oldPatk = validItems[category][clickIndex[category]].properties.bDam
          ? validItems[category][clickIndex[category]].properties.bDam
          : 0;
        oldPdef = validItems[category][clickIndex[category]].properties.prot
          ? validItems[category][clickIndex[category]].properties.prot
          : 0;
        oldSpeed = validItems[category][clickIndex[category]].properties.speed
          ? validItems[category][clickIndex[category]].properties.speed
          : 0;
        oldAccuracy = validItems[category][clickIndex[category]].properties
          .accuracy
          ? validItems[category][clickIndex[category]].properties.accuracy
          : 0;
      }

      //Bdam to PAtk
      //prot to Pdef
      let tempObject = {
        xp:
          characterProperties.xp -
          oldXp +
          (selectedItemProperties.xp ? selectedItemProperties.xp : 0),
        hp:
          characterProperties.hp -
          oldHp +
          (selectedItemProperties.hp ? selectedItemProperties.hp : 0),
        mp:
          characterProperties.mp -
          oldMp +
          (selectedItemProperties.mp ? selectedItemProperties.mp : 0),
        Patk:
          characterProperties.Patk -
          oldPatk +
          (selectedItemProperties.bDam ? selectedItemProperties.bDam : 0),
        Pdef:
          characterProperties.Pdef -
          oldPdef +
          (selectedItemProperties.prot ? selectedItemProperties.prot : 0),
        speed:
          characterProperties.speed -
          oldSpeed +
          (selectedItemProperties.speed ? selectedItemProperties.speed : 0),
        accuracy:
          characterProperties.accuracy -
          oldAccuracy +
          (selectedItemProperties.accuracy
            ? selectedItemProperties.accuracy
            : 0),
      };

      setCharacterProperties(tempObject);

      // console.log(characterProperties);
      // console.log(selectedItemProperties);

      // 2. Updating clicked item index
      let tempClickIndex = clickIndex;
      tempClickIndex[category] = index;
      setClickIndex(tempClickIndex);

      console.log("Hitting2");
      let selectedItemId = validItems[category][index].id;
      console.log(validItems[category][index]);
      let tempCharacterString = characterString;
      tempCharacterString[category] = selectedItemId;
      setCharacterString(tempCharacterString);
    }
  };

  const updateMagicianWeaponProperties = (index) => {
    // 1. Fetching clicked item property
    let selectedItemProperties = validItems["weapon"][index].properties;
    console.log(validItems["weapon"]);
    console.log(selectedItemProperties);

    // 3. updating clicked item values
    let tempClickValues = clickValues;
    if (index === 0) {
      tempClickValues[`weapon`] = selectedItemProperties;
      setClickValues(tempClickValues);
    } else {
      tempClickValues[`weapon${index}`] = selectedItemProperties;
      setClickValues(tempClickValues);
    }

    let prevClickIndexValue;
    if (index === 0) {
      prevClickIndexValue = clickIndex[`weapon`];
    } else {
      prevClickIndexValue = clickIndex[`weapon${index}`];
    }

    console.log(prevClickIndexValue);

    if (prevClickIndexValue === index) {
      let tempObject = {
        xp: characterProperties.xp,
        hp: characterProperties.hp,
        mp: characterProperties.mp,
        Patk:
          characterProperties.Patk -
          (selectedItemProperties.bDam ? selectedItemProperties.bDam : 0),
        Pdef: characterProperties.Pdef,
        speed: characterProperties.speed,
        accuracy:
          characterProperties.accuracy -
          (selectedItemProperties.accuracy
            ? selectedItemProperties.accuracy
            : 0),
      };
      setCharacterProperties(tempObject);
      // 2. Updating clicked item index
      let tempClickIndex = clickIndex;
      if (index === 0) {
        tempClickIndex[`weapon`] = -1;
      } else {
        tempClickIndex[`weapon${index}`] = -1;
      }
      setClickIndex(tempClickIndex);

      let tempCharacterString = characterString;
      if (index === 0) {
        tempCharacterString[`weapon`] = -1;
      } else {
        tempClickIndex[`weapon${index}`] = -1;
      }

      setCharacterString(tempCharacterString);
    } else {
      console.log("Index not equal");
      let oldPatk = 0;
      let oldAccuracy = 0;

      //Bdam to PAtk
      //prot to Pdef
      let tempObject = {
        xp: characterProperties.xp,
        hp: characterProperties.hp,
        mp: characterProperties.mp,
        Patk:
          characterProperties.Patk -
          oldPatk +
          (selectedItemProperties.bDam ? selectedItemProperties.bDam : 0),
        Pdef: characterProperties.Pdef,
        speed: characterProperties.speed,
        accuracy:
          characterProperties.accuracy -
          oldAccuracy +
          (selectedItemProperties.accuracy
            ? selectedItemProperties.accuracy
            : 0),
      };

      setCharacterProperties(tempObject);

      // 2. Updating clicked item index
      let tempClickIndex = clickIndex;
      if (index === 0) {
        tempClickIndex[`weapon`] = index;
      } else {
        tempClickIndex[`weapon${index}`] = index;
      }
      setClickIndex(tempClickIndex);

      let selectedItemId = validItems[`weapon`][index].id;
      console.log(selectedItemId);

      let tempCharacterString = characterString;
      console.log(characterString);

      if (index === 0) {
        tempCharacterString[`weapon`] = selectedItemId;
      } else {
        tempCharacterString[`weapon${index}`] = selectedItemId;
      }
      setCharacterString(tempCharacterString);
    }
  };
  return (
    <div className={classes.background}>
      <h3 htmlFor="category" className={classes.title}>
        ITEMS
      </h3>
      {actualCase === 0 && (
        <div>
          <Loader />
        </div>
      )}
      {actualCase !== 0 && validLength === 0 && (
        <div>
          <div>
            <p className={classes.notFound}>No Item</p>
          </div>
        </div>
      )}
      {actualCase === 2 && (
        <div className={classes.scroll}>
          {character.name === "Magician" && (
            <div>
              <div htmlFor="weapons">
                {validItems["weapon"].length !== 0 && (
                  <div>
                    {validItems["weapon"].map((item, itemIndex) => {
                      return (
                        <div>
                          {" "}
                          <h3 htmlFor="category" className={classes.subtitle}>
                            Weapon {itemIndex + 1}
                          </h3>
                          <div className="d-flex justify-content-start align-items-center">
                            <div>
                              <IconButton style={{ margin: 0, padding: 0 }}>
                                <KeyboardArrowLeft
                                  onClick={
                                    weaponIndex === 0
                                      ? null
                                      : () => setWeaponIndex(weaponIndex - 1)
                                  }
                                  className={classes.arrowIcon}
                                />
                              </IconButton>
                            </div>
                            <Zoom in={true} timeout={500}>
                              <div
                                className={classes.sectionWrapper}
                                onClick={() =>
                                  updateMagicianWeaponProperties(itemIndex)
                                }
                              >
                                <SingleCharacterItem
                                  item={validItems["weapon"][itemIndex]}
                                  clickedIndex={
                                    itemIndex === 0
                                      ? clickIndex["weapon"]
                                      : clickIndex["weapon1"]
                                  }
                                  itemIndex={itemIndex}
                                />
                              </div>
                            </Zoom>{" "}
                            <div>
                              {" "}
                              <IconButton style={{ margin: 0, padding: 0 }}>
                                <KeyboardArrowRight
                                  onClick={
                                    weaponIndex ===
                                      validItems["weapon"].length - 1
                                      ? null
                                      : () => setWeaponIndex(weaponIndex + 1)
                                  }
                                  className={classes.arrowIcon}
                                />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {character.name !== "Magician" && (
            <div htmlFor="weapon">
              {validItems["weapon"].length !== 0 && (
                <div>
                  {" "}
                  <h3 htmlFor="category" className={classes.subtitle}>
                    Weapon
                  </h3>
                  <div className="d-flex justify-content-start align-items-center">
                    <div>
                      <IconButton style={{ margin: 0, padding: 0 }}>
                        <KeyboardArrowLeft
                          onClick={
                            weaponIndex === 0
                              ? null
                              : () => setWeaponIndex(weaponIndex - 1)
                          }
                          className={classes.arrowIcon}
                        />
                      </IconButton>
                    </div>

                    <Zoom in={true} timeout={500}>
                      <div
                        className={classes.sectionWrapper}
                        onClick={() =>
                          updateCharacterProperties(weaponIndex, "weapon")
                        }
                      >
                        <SingleCharacterItem
                          item={validItems["weapon"][weaponIndex]}
                          clickedIndex={clickIndex["weapon"]}
                          itemIndex={weaponIndex}
                        />
                      </div>
                    </Zoom>

                    <div>
                      {" "}
                      <IconButton style={{ margin: 0, padding: 0 }}>
                        <KeyboardArrowRight
                          onClick={
                            weaponIndex === validItems["weapon"].length - 1
                              ? null
                              : () => setWeaponIndex(weaponIndex + 1)
                          }
                          className={classes.arrowIcon}
                        />
                      </IconButton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div htmlFor="helmet">
            {validItems["helmet"].length !== 0 && (
              <div>
                {" "}
                <h3 htmlFor="category" className={classes.subtitle}>
                  Helmet
                </h3>
                <div className="d-flex justify-content-start align-items-center">
                  <div>
                    <IconButton style={{ margin: 0, padding: 0 }}>
                      <KeyboardArrowLeft
                        onClick={
                          helmetIndex === 0
                            ? null
                            : () => setHelmetIndex(helmetIndex - 1)
                        }
                        className={classes.arrowIcon}
                      />
                    </IconButton>
                  </div>

                  <Zoom in={true} timeout={500}>
                    <div
                      className={classes.sectionWrapper}
                      onClick={() =>
                        updateCharacterProperties(helmetIndex, "helmet")
                      }
                    >
                      <SingleCharacterItem
                        item={validItems["helmet"][helmetIndex]}
                        clickedIndex={clickIndex["helmet"]}
                        itemIndex={helmetIndex}
                      />
                    </div>
                  </Zoom>

                  <div>
                    {" "}
                    <IconButton style={{ margin: 0, padding: 0 }}>
                      <KeyboardArrowRight
                        onClick={
                          helmetIndex === validItems["helmet"].length - 1
                            ? null
                            : () => setHelmetIndex(helmetIndex + 1)
                        }
                        className={classes.arrowIcon}
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div htmlFor="wing">
            {validItems["wing"].length !== 0 && (
              <div>
                {" "}
                <h3 htmlFor="category" className={classes.subtitle}>
                  Wing
                </h3>
                <div className="d-flex justify-content-start align-items-center">
                  <div>
                    <IconButton style={{ margin: 0, padding: 0 }}>
                      <KeyboardArrowLeft
                        onClick={
                          wingIndex === 0
                            ? null
                            : () => setWingIndex(wingIndex - 1)
                        }
                        className={classes.arrowIcon}
                      />
                    </IconButton>
                  </div>

                  <Zoom in={true} timeout={500}>
                    <div
                      className={classes.sectionWrapper}
                      onClick={() =>
                        updateCharacterProperties(wingIndex, "wing")
                      }
                    >
                      <SingleCharacterItem
                        item={validItems["wing"][wingIndex]}
                        clickedIndex={clickIndex["wing"]}
                        itemIndex={wingIndex}
                      />
                    </div>
                  </Zoom>

                  <div>
                    {" "}
                    <IconButton style={{ margin: 0, padding: 0 }}>
                      <KeyboardArrowRight
                        onClick={
                          wingIndex === validItems["wing"].length - 1
                            ? null
                            : () => setWingIndex(wingIndex + 1)
                        }
                        className={classes.arrowIcon}
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div htmlFor="armor">
            {validItems["armor"].length !== 0 && (
              <div>
                {" "}
                <h3 htmlFor="category" className={classes.subtitle}>
                  Armor
                </h3>
                <div className="d-flex justify-content-start align-items-center">
                  <div>
                    <IconButton style={{ margin: 0, padding: 0 }}>
                      <KeyboardArrowLeft
                        onClick={
                          armorIndex === 0
                            ? null
                            : () => setArmorIndex(armorIndex - 1)
                        }
                        className={classes.arrowIcon}
                      />
                    </IconButton>
                  </div>

                  <Zoom in={true} timeout={500}>
                    <div
                      className={classes.sectionWrapper}
                      onClick={() =>
                        updateCharacterProperties(armorIndex, "armor")
                      }
                    >
                      <SingleCharacterItem
                        item={validItems["armor"][armorIndex]}
                        clickedIndex={clickIndex["armor"]}
                        itemIndex={armorIndex}
                      />
                    </div>
                  </Zoom>

                  <div>
                    {" "}
                    <IconButton style={{ margin: 0, padding: 0 }}>
                      <KeyboardArrowRight
                        onClick={
                          armorIndex === validItems["armor"].length - 1
                            ? null
                            : () => setArmorIndex(armorIndex + 1)
                        }
                        className={classes.arrowIcon}
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div htmlFor="mount">
            {validItems["mount"].length !== 0 && (
              <div>
                {" "}
                <h3 htmlFor="category" className={classes.subtitle}>
                  Mount
                </h3>
                <div className="d-flex justify-content-start align-items-center">
                  <div>
                    <IconButton style={{ margin: 0, padding: 0 }}>
                      <KeyboardArrowLeft
                        onClick={
                          mountIndex === 0
                            ? null
                            : () => setMountIndex(mountIndex - 1)
                        }
                        className={classes.arrowIcon}
                      />
                    </IconButton>
                  </div>

                  <Zoom in={true} timeout={500}>
                    <div
                      className={classes.sectionWrapper}
                      onClick={() =>
                        updateCharacterProperties(mountIndex, "mount")
                      }
                    >
                      <SingleCharacterItem
                        item={validItems["mount"][mountIndex]}
                        clickedIndex={clickIndex["mount"]}
                        itemIndex={mountIndex}
                      />
                    </div>
                  </Zoom>

                  <div>
                    {" "}
                    <IconButton style={{ margin: 0, padding: 0 }}>
                      <KeyboardArrowRight
                        onClick={
                          mountIndex === validItems["mount"].length - 1
                            ? null
                            : () => setMountIndex(mountIndex + 1)
                        }
                        className={classes.arrowIcon}
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  useritems: state.items.useritems,
});

const mapDispatchToProps = { getUserItems, getItemDetails };

export default connect(mapStateToProps, mapDispatchToProps)(CharacterItems);
