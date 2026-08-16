# API and Auth

## Backend

- Base URL: `https://15.design.htmlacademy.pro/six-cities`
- Константы API роутов находятся в [`src/const.ts`](../../src/const.ts), объект `APIRoute`.

## Axios layer

Источник: [`src/services/api.ts`](../../src/services/api.ts)

`createAPI()` настраивает:
- `baseURL`
- `timeout` (5000ms)
- request interceptor:
  - добавляет заголовок `x-token`, если токен есть в `localStorage`.
- response interceptor:
  - при `401` вызывает `dropToken()`, затем прокидывает ошибку дальше.

## Token storage

Источник: [`src/services/token.ts`](../../src/services/token.ts)

- Ключ: `6-cities-thws-token`
- API:
  - `getToken()`
  - `saveToken(token)`
  - `dropToken()`

## Auth flow

### 1) Startup auth check

- На старте `App` диспатчится `checkAuthAction`.
- Thunk делает `GET /login`:
  - success: `setUser(data)` + `setAuthorizationStatus(Auth)`
  - error: `setUser(null)` + `setAuthorizationStatus(NoAuth)`

### 2) Login

- `loginAction` отправляет `POST /login` с `{ email, password }`.
- При успехе:
  - `saveToken(data.token)`
  - `setUser(data)`
  - `setAuthorizationStatus(Auth)`
- Для `400` возвращается `rejectWithValue` с валидационным сообщением.

### 3) Logout

- `logoutAction` вызывает `DELETE /logout`.
- В `finally` всегда:
  - `dropToken()`
  - `setUser(null)`
  - `setAuthorizationStatus(NoAuth)`

## Комментарии API

Offer page использует:
- `GET /comments/:id` — загрузка комментариев.
- `POST /comments/:id` — отправка комментария.

После успешного `POST` приложение перечитывает комментарии (`fetchCommentsAction`) для синхронного UI.

## Offer page API

- `GET /offers/:id` — детальная карточка.
- `GET /offers/:id/nearby` — nearby офферы.
- При `404` для оффера выставляется `isOfferNotFound=true`.

## Связанные файлы

- Thunks: [`src/store/api-actions.ts`](../../src/store/api-actions.ts)
- Reducer flags: [`src/store/reducer.ts`](../../src/store/reducer.ts)
- Login UI: [`src/pages/Login-screen/Login-screen.tsx`](../../src/pages/Login-screen/Login-screen.tsx)
- Private route: [`src/components/Private-route/Private-route.tsx`](../../src/components/Private-route/Private-route.tsx)
