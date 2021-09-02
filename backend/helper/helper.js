const helperFn = {
  async getKey() {
    // Descrypting the key
    let oldKey = process.env.PRIVATE_KEY;
    let newKey = oldKey.split("").reverse().join("");
    return newKey;
  },
};

module.exports = helperFn;
