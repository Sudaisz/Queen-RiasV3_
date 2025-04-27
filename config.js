const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "263710872467",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSURQUEt4aE1Zc21naTUvYzNyM2pPRnRJZFVnM1VsT2R0cWkvWi9yd29uWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZkRxQnVrcnhDUDJSOU1IV3E3bVppcGNEMjRzdlJiSGhNbWpYOTBQWlhoST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrRWRoZ2Q1Y0ZxUmx2aTQ2Nzh2WnlZNGc2VUt4WHpuZS9JRDZnZGp2MmtNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLK3JPSEtjKzYxdUJVeFlkRXRWUWwzZVZRbmEwMTJZRXlNbkxLVlFWWFdrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFGdUJJVStSR0dJTXNEa3VtZThMT1A4czdTNldyVE83RGNyM0dHM0F5Vm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRBQmZNdHBNeGVmbHQrTk15UzFYbXVHdjRrbmNKM3JEU2tBSWJNUnNpd0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUI4bVdPNkE0Sk43OU5obm10anQ5a003TVlMT1JKRVpmamdzVjJrTnptRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT3RiWHgzL1dnSVZZazFiNWc4cExSb3FCRWZXVVI1UXNnUFN3bFdqcER5ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZxSXhjQ3pVU0xYaWxhU2pSUXBJKzk4V2pWZFlsZ3VUQ3locGxzZFNsNHdNRGlEVmsvRzZybko1cjZpMlUxSVc1QjVQV2VsbEJQTFo5QmV3Q1hodEJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM0LCJhZHZTZWNyZXRLZXkiOiIxRTB1a3BEc2tianVuenRzcHd6MEJsSFNocEJQTmdJbEFMUDhBcURQUTJNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJMSEdMUzJDRCIsIm1lIjp7ImlkIjoiMjYzNzEwODcyNDY3OjRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiYmV5b25kIHNhbGVzIiwibGlkIjoiMTQyOTY3MTYzNjQ2MTc1OjRAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNYU5qcHdGRVBIWXVzQUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJXTkVuaExjRG8xcFh1bXpsRG1ENDZqckpHUHZEY2lvNmJuRkY2NE1meFFZPSIsImFjY291bnRTaWduYXR1cmUiOiJWanAyV2h6VnJtZU1tWG5qdXFaNVptQ2dKL3RpdXdwZWdIT1hxKzFpeHhRamZXNUl2bEszTGZFaHR1OG5HRGpkUXk5bVkzeWJjWWVCQlJhVFFKcVJCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiN09uMmNBdzJyMS9NWlkzYjZJMTI2Z2p5TXBneFZMaUlhVnR2L0lRWHVyM2xMaURSWjVNOUJsakJHOVk5R0w5RUR5Wnh3MHZDOU9CR2VzK1c0WDJLREE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTA4NzI0Njc6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWalJKNFMzQTZOYVY3cHM1UTVnK09vNnlSajd3M0lxT201eFJldURIOFVHIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDU3OTIxMjksImxhc3RQcm9wSGFzaCI6IjJHNEFtdSJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
