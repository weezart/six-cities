# Getting Started

## Требования

- Node.js 18+ (рекомендуется LTS).
- npm 9+.
- Доступ к интернету для API `https://15.design.htmlacademy.pro/six-cities`.

## Установка

```bash
npm install
```

## Запуск в режиме разработки

```bash
npm start
```

После старта Vite покажет локальный URL (обычно `http://localhost:5173`).

## Доступные скрипты

- `npm start` — dev-сервер Vite.
- `npm run lint` — проверка ESLint для `src/**/*.ts(x)`.
- `npm run build` — TypeScript check + production build.
- `npm run preview` — локальный просмотр production build.
- `npm test` — Vitest (с `--passWithNoTests`).

## Проверка перед коммитом

```bash
npm run lint
npm run build
```

## Типичные проблемы

### 1) В консоли Vite предупреждение про `css/main.css`

`index.html` ссылается на `css/main.css` как на внешний стиль из учебного шаблона.  
Это предупреждение не блокирует сборку, если UI работает в рамках текущей конфигурации.

### 2) Пустой экран при проблемах с API

Проверьте:
- доступность `https://15.design.htmlacademy.pro/six-cities`;
- что запросы в DevTools не блокируются;
- наличие/валидность токена в `localStorage` (`6-cities-thws-token`).

### 3) Невозможно залогиниться

- email должен быть валидным;
- пароль не должен содержать пробелы;
- при ошибке сервер может вернуть 400, текст ошибки выводится на форме логина.

## Полезные ссылки

- Архитектура: [`architecture.md`](./architecture.md)
- Redux и thunks: [`state-and-redux.md`](./state-and-redux.md)
- API и авторизация: [`api-and-auth.md`](./api-and-auth.md)
