var UserCharacterModel = require("../models/usercharacter");
var UserItem = require("../models/useritem");
var ItemModel = require("../models/item");

const userCharacterDao = {
  async getCharacterById(id) {
    return await UserCharacterModel.findOne({ _id: id });
  },

  async getTopCharacters() {
    let characters = await UserCharacterModel.find({})
      .sort({ "properties.xp": -1, level: -1, createdDate: -1 })
      .limit(5);
    return characters.sort((a, b) => {
      return b.properties.xp - a.properties.xp;
    });
  },
  async getTop100Characters(pageNo) {
    let pageSize = 10;
    let skipped = pageNo * pageSize;
    if (skipped >= 100) {
      return [];
    } else {
      return await UserCharacterModel.find({})
        .sort({ "properties.xp": -1, level: -1, createdDate: -1 })
        .skip(skipped)
        .limit(pageSize);
    }
  },

  async getUserCharacter(owner) {
    let data = await UserCharacterModel.findOne({
      owner: { $regex: `^${owner}$`, $options: "i" },
    });
    console.log(data);
    return data;
  },
  async getUserCharacterRank(owner) {
    const sortedData = await UserCharacterModel.find({}).sort({
      "properties.xp": -1,
      level: -1,
      createdDate: -1,
    });

    const ownerCharacter = sortedData.find(
      (singleCharacter) =>
        singleCharacter.owner.toLowerCase() === owner.toLowerCase()
    );
    let rank = sortedData.indexOf(ownerCharacter);
    return { rank };
  },
  async getUserCharacterProfile(owner) {
    let character = await UserCharacterModel.findOne({
      owner: { $regex: `^${owner}$`, $options: "i" },
    });
    let items = await UserItem.find({
      owner: { $regex: `^${owner}$`, $options: "i" },
    });

    let detailedItems = await Promise.all(
      items.map(async (singleItem) => {
        let data = await ItemModel.findOne({ id: singleItem.itemId });

        return data;
      })
    );

    let characterProfile = {
      character: character,
      items: detailedItems,
    };

    return characterProfile;
  },

  async getMaxStatsOfCharacter(owner) {
    // 1. Fetch character properties and level
    let userCharacter = await UserCharacterModel.findOne({
      owner: { $regex: `^${owner}$`, $options: "i" },
    });

    if (userCharacter) {
      let characterProp = userCharacter.properties;

      let characterName = userCharacter.name;
      let characterLevel =
        parseInt(userCharacter.level) === 0 ? 1 : parseInt(userCharacter.level);

      // 2. Fetch items compatible to character based on level
      let requiredItemLevel = Math.ceil(parseInt(characterLevel) / 10);
      let allItems = await ItemModel.find({
        level: requiredItemLevel,
        forCharacter: characterName,
      });

      // 3. Categorising them into weapons and equipments
      let weapons = allItems.filter((item) => {
        return (
          item.category !== "helmet" &&
          item.category !== "armor" &&
          item.category !== "wing" &&
          item.category !== "mount"
        );
      });
      let equipments = allItems.filter((item) => {
        return (
          item.category === "helmet" ||
          item.category === "armor" ||
          item.category === "wing"
        );
      });

      // 4. Creating array of properties
      let weaponsProp = weapons.map((weapon) => weapon.properties);
      let equipmentsProp = equipments.map((equipment) => equipment.properties);

      // 5. Calculating maximum values of a category
      let maxOfWeapons;

      if (userCharacter.name !== "Magician") {
        if (weaponsProp.length > 0) {
          maxOfWeapons = weaponsProp.reduce((a, b) => {
            let tempObj = {
              bDam: a.bDam > b.bDam ? a.bDam : b.bDam,
              accuracy: a.accuracy > b.accuracy ? a.accuracy : b.accuracy,
              bonus: a.bonus > b.bonus ? a.bonus : b.bonus,
            };
            return tempObj;
          });
        } else {
          maxOfWeapons = {
            bDam: 0,
            accuracy: 0,
            bonus: 0,
          };
        }
      } else {
        if (weaponsProp.length > 0) {
          maxOfWeapons = weaponsProp.reduce((a, b) => {
            let tempObj = {
              bDam: a.bDam + b.bDam,
              accuracy: a.accuracy + b.accuracy,
              bonus: a.bonus + b.bonus,
            };
            return tempObj;
          });
        } else {
          maxOfWeapons = {
            bDam: 0,
            accuracy: 0,
            bonus: 0,
          };
        }
      }
      let maxOfEquipments;

      if (equipmentsProp.length > 0) {
        maxOfEquipments = equipmentsProp.reduce((a, b) => {
          let tempObj = {
            hp: a.hp + b.hp,
            mp: a.mp + b.mp,
            prot: a.prot + b.prot,
          };
          return tempObj;
        });
      } else {
        maxOfEquipments = {
          hp: 0,
          mp: 0,
          prot: 0,
        };
      }

      // 6. Merging all values into one object :: Character + weapon + equipment
      let maxValues = {
        hp: characterProp.hp + maxOfEquipments.hp,
        mp: characterProp.mp + maxOfEquipments.mp,
        Patk: characterProp.Patk + maxOfWeapons.bDam,
        Pdef: characterProp.Pdef + maxOfEquipments.prot,
        speed: characterProp.speed,
        accuracy: characterProp.accuracy + maxOfWeapons.accuracy,
      };

      return maxValues;
    } else {
      return false;
    }
  },

  async getAllCharacters() {
    let data = await UserCharacterModel.find({});
    return data;
  },
  async createCharacter(characterInfo) {
    let characterData = {
      tokenId: characterInfo.tokenId,
      properties: characterInfo.properties,
      name: characterInfo.name,
      username: characterInfo.username,
      owner: characterInfo.owner,
      hashImage: characterInfo.hashImage,
      level: characterInfo.level,
      description: characterInfo.description,
    };
    await UserCharacterModel.insertMany(characterData);
    return await UserCharacterModel.find({ owner: characterInfo.owner });
  },

  async deleteItem(owner) {
    return await UserCharacterModel.deleteMany({ owner: owner });
  },
};

module.exports = userCharacterDao;
