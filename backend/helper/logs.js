const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: process.env.ES_SERVER_URL,
});
const constants = require("../utils/constants");

let logIndex;
if (constants.net === 0) {
  logIndex = "polkawarlog";
} else {
  logIndex = "polkawarlogtest";
}

const logHelper = {
  async writeLog(owner, status, source, transactionHash, action, info, data) {
    let logTime = new Date().toISOString();
    const result = await client.index({
      index: logIndex,
      body: {
        owner: owner,
        time: logTime,
        status: status,
        source: source ? source : "unavailable",
        transactionhash: transactionHash,
        action: action,
        info: info,
        data: data ? data : "No data",
      },
    });
    return result.body.result;
  },

  async readLog(owner) {
    const result = await client.search({
      index: logIndex,
      body: {
        query: {
          match: {
            owner: owner,
          },
        },
      },
    });
    return result.body.hits;
  },

  async readAllLog() {
    const result = await client.search({
      index: logIndex,
      body: {},
    });
    return result.body.hits;
  },
};

module.exports = logHelper;
