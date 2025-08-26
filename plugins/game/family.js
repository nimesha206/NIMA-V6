const path = require('path');

module.exports = {
  name: 'Family-100',
  command: ['family'],
  tags: 'Game Menu',
  desc: 'Family-100 gameplay',
  prefix: true,

  run: async (conn, msg, { chatInfo }) => {
    const { chatId } = chatInfo;
    const { soalFamily } = await global.loadFunc();

    try {
      const session = global.load(global.pPath);
      const randomSoal = soalFamily[Math.floor(Math.random() * soalFamily.length)];

      const sent = await conn.sendMessage(chatId, {
        text: `*Family 100*\n\n${randomSoal.soal}`
      }, { quoted: msg });

      const soalId = sent.key.id;
      const sessionKey = `soal${Object.keys(session).length + 1}`;

      session[sessionKey] = {
        soal: randomSoal.soal,
        jawaban: randomSoal.jawaban,
        created: Date.now(),
        id: soalId,
        chance: 3
      };

      global.save(session, global.pPath);

    } catch {
      await conn.sendMessage(chatId, {
        text: '⚠️ Terjadi kesalahan saat menjalankan game.'
      }, { quoted: msg });
    }
  }
};