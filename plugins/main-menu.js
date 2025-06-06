const config = require('../config');
const moment = require('moment-timezone');
const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
  pattern: "menu",
  alias: ["allmenu", "xmd"],
  use: '.menu',
  desc: "Show all bot commands",
  category: "menu",
  react: "🐍",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
    const totalCommands = commands.length;
    const date = moment().tz("America/Port-au-Prince").format("dddd, DD MMMM YYYY");

    const uptime = () => {
      let sec = process.uptime();
      let h = Math.floor(sec / 3600);
      let m = Math.floor((sec % 3600) / 60);
      let s = Math.floor(sec % 60);
      return `${h}h ${m}m ${s}s`;
    };

    // Menu principal
    let menuText = `
*╭━━━ 〔 𝚃𝙲𝚁𝙾𝙽𝙴𝙱 𝚇𝙼𝙳 𝙿𝙻𝚄𝚂〕━━━┈⊷*
*┃➣* *ᴜsᴇʀ* : @${m.sender.split("@")[0]}
*┃➣* *ʀᴜɴᴛɪᴍᴇ* : ${uptime()}
*┃➣* *ᴍᴏᴅᴇ* : *${config.MODE}*
*┃➣* *ᴘʀᴇғɪx* : [ ${config.PREFIX} ]
*┃➣* *ᴩʟᴜɢɪɴ* : ${totalCommands}
*┃➣* *ᴅᴇᴠ* : *ᴛᴄʀᴏɴᴇʙ-ʜᴀᴄᴋx*
*┃➣* *ᴠᴇʀsɪᴏɴs* :
*╰━━━━━━━━━━━━━━━━━❍❍➣*
`;


    // Catégories et commandes
    let category = {};
    for (let cmd of commands) {
      if (!cmd.category) continue;
      if (!category[cmd.category]) category[cmd.category] = [];
      category[cmd.category].push(cmd);
    }

    const keys = Object.keys(category).sort();
    for (let k of keys) {
      menuText += `\n\n*╭────────❒${k.toUpperCase()} MENU* ➣`;
      const cmds = category[k].filter(c => c.pattern).sort((a, b) => a.pattern.localeCompare(b.pattern));
      cmds.forEach((cmd) => {
        const usage = cmd.pattern.split('|')[0];
        menuText += `\n│➣│▸ ${config.PREFIX}${usage}`;
      });
      menuText += `\n*╰────────❍─────❍❍➣*`;
    }

    // Affecter à la variable caption
    const selectedStyle = menuText;

    // Envoyer l'image avec le menu
    await conn.sendMessage(from, {
      image: { url: 'https://i.ibb.co/HTrS1HYv/beee.jpg' },
      caption: selectedStyle,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '1203601658098220@newsletter',
          newsletterName: config.OWNER_NAME || 'TCRONEB-XMD-PLUS',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
