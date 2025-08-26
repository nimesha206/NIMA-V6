const { youtube } = require('../../toolkit/scrape/youtube');

module.exports = {
  name: 'youtube',
  command: ['ytmp3', 'ytmp4'],
  tags: 'Download Menu',
  desc: 'Mendownload media dari YouTube',
  prefix: true,
  premium: true,

  run: async (conn, msg, {
    chatInfo,
    textMessage,
    prefix,
    commandText,
    args
  }) => {
    try {
      const { chatId } = chatInfo;
      if (!(await isPrem(module.exports, conn, msg))) return;

      const text = args.join(' ').trim();
      if (!text) {
        return conn.sendMessage(chatId, {
          text: `Silakan masukkan link YouTube!\n\nContoh:\n${prefix}${commandText} https://youtu.be/rCYlIIf_1L0`
        }, { quoted: msg });
      }

      await conn.sendMessage(chatId, { react: { text: '⏳', key: msg.key } });

      const type = commandText === 'ytmp3' ? 'mp3' : 'mp4';
      const result = await youtube(text, type);

      if (type === 'mp3') {
        await conn.sendMessage(chatId, {
          audio: { url: result.downloadLink },
          mimetype: 'audio/mp4',
          ptt: false
        }, { quoted: msg });
      } else {
        await conn.sendMessage(chatId, {
          video: { url: result.downloadLink },
          caption: `🎞️ *${result.title}*\n📥 ${result.quality}p\n\n${result.info || ''}`,
          thumbnail: result.thumbnail
        }, { quoted: msg });
      }

    } catch (error) {
      console.error(error);
      await conn.sendMessage(msg.key.remoteJid, {
        text: error.message.includes('URL YouTube tidak valid')
          ? 'Link YouTube tidak valid. Pastikan formatnya benar.'
          : 'Aduh kak, error saat mengambil data video. Coba lagi ya.'
      }, { quoted: msg });
    }
  }
};