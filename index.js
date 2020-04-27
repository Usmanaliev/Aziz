const TelegramBot = require('node-telegram-bot-api');

//const token = '1226686352:AAGXgslJ17kgH0DWFvyGYkfi4JklXGFNOII';
const token = '728371112:AAETpJWsXZNppuX2oWxlR0gJccNIlshWw3M';

const { typeChoose, chooseInfo, chooseBtn, chooseFormTitle } = require('./localization');

const bot = new TelegramBot(token, { polling: true });
let users = [];
const zayavas = [];

let zayavaId = 0;
const murojatId = -330348762;
const tekshiruvId = -453604980;
const taklifId = -462312137;

const groups = [-330348762, -453604980, -462312137];

function getNewId() {
  zayavaId++;
  return zayavaId;
}

bot.on('polling_error', (err) => {
  console.log('err', err);
});

bot.onText(/\/start/, (message) => {
  const { from, chat } = message;

  sendLanguageMessage(chat.id);
});

bot.on('message', (message) => {
  const { from, text, chat } = message;
  if (text === '/start') {
    return;
  }

  const user = users.find((v) => v.id === from.id);

  if (groups.includes(chat.id)) {
    return;
  }

  if (!user) {
    bot.sendMessage(
      message.chat.id,
      `
    Начните сначала
Бошидан бошланг
`
    );
    return;
  }

  if (user.step === 'Name') {
    onNameSend(from.id, text);
    return;
  }

  if (user.step === 'Company') {
    onCompanySend(from.id, text);
    return;
  }

  if (user.step === 'Phone') {
    onPhoneSend(from.id, text);
    return;
  }

  if (user.step === 'INN') {
    onInnSend(from.id, text);
    return;
  }

  if (user.step === 'Zayava') {
    onZayavaSend(from.id, text, message.date);
    return;
  }
});

bot.on('callback_query', function (msg) {
  if (msg.data.startsWith('Lang')) {
    const [text, chatId, lang] = msg.data.split('==');
    sendInfoMessage(chatId, lang);
  }

  if (msg.data.startsWith('Info')) {
    const [text, chatId, lang, isNext] = msg.data.split('==');
    if (isNext) {
      sendChooseType(lang, chatId);
    }
  }
  if (msg.data.startsWith('Type')) {
    const [text, chatId, lang, type] = msg.data.split('==');
    const { from } = msg;
    const { id, first_name, last_name, username } = from;

    users.push({ id, first_name, last_name, username, chatId, type, lang, step: 'Name' });

    bot.sendMessage(chatId, chooseBtn[lang]['name']);
  }

  if (msg.data.startsWith('Confirm')) {
    const { id } = msg.from
    const [text, chatId] = msg.data.split('==')
    const user = users.find(v => v.id === id)

    if (!user || user.step !== 'Confirm') {
      return
    }

    onConfirm(user.id)
  }

  if (msg.data.startsWith('Cancel')) {
    const { id } = msg.from
    const [text, chatId] = msg.data.split('==')

    users = users.filter(v => v.id !== id)
    sendLanguageMessage(chatId)
  }
});

function sendLanguageMessage(chatId) {
  const btns = [
    [{ text: chooseBtn['Uz']['lang'], callback_data: `Lang==${chatId}==Uz` }],
    [{ text: chooseBtn['Ru']['lang'], callback_data: `Lang==${chatId}==Ru` }],
    [{ text: chooseBtn['UzCir']['lang'], callback_data: `Lang==${chatId}==UzCir` }],
  ];
  bot.sendMessage(
    chatId,
    `
  Тилни танланг
Выберите язык
  `,
    {
      reply_markup: JSON.stringify({
        inline_keyboard: btns,
      }),
      parse_mode: 'Markdown',
    }
  );
}

function sendInfoMessage(chatId, lang) {
  const btns = [
    [{ text: chooseBtn[lang]['nextBtn'], callback_data: `Info==${chatId}==${lang}==1` }],
    [{ text: chooseBtn[lang]['toSite'], url: 'https://biznesvakil.uz', callback_data: `Info==${chatId}==${lang}==0` }],
  ];
  bot.sendMessage(chatId, chooseInfo[lang], {
    reply_markup: JSON.stringify({
      inline_keyboard: btns,
    }),
    parse_mode: 'Markdown',
  });
}

function sendChooseType(lang, chatId) {
  const btns = ['type1', 'type2', 'type3'].map((v) => {
    return [{ text: typeChoose[lang][v], callback_data: `Type==${chatId}==${lang}==${v}` }];
  });

  bot.sendMessage(chatId, chooseBtn[lang]['type'], {
    reply_markup: JSON.stringify({
      inline_keyboard: btns,
    }),
    parse_mode: 'Markdown',
  });
}

