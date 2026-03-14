# Telegram Clone (React Native)

Клон Telegram на **Expo SDK 55** + TypeScript + NativeWind + WatermelonDB + Zustand.

## Шаг 1 — Запуск в Expo Go

### Требования

- Node.js 18+
- npm или yarn
- **Expo Go** на телефоне ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Установка и запуск

```bash
cd telegram-clone
npm install --legacy-peer-deps
npx expo start
```

- Открой **Expo Go** на телефоне.
- Отсканируй QR-код из терминала (или введи URL вручную).
- Убедись, что телефон и компьютер в одной Wi‑Fi сети.

Для Android можно также:

```bash
npx expo start --android
```

(эмулятор или устройство по USB с включённой отладкой).

### Важно про Expo Go

- **WatermelonDB** и **react-native-mmkv** — нативные модули. В **Expo Go** они недоступны: БД инициализируется с fallback (без краша). Для полной работы с БД собери **development build**: `npx expo prebuild` и затем `npx expo run:android` / `run:ios`.
- **WebRTC / In-Call** будут добавлены на шаге 6–7 и тоже требуют dev build.

## Структура проекта (Шаг 1)

```
telegram-clone/
├── src/
│   ├── app/                 # Expo Router
│   │   ├── _layout.tsx      # Root layout (GestureHandler, SafeArea, StatusBar)
│   │   ├── index.tsx        # Redirect → Chats
│   │   └── (tabs)/
│   │       ├── _layout.tsx  # Bottom tabs (Chats, Calls, Settings)
│   │       ├── chats.tsx
│   │       ├── calls.tsx
│   │       └── settings.tsx
│   ├── components/
│   ├── screens/
│   ├── store/               # Zustand (+ persist AsyncStorage)
│   │   └── useSettingsStore.ts
│   ├── database/            # WatermelonDB
│   │   ├── schema.ts        # users, chats, messages, calls, saved_items, chat_folders
│   │   ├── migrations.ts
│   │   ├── index.ts         # getDatabase()
│   │   └── models/
│   ├── services/            # Socket.io client
│   ├── themes/              # TelegramColors (light/dark)
│   ├── utils/
│   └── assets/
├── global.css               # Tailwind (NativeWind)
├── tailwind.config.js
├── babel.config.js          # NativeWind + decorators + Reanimated
├── metro.config.js          # withNativeWind
└── app.json                 # expo-router root: src, plugins
```

## Техстек

- **Expo SDK 55** (или новее)
- **TypeScript** (strict)
- **NativeWind 4** + Tailwind
- **Expo Router** (file-based, root: `src`)
- **Zustand** + **AsyncStorage** (persist; MMKV — в dev build)
- **WatermelonDB** (schema + models; в Expo Go — fallback)
- **React Navigation** (через Expo Router)
- **Reanimated 3** + **Gesture Handler** + **react-native-gesture**
- **Socket.io-client**, **expo-av**, **expo-media-library**, **expo-haptics**, **expo-notifications**, **expo-linear-gradient**, **expo-image**

## Следующие шаги

- **Шаг 2:** Темы + базовая навигация + splash как в TG.
- **Шаг 3:** ChatListScreen + folders + swipe actions.
- **Шаг 4:** ChatScreen + сообщения + input + типы контента.
- **Шаг 5:** Saved Messages.
- **Шаг 6:** WebRTC + Socket.io сервер.
- **Шаг 7:** CallsScreen + входящий звонок + звонки.
- **Шаг 8:** Settings + Profile + остальные экраны.

Когда будешь готов к следующему шагу — напиши **next**.

---

## Деплой бэкенда на Railway

Сервер (Express + Socket.io) в папке `server/` можно развернуть на [Railway](https://railway.app). Подробная инструкция: **[DEPLOY-RAILWAY.md](./DEPLOY-RAILWAY.md)**.
