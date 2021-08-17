import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getItemDetails, getUserItems } from "../../../actions/itemActions";
import Loader from "../../../components/Loader";
import SingleCharacterItem from "./SingleCharacterItem";

const useStyles = makeStyles((theme) => ({
  background: {
    minWidth: 280,
    [theme.breakpoints.down("sm")]: {
      minWidth: 100,
    },
  },
  sectionWrapper: { paddingRight: 20 },
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
}));

function CharacterItems({
  getUserItems,
  getItemDetails,
  useritems,
  character,
  characterProperties,
  setCharacterProperties,
}) {
  const classes = useStyles();

  const [actualCase, setActualCase] = useState(0);
  const [validItems, setValidItems] = useState([]);
  const [itemClickedIndex, setItemClickIndex] = useState(-1);

  useEffect(() => {
    async function asyncFn() {
      await getUserItems();
    }
    asyncFn();
  }, []);

  useEffect(() => {
    async function asyncFn() {
      let characterLevel = parseInt(character.level);
      let compatibleItems = [];
      if (useritems !== null && useritems !== undefined) {
        if (useritems.length === 0) {
          setActualCase(1);
        } else {
          useritems.map(async (element) => {
            let item = await getItemDetails(element.itemId);
            if (
              (parseInt(item.level) === 2 &&
                characterLevel >= 11 &&
                characterLevel <= 29) ||
              (parseInt(item.level) === 1 &&
                characterLevel >= 0 &&
                characterLevel <= 10)
            ) {
              console.log(item);
              if (item.forCharacter === character.name) {
                compatibleItems.push(item);
                setValidItems(compatibleItems);
              }
            }
          });

          setActualCase(2);
        }
      } else {
        setActualCase(0);
      }
    }
    asyncFn();
  }, [useritems]);

  const updateCharacterProperties = (index) => {
    let itemProperties = validItems[index].properties;
    if (itemClickedIndex === index) {
      setCharacterProperties(character.properties);
      setItemClickIndex(-1);
    } else {
      //Bdam to PAtk
      //
      let tempObject = {
        xp:
          character.properties.xp + (itemProperties.xp ? itemProperties.xp : 0),
        hp:
          character.properties.hp + (itemProperties.hp ? itemProperties.hp : 0),
        mp:
          character.properties.mp + (itemProperties.mp ? itemProperties.mp : 0),
        Patk:
          character.properties.Patk +
          (itemProperties.bDam ? itemProperties.bDam : 0),
        Pdef:
          character.properties.Pdef +
          (itemProperties.Pdef ? itemProperties.Pdef : 0),
        speed:
          character.properties.speed +
          (itemProperties.speed ? itemProperties.speed : 0),
        accuracy:
          character.properties.accuracy +
          (itemProperties.accuracy ? itemProperties.accuracy : 0),
      };
      setItemClickIndex(index);

      setCharacterProperties(tempObject);
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
      {validItems.length === 0 && (
        <div>
          <div>
            <p className={classes.notFound}>No Item</p>
          </div>
        </div>
      )}
      {actualCase === 2 && (
        <div className={classes.scroll}>
          {validItems.map((item, index) => {
            return (
              <div
                className={classes.sectionWrapper}
                onClick={() => updateCharacterProperties(index)}
              >
                <SingleCharacterItem
                  item={item}
                  clickedIndex={itemClickedIndex}
                  itemIndex={index}
                />
              </div>
            );
          })}
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
