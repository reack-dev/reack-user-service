const Persistence = require('../controllers/persistence');
const funcHelpers = require('../utils/func-helpers');

const db = new Persistence();

class Client {
  constructor(id, ws) {
    this.id = id;
    this.connection = ws;
    this.rndStrs = [];
  }

  static allRndStrs = {};

  static linkClientToRndStr(client, str) {
    Client.allRndStrs[str] = client;
  }

  static getClient(rndStr) {
    return Client.allRndStrs[rndStr];
  }

  addNewRndStr(str) {
    this.rndStrs.push(str);
  }

  sendMessage(msg) {
    const objectToSend = JSON.stringify(msg);
    this.connection.send(objectToSend);
  }

  async processMsg(actionToPerform, data) {
    const { action } = actionToPerform;
    switch (action) {
      case 'generate-url':
        const randomString = await this.generateNewUrl();
        if (!randomString) {
          this.sendMessage({
            error: 'Could not generate new URL. Try again later.',
          });
          return;
        }
        this.sendMessage({ randomString });
        break;
      case 'forward-to-client':
        this.sendMessage(data);
        break;
      default:
    }
  }

  async generateNewUrl() {
    const RANDOM_STRING_LENGTH = 10;
    const rndStr = funcHelpers.generateRandomString(RANDOM_STRING_LENGTH);

    this.addNewRndStr(rndStr);
    Client.linkClientToRndStr(this, rndStr);

    const storedNewURL = await db.insertNewURL(rndStr);

    if (!storedNewURL) {
      return;
    } else {
      return rndStr;
    }
  }
}

module.exports = { Client };
