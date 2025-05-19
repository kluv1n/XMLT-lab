const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Настройка CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.options('*', (req, res) => res.sendStatus(200));
app.use(express.json());

// Данные карточек (полный набор данных из вашего примера)
const stocks = [
  {
    id: 1,
    title: 'Комедии',
    elements: [
      {
        title: "Злой город",
        description: "Жители защищают Козельск во время монгольского нашествия. Исторический экшен о русском Средневековье.",
        src: "https://avatars.mds.yandex.net/get-ott/236744/2a00000194889188e8e8009c395259ec9092/440x660"
      },
      {
        title: "Батя",
        description: "По дороге на юбилей отца Максим вспоминает свое детство в 1990-х. Комедия с Владимиром Вдовиченковым.",
        src: "https://avatars.mds.yandex.net/get-ott/224348/2a000001800f89b620964a832ac394ae021f/440x660"
      },
      {
        title: "Анора",
        description: "Сын русского олигарха находит родную душу в нью-йоркской танцовщице. Лучший фильм и еще четыре «Оскара».",
        src: "https://avatars.mds.yandex.net/get-ott/224348/2a000001957ee532a0f135950e8965e093d6/440x660"
      }
    ]
  },
  {
    id: 2,
    title: 'Драмы',
    elements: [
      {
        title: "Пальма 2 (2024)",
        description: "Оставив большую авиацию, летчик Вячеслав Лазарев с семьей перебирается в глубинку, где продолжает летать, но теперь на маленьком винтовом АН-2.",
        src: "https://avatars.mds.yandex.net/get-kinopoisk-image/10812607/ad1968b7-36f7-4ba4-a176-14490758753e/280x420"
      },
      {
        title: "Батя 2. Дед (2025)",
        description: "Во время развода с женой Макс вспоминает детство, когда родители, которые тоже собирались разводиться, отправили его на лето к деду-фронтовику в деревню.",
        src: "https://avatars.mds.yandex.net/get-kinopoisk-image/10893610/43049820-1e5b-456f-8e13-097b8b9937fa/280x420"
      },
      {
        title: "Мастер (2025)",
        description: "Левон Кейд — рабочий на стройке, но когда дочь директора стройки похищают неизвестные, он обращается за помощью именно к Левону.",
        src: "https://avatars.mds.yandex.net/get-kinopoisk-image/10768063/c4601a03-317b-4e6c-9d6d-88daba96854b/280x420"
      }
    ]
  },
  {
    id: 3,
    title: 'Фантастика',
    elements: [
      {
        title: "Волшебник изумрудного города (дорога из желтого кирпича)",
        description: "Чтобы вернуться домой из сказочного мира, Элли ищет мага, который исполняет желания. Фэнтези для всей семьи.",
        src: "https://avatars.mds.yandex.net/get-ott/1652588/2a00000196005c4f399191553a9f91ee7ec2/280x420"
      },
      {
        title: "Универ молодые",
        description: "Безбашенные приключения новых студентов — в той самой общаге. Перезапуск ситкома об учебе, взрослении и любви.",
        src: "https://avatars.mds.yandex.net/get-ott/2419418/2a00000195c996eda24d940d0bfee02eaaa5/280x420"
      },
      {
        title: "Василий",
        description: "Учитель ОБЖ и его непутевый брат-близнец спасаются от бандитов в Мексике. Комедия с Александром Петровым.",
        src: "https://avatars.mds.yandex.net/get-ott/1672343/2a00000195b27d35c32e4db79306607a20bc/280x420"
      }
    ]
  },
  {
    id: 4,
    title: 'Боевики',
    elements: [
      {
        title: "Гнев человеческий",
        description: "Хладнокровный Эйч идет по следу грабителей, убивших его сына. Джейсон Стэйтем в брутальном боевике Гая Ричи.",
        src: "https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/90d57813-387c-44c4-81c1-ecddb3c417a5/600x900"
      },
      {
        title: "Брат 2",
        description: "Американцы знакомятся с Данилой Багровым и узнают, в чем сила. Сиквел о герое времени с мощным рок-саундтреком.",
        src: "https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/80eab631-346c-4c29-b14d-1fa1438158f9/600x900"
      },
      {
        title: "Переводчик",
        description: "Ахмед спас Джона от смерти, и теперь тот должен вернуть долг. Гай Ричи как никогда серьезен — и как всегда крут.",
        src: "https://avatars.mds.yandex.net/get-kinopoisk-image/1898899/5c775217-8796-4c7a-aba8-e4c6d48a6c36/600x900"
      }
    ]
  }
];

// API Endpoints
app.get('/api/stocks', (req, res) => {
  res.json(stocks);
});

app.get('/api/stocks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const stock = stocks.find(s => s.id === id);
  stock ? res.json(stock) : res.status(404).json({ error: 'Not found' });
});

// Обслуживание статических файлов
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
          res.set('Content-Type', 'application/javascript');
      }
  }
}));

// Маршрут для SPA (должен быть последним!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});