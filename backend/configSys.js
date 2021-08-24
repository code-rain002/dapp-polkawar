if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const dbPass = () => {
  let oldPass = process.env.MONGODB_PASS;
  let newPass = oldPass.split("").reverse().join("");
  return newPass;
};

module.exports = FB_CONFIG = {
  MONGODB_URL: process.env.MONGODB_URL,
  MONGODB_USER: process.env.MONGODB_USER,
  MONGODB_PASS: dbPass(),
};
