# Pages and Components

## Главные страницы

### `MainScreen`

Файл: [`src/pages/Main-screen/Main-screen.tsx`](../../src/pages/Main-screen/Main-screen.tsx)

- Берёт из store `offers`, `cityName`.
- Фильтрует офферы по `offer.city.name === cityName`.
- Отображает:
  - список городов (`LocationComponent`);
  - список карточек (`CitiesPlacesList`);
  - карту (`MapComponent`);
  - пустой стейт (`MainEmpty`) если в городе нет офферов.

### `OfferScreen`

Файл: [`src/pages/Offer-screen/Offer-screen.tsx`](../../src/pages/Offer-screen/Offer-screen.tsx)

- Получает `id` из URL (`useParams`) как `string`.
- Запускает 3 загрузки (`offer`, `nearby`, `comments`) при смене `id`.
- Показывает:
  - `NotFoundScreen`, если `isOfferNotFound`;
  - `Loading`, пока грузятся данные;
  - контент оффера + nearby + комментарии.
- Рендер `ReviewFormComponent` только для авторизованного пользователя.

### `LoginScreen`

Файл: [`src/pages/Login-screen/Login-screen.tsx`](../../src/pages/Login-screen/Login-screen.tsx)

- Controlled inputs для email/password.
- Валидация: пароль без пробелов.
- На submit диспатчит `loginAction`.
- На успехе делает `navigate(AppRoute.Root, { replace: true })`.
- При статусе `Auth` редиректит пользователя с `/login`.

### `FavoritesScreen`

Файл: [`src/pages/Favorites-screen/Favorites-screen.tsx`](../../src/pages/Favorites-screen/Favorites-screen.tsx)

- Получает `favorites` через props из `App`.
- Доступен только через `PrivateRoute`.

### `NotFoundScreen`

Файл: [`src/pages/Not-found-screen/Not-found-screen.tsx`](../../src/pages/Not-found-screen/Not-found-screen.tsx)

- Используется как глобальный fallback для маршрута `*`.
- Используется как fallback на странице оффера при невалидном/несуществующем `id`.

## Cross-cutting компоненты

### `App`

Файл: [`src/components/App/App.tsx`](../../src/components/App/App.tsx)

- Точка инициализации данных и auth-check.
- Собирает `isLogged` на основе `authorizationStatus`.
- Определяет роуты и fallback `*`.

### `PrivateRoute`

Файл: [`src/components/Private-route/Private-route.tsx`](../../src/components/Private-route/Private-route.tsx)

- Читает статус авторизации из store.
- Либо рендерит детей, либо редиректит на логин.

### `Header`

Файл: [`src/components/Header/Header.tsx`](../../src/components/Header/Header.tsx)

- Показывает email из `state.user?.email`.
- Кнопка Sign out диспатчит `logoutAction`.
- Показывает корректное меню для guest/auth пользователя.

### `MapComponent`

Файл: [`src/components/Map/Map.tsx`](../../src/components/Map/Map.tsx)

- Отрисовывает карту города и пины офферов.
- Получает активный оффер для подсветки маркера.
- Используется на `MainScreen` и `OfferScreen`.

### `PlaceCardComponent`

Файл: [`src/components/Place-card/Place-card.tsx`](../../src/components/Place-card/Place-card.tsx)

- Базовая карточка оффера для списков.
- Отвечает за ссылку на `/offer/:id`, UI favorite и основные метаданные (price, rating, type).
- Используется в списках главной, nearby и избранного.

### `ReviewFormComponent`

Файл: [`src/components/ReviewForm/ReviewForm.tsx`](../../src/components/ReviewForm/ReviewForm.tsx)

- Принимает `offerId`.
- Управляет `rating` и `text` локально.
- Валидация:
  - `rating > 0`
  - текст 50-300 символов
- Во время отправки блокирует поля и кнопку (`isCommentSending`).

### `LocationComponent`

Файл: [`src/components/Location/Location.tsx`](../../src/components/Location/Location.tsx)

- Показывает список городов из `CITIES`.
- Подсвечивает активный город.
- При клике вызывает `onCityClick(cityName)`.

## Вспомогательные страницы и UI

- `Loading` — экран во время начальной загрузки или загрузки данных оффера.
- `NotFoundScreen` — fallback для несуществующих маршрутов и офферов.
- `MainEmpty` — пустой экран главной, если в выбранном городе нет предложений.

## Куда вносить изменения по типовым задачам

- Изменить правила доступа к приватным страницам: `src/components/Private-route/Private-route.tsx`.
- Изменить auth-поведение в UI: `src/components/Header/Header.tsx` и `src/pages/Login-screen/Login-screen.tsx`.
- Добавить новый API-сценарий по офферам: `src/store/api-actions.ts` + `src/store/reducer.ts`.
- Изменить отображение карточек в списках: `src/components/Place-card/Place-card.tsx`.
- Изменить поведение карты: `src/components/Map/Map.tsx`.
