# Деплой на Railway

Можно развернуть:
- **Только API** (сервер в папке `server/`) — для мобильного приложения в Expo Go.
- **Сайт-мессенджер** (веб-версия + API на одном домене) — чтобы открывать мессенджер в браузере по ссылке Railway.

---

## Вариант A: Мессенджер как сайт на одном домене

Сборка веб-версии Expo и раздача её тем же сервером. По адресу `https://твой-домен.up.railway.app` откроется сайт-мессенджер.

### Настройки в Railway

1. **Root Directory** — оставь **пустым** (удали `server`, чтобы сборка шла из корня репо).
2. **Build Command:**
   ```bash
   sh build-railway.sh
   ```
3. **Start Command:**
   ```bash
   cd server && node index.js
   ```
4. **Generate Domain** в Networking — скопируй URL (например `https://100gram.up.railway.app`).
5. В **Variables** добавь переменную (чтобы веб-клиент подключался к твоему серверу):
   - **Name:** `EXPO_PUBLIC_SOCKET_URL`
   - **Value:** `https://твой-домен.up.railway.app` (без слэша в конце).

После деплоя по корневому URL будет открываться веб-приложение; API: `https://твой-домен.up.railway.app/api` и `/api/health`. Если домен создал после первого деплоя — добавь переменную и сделай **Redeploy**.

---

## Вариант B: Только API (без сайта)

Для мобильного приложения в Expo Go — только бэкенд.

### Настройки в Railway

1. **Root Directory:** **`server`** (без слэша).
2. **Build Command** — пусто.
3. **Start Command** — пусто (по умолчанию `npm start`).
4. **Generate Domain** — скопировать URL и прописать в приложении в `.env` как `EXPO_PUBLIC_SOCKET_URL`.

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

## 3. Root Directory и команды (зависит от варианта)

- **Вариант A (сайт):** Root Directory — **пусто**. Build: `sh build-railway.sh`, Start: `cd server && node index.js`.
- **Вариант B (только API):** Root Directory = **`server`**. Build и Start — пусто.

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
