const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID, || "Arch_afec5811b1a6ee9688f1f6117b5565a8"
ALIVE_IMG: process.env.ALIVE_IMG || "https://ik.imagekit.io/eypz/1727903040279_XEWG3FC67.png",
ALIVE_MSG: process.env.ALIVE_MSG || " *TCRONEB-XMD-PLUS ALIVE🌸*\n\n*Owner:* TCRONEB\n\n_Nothing Is Impossible. Motivate Your Own Self🙈_ ",
OWNER_NAME: process.env.OWNER_NAME || "TcroneB",
MENU: process.env.MENU || "https://ironman.koyeb.app/ironman/anime/waifu?type=long_hair",
BOT_NAME: process.env.BOT_NAME || "TCRONEB-XMD-PLUS",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
wait: "⏳",
done: "✅",
fail: "❌"
};
