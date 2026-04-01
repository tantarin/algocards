<p align="center">
  <img src="https://img.shields.io/badge/problems-123-7c3aed?style=for-the-badge" alt="123 problems">
  <img src="https://img.shields.io/badge/patterns-21-22c55e?style=for-the-badge" alt="21 patterns">
  <img src="https://img.shields.io/badge/PWA-offline%20ready-f59e0b?style=for-the-badge" alt="PWA">
</p>

# AlgoCards

**Flashcard-приложение для запоминания алгоритмических паттернов.**

Без регистрации, без бэкенда, работает офлайн. Открыл — листаешь карточки — учишь.

> **[tantarin.github.io/algocards](https://tantarin.github.io/algocards/)** — открой на телефоне и добавь на главный экран

---

## Что внутри

Каждая карточка — это задача с двух сторон:

**Лицевая сторона (условие):**
- Полное описание задачи с примерами ввода/вывода
- Подсвеченные ключевые слова — визуальные подсказки к паттерну
- Кнопка **Подсказка** — 1-2 предложения, наводящие на решение
- Кнопка **Схема решения** — пошаговый план алгоритма (2-4 шага)

**Обратная сторона (решение):**
- Java-код с подсветкой синтаксиса
- Объяснение алгоритма
- Big-O сложность по времени и памяти

## Паттерны

| Паттерн | Задач | | Паттерн | Задач |
|---------|------:|-|---------|------:|
| Two Pointers | 27 | | Sliding Window | 13 |
| Trees / DFS | 14 | | Greedy | 9 |
| HashMap | 9 | | Intervals Sweep | 8 |
| Stack | 6 | | Math / Simulation | 6 |
| Prefix Sum (strict + ext.) | 8 | | Backtracking | 4 |
| Binary Search | 4 | | Geometry Hash | 3 |
| Heap / PQ | 2 | | Linked List | 2 |
| Union-Find | 2 | | Window + Deque | 2 |
| Graph BFS | 1 | | Graph Toposort | 1 |
| Strings Prefix | 1 | | Dynamic Prog. | 1 |

## Возможности

- **Фильтрация по паттерну** — выбери нужную тему
- **Поиск по тексту** — найди задачу по ключевым словам из условия
- **Перемешивание** — рандомный порядок карточек
- **PWA** — установи на телефон, работает офлайн
- **Мобильный интерфейс** — адаптивный дизайн для iPhone и Android

## Установка на телефон

### iOS (Safari)
1. Открой [tantarin.github.io/algocards](https://tantarin.github.io/algocards/)
2. Нажми **Поделиться** (иконка со стрелкой)
3. **На экран «Домой»**

### Android (Chrome)
1. Открой [tantarin.github.io/algocards](https://tantarin.github.io/algocards/)
2. Нажми **⋮** → **Добавить на главный экран**

## Технологии

- Vanilla JS, HTML, CSS — zero dependencies в рантайме
- [highlight.js](https://highlightjs.org/) — подсветка Java-кода
- Service Worker — офлайн-кеширование
- PWA manifest — установка на телефон

## Структура проекта

```
index.html      — приложение (UI + логика)
problems.js     — 123 задачи (условия, код, подсказки, шаги, сложность)
sw.js           — Service Worker для офлайна
manifest.json   — PWA-манифест
```

## Как добавить задачу

Каждая задача в `problems.js` — объект с полями:

```js
{
  id: "xx1",           // уникальный id
  t: "Название",       // заголовок
  p: "Two Pointers",   // паттерн
  d: "средне",         // сложность: легко / средне / сложно
  desc: `...`,         // условие с примерами, ==ключевые слова== для подсветки
  hint: `...`,         // подсказка (1-2 предложения)
  code: `...`,         // Java-решение
  steps: `...`,        // схема решения (2-4 шага)
  complexity: `...`,   // Big-O: время и память
  expl: `...`          // объяснение алгоритма
}
```

## Источник задач

Задачи взяты из репозитория [tantarin/algosy](https://github.com/tantarin/algosy) — коллекция алгоритмических паттернов для подготовки к собеседованиям.

## Лицензия

MIT

---

<p align="center">
  <sub>Сделано для тех, кто готовится к алгособесам</sub>
</p>
