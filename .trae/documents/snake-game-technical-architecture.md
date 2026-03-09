## 1. Architecture Design

```mermaid
flowchart LR
  A["UI (index.html)"] --> B["Game Logic (game.js)"]
  B --> C["Render (Canvas 2D Context)"]
  B --> D["Input (Keyboard Events)"]
  B --> E["State (Snake/Food/Score)"]
  E --> B
```

## 2. Technology Description
- Frontend: 原生 HTML + CSS + JavaScript
- Rendering: Canvas 2D API
- Backend: None
- Data: 内存中的游戏状态（无持久化）

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 单页运行贪吃蛇游戏 |

## 4. API Definitions (if backend exists)
不需要后端与 API。

## 5. Server Architecture Diagram (if backend exists)
不适用。

## 6. Data Model (if applicable)
### 6.1 Data Model Definition

```mermaid
erDiagram
  GAME_STATE ||--o{ SNAKE_SEGMENT : contains
  GAME_STATE ||--|| FOOD : has
  GAME_STATE {
    int score
    int gridSize
    int tileCount
    int tickMs
  }
  SNAKE_SEGMENT {
    int x
    int y
  }
  FOOD {
    int x
    int y
  }
```

### 6.2 Data Definition Language
不适用（无数据库）。
