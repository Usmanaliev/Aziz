const typeChoose = {
  Uz: {
    type1: 'Davlat organlari harakatlari ustidan shikoyatlar',
    type2: 'Qonunchilikni takomillashtirish yuzasidan takliflar',
    type3: 'Noqonuniy tekshiruvlar haqida xabarlar',
  },
  Ru: {
    type1: 'Жалобы над действиями государственных органов',
    type2: 'Предложения по совершенствованию законодательства',
    type3: 'Сообщения о незаконных проверках',
  },
  UzCir: {
    type1: 'Давлат органлари ҳаракатлари устидан шикоятлар',
    type2: 'Қонунчиликни такомиллаштирш юзасидан таклифлар',
    type3: 'Ноқонуний текширувлар ҳақида хабарлар',
  },
};

const chooseInfo = {
  Uz:
    'Mazkur bot orqali O’zbekiston Respublikasi Prezidenti huzuridagi tadbirkorlik subyektlarining huquqlari va qonuniy manfaatlarini himoya qilish bo’yicha Vakilga (Biznes-ombudsman) davlat organlari tomonidan tadbirkorlik faoliyatiga to’sqinliklar va asossiz aralashuv holatlarini ma’lum qilishingiz mumkin. \n Biznes ombudsman faoliyati haqida ma’lumot olishni istasangiz rasmiy web sahifaga o’tishingiz mumkin yoki murojaatingizni qoldirish uchun botdan foydalanishni davom ettirishingiz mumkin.',
  Ru:
    'С помощью данного бота вы можете информировать Уполномоченного при Президенте Республики Узбекистан по защите прав и законных интересов субъектов предпринимательства о препятствиях и случаях необоснованного вмешательства в предпринимательскую деятельность государственных органов.\n Если вы хотите узнать больше о деятельности Бизнес-омбудсмена, вы можете пройти на официальный сайт или продолжить использовать бот, чтобы оставить свое обращение.',
  UzCir:
    'Мазкур бот орқали Ўзбекистон Республикаси Президенти ҳузуридаги тадбиркорлик субъектларининг ҳуқуқлари ва қонуний манфаатларини ҳимоя қилиш бўйича Вакилга давлат органлари томонидан тадбиркорлик фаолиятига тўсқинликлар ва асоссиз аралашув ҳолатларини маълум қилишингиз мумкин.\n  Бизнес-омбудсман фаолияти ҳақида маълумот олишни истасангиз расмий вэб-саҳифага ўтишингиз мумкин ёки мурожаатингизни қолдириш учун ботдан фойдаланишни давом эттиришингиз мумкин.',
};

const chooseBtn = {
  Uz: {
    name: 'Ismingiz va familiyangizni kiriting',
    type: 'Murojaatingiz mazmuniga qarab tegishli bo’limni bosing',
    phone: 'Aloqa uchun telefon raqamingiz',
    company: 'Tadbirkorlik subyekti nomi',
    lang: 'O’zbekcha',
    inn: 'STIR Raqam',
    phoneIncorrect: 'Telefon raqami noto\'g\'ri ko\'rsatildi. Iltimos telefon raqamingizni quyidagi ko\'rsatilgan shaklda yuboring: \n  +998901234567',
    zayava: 'Murojaatingizni batafsil ma’lumotlar bilan yoriting',
    nextBtn: 'Davom ettirish',
    toSite: 'Web sahifaga o’tish',
    lastMessage:
      'Murojaatingiz uchun rahmat. Vakil devoni inspektorlaridan biri murojaatingizni o’rganib chiqib siz bilan aloqa o’rnatadi. \n Ma’lumot uchun: dam olish kunlari yuborilgan murojaatlar yuzasidan inspektorlarimiz sizga ish kunlari (dushanba-juma) davomida aloqaga chiqishadi.',
    tryAgain: 'Xato. Boshidan boshlang',
    confirm: 'Tasdiqlash',
    cancel: 'Bekor qilish'
  },
  Ru: {
    name: 'Напишите Ваше имя и фамилию',
    type: 'Нажмите на соответствующую кнопку в зависимости от содержания вашего обращения',
    phone: 'Номер Вашего контактного телефона',
    lang: 'Русский',
    nextBtn: 'Продолжить',
    toSite: 'Посетить вэб-сайт',
    company: 'Наименование субъекта предпринимательства',
    inn: 'ИНН компании',
    phoneIncorrect: 'Номер телефона указан в неправильном формате. Пожалуйста напишите свой номер в нижеследующем формате:\n +998901234567',
    zayava: 'Напишите Ваше обращение с подробностями',
    lastMessage:
      'Спасибо за Ваше обращение. Один из инспекторов Аппарата Уполномоченного рассмотрит Ваше обращение и свяжется с вами. \nДля информации: если обращение отправлено в выходные дни наши инспектора свяжутся с вами в будние дни (с понедельника по пятницу).',
    tryAgain: 'ОШИБКА, ПОПРОБУЙТЕ ЗАНОВО',
    confirm: 'Подтвердить',
    cancel: 'Отменить'
  },
  UzCir: {
    name: 'Исмингиз ва фамилиянгизни киритинг',
    type: 'Мурожаатингиз мазмунига қараб тегишли бўлимни танланг',
    phone: 'Алоқа учун телефон рақамингизни киритинг',
    lang: 'Ўзбек',
    nextBtn: 'Давом эттириш',
    toSite: 'Вэб-саҳифага ўтиш',
    company: 'Тадбиркорлик субъекти номини киритинг',
    inn: 'Корхона СТИР рақамини киритинг',
    phoneIncorrect: 'Телефон рақами нотўғри кўрсатилди. Илтимос телефон рақамингизни қуйидаги кўрсатилган шаклда юборинг: \n +998901234567',
    zayava: 'Мурожаатингизни батафсил маълумотлар билан ёритинг',
    lastMessage: 'Мурожаатингиз учун рахмат, Вакил девони инспекторларидан бири мурожаатингизни ўрганиб чиқиб сиз билан алоқа ўрнатади. \n Маълумот учун; дам олиш кунлари юборилган мурожаатлар юзасидан сизга иш кунлари (душанба-жума) давомида алоқага чиқишади',
    tryAgain: 'Хато. Бошидан бошланг',
    confirm: 'Тасдиқлаш',
    cancel: 'Бекор қилиш'
  },
};

const chooseFormTitle = {
  Uz: {
    name: 'Ism',
    type: 'Murojaat turi',
    date: 'Vaqt',
    company: 'Korxona',
    phone: 'Tel.',
    zayava: 'Mazmun',
    inn: 'STIR',
    text: 'Sizning murojaatingiz'
  },
  Ru: {
    name: 'Имя',
    type: 'Тип обращения',
    date: 'Дата',
    company: 'Название компании',
    phone: 'Тел.',
    zayava: 'Обращение',
    inn: 'ИНН',
    text: 'Ваше обращение'
  },
  UzCir: {
    name: 'Исм',
    type: 'Мурожаат тури',
    date: 'Вақт',
    company: 'Корхона',
    phone: 'Тел.',
    zayava: 'Мазмун',
    inn: 'СТИР',
    text: 'Сизнинг мурожаатингиз'
  }
}

module.exports = { typeChoose, chooseInfo, chooseBtn, chooseFormTitle };
