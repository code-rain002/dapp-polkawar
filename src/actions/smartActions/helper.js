const getInfuraKey = () => {
  // Descrypting the key
  let oldKey = process.env.REACT_APP_INFURA_KEY;
  let newKey = oldKey.split("").reverse().join("");
  console.log(newKey);
  return newKey;
};
export default getInfuraKey;
