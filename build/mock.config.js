const fs = require("fs");
const path = require("path");

const mockBaseURL = "http://localhost:3000";
// 本地mock地址
const realBaseURL = "https://note-server.hunger-valley.com";
// 真实地址


exports.config = function({ isDev = true } = { isDev: true }) {
  let fileTxt = `
    module.exports = {
      baseURL: '${isDev ? mockBaseURL : realBaseURL}'
    }
  `;
  fs.writeFileSync(
    path.join(__dirname, "../src/helpers/config-baseURL.js"),
    fileTxt
  );
};
