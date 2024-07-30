const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWURlNlQyWWs2WHVKWmhndy84cHR1Y2J1cTF6K2JXdzgvbHNydGxOYUEwUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUTRpMy9tL3g1VENqeGRQMDBCeVF0U3l1bnJ5dWxrWEY3MWJleWNlSzVUYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJQjJ0YTZmQlIvNDFzWGUrTjJ1ZlBEbUd3eTVSbm5pSk9EMUh0eFppbmtNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJT25iYnFpR3FtTTRZUFQxMjFPM08zalBVM3BlQkxRbVNvSUtvN3J1cEhFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNCbnNtVXJUTUlwZXFGRUdxYlNaenlSQlNGOFVBWnp1bGt4Qk1uNEQ2M0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJscjJsem11bTM5azc0aStGWnBsZUVXVVk0RGdqZEtzbTcrajlqc0RJQ1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUxFam5Tc1h2NXFjZnBHZGJJRGZVWG82SFpWSHlZVjF4MGFBVEdPYkYzZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDJwNE1kL1Q1TEVpemlIQ293QkxPVmZnaG5YZmJ3bEE5RUIzd2VRakVGVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRFbVBHOTA1bGVxRXlOWkg2ZGhhSFNNNStrcmlPVmtrWmVmaTk5a3pka25nWEpYZnlpcVBDRTdkVEtMOWlTVXdYZGE2cDhXQW96ZmZMNUJpWGc1T2p3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIzLCJhZHZTZWNyZXRLZXkiOiJFNmVnaWt5ZjY3MW45VHVSNmRveFVtMVlzT0RpYThxdlZEUTg5QUxKL3RNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJCMU9paEZnTFEyS0pTdV9xZURVSnhnIiwicGhvbmVJZCI6IjAyYmIwZjJmLTk5NzUtNDUyMC1iMmQ0LTYzZWVmOTI4YzUzYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrR0JWVVppcDRCSytOV1R0UmlFVVRHTkpkQVU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTlFQXRNNkk0SGhKTitVRkRwS2oxUHYzWFpRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBXWVM1VFJKIiwibWUiOnsiaWQiOiI5NDcyNjg4NDEzNDo4OEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTWZleVBjREVNdWFvclVHR0FVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiaWVZdEEyOWJCQ0hVNnNrQ2s0MU0xZDZUNDlNdW5Mb1Jua2FSdEhKakZWdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoibXhEM2tVM1lxbkFVOHVPWWdsTXNBNENqeFQ0cnBKU04vSFZLOW8yejArYThuWHpIUGJmUFpQUFV3bHNwVlZVejhwSHJuTWtxYTVsQTBMcDR0NmFoQlE9PSIsImRldmljZVNpZ25hdHVyZSI6InRtbmRzLzdGOTVHMy9RNnRoNmxkMjhWZlZlR0hmSnY5Rmg1UHB3U1NEbm5FZGlKWWRwOVJhQmpLTmhMV08xM2p6ODk3eXA3QXRJdmZLNXA1YThqSWlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3MjY4ODQxMzQ6ODhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWW5tTFFOdld3UWgxT3JKQXBPTlROWGVrK1BUTHB5NkVaNUdrYlJ5WXhWYyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjMyMjI2NCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOeVcifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "🍂🖤𝗞𝗜𝗡𝗚 𝗔𝗡𝗝𝗔𝗡𝗔 𝗕𝗕𝗛 💦🥵🍂",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 🍂🖤𝗞𝗜𝗡𝗚 𝗔𝗡𝗝𝗔𝗡𝗔 𝗕𝗕𝗛 💦🥵🍂",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/1138a68a47b3b0d7f7818.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
