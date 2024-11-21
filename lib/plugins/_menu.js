const Config = require('../../config');
const {
	anya,
	commands,
	UI,
	rules,
	fancy32,
	dayToday,
	pickRandom,
	formatRuntime,
	getMemoryInfo
} = require('../lib');
const symbolLists = ["⭔", "❃", "❁", "✬", "⛦", "◌", "⌯", "⎔", "▢", "▣", "◈", "֍", "֎", "࿉", "۞", "⎆"];

//༺─────────────────────────────────────

anya(
    {
        name: "alive",
        alias: ['hey'],
        react: "👋🏻",
        category: "core",
        desc: "Bot will say it's alive",
        filename: __filename
    },
    async (anyaV2, pika, { db, prefix }) => {
        const os = require('os');
        const { commands } = require('../lib');
        const symbols = pickRandom(symbolLists);
        const memoryInfo = getMemoryInfo();
	    function extractNumericValue(memoryString) {
		    const value = parseFloat(memoryString); 
		    return memoryString.includes('GB') ? value * 1024 : value; 
	    }
	const totalMemoryMB = extractNumericValue(memoryInfo.totalMemory);
	const usedMemoryMB = extractNumericValue(memoryInfo.usedMemory);
        const usedPercentage = Math.round((usedMemoryMB / totalMemoryMB) * 100);
        let expression;
        if (usedPercentage <= 10) expression = '🥳';
        else if (usedPercentage <= 20) expression = '🤗';
        else if (usedPercentage <= 30) expression = '😚';
        else if (usedPercentage <= 40) expression = '😊';
        else if (usedPercentage <= 50) expression = '😙';
        else if (usedPercentage <= 60) expression = '😫';
        else if (usedPercentage <= 70) expression = '😓';
        else if (usedPercentage <= 80) expression = '😖';
        else if (usedPercentage <= 90) expression = '😰';
        else expression = '🫨';
        const filledBlocks = Math.floor(usedPercentage / 10);
        const emptyBlocks = 10 - filledBlocks;
        const bar = '▰'.repeat(filledBlocks) + '▱'.repeat(emptyBlocks);

        const caption = `\`\`\`${Config.themeemoji} 𝕎𝔸𝔹𝕠𝕥 𝕀𝕟𝕗𝕠𝕣𝕞𝕒𝕥𝕚𝕠𝕟 ${Config.themeemoji}\`\`\`\n
> ${symbols} 𝚄𝚜𝚎𝚛 : @${pika.sender.split("@")[0]}
> ${symbols} 𝙱𝚘𝚝 : ${Config.botname}
> ${symbols} 𝙾𝚠𝚗𝚎𝚛 : ${Config.ownername}
> ${symbols} 𝙿𝚕𝚞𝚐𝚒𝚗𝚜 : ${commands.length}
> ${symbols} 𝚅𝚎𝚛𝚜𝚒𝚘𝚗 : ${require('../../package.json').version}
> ${symbols} 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : ${os.platform()}
> *▢* I'm alive from _${formatRuntime(process.uptime()).trim()}_.
> *▢* Used _*${memoryInfo.usedMemory}*_ out of _*${memoryInfo.totalMemory}*_ memory.

_*Pressure :*_
> _${expression} • ${usedPercentage}%_
> └${bar}`;

        const footText = `R𝚎𝚙𝚕𝚢 A N𝚞𝚖𝚋𝚎𝚛 T𝚘 G𝚎𝚝:\n   1 Allmenu\n   2 MenuList\n> _ID: QA01_`;

        const ui = db.UI?.[0] || new UI({ id: "userInterface" }).save();
        const messageOptions = {
            mentions: [pika.sender],
            caption: `${caption.trim()}\n\n${footText}`
        };

        switch (ui.alive) {
            case 1:
                return pika.reply(messageOptions.caption, { mentions: [pika.sender] });

            case 2:
                return anyaV2.sendMessage(pika.chat, {
                    ...messageOptions,
                    image: Config.image_2
                }, { quoted: pika });

            case 3:
                return anyaV2.sendMessage(pika.chat, {
                    text: messageOptions.caption,
                    mentions: messageOptions.mentions,
                    contextInfo: {
                        mentionedJid: messageOptions.mentions,
                        externalAdReply: {
                            showAdAttribution: true,
                            title: Config.botname,
                            body: "Alive from " + formatRuntime(process.uptime()),
                            thumbnailUrl: Config.imageUrl,
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, { quoted: pika });

            case 4:
            case 5:
                return anyaV2.sendMessage(pika.chat, {
                    ...messageOptions,
                    video: Config.aliveMedia,
                    gifPlayback: ui.alive === 5
                }, { quoted: pika });

            case 6:
                return anyaV2.relayMessage(pika.chat, {
                    requestPaymentMessage: {
                        currencyCodeIso4217: 'INR',
                        amount1000: '10000000000',
                        requestFrom: pika.sender,
                        noteMessage: {
                            extendedTextMessage: {
                                text: messageOptions.caption,
                                contextInfo: {
                                    mentionedJid: messageOptions.mentions,
                                    externalAdReply: { showAdAttribution: true }
                                }
                            }
                        }
                    }
                }, { quoted: pika });

            case 7:
                return anyaV2.sendMessage(pika.chat, {
                    document: { url: Config.imageUrl },
                    caption: messageOptions.caption,
                    mimetype: 'application/zip',
                    fileName: Config.ownername,
                    fileLength: "99999999999",
                    contextInfo: {
                        mentionedJid: messageOptions.mentions,
                        externalAdReply: {
                            showAdAttribution: true,
                            title: Config.botname,
                            body: Config.ownername,
                            thumbnailUrl: Config.imageUrl,
                            sourceUrl: Config.socialLink,
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, { quoted: pika });

            case 8:
                return anyaV2.sendMessage(pika.chat, {
                    ...messageOptions,
                    image: Config.image_2,
                    contextInfo: {
                        mentionedJid: messageOptions.mentions,
                        externalAdReply: {
                            showAdAttribution: true,
                            title: Config.botname,
                            body: Config.ownername,
                            thumbnailUrl: Config.imageUrl,
                            sourceUrl: Config.socialLink,
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, { quoted: pika });
                
            case 9:
                return anyaV2.sendMessage(pika.chat, {
                    ...messageOptions,
                    video: Config.aliveMedia,
                    gifPlayback: true,
                    contextInfo: {
                        mentionedJid: messageOptions.mentions,
                        externalAdReply: {
                            showAdAttribution: true,
                            title: Config.botname,
                            body: Config.ownername,
                            thumbnailUrl: Config.imageUrl,
                            sourceUrl: Config.socialLink,
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, { quoted: pika });
                
            case 10:
                return anyaV2.sendMessage(pika.chat, {
                    ...messageOptions,
                    video: Config.aliveMedia,
                    gifPlayback: true,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        mentionedJid: messageOptions.mentions,
                        forwardedNewsletterMessageInfo: {
                            newsletterName: Config.botname,
                            newsletterJid: "120363193293157965@newsletter"
                        },
                        externalAdReply: {
                            showAdAttribution: true,
                            title: Config.botname,
                            body: Config.ownername,
                            thumbnailUrl: Config.imageUrl,
                            sourceUrl: Config.socialLink,
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, { quoted: pika });

            case 11:
                return anyaV2.sendButtonImage(pika.chat, {
                    ...messageOptions,
                    image: Config.image_2,
                    footer: Config.footer,
                    buttons: [
                        { name: "quick_reply", buttonParamsJson: `{"display_text":"Allmenu 🌟","id":"${prefix}allmenu"}` },
                        { name: "quick_reply", buttonParamsJson: `{"display_text":"Listmenu 🧾","id":"${prefix}listmenu"}` },
                    ],
                    contextInfo: {
        			mentionedJid: messageOptions.mentions,
                        forwardingScore: 9999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterName: Config.botname,
                            newsletterJid: "120363193293157965@newsletter"
                        }
                    }
                }, { quoted: pika });

            case 12:
                return anyaV2.sendButtonVideo(pika.chat, {
                    ...messageOptions,
                    video: Config.aliveMedia,
                    footer: Config.footer,
                    buttons: [
                        { name: "quick_reply", buttonParamsJson: `{"display_text":"Allmenu 🌟","id":"${prefix}allmenu"}` },
                        { name: "quick_reply", buttonParamsJson: `{"display_text":"Listmenu 🧾","id":"${prefix}listmenu"}` },
                    ],
                    contextInfo: {
                        forwardingScore: 9999,
                        isForwarded: true,
            			mentionedJid: messageOptions.mentions,
                        forwardedNewsletterMessageInfo: {
                            newsletterName: Config.botname,
                            newsletterJid: "120363193293157965@newsletter"
                        }
                    }
                }, { quoted: pika });

            default:
                return pika.reply("No valid alive message type found!");
        }
    }
);

//༺─────────────────────────────────────

anya(
	{
		name: "help",
		alias: ['h', 'menu', 'allmenu'],
		react: Config.themeemoji,
		category: "core",
		desc: "Bot's command panel",
		filename: __filename
	},
	async (anyaV2, pika, { db, args, prefix, command }) => {
		if (command === "help" && args.length > 0) {
			const caption = [];
			const cmd = commands.find(v => v.name === args[0].toLowerCase() || (v.alias && v.alias.includes(args[0].toLowerCase())));
			if (cmd) {
				caption.push(`*🧿 Name :* ${cmd.name}`);
				cmd.alias && caption.push(`*🔖 Alias :* ${cmd.alias.join(", ")}`);
				cmd.react && caption.push(`*🌀 React :* ${cmd.react}`);
				cmd.need && caption.push(`*💭 Usage :* ${cmd.need}`);
				cmd.category && caption.push(`*❤️‍🩹 Category :* ${cmd.category}`);
				caption.push(`*🕜 Cooldown :* ${cmd.cooldown} seconds`);
				cmd.filename && caption.push(`*📑 File :* ${cmd.filename}`);
				if (cmd.rule !== 0) {
					const i = rules(cmd.rule);
					caption.push(`*📃 Access :*\n> ${i.owner} : Owner\n> ${i.admin} : Admin\n> ${i.botAdmin} : Bot Admin\n> ${i.group} : Group Chat\n> ${i.pc} : Private Chat`);	
				}
				caption.push(`*📜 Description :* ${cmd.desc}`);
				return pika.reply(caption.join("\n\n"));
			} else {
				return pika.reply("_❌No such plugin found with: `" + args[0] + "`_");
			}
		} else {
			//const readmore = String.fromCharCode(8206).repeat(4001);
			const cateJson = require('../database/categories.json');
			const calender = dayToday();
			const symbols = pickRandom(symbolLists);
			const patterns = commands.reduce((acc, cmd) => {
				if (cmd.name && !cmd.notCmd) {
					acc[cmd.category] = acc[cmd.category] || [];
					acc[cmd.category].push(`${cmd.name}${cmd.need ? "  ⌈" + cmd.need + "⌋" : ""}`);
				}
				return acc;
			}, {});

			let caption = `
*ZeroTwo-🌸* ✨

💫 *ᴘʀᴇꜰɪx*: [.]  
💐 *Senpai*: TIKU✨🦋
🤖 *Bot-chan*: ${Config.botname}  
🪽 *Master*: ${Config.ownername}  

✨ *I’m here to assist, Senpai. Let me be your guiding light, always by your side!* 🌸
> Type \`${prefix}system\` to see bot status.\n\n`;
//${readmore}\n`;

			for (const [category, plugins] of Object.entries(patterns)) {
				const { cateSymbol, pluginSymbol } = cateJson[category] || {};
				caption += `┌─⊰ _*${cateSymbol || "🍜"} ${category.toUpperCase()} ${cateSymbol || "🍜"}*_\n`;
				caption += plugins.map(plugin => `│⊳ ${prefix + plugin}\n`).join('');
				caption += `└───────────────┈⊰\n\n`;
			}
			caption += `🎀 _Type \`${prefix}listmenu\` for my command list._\n\n*Eg: _${prefix}help imdb_*`;
	    const footerText = "\n\n> " + Config.footer;

		// menu message types
		const ui = db.UI?.[0] || new UI({ id: "userInterface" }).save();

		// Text message
		if (ui.menu === 1) return pika.reply(caption.trim() + footerText, { mentions: [pika.sender] });

		// Image message
		else if (ui.menu === 2) return await anyaV2.sendMessage(pika.chat, {
			image: Config.image_1,
			caption: caption.trim() + footerText,
			mentions: [pika.sender]
		}, { quoted: pika });

		// Text Ad message
		else if (ui.menu === 3) return await anyaV2.sendMessage(pika.chat, {
			text: caption.trim() + footerText,
			mentions: [pika.sender],
			contextInfo: {
				externalAdReply: {
					showAdAttribution: true,
					title: Config.botname,
					body: 'Here\'s the full list of commands',
					thumbnailUrl: Config.imageUrl,
					mediaType: 1,
					renderLargerThumbnail: true
				}
			}
		}, { quoted: pika });

		// Video message
		else if (ui.menu === 4) return await anyaV2.sendMessage(pika.chat, {
			video: Config.menuMedia,
			caption: caption.trim() + footerText,
			mentions: [pika.sender]
		}, { quoted: pika });

		// GIF message
		else if (ui.menu === 5) return await anyaV2.sendMessage(pika.chat, {
			video: Config.menuMedia,
			caption: caption.trim() + footerText,
			gifPlayback: true,
			mentions: [pika.sender]
		}, { quoted: pika });

		// Money request
		else if (ui.menu === 6) return await anyaV2.relayMessage(pika.chat, {
			requestPaymentMessage: {
				currencyCodeIso4217: 'INR',
				amount1000: '10000000000',
				requestFrom: pika.sender,
				noteMessage: {
					extendedTextMessage: {
						text: caption.trim() + footerText,
						contextInfo: {
							mentionedJid: [pika.sender],
							externalAdReply: {
								showAdAttribution: true
							}
						}
					}
				}
			}
		}, { quoted: pika });

		// Document Ad message
		else if (ui.menu === 7) return await anyaV2.sendMessage(pika.chat, {
			document: {
				url: Config.imageUrl
			},
			caption: caption.trim() + footerText,
			mimetype: 'application/zip',
			fileName: Config.ownername,
			fileLength: "99999999999",
			contextInfo: {
				mentionedJid: [pika.sender],
				externalAdReply: {
					showAdAttribution: true,
					title: Config.botname,
					body: Config.ownername,
					thumbnailUrl: Config.imageUrl,
					sourceUrl: Config.socialLink,
					mediaType: 1,
					renderLargerThumbnail: true
				}
			}
		}, { quoted: pika });

		// Image Ad reply
		else if (ui.menu === 8) return await anyaV2.sendMessage(pika.chat, {
			image: Config.image_1,
			caption: caption.trim() + footerText,
			contextInfo: {
				mentionedJid: [pika.sender],
				externalAdReply: {
					showAdAttribution: true,
					title: Config.botname,
					body: Config.ownername,
					thumbnailUrl: Config.imageUrl,
					sourceUrl: Config.socialLink,
					mediaType: 1,
					renderLargerThumbnail: true
				}
			}
		}, { quoted: pika });

		// GIF Ad Reply
		else if (ui.menu === 9) return await anyaV2.sendMessage(pika.chat, {
			video: Config.menuMedia,
			caption: caption.trim() + footerText,
			mentions: [pika.sender],
			contextInfo: {
				externalAdReply: {
					showAdAttribution: true,
					title: Config.botname,
					body: Config.ownername,
					thumbnailUrl: Config.imageUrl,
					sourceUrl: Config.socialLink,
					mediaType: 1,
					renderLargerThumbnail: true
				}
			}
		}, { quoted: pika });

		// GIF Channel Ad reply
		else if (ui.menu === 10) return await anyaV2.sendMessage(pika.chat, {
			video: Config.menuMedia,
			caption: caption.trim() + footerText,
			gifPlayback: true,
			mentions: [pika.sender],
			contextInfo: {
				forwardingScore: 999,
				isForwarded: true,
				mentionedJid: [pika.sender],
				forwardedNewsletterMessageInfo: {
					newsletterName: Config.botname,
					newsletterJid: "120363193293157965@newsletter"
				},
				externalAdReply: {
					showAdAttribution: true,
					title: Config.botname,
					body: Config.ownername,
					thumbnailUrl: Config.imageUrl,
					sourceUrl: Config.socialLink,
					mediaType: 1,
					renderLargerThumbnail: true
				}
			}
		}, { quoted: pika });

		// Image Button message
		else if (ui.menu === 11) return await anyaV2.sendButtonImage(pika.chat, {
			image: Config.image_1,
			caption: caption.trim(),
			footer: Config.footer,
			mentions: [pika.sender],
			buttons: [
				{
					"name": "quick_reply",
					"buttonParamsJson": `{"display_text":"Owner 👤","id":"${prefix}owner"}`
				},
				{
					"name": "quick_reply",
					"buttonParamsJson": `{"display_text":"Script 🍜","id":"${prefix}sc"}`
				}
			],
			contextInfo: {
				mentionedJid: [pika.sender],
				forwardingScore: 9999,
				isForwarded: true,
				forwardedNewsletterMessageInfo: {
					newsletterName: `𝐔𝐩𝐭𝐢𝐦𝐞 : ${formatRuntime(process.uptime())}`,
					newsletterJid: "120363193293157965@newsletter"
				}
			}
		}, { quoted: pika });

		// Video Button message
		else if (ui.menu === 12) return await anyaV2.sendButtonVideo(pika.chat, {
			video: Config.menuMedia,
			caption: caption.trim(),
			footer: Config.footer,
			mentions: [pika.sender],
			buttons: [
				{
					"name": "quick_reply",
					"buttonParamsJson": `{"display_text":"Owner 👤","id":"${prefix}owner"}`
				},
				{
					"name": "quick_reply",
					"buttonParamsJson": `{"display_text":"Script 🍜","id":"${prefix}sc"}`
				}
			],
			contextInfo: {
				mentionedJid: [pika.sender],
				forwardingScore: 9999,
				isForwarded: true,
				forwardedNewsletterMessageInfo: {
					newsletterName: `𝐔𝐩𝐭𝐢𝐦𝐞 : ${formatRuntime(process.uptime())}`,
					newsletterJid: "120363193293157965@newsletter"
				}
			}
		}, { quoted: pika });
		}
	}
)

//༺─────────────────────────────────────

anya(
  {
    name: "listmenu",
    alias: ['menulist', 'list'],
    react: "📑",
    category: "core",
    desc: "List of the available menus",
    filename: __filename
  },
  async (anyaV2, pika, { db, args, prefix, command }) => {
    const patterns = commands.reduce((acc, cmd) => {
      if (cmd.name && !cmd.notCmd) {
        acc[cmd.category] = acc[cmd.category] || [];
        acc[cmd.category].push(`${cmd.name}${cmd.need ? "  ⌈" + cmd.need + "⌋" : ""}`);
      }
      return acc;
    }, {});
    const cateJson = require('../database/categories.json');
    const ui = db.UI?.[0] || new UI({ id: "userInterface" }).save();
    const symbols = pickRandom(symbolLists);
    const { date, time } = dayToday();
    const { version } = require('../../package.json');
    const { usedMemory, totalMemory } = getMemoryInfo();
    const uptime = formatRuntime(process.uptime());
    const caption = `\`\`\`╭════ ${fancy32(Config.ownername)} ════─❃
┃${symbols}╭─────────────┈
┃${symbols}│ Prefix : ${prefix}
┃${symbols}│ User : ${pika.pushName}
┃${symbols}│ Bot : ${Config.botname}
┃${symbols}│ Owner : ${Config.ownername}
┃${symbols}│ Date : ${date}
┃${symbols}│ Time : ${time}
┃${symbols}│ Plugins : ${commands.length}
┃${symbols}│ Version : v${version}
┃${symbols}│ Ram : ${usedMemory}/${totalMemory}
┃${symbols}│ Uptime : ${uptime}
┃${symbols}╰─────────────┈
╰══════════════════─❃\`\`\`\n\n`;
    const replyTag = `> *\`🌟 Reply A Number To Get Command List\`*`;
    const footerTag = `_Type *${prefix + command} <category>* to get that specific list_\n*Eg: _${prefix + command} owner_*\n\n> _ID: QA20_`;
    const sendMenu = async ({ isCategory, middle = "", buttons = [] }) => {
      let result = caption;
      switch (ui.listmenu) {
        case 1:
          if (isCategory) result += replyTag + "\n\n" + middle + "\n" + footerTag;
          else result += middle;
          return pika.reply(result, { mentions: [pika.sender] });
        case 2:
          if (isCategory) result += replyTag + "\n\n" + middle + "\n" + footerTag;
          else result += middle;
          return await anyaV2.sendMessage(pika.chat, {
            image: Config.image_1,
            caption: result,
            mentions: [pika.sender]
          }, { quoted: pika });
        case 3:
          if (isCategory) result += replyTag + "\n\n" + middle + "\n" + footerTag;
          else result += middle;
          return await anyaV2.sendMessage(pika.chat, {
            text: result,
            mentions: [pika.sender],
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: Config.botname,
                body: 'Here\'s the full list of commands',
                thumbnailUrl: Config.imageUrl,
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
          }, { quoted: pika });
        case 4:
        case 5:
          if (isCategory) result += replyTag + "\n\n" + middle + "\n" + footerTag;
          else result += middle;
          return await anyaV2.sendMessage(pika.chat, {
            video: Config.menuMedia,
            caption: result,
            gifPlayback: ui.listmenu === 5,
            mentions: [pika.sender],
          }, { quoted: pika });
        case 6:
          if (isCategory) result += replyTag + "\n\n" + middle + "\n" + footerTag;
          else result += middle;
          return await anyaV2.sendMessage(pika.chat, {
            document: { url: Config.imageUrl },
            caption: result,
            mimetype: 'application/zip',
            fileName: Config.ownername,
            fileLength: "99999999999",
            contextInfo: {
              mentionedJid: [pika.sender],
              externalAdReply: {
                showAdAttribution: true,
                title: Config.botname,
                body: Config.ownername,
                thumbnailUrl: Config.imageUrl,
                sourceUrl: Config.socialLink,
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
          }, { quoted: pika });
        case 7: {
          const defaultButtons = Object.keys(patterns).map(category => {
            const { cateSymbol } = cateJson[category] || {};
            const upperCase = category.charAt(0).toUpperCase() + category.slice(1);
            return {
              name: "quick_reply",
              buttonParamsJson: `{"display_text":"${cateSymbol || '🍜'} ${upperCase}","id":"${prefix}list ${category}"}`
            };
          });
          if (!isCategory) result += middle;
          return await anyaV2.sendButtonImage(pika.chat, {
            image: Config.image_1,
            caption: result.trim(),
            footer: Config.footer,
            buttons: buttons.length ? buttons : defaultButtons,
            contextInfo: {
              mentionedJid: [pika.sender],
              forwardingScore: 9999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterName: `𝐔𝐩𝐭𝐢𝐦𝐞 : ${uptime}`,
                newsletterJid: "120363193293157965@newsletter"
              }
            },
          }, { quoted: pika });
        }
        case 8: {
        const defaultButtons = Object.keys(patterns).map(category => {
            const { cateSymbol } = cateJson[category] || {};
            const upperCase = category.charAt(0).toUpperCase() + category.slice(1);
            return {
              name: "quick_reply",
              buttonParamsJson: `{"display_text":"${cateSymbol || '🍜'} ${upperCase}","id":"${prefix}list ${category}"}`
            };
          });
          if (!isCategory) result += middle;
          return await anyaV2.sendButtonVideo(pika.chat, {
            video: Config.menuMedia,
            caption: result.trim(),
            footer: Config.footer,
            buttons: buttons.length ? buttons : defaultButtons,
            contextInfo: {
              mentionedJid: [pika.sender],
              forwardingScore: 9999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterName: `𝐔𝐩𝐭𝐢𝐦𝐞 : ${uptime}`,
                newsletterJid: "120363193293157965@newsletter"
              }
            },
          }, { quoted: pika });
        }
        if (!isCategory) result += middle;
        case 9: {
          const buttonsArray = Object.keys(patterns).map(category => {
            const { cateSymbol, desc } = cateJson[category] || {};
            const upperCase = category.charAt(0).toUpperCase() + category.slice(1);
            return `{"header":"","title":"${cateSymbol || "🍜"} ${upperCase} ${cateSymbol || "🍜"}","description":"${desc || "No Data Available About This Category"}","id":"${prefix + command} ${category}"}`;
          });
          const listButtons = [{
            name: "single_select",
            buttonParamsJson: `{"title":"See List <33","sections":[{"title":"Total categories: ${Object.keys(patterns).length}","highlight_label":"${Config.botname}","rows":[${buttonsArray.join(",")}]}]}`
          }];
          return await anyaV2.sendButtonImage(pika.chat, {
            image: Config.image_1,
            caption: result.trim(),
            footer: Config.footer,
            buttons: buttons.length ? buttons : listButtons,
            contextInfo: {
              mentionedJid: [pika.sender],
              forwardingScore: 9999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterName: `𝐔𝐩𝐭𝐢𝐦𝐞 : ${uptime}`,
                newsletterJid: "120363193293157965@newsletter"
              }
            },
          }, { quoted: pika });
        }
        case 10: {
          const buttonsArray = Object.keys(patterns).map(category => {
            const { cateSymbol, desc } = cateJson[category] || {};
            const upperCase = category.charAt(0).toUpperCase() + category.slice(1);
            return `{"header":"","title":"${cateSymbol || "🍜"} ${upperCase} ${cateSymbol || "🍜"}","description":"${desc || "No Data Available About This Category"}","id":"${prefix + command} ${category}"}`;
          });
          const listButtons = [{
            name: "single_select",
            buttonParamsJson: `{"title":"See List <33","sections":[{"title":"Total categories: ${Object.keys(patterns).length}","highlight_label":"${Config.botname}","rows":[${buttonsArray.join(",")}]}]}`
          }];
          if (!isCategory) result += middle;
          return await anyaV2.sendButtonVideo(pika.chat, {
            video: Config.menuMedia,
            caption: result.trim(),
            footer: Config.footer,
            buttons: buttons.length ? buttons : listButtons,
            contextInfo: {
              mentionedJid: [pika.sender],
              forwardingScore: 9999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterName: `𝐔𝐩𝐭𝐢𝐦𝐞 : ${uptime}`,
                newsletterJid: "120363193293157965@newsletter"
              }
            },
          }, { quoted: pika });
        }
        case 11: {
          const buttonsArray = Object.keys(patterns).map(category => {
            const { cateSymbol, desc } = cateJson[category] || {};
            const upperCase = category.charAt(0).toUpperCase() + category.slice(1);
            return `{"header":"","title":"${cateSymbol || "🍜"} ${upperCase} ${cateSymbol || "🍜"}","description":"${desc || "No Data Available About This Category"}","id":"${prefix + command} ${category}"}`;
          });
          const listButtons = [{
            name: "single_select",
            buttonParamsJson: `{"title":"See List <33","sections":[{"title":"Total categories: ${Object.keys(patterns).length}","highlight_label":"${Config.botname}","rows":[${buttonsArray.join(",")}]}]}`
          }];
          if (!isCategory) result += middle;
          return await anyaV2.sendButtonText(pika.chat, {
            text: result.trim(),
            footer: Config.footer,
            buttons: buttons.length ? buttons : listButtons,
            contextInfo: {
              mentionedJid: [pika.sender],
              forwardingScore: 9999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterName: `𝐔𝐩𝐭𝐢𝐦𝐞 : ${uptime}`,
                newsletterJid: "120363193293157965@newsletter"
              }
            },
          }, { quoted: pika });
        }
        default:
          return pika.reply("⚠️ No valid menu type found!");
      }
    };
    if (args.length > 0) {
      const category = args[0].toLowerCase();
      if (patterns[category]) {
        const { cateSymbol, pluginSymbol } = cateJson[category] || {};
        const upperCase = category.charAt(0).toUpperCase() + category.slice(1);
        let categoryMessage = `╭──⌈ _*${cateSymbol || "🍜"} ${upperCase} ${cateSymbol || "🍜"}*_ ⌋\n`;
        for (const cmd of patterns[category]) {
          categoryMessage += `│⊳ ${pluginSymbol || "🪅"} ${prefix + cmd}\n`;
        }
        categoryMessage += `└───────────────⟢`;
        return sendMenu({
          middle: categoryMessage,
          buttons: [
            { name: "quick_reply", buttonParamsJson: `{"display_text":"Owner 👤","id":"${prefix}owner"}` },
            { name: "quick_reply", buttonParamsJson: `{"display_text":"Script 🍜","id":"${prefix}sc"}` }
          ]
        });
      } else {
        return pika.reply("*🍁 No Such Category Found!*");
      }
    }
    let middle = "";
    let index = 1;
    for (const category in patterns) {
      const { cateSymbol, desc } = cateJson[category] || {};
      const upperCase = category.charAt(0).toUpperCase() + category.slice(1);
      middle += `*${index++}. ${cateSymbol || "🍜"} ${upperCase}*\n`;
      middle += `> *Commands :* ${patterns[category].length}\n`;
      middle += `> *About :* _${desc || "No Data Available About This Category"}_\n\n`;
    }
    return sendMenu({ isCategory: true, middle });
  }
);
