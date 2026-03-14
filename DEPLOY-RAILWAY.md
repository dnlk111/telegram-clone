# Деплой на Railway

На Railway разворачивается **сервер** (Express + Socket.io). Мобильное приложение (Expo) остаётся на телефоне и подключается к этому серверу по URL.

---

## 1. Репозиторий на GitHub

Если проекта ещё нет в Git:

```bash
cd telegram-clone
git init
git add .
git commit -m "Initial commit"
```

Создай репозиторий на [GitHub](https://github.com/new), затем:

```bash
git remote add origin https://github.com/ТВОЙ_ЛОГИН/telegram-clone.git
git branch -M main
git push -u origin main
```

---

## 2. Создать проект в Railway

1. Зайди на [railway.app](https://railway.app) и войди (через GitHub удобнее).
2. **New Project** → **Deploy from GitHub repo**.
3. Выбери репозиторий `telegram-clone` и разреши доступ, если спрашивают.
4. Railway создаст сервис из этого репо.

---

## 3. Указать папку сервера (Root Directory) — обязательно

По умолчанию Railway собирает **корень** репозитория (Expo). Тогда при сборке вызывается `npm ci` из корня и возникают ошибки зависимостей (ERESOLVE, @nozbe/with-observables). Нужно запускать **только сервер**:

1. Открой созданный **Service** (сервис).
2. Перейди в **Settings**.
3. В блоке **Build** найди **Root Directory** (или **Source**).
4. Укажи: **`server`** (без слэша).
5. Сохрани.

Так Railway будет считать корнем папку `server/`, использовать `server/package.json` и команды ниже. После смены Root Directory перезапусти деплой (Redeploy).

**Если уже видишь ошибку `ERESOLVE` / `@nozbe/with-observables`** — значит сборка идёт из корня. Поставь Root Directory = **`server`** и сделай Redeploy. В корне проекта добавлен `.npmrc` с `legacy-peer-deps=true` — это помогает только при локальной установке; на Railway должна собираться именно папка `server`.

**Build Command** (в Settings → Build, по желанию):  
`npm run build` или оставь пустым — Railway сам выполнит `npm install`.

**Start Command** (в Settings → Deploy):  
`npm start` или оставь пустым — по умолчанию запускается `npm start` из `package.json` (= `node index.js`).

---

## 4. Переменные окружения (по желанию)

В **Variables** можно добавить, например:

- `PORT` — Railway подставляет сам, менять не нужно.
- Свои переменные для будущего (БД, секреты) — когда появятся.

---

## 5. Деплой

1. В **Deployments** нажми **Deploy** (или деплой запустится сам после push в GitHub).
2. Дождись зелёного статуса.
3. Открой вкладку **Settings** → **Networking** → **Generate Domain**. Railway выдаст URL вида:
   - `https://telegram-clone-production-xxxx.up.railway.app`

Это и есть адрес твоего сервера.

---

## 6. Подключить приложение к серверу на Railway

В мобильном приложении нужно использовать этот URL для Socket.io и API.

### Вариант A: через `.env` (рекомендуется)

В **корне** проекта (рядом с `package.json`) создай файл `.env`:

```env
EXPO_PUBLIC_SOCKET_URL=https://ТВОЙ-ДОМЕН.up.railway.app
```

Подставь свой домен из Railway (без слэша в конце).  
Перезапусти Expo:

```bash
npx expo start --clear
```

### Вариант B: прописать в коде (только для теста)

В `src/services/socket.ts` замени дефолтный URL на свой Railway-URL (временно, для проверки).

---

## 7. Проверка

- В браузере открой `https://ТВОЙ-ДОМЕН.up.railway.app` — должен вернуться JSON: `{"ok":true,"service":"telegram-clone-server",...}`.
- В приложении при вызове `connectSocket()` клиент будет подключаться к этому серверу.

---

## Кратко

| Шаг | Действие |
|-----|----------|
| 1 | Репозиторий в GitHub, push кода |
| 2 | Railway → New Project → Deploy from GitHub → выбрать репо |
| 3 | Settings → Root Directory = **server** |
| 4 | Settings → Generate Domain, скопировать URL |
| 5 | В проекте создать `.env` с `EXPO_PUBLIC_SOCKET_URL=https://...` |
| 6 | `npx expo start --clear` и проверка в приложении |

Если захочешь вынести инструкцию в основной README или добавить деплой веб-версии Expo — напиши, подстроим.
