module.exports = {
  name: 'ceklesbi',
  command: ['ceklesbi'],
  tags: 'Fun Menu',
  desc: 'Cek seberapa lesbi seseorang',
  prefix: true,

  run: async (conn, msg, {
    chatInfo,
    textMessage,
    prefix,
    commandText,
    args
  }) => {
    try {
      const { chatId, senderId, isGroup } = chatInfo;
      let targetId = target(msg, senderId);
      const mentionTarget = targetId;
      const persentase = Math.floor(Math.random() * 101);

      let komentar;
      if (persentase <= 25) {
        komentar = 'Masih aman lu mbak';
      } else if (persentase <= 44) {
        komentar = 'Agak lain lu mbak';
      } else if (persentase <= 72) {
        komentar = 'Waduh warga pelangi?';
      } else if (persentase <= 88) {
        komentar = 'Fiks lesbi😹';
      } else {
        komentar = 'Hati² orang lesbi Anjrr😹';
      }

      const teks = `*Cek seberapa lesbi* @${mentionTarget}\n\n*${persentase}%* Lesbi\n_${komentar}_`;

      await conn.sendMessage(chatId, {
        text: teks,
        mentions: [`${targetId}@s.whatsapp.net`]
      }, { quoted: msg });
    } catch (error) {
      console.error('Error:', error);
      conn.sendMessage(msg.key.remoteJid, {
        text: `Error: ${error.message || error}`,
        quoted: msg,
      });
    }
  }
};