function onNameSend(userId, name) {
  const user = users.find((v) => v.id === userId);
  user.name = name;
  user.step = 'Company';

  bot.sendMessage(user.chatId, chooseBtn[user.lang]['company']);
}

function onCompanySend(userId, company) {
  const user = users.find((v) => v.id === userId);
  user.company = company;

  user.step = 'Phone';
  bot.sendMessage(user.chatId, chooseBtn[user.lang]['phone']);
}

function onPhoneSend(userId, phone) {
  const user = users.find((v) => v.id === userId);

  if (!phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
    bot.sendMessage(user.chatId, chooseBtn[user.lang]['phoneIncorrect']);
    return;
  }

  user.phone = phone;
  const isInn = user.type === 'type3';

  if (isInn) {
    user.step = 'INN';
    bot.sendMessage(user.chatId, chooseBtn[user.lang]['inn']);
  } else {
    user.step = 'Zayava';
    bot.sendMessage(user.chatId, chooseBtn[user.lang]['zayava']);
  }
}

function onInnSend(userId, inn) {
  const user = users.find((v) => v.id === userId);

  user.inn = inn;
  user.step = 'Zayava';
  bot.sendMessage(user.chatId, chooseBtn[user.lang]['zayava']);
}

function onZayavaSend(userId, zayava) {
  const user = users.find((v) => v.id === userId);
  const { id, chatId, name, phone, inn, company, first_name, last_name, username, type, lang } = user;
  user.zayava = zayava;
  user.step = 'Confirm';

  const btns = [
    [{ text: chooseBtn[lang]['confirm'], callback_data: `Confirm==${chatId}` }],
    [{ text: chooseBtn[lang]['cancel'], callback_data: `Cancel==${chatId}` }],
  ];
  let text = '';
  text = ` ${chooseFormTitle[lang]['text']}
${username ? '@' + replaceSings(username) : ''}
*${chooseFormTitle[lang]['name']}:* ${replaceSings(name)}
*${chooseFormTitle[lang]['type']}:* ${typeChoose[lang][type]}
*${chooseFormTitle[lang]['date']}:* ${new Date().toLocaleString()}
*${chooseFormTitle[lang]['company']}:* ${replaceSings(company)}
*${chooseFormTitle[lang]['phone']}:* ${replaceSings(phone)}
*${chooseFormTitle[lang]['zayava']}:* ${replaceSings(zayava)}
${inn ? `*${chooseFormTitle[lang]['inn']}*: ` + replaceSings(inn) : ''}
  `;

  bot.sendMessage(user.chatId, text, {
    reply_markup: JSON.stringify({
      inline_keyboard: btns,
    }),
    parse_mode: 'Markdown',
  });
}

function onConfirm(userId) {
  const user = users.find((v) => v.id === userId);
  const zayavaId = getNewId();
  const { id, chatId, name, phone, inn, company, zayava, first_name, last_name, username, type, lang } = user;

  zayavas.push({ id, zayavaId, chatId, name, phone, inn, company, zayava, first_name, last_name, username, type, lang });
  sendToAdmins(zayavaId);
  users = users.filter((v) => v.id !== id);
  bot.sendMessage(user.chatId, chooseBtn[user.lang]['lastMessage']);
  sendLanguageMessage(chatId)
}

function sendToAdmins(zayavaId) {
  const item = zayavas.find((v) => v.zayavaId === zayavaId);

  const { id, chatId, name, phone, inn, company, zayava, first_name, last_name, username, type, lang } = item;
  let text = '';
  text = `${username ? '@' + replaceSings(username) : ''}
  *Исм:* ${replaceSings(name)}
*Мурожаат тури:* ${typeChoose[lang][type]}
*Сана:* ${new Date().toLocaleString()}
*Корхона:* ${replaceSings(company)}
*Телефон:* ${replaceSings(phone)}
*Мурожаат:* ${replaceSings(zayava)}
${inn ? '*ИНН*: ' + replaceSings(inn) : ''}
  `;

  const groupId = getChatIdByType(type);
  bot.sendMessage(groupId, text, { parse_mode: 'Markdown' }).then((message) => {
    bot.onReplyToMessage(groupId, message.message_id, listenReply.bind(null, zayavaId));
  });
}

function replaceSings(text) {
  return text
    .split('')
    .map((v) => (v === '_' ? '\\_' : v))
    .join('');
}

function getChatIdByType(type) {
  if (type === 'type1') {
    return murojatId;
  }

  if (type === 'type2') {
    return taklifId;
  }

  if (type === 'type3') {
    return tekshiruvId;
  }
}

function listenReply(zayavaId, msg) {
  const zayava = zayavas.find((v) => v.zayavaId === zayavaId);

  const { chatId } = zayava;
  bot.sendMessage(chatId, msg.text);
}
