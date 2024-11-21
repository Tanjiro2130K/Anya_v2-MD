const { readFileSync } = require('fs')
require('dotenv').config({path: './mongo.env'});
require('dotenv').config({path: './owner.env'});
require('dotenv').config({path: './session.env'});
require('dotenv').config({path: './bot.env'});

module.exports = {
    /**
     * bot details and parameters
     */
    botname: process.env.BotName || "Zero-Two🌸",
    footer: process.env.Footer || "ZeroTwo-🌸: Loved for its simplicity and charm ",
    prefa: process.env.Prefix || "-",
    themeemoji: process.env.ThemeEmoji || "🎐",

    /**
     * owner details and parameters
     */
    ownername: process.env.Owner_Name || "TIKU✨🦋",
    ownernumber: process.env.Owner_Number || "917086726371",
    instagramId: process.env.Insta || "_ne_itachi_",

    /**
     * other details and parameters
     */
    author: process.env.Author || "TIKU✨🦋",
    packname: process.env.PackName || "Love from your prince TIKU✨🦋",
    socialLink: process.env.Web || "",
    groupLink: process.env.GcLink || "https://chat.whatsapp.com/DQGWzesuDbz6Qq27pGyWlY",
    warns: Number(process.env.Warn_Limits) || 3,
    cooldown: Number(process.env.Cooldown_Timer_Seconds) || 5, // default cooldown time per command in seconds
    mongoUrl: process.env.MongoDB || "mongodb+srv://tikuchan:TIKU12345@cluster0.5v1ps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    sessionId: process.env.SESSION_ID || "Sp_A_N_Y_A_V_2_E4CLYCQarcWql8ekJH",

    /**
     * thumbnails and medias
     */
    image_1: readFileSync('./lib/Assets/image_1.jpg'), // primary image
    image_2: readFileSync('./lib/Assets/image_2.jpg'), // secondry image
    imageUrl: "https://i.ibb.co/ZKKSZHT/Picsart-23-06-24-13-36-01-843.jpg", // image url, to replace to your url upload your image to https://imgbb.com
    imageMentionUrl: "https://i.ibb.co/ZKKSZHT/Picsart-23-06-24-13-36-01-843.jpg", // image for mention reply audio media
    aliveMedia: readFileSync("./lib/Assets/aliveMedia.mp4"),
    menuMedia: readFileSync('./lib/Assets/menuMedia.mp4'),
    ownerMentionMp3: readFileSync('./lib/Assets/ownerMentionMp3.mp3'),  // audio for mention reply audio media

    /**
     * core parameters and values
     */
    ownercon: { key: { fromMe: false, participant: '0@s.whatsapp.net', ...({ remoteJid: 'status@broadcast' }), }, message: { contactMessage: { displayName: this.ownername, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${this.ownername},;;;\nFN:${this.ownername}\nitem1.TEL;waid=${this.ownernumber}:${this.ownernumber}\nitem1.X-ABLabel:Mobile\nEND:VCARD`, jpegThumbnail: this.image_2, thumbnail: this.image_2, sendEphemeral: true } } },
    fakeshop: { key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: "status@broadcast" }, message: { orderMessage: { itemCount: 1234, status: 200, thumbnail: this.image_1, surface: 200, message: this.botname, orderTitle: this.ownername, sellerJid: '0@s.whatsapp.net'}}, contextInfo: { forwardingScore: 999, isForwarded: true}, sendEphemeral: true },
    message: {
        success: "Its an wonderful complete 😊",
        admin: "*hmm you are not an admin *\n\n- Dear, this command is only for Admins. You have to be a admin in this group to use this command ✌️",
        botAdmin: "*give admin *\n\n- I'm not an Admin, so I can't execute this command in this group. Please make me an Admin 🌸",
        owner: "*owner can only *\n\n- Bruh, this command is only made for this bot's owner. So you can't use this command 💐",
        group: "*group*\n\n- This command can only be executed in a group chat 🍂",
        private: 'This command is only for private chats 🪽',
        wait: 'going on 👾',
        error: "ahh 🥲 An error occurred while processing your request. Please try again later.",
        ban: `You're banned from using this bot!`,
        nsfw: 'This group is not *NSFW* enabled.',
        banChat: 'This group is banned from using this bot, please contact owner to get unbanned.'
    },
    Port: process.env.Port || "8080",

    /**
     * external APIs
     */
    api: {
        api1: "https://www.guruapi.tech" // Guru's API
    }
}

global.connectionMessageSent = false;
global.game = {
    tictactoe: {}
}
