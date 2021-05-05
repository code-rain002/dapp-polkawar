if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = FB_CONFIG = {
  MONGODB_URL: process.env.MONGODB_URL,
  MONGODB_USER: process.env.MONGODB_USER,
  MONGODB_PASS: process.env.MONGODB_PASS
};
