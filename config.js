module.exports = {
  SESSION_ID: process.env.SESSION_ID || "xmd~SF5gEIJS#B9s2vool4_qZFhRJN_fZNID8w2CGmDbnVtQlJWfqPx4",

  BOT_NAME: process.env.BOT_NAME || "XmdBot",
  OWNER_NAME: process.env.OWNER_NAME || "TCRONEB",
  ALIVE_MSG: process.env.ALIVE_MSG || "I'm alive and running!",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://ik.imagekit.io/eypz/1727903040279_XEWG3FC67.png",

  PREFIX: process.env.PREFIX || ".",
  LANG: process.env.LANG || "EN",
  WORK_TYPE: process.env.WORK_TYPE || "public",

  BOT_INFO: process.env.BOT_INFO || "Xmd;TCRONEB;https://i.imgur.com/jNNC0FQ.jpg",
  REACT: process.env.REACT || "👾",
  CAPTION: process.env.CAPTION || "© TCRONEB HACKX",
  
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  AUTO_READ_REPLY: process.env.AUTO_READ_REPLY || "true",
  READ_CMD: process.env.READ_CMD || "true",

  BLOCK_CHAT: process.env.BLOCK_CHAT || "false",
  BOT_OFFLINE: process.env.BOT_OFFLINE || "false",
  ONLY_GROUP: process.env.ONLY_GROUP || "false",
  ONLY_PM: process.env.ONLY_PM || "false",

  SUDO: process.env.SUDO || "254718241545",
  HEROKU: {
    API_KEY: process.env.HEROKU_API_KEY || "",
    APP_NAME: process.env.HEROKU_APP_NAME || ""
  }
};
