# Site de Recharge PCS

Site web simple pour automatiser la réception de codes PCS avec notification Telegram.

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Créer un fichier `.env` basé sur `.env.example` :
```bash
cp .env.example .env
```

3. Configurer votre bot Telegram :
   - Créez un bot via [@BotFather](https://t.me/botfather) sur Telegram
   - Obtenez votre **BOT_TOKEN**
   - Obtenez votre **CHAT_ID** (envoyez un message à votre bot et visitez `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`)

4. Remplissez le fichier `.env` avec vos informations :
```
TELEGRAM_BOT_TOKEN=votre_token_ici
TELEGRAM_CHAT_ID=votre_chat_id_ici
PORT=3000
```

## Démarrage

```bash
npm start
```

Le site sera accessible sur `http://localhost:3000`

## Utilisation

1. Les visiteurs arrivent sur le site
2. Ils lisent les instructions pour acheter une recharge PCS
3. Ils entrent leur code à 12 chiffres
4. Le code est envoyé automatiquement à votre bot Telegram

## Fonctionnalités

- Interface simple et responsive
- Explications claires pour acheter une recharge PCS
- Validation du code (12 chiffres)
- Notification instantanée sur Telegram
- Design moderne et intuitif
