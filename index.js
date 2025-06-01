
const {
default: makeWASocket,
useMultiFileAuthState,
DisconnectReason,
jidNormalizedUser,
getContentType,
fetchLatestBaileysVersion,
Browsers
} = require('@whiskeysockets/baileys')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions')
const fs = require('fs')
const key = 'https://key-ninja7.vercel.app/check-key1';
const P = require('pino')
const config = require('./config')
const qrcode = require('qrcode-terminal')
const util = require('util')
const { sms, downloadMediaMessage } = require('./lib/msg')
const axios = require('axios')
const { File } = require('megajs')
const prefix = '!'
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

const ownerNumber = ['263788533181']

// Updated loadSession function with cleaned SESSION_ID and /sessions/creds.json path
async function loadSession() {
  if (!fs.existsSync(__dirname + '/sessions/creds.json')) {
    if (!config.SESSION_ID) {
      console.log('❌ Please add your session to SESSION_ID env !!');
      return;
    }

    const sessdata = config.SESSION_ID.replace('xmd~', '');
    const megaUrl = `https://mega.nz/file/${sessdata}`;

    if (!megaUrl.includes('#')) {
      console.error('❌ Invalid MEGA URL: Missing hash (#...)');
      return;
    }

    try {
      const filer = File.fromURL(megaUrl);
      filer.download((err, data) => {
        if (err) {
          console.error('❌ Download failed:', err.message);
        } else {
          if (!fs.existsSync(__dirname + '/sessions')) {
            fs.mkdirSync(__dirname + '/sessions');
          }
          fs.writeFile(__dirname + '/sessions/creds.json', data, () => {
            console.log("✅ Session downloaded to /sessions/creds.json");
          });
        }
      });
    } catch (e) {
      console.error('❌ Invalid MEGA URL:', e.message);
    }
  }
}

async function checkSecretKey() {
  try {
    const { data } = await axios.get(key);
    return data.key;
  } catch (error) {
    console.error("[Key Check Error] " + error.message);
    return false;
  }
}

async function connectToWA() {
  console.log("Connecting TCRONEB-XMD-PLUS...");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/sessions/');
  const { version } = await fetchLatestBaileysVersion();

  const conn = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version
  });

  conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }
    } else if (connection === 'open') {
      console.log('Connected to WhatsApp');
      const path = require('path');
      fs.readdirSync("./plugins/").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() == ".js") {
          require("./plugins/" + plugin);
        }
      });
    }
  });

  conn.ev.on('creds.update', saveCreds);
}

app.get("/", (req, res) => {
  res.send("TCRONEB-XMD-PLUS is alive 🧚🏻");
});

// Load session and start bot after short delay
setTimeout(() => {
  loadSession();
  connectToWA();
}, 4000);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
  
