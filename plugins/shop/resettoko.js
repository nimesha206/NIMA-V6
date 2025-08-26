const fs = require('fs');
const tokoPath = './toolkit/set/toko.json';

module.exports = {
  name: 'resettoko',
  command: ['resettoko'],
  tags: 'Shop Menu',
  desc: 'Mereset daftar toko.',
  prefix: true,
  owner: false,

  run: async (conn, msg, {
    chatInfo,
    textMessage,
    prefix,
    commandText,
    args
  }) => {
    try {
      const { chatId, senderId, isGroup } = chatInfo;
      if (!(await isOwner(module.exports, conn, msg))) return;

      if (!fs.existsSync(tokoPath)) {
        return conn.sendMessage(chatId, { text: "❌ File toko.json tidak ditemukan." }, { quoted: msg });
      }

      let tokoData = JSON.parse(fs.readFileSync(tokoPath, 'utf8'));
      tokoData.storeSetting = {};
      fs.writeFileSync(tokoPath, JSON.stringify(tokoData, null, 2));

      conn.sendMessage(chatId, { text: "✅ Semua toko telah direset!" }, { quoted: msg });

    } catch (err) {
      console.error("❌ Error di plugin resettoko.js:", err);
      conn.sendMessage(chatId, { text: "❌ Terjadi kesalahan saat mereset toko." }, { quoted: msg });
    }
  }
};