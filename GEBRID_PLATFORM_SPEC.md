# GEBRID OS — Полное Техническое Задание (ТЗ)
## Боевая платформа: Фронтенд · Бэкенд · Смарт-контракты · Блокчейн

**Версия:** 1.0  
**Дата:** 2026-02-27  
**Статус:** Спецификация для разработки  

---

## Содержание

1. [Обзор проекта](#1-обзор-проекта)
2. [Архитектура системы](#2-архитектура-системы)
3. [Блокчейн и смарт-контракты](#3-блокчейн-и-смарт-контракты)
4. [Бэкенд](#4-бэкенд)
5. [Фронтенд](#5-фронтенд)
6. [AI / Agent Engine](#6-ai--agent-engine)
7. [Безопасность](#7-безопасность)
8. [Инфраструктура и DevOps](#8-инфраструктура-и-devops)
9. [Этапы разработки](#9-этапы-разработки)
10. [Стек технологий (итого)](#10-стек-технологий-итого)

---

## 1. Обзор проекта

### 1.1 Что такое GEBRID OS

GEBRID OS — AI-нативная операционная система для управления on-chain капиталом. Платформа позволяет:

- Запускать **агентные рои (agent swarms)** для автоматизированного трейдинга, yield-фарминга, арбитража
- Управлять **казначейством (Treasury)** DAO и институциональных фондов
- Работать с **токенизированными реальными активами (RWA)**
- Обеспечивать **policy-based защиту** каждой транзакции через Protection Agent
- Создавать стратегии в **no-code конструкторе** и торговать ими на маркетплейсе

### 1.2 Целевая аудитория

| Сегмент | Описание |
|---------|----------|
| **Strategy Executors** | Трейдеры, запускающие агентные стратегии |
| **Institutional Managers** | Фонды и DAO, управляющие капиталом |
| **GameFi Coordinators** | Гильдии, координирующие yield-стратегии |
| **Treasury Managers** | Казначеи DAO с суб-аккаунтами |
| **RWA Operators** | Операторы токенизированных реальных активов |
| **Template Builders** | Разработчики стратегий для маркетплейса |

### 1.3 Ключевые метрики успеха

| Этап | Агентов | Операторов | TVL | Институций |
|------|---------|-----------|-----|-----------|
| MVP | 500 | — | $10M | — |
| Phase 1 | — | 5,000 | $100M | — |
| Phase 2 | — | — | $1B RWA | 10 |
| Phase 3 | — | 50,000 | $10B cumulative | 100+ |

---

## 2. Архитектура системы

### 2.1 Высокоуровневая архитектура

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                       │
│  Dashboard · Agent Builder · Marketplace · Treasury · Analytics │
└───────────────────────────┬─────────────────────────────────────┘
                            │ REST / WebSocket / GraphQL
┌───────────────────────────▼─────────────────────────────────────┐
│                     API GATEWAY (Kong / Nginx)                   │
│              Rate Limiting · Auth · Load Balancing                │
└──┬──────────────┬───────────────┬──────────────┬────────────────┘
   │              │               │              │
   ▼              ▼               ▼              ▼
┌──────┐   ┌──────────┐   ┌───────────┐   ┌──────────────┐
│ Auth │   │  Agent    │   │ Market-   │   │  Treasury    │
│ Svc  │   │  Engine   │   │ place Svc │   │  Service     │
└──┬───┘   └────┬─────┘   └─────┬─────┘   └──────┬───────┘
   │            │               │                 │
   ▼            ▼               ▼                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MESSAGE BUS (Redis / NATS)                    │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                BLOCKCHAIN LAYER (Multi-Chain)                    │
│                                                                  │
│  ┌────────────┐  ┌─────────────┐  ┌────────────────────────┐   │
│  │ Protection │  │  Policy     │  │  Staking / Token       │   │
│  │ Agent      │  │  Registry   │  │  Contract              │   │
│  │ Contract   │  │  Contract   │  │                        │   │
│  └────────────┘  └─────────────┘  └────────────────────────┘   │
│                                                                  │
│  ┌────────────┐  ┌─────────────┐  ┌────────────────────────┐   │
│  │ Treasury   │  │  Marketplace│  │  Agent Registry         │   │
│  │ Vault      │  │  Escrow     │  │  Contract              │   │
│  └────────────┘  └─────────────┘  └────────────────────────┘   │
│                                                                  │
│  Ethereum · Polygon · Arbitrum · Optimism · Base · Solana       │
│  BNB Chain · Avalanche                                           │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Принципы архитектуры

1. **Микросервисная архитектура** — каждый домен (Auth, Agents, Marketplace, Treasury) — отдельный сервис
2. **Event-driven** — асинхронная коммуникация через message bus
3. **Multi-chain абстракция** — единый интерфейс для всех поддерживаемых сетей
4. **Policy-first** — ни одна транзакция не исполняется без прохождения Protection Agent
5. **Immutable Audit Trail** — все действия логируются on-chain

---

## 3. Блокчейн и смарт-контракты

### 3.1 Поддерживаемые сети

| Сеть | Тип | Назначение |
|------|-----|-----------|
| Ethereum | L1 | Основной стейкинг $GEBRID, governance |
| Arbitrum | L2 | Основная сеть исполнения агентов (низкие комиссии) |
| Polygon | L2 | Маркетплейс, NFT стратегий |
| Optimism | L2 | Альтернативная среда исполнения |
| Base | L2 | Onboarding новых пользователей |
| Solana | L1 | Высокочастотные стратегии |
| BNB Chain | L1 | DeFi-интеграции |
| Avalanche | L1 | RWA и институциональные workflows |

### 3.2 Контракты — EVM (Solidity)

#### 3.2.1 `GebridToken.sol` — Токен $GEBRID

```
Стандарт: ERC-20 с расширениями
```

| Функциональность | Описание |
|------------------|----------|
| Базовый ERC-20 | transfer, approve, transferFrom |
| ERC-20Votes | Делегирование голосов для governance |
| ERC-20Permit | Gasless approve через подпись (EIP-2612) |
| Mint/Burn | Контролируемая эмиссия через governance |
| Snapshot | Фиксация балансов для голосований |

**Параметры токеномики:**
- Начальный supply определяется при деплое
- Мультисиг-контроль на mint-функцию
- Timelock на критические изменения (48ч)

#### 3.2.2 `GebridStaking.sol` — Стейкинг и тиры

```
Контракт стейкинга с tier-системой доступа
```

| Тир | Стейк $GEBRID | Доступ |
|-----|--------------|--------|
| Explorer | 0 | Базовый доступ, просмотр |
| Operator | 1,000 | Запуск агентов, базовые шаблоны |
| Builder | 5,000 | No-code конструктор, публикация на маркетплейсе |
| Architect | 25,000 | Премиум шаблоны, расширенный API, приоритетное исполнение |
| Sovereign | 100,000 | Governance, white-label, институциональный API |

**Механика:**
- `stake(uint256 amount)` — стейкинг токенов
- `unstake(uint256 amount)` — запрос на вывод (14-дневный cooldown)
- `claimUnstaked()` — получение токенов после cooldown
- `getTier(address user) → Tier` — получение текущего тира
- `onTierChange` — event для обновления доступов во всех сервисах

**Особенности:**
- 14-дневный unstaking cooldown (защита от манипуляций)
- Автоматическое понижение тира при unstake ниже порога
- Staking-бусты для видимости на маркетплейсе
- Snapshot механизм для governance голосований

#### 3.2.3 `ProtectionAgent.sol` — Ядро защиты

```
Обязательный pre-execution layer для КАЖДОЙ транзакции
```

**Pipeline: Decode → Simulate → Score → Decide**

| Этап | Описание | On-chain / Off-chain |
|------|----------|---------------------|
| **Decode** | Парсинг calldata: что авторизуется, кому, сколько | Off-chain (подписывается) |
| **Simulate** | Fork-симуляция в изолированной среде | Off-chain (Tenderly / Foundry) |
| **Score** | Оценка по 7 векторам риска | Off-chain → on-chain attestation |
| **Decide** | BLOCK / WARN / CLEAR | On-chain enforcement |

**7 векторов риска:**

```solidity
struct RiskAssessment {
    uint8 addressBookScore;        // Верификация адреса получателя
    uint8 approvalScopeScore;      // Валидация scope approve
    uint8 dustQuarantineScore;     // Проверка dust-атак
    uint8 routingDeviationScore;   // Анализ отклонений маршрутизации
    uint8 permissionEscalation;    // Детекция эскалации привилегий
    uint8 oracleSensitivity;       // Оценка зависимости от оракулов
    uint8 deepScanScore;           // Глубокий анализ контракта-получателя
    uint256 timestamp;
    bytes signature;               // Подпись оператора ProtectionAgent
}
```

**Контрактные функции:**
- `submitAssessment(bytes32 txHash, RiskAssessment assessment)` — подача оценки
- `getDecision(bytes32 txHash) → Decision` — получение решения (BLOCK/WARN/CLEAR)
- `executeIfCleared(bytes calldata)` — исполнение только при CLEAR
- `emergencyBlock(bytes32 txHash)` — экстренная блокировка (guardian only)
- **Bypass невозможен** — контракт исполнения проверяет attestation перед каждой операцией

#### 3.2.4 `PolicyRegistry.sol` — Реестр политик

```
On-chain реестр правил и политик капитала
```

**Типы политик:**
```solidity
enum PolicyType {
    ALLOCATION_LIMIT,      // Лимиты на аллокацию (макс % в один протокол)
    JURISDICTION_RESTRICT,  // Географические ограничения
    COUNTERPARTY_WHITELIST, // Белый список контрагентов
    TRANSACTION_LIMIT,      // Макс. размер одной транзакции
    DAILY_VOLUME_CAP,       // Дневной лимит объёма
    PROTOCOL_BLACKLIST,     // Запрещённые протоколы
    SLIPPAGE_TOLERANCE,     // Макс. допустимое проскальзывание
    ORACLE_DEVIATION        // Макс. отклонение оракула от медианы
}
```

**Режимы работы:**
```solidity
enum OperationalMode {
    NORMAL,      // Полное исполнение, все агенты активны
    RESTRICTED,  // Сниженные лимиты, ручной review для крупных операций
    CRISIS       // Исполнение остановлено, только guardian-операции
}
```

**Функции:**
- `setPolicy(PolicyType, bytes params)` — установка политики (multisig)
- `getActivePolicy(PolicyType) → Policy` — получение текущей политики
- `setOperationalMode(OperationalMode)` — переключение режима (guardian)
- `validateTransaction(TxParams) → bool` — проверка транзакции против политик
- **0 overrides permitted** — политики нельзя обойти, только изменить через governance

#### 3.2.5 `TreasuryVault.sol` — Казначейство

```
Мультисиг-казначейство с суб-аккаунтами и лимитами
```

**Структура:**
```solidity
struct SubAccount {
    string name;           // "Marketing", "Development", "Operations"
    address[] signers;     // Подписанты суб-аккаунта
    uint256 dailyLimit;    // Дневной лимит
    uint256 spent;         // Потрачено за текущий день
    uint8 requiredSigs;    // Необходимое кол-во подписей
}
```

**Функции:**
- `createSubAccount(SubAccount params)` — создание суб-аккаунта
- `proposeTransaction(uint256 subAccountId, TxParams)` — предложение транзакции
- `approveTransaction(uint256 txId)` — подтверждение подписантом
- `executeTransaction(uint256 txId)` — исполнение (через ProtectionAgent)
- `setDailyLimit(uint256 subAccountId, uint256 limit)` — изменение лимита (governance)

**Интеграции:**
- Все исходящие транзакции проходят через `ProtectionAgent`
- Поддержка ERC-20, нативных токенов
- Oracle-валидация стоимости активов при ребалансировке
- Аудит-лог всех операций (events)

#### 3.2.6 `AgentRegistry.sol` — Реестр агентов

```
On-chain регистрация и lifecycle агентов
```

**Состояния агента:**
```solidity
enum AgentState {
    CREATED,     // Создан, не развёрнут
    DEPLOYED,    // Развёрнут, активен
    PAUSED,      // Приостановлен оператором
    MONITORING,  // Только мониторинг, не торгует
    RETIRED      // Выведен из эксплуатации
}
```

**Функции:**
- `registerAgent(AgentConfig config) → uint256 agentId` — регистрация
- `deployAgent(uint256 agentId)` — активация (проверка тира оператора)
- `pauseAgent(uint256 agentId)` — приостановка
- `retireAgent(uint256 agentId)` — полный вывод
- `getAgentsByOwner(address) → uint256[]` — список агентов владельца
- Role-based permissions: **Operator**, **Agent**, **Admin** — разделены и неизменяемы в runtime

#### 3.2.7 `MarketplaceEscrow.sol` — Эскроу маркетплейса

```
Безопасная торговля стратегиями
```

**Модели монетизации:**
```solidity
enum PricingModel {
    ONE_TIME,        // Разовая покупка
    USAGE_BASED,     // % от комиссий платформы
    SUBSCRIPTION     // Подписка (будущее)
}
```

**Revenue split:**
- Creator: **85%**
- Protocol: **15%**

**Функции:**
- `listTemplate(TemplateConfig config)` — листинг стратегии
- `purchaseTemplate(uint256 templateId)` — покупка (средства в эскроу)
- `claimCreatorRevenue(uint256 templateId)` — вывод заработка автором
- `disputeTemplate(uint256 templateId)` — диспут (governance resolution)

### 3.3 Контракты — Solana (Rust / Anchor)

Для Solana реализуются аналогичные программы:

| Программа | Описание |
|-----------|----------|
| `gebrid_token` | SPL-токен $GEBRID на Solana (обёртка через Wormhole bridge) |
| `gebrid_agent_executor` | Исполнение высокочастотных стратегий |
| `gebrid_protection` | Проверка attestation перед исполнением |

**Особенности Solana-реализации:**
- Account model вместо storage model
- Параллельное исполнение транзакций (Sealevel)
- Использование Anchor framework для безопасности
- Cross-program invocation (CPI) для composability

### 3.4 Cross-chain инфраструктура

| Компонент | Технология | Назначение |
|-----------|-----------|-----------|
| Token Bridge | LayerZero / Wormhole | Перенос $GEBRID между сетями |
| Message Passing | LayerZero / Hyperlane | Кросс-чейн команды агентам |
| Liquidity Routing | DEX aggregators (1inch, Jupiter) | Оптимальное исполнение свопов |
| Oracle | Chainlink / Pyth | Ценовые данные, валидация |

---

## 4. Бэкенд

### 4.1 Архитектура микросервисов

```
┌──────────────────────────────────────────────────────┐
│                   API Gateway                         │
│            (Kong / Express Gateway)                   │
│   Rate limiting · JWT validation · Request routing    │
└───────┬──────┬──────┬──────┬──────┬──────┬──────────┘
        │      │      │      │      │      │
        ▼      ▼      ▼      ▼      ▼      ▼
    ┌──────┐┌──────┐┌──────┐┌──────┐┌──────┐┌──────┐
    │Auth  ││Agent ││Market││Treas.││Risk  ││Notif.│
    │Svc   ││Engine││Svc   ││Svc   ││Engine││Svc   │
    └──┬───┘└──┬───┘└──┬───┘└──┬───┘└──┬───┘└──┬───┘
       │       │       │       │       │       │
       ▼       ▼       ▼       ▼       ▼       ▼
    ┌──────────────────────────────────────────────┐
    │           Shared Infrastructure               │
    │  PostgreSQL · Redis · NATS · S3 · ClickHouse │
    └──────────────────────────────────────────────┘
```

### 4.2 Сервисы — детализация

#### 4.2.1 Auth Service

**Стек:** Node.js / TypeScript + Express

**Функции:**
- SIWE (Sign-In with Ethereum) — аутентификация кошельком
- JWT токены (access + refresh)
- Проверка тира стейкинга (вызов `GebridStaking.getTier()`)
- Role-based access control (RBAC)
- Session management
- Multi-wallet support (EVM + Solana)

**Endpoints:**
```
POST   /auth/nonce              — Запрос nonce для SIWE
POST   /auth/verify             — Верификация подписи, выдача JWT
POST   /auth/refresh            — Обновление access token
DELETE /auth/session             — Выход
GET    /auth/me                  — Профиль + текущий тир
POST   /auth/link-wallet         — Привязка дополнительного кошелька
```

**Модели данных:**
```typescript
interface User {
  id: string;                    // UUID
  primaryWallet: string;          // 0x... или Solana pubkey
  linkedWallets: WalletLink[];    // Дополнительные кошельки
  tier: StakingTier;             // Текущий тир (кешируется, обновляется по event)
  roles: Role[];                 // OPERATOR | BUILDER | ADMIN
  createdAt: Date;
  lastLogin: Date;
}
```

#### 4.2.2 Agent Engine Service

**Стек:** Python 3.12 + FastAPI (или Go для performance-critical paths)

**Это ядро платформы** — управление жизненным циклом AI-агентов.

**Функции:**
- CRUD агентов (создание, конфигурация, деплой, мониторинг, вывод)
- Оркестрация agent swarms (группы агентов, работающие согласованно)
- Scheduling задач агентов (cron-like + event-driven)
- Real-time мониторинг: execution traces, anomaly detection
- Integration с ProtectionAgent (каждый вызов проходит проверку)

**Типы агентов:**
```python
class AgentType(Enum):
    SIGNAL = "signal"           # Генерация торговых сигналов
    EXECUTOR = "executor"       # Исполнение стратегий
    RISK = "risk"               # Мониторинг рисков
    GUARDIAN = "guardian"        # Защита капитала (Protection Agent)
    REBALANCER = "rebalancer"   # Ребалансировка портфеля
    SCOUT = "scout"             # Поиск yield-возможностей
    RWA_SOURCER = "rwa_sourcer" # Sourcing реальных активов
```

**Endpoints:**
```
POST   /agents                   — Создание агента
GET    /agents                   — Список агентов пользователя
GET    /agents/:id               — Детали агента
PUT    /agents/:id/config        — Обновление конфигурации
POST   /agents/:id/deploy        — Деплой (активация)
POST   /agents/:id/pause         — Приостановка
POST   /agents/:id/retire        — Вывод из эксплуатации
GET    /agents/:id/logs          — Логи исполнения
GET    /agents/:id/metrics       — Метрики (P&L, trades, uptime)
POST   /agents/:id/simulate      — Тестовый прогон без реального исполнения

# Swarm endpoints
POST   /swarms                   — Создание роя
POST   /swarms/:id/agents        — Добавление агента в рой
GET    /swarms/:id/status        — Статус роя
```

**Lifecycle Flow:**
```
CREATE → CONFIGURE → [SIMULATE] → DEPLOY → MONITOR → [PAUSE] → RETIRE
                                      │
                                      ├── Anomaly detected → AUTO-PAUSE
                                      └── Policy violation → BLOCKED
```

#### 4.2.3 Protection Agent Service

**Стек:** Rust (для скорости) или Go

**Самый критичный сервис** — нулевая толерантность к ошибкам.

**Pipeline:**
```
Transaction Intent
       │
       ▼
┌──────────────┐
│   DECODE     │  Парсинг calldata: функция, параметры, получатель
│              │  ABI decode, 4byte signature lookup
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  SIMULATE    │  Fork текущего state, симуляция транзакции
│              │  Tenderly Simulation API / Foundry anvil fork
│              │  Проверка: balance changes, token approvals, state changes
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   SCORE      │  Оценка 7 векторов риска (0-100 каждый)
│              │  Агрегация в composite risk score
│              │  ML-модель для anomaly detection
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  DECIDE      │  Score < 30 → CLEAR (зелёный)
│              │  Score 30-70 → WARN (жёлтый, требует confirm)
│              │  Score > 70 → BLOCK (красный, отклонено)
└──────────────┘
```

**Данные для scoring:**
- Address reputation database (on-chain history, labels)
- Contract verification status (verified source, audit reports)
- Historical transaction patterns (нормальное поведение пользователя)
- Oracle price feeds (для детекции манипуляций)
- Known exploit patterns database

#### 4.2.4 Marketplace Service

**Стек:** Node.js / TypeScript + NestJS

**Функции:**
- Каталог стратегий (шаблонов) с поиском и фильтрацией
- Верификация и аудит стратегий перед листингом
- Система рейтингов и отзывов
- Revenue tracking и распределение (85/15)
- Staking-boosted discovery (высокий стейк = выше в рейтинге)

**Endpoints:**
```
GET    /marketplace/templates           — Каталог шаблонов
GET    /marketplace/templates/:id       — Детали шаблона
POST   /marketplace/templates           — Публикация шаблона (Builder+)
PUT    /marketplace/templates/:id       — Обновление
GET    /marketplace/templates/:id/stats — Статистика использования
POST   /marketplace/templates/:id/buy   — Покупка
GET    /marketplace/my/templates        — Мои шаблоны (как автор)
GET    /marketplace/my/purchases        — Мои покупки
GET    /marketplace/revenue             — Мой заработок
```

**Модель шаблона:**
```typescript
interface StrategyTemplate {
  id: string;
  creator: string;                   // wallet address
  name: string;
  description: string;
  category: TemplateCategory;        // YIELD | ARBITRAGE | HEDGING | RWA | TREASURY
  agentTypes: AgentType[];           // Какие типы агентов используются
  chains: Chain[];                   // Поддерживаемые сети
  pricingModel: PricingModel;        // ONE_TIME | USAGE_BASED
  price: BigNumber;                  // В $GEBRID
  minTier: StakingTier;             // Минимальный тир для покупки
  verified: boolean;                 // Прошёл аудит платформы
  stats: {
    users: number;
    totalVolume: BigNumber;
    avgReturn: number;               // Информационно, не гарантия
    rating: number;                  // 1-5 звёзд
  };
  config: AgentSwarmConfig;          // Конфигурация роя агентов
  createdAt: Date;
}
```

#### 4.2.5 Treasury Service

**Стек:** Node.js / TypeScript + NestJS

**Функции:**
- Управление мультисиг-казначейством
- Суб-аккаунты с отдельными лимитами
- Пропозалы транзакций и их approval flow
- Portfolio tracking (multi-chain, multi-asset)
- Автоматическая ребалансировка через агентов
- Отчёты и аудит-логи

**Endpoints:**
```
POST   /treasury/vaults                      — Создание казначейства
GET    /treasury/vaults/:id                  — Детали
GET    /treasury/vaults/:id/balance          — Баланс (multi-chain aggregated)
POST   /treasury/vaults/:id/sub-accounts     — Создание суб-аккаунта
POST   /treasury/vaults/:id/propose          — Предложение транзакции
POST   /treasury/proposals/:id/approve       — Одобрение
POST   /treasury/proposals/:id/execute       — Исполнение
GET    /treasury/vaults/:id/history          — История операций
GET    /treasury/vaults/:id/report           — Отчёт за период
```

#### 4.2.6 Risk Engine Service

**Стек:** Python 3.12 + FastAPI

**Функции:**
- Мониторинг всех позиций в реальном времени
- Расчёт risk metrics (VaR, Sharpe, drawdown, exposure)
- Автоматическое переключение режимов (NORMAL → RESTRICTED → CRISIS)
- Алерты при превышении порогов
- Integration с Protection Agent для принятия решений

**Endpoints:**
```
GET    /risk/dashboard                  — Сводка по всем позициям
GET    /risk/portfolio/:id/metrics      — Risk metrics портфеля
POST   /risk/mode                       — Переключение режима (guardian)
GET    /risk/alerts                     — Активные алерты
POST   /risk/simulate-scenario          — What-if анализ
```

**Режимы работы:**

| Режим | Поведение |
|-------|-----------|
| **NORMAL** | Все агенты активны, стандартные лимиты |
| **RESTRICTED** | Сниженные лимиты, high-risk маршруты отключены, manual review для крупных операций |
| **CRISIS** | Исполнение остановлено, только guardian-операции (вывод в stablecoin, emergency exit) |

#### 4.2.7 Notification Service

**Стек:** Node.js + Bull Queue

**Каналы:**
- WebSocket (real-time в dashboard)
- Telegram Bot
- Discord Webhook
- Email (SendGrid)
- Push (для мобильного приложения в будущем)

**События:**
- Agent state changes (deployed, paused, error)
- Protection Agent alerts (WARN, BLOCK)
- Risk mode changes
- Transaction execution results
- Tier changes (staking events)
- Marketplace sales / purchases

### 4.3 Базы данных

| БД | Назначение | Данные |
|----|-----------|--------|
| **PostgreSQL** | Основное хранилище | Users, Agents, Templates, Proposals, Settings |
| **Redis** | Кеш + очереди | Sessions, tier cache, rate limiting, pub/sub |
| **ClickHouse** | Аналитика | Trade logs, agent metrics, P&L history, time-series |
| **S3 / MinIO** | Object storage | Agent configs, strategy bundles, audit reports |
| **NATS** | Message bus | Inter-service communication, event streaming |

### 4.4 Indexing & Data Pipeline

```
Blockchain Events
       │
       ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Indexer     │────▶│  Event       │────▶│  ClickHouse  │
│  (Goldsky/  │     │  Processor   │     │  (Analytics) │
│   The Graph) │     │  (Worker)    │     │              │
└──────────────┘     └──────┬───────┘     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  PostgreSQL  │
                     │  (Sync state)│
                     └──────────────┘
```

- **The Graph / Goldsky** — индексация on-chain событий (стейкинг, governance, agent registry)
- **Custom indexer** — обработка Protection Agent attestations
- **ClickHouse** — агрегированная аналитика для dashboard

---

## 5. Фронтенд

### 5.1 Стек технологий

| Технология | Назначение |
|-----------|-----------|
| **Next.js 14+ (App Router)** | Фреймворк, SSR, роутинг |
| **TypeScript** | Типизация |
| **Tailwind CSS** | Стилизация |
| **Framer Motion** | Анимации |
| **wagmi + viem** | EVM wallet interaction |
| **@solana/wallet-adapter** | Solana wallet interaction |
| **TanStack Query** | Server state management |
| **Zustand** | Client state management |
| **Recharts / Lightweight Charts** | Графики и чарты |
| **React Flow** | No-code конструктор (drag-and-drop) |

### 5.2 Дизайн-система

**На основе лендинга:**

| Элемент | Значение |
|---------|----------|
| Primary | `#A3FF12` (neon yellow-green) |
| CTA | `#8DFF00` (bright neon green) |
| Danger / Crisis | `#FF3B3B` |
| Success / Profit | `#00C853` |
| Warning | `#FF9F0A` |
| Info / Cyan | `#00E5FF` |
| Accent Pink | `#FF3388` |
| Gold | `#F6C453` |
| Background | `#000000` → `#0B0F14` → `#111827` |
| Surface | `rgba(255,255,255,0.03)` с blur |
| Border | `rgba(255,255,255,0.06)` |
| Font Display | **Syne** (600–800) |
| Font Body | **IBM Plex Sans** (300–700) |
| Font Mono | **Space Mono** |

**UI-паттерны:**
- Glassmorphism panels (backdrop-blur + полупрозрачность)
- Neon glow borders (animated gradient)
- Dark-first design
- Floating animations на ключевых элементах
- Scroll-reveal анимации

### 5.3 Страницы и разделы

#### 5.3.1 Dashboard (`/dashboard`)

```
┌────────────────────────────────────────────────────────┐
│  GEBRID OS          [Search]    [Alerts 🔔]  [Wallet] │
├────────┬───────────────────────────────────────────────┤
│        │                                               │
│  Nav   │  ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│        │  │Total TVL │ │Active   │ │Risk     │        │
│  Dash  │  │$1.2M     │ │Agents: 7│ │Mode:    │        │
│  Agents│  │          │ │         │ │NORMAL ●│        │
│  Market│  └─────────┘ └─────────┘ └─────────┘        │
│  Treas │                                               │
│  Risk  │  ┌────────────────────────────────────┐      │
│  Build │  │      Portfolio Performance          │      │
│  Setti │  │      [Chart — 24h / 7d / 30d]      │      │
│        │  └────────────────────────────────────┘      │
│        │                                               │
│        │  ┌──────────────────┐ ┌─────────────────┐    │
│        │  │ Active Agents    │ │ Recent Activity  │    │
│        │  │ • Yield Scout ● │ │ • Swap executed  │    │
│        │  │ • Rebalancer  ● │ │ • Policy CLEARED │    │
│        │  │ • Scout       ● │ │ • Agent deployed │    │
│        │  └──────────────────┘ └─────────────────────┘│
└────────┴───────────────────────────────────────────────┘
```

**Компоненты:**
- Portfolio summary (total value, P&L, allocation pie chart)
- Active agents list с статусами (зелёный/жёлтый/красный)
- Risk mode indicator (NORMAL/RESTRICTED/CRISIS)
- Recent activity feed (real-time через WebSocket)
- Performance chart (multi-timeframe)
- Quick actions (deploy agent, create proposal, switch risk mode)

#### 5.3.2 Agent Management (`/agents`)

**Список агентов:**
- Карточки агентов с статусом, P&L, uptime
- Фильтрация по типу, статусу, сети
- Bulk actions (pause all, update config)

**Детали агента (`/agents/:id`):**
- Real-time execution trace (какие транзакции отправляет)
- Performance metrics (P&L, trades, win rate)
- Configuration panel
- Protection Agent log (все проверки транзакций)
- Controls (pause, resume, retire, update params)

#### 5.3.3 GEBRID Hive — No-Code Builder (`/builder`)

```
┌────────────────────────────────────────────────────────┐
│  GEBRID Hive — Strategy Builder                        │
├────────┬───────────────────────────────────────────────┤
│        │                                               │
│ Blocks │  ┌─────────────────────────────────────┐     │
│        │  │                                     │     │
│ Signal │  │    ┌──────┐    ┌──────┐             │     │
│ Filter │  │    │Signal│───▶│Filter│──┐          │     │
│ Execute│  │    └──────┘    └──────┘  │          │     │
│ Risk   │  │                          ▼          │     │
│ Output │  │              ┌──────────────┐       │     │
│        │  │              │  Risk Check  │       │     │
│ ────── │  │              └──────┬───────┘       │     │
│ Templs │  │                     │               │     │
│        │  │              ┌──────▼───────┐       │     │
│ 50+    │  │              │   Execute    │       │     │
│ ready  │  │              └──────────────┘       │     │
│        │  │                                     │     │
│        │  │          [React Flow Canvas]        │     │
│        │  └─────────────────────────────────────┘     │
│        │                                               │
│        │  [Save Draft]  [Test Run]  [Deploy]          │
└────────┴───────────────────────────────────────────────┘
```

**Технология:** React Flow (drag-and-drop)

**Блоки:**
- **Signal** — источник данных (price feed, on-chain event, time trigger)
- **Filter** — условия (if price > X, if APY > Y)
- **Risk Check** — проверка через Risk Engine
- **Execute** — действие (swap, provide liquidity, bridge, transfer)
- **Output** — результат (log, notify, store)
- **Subswarm** — вложенный рой агентов

**Функции:**
- 50+ готовых шаблонов (drag from library)
- Real-time validation конфигурации
- Dry-run симуляция (без реальных транзакций)
- Сохранение как шаблон → публикация на маркетплейсе

#### 5.3.4 Marketplace (`/marketplace`)

- Каталог стратегий с карточками
- Фильтрация: категория, сеть, цена, рейтинг, тир доступа
- Страница стратегии: описание, автор, статистика, отзывы
- Кнопка покупки → оплата $GEBRID через смарт-контракт
- Мои покупки / Мои листинги
- Revenue dashboard для авторов

#### 5.3.5 Treasury (`/treasury`)

- Overview всех vault'ов
- Детали vault'а: баланс по активам, суб-аккаунты
- Proposal flow: создание → approvals → execution
- История транзакций с аудит-логом
- Автоматическая ребалансировка (настройка через агента)

#### 5.3.6 Risk Engine (`/risk`)

- Dashboard: текущий режим, активные алерты
- Portfolio risk metrics (визуализация exposure, concentration)
- Policy configuration (для Architect+ тиров)
- Scenario simulator (what-if analysis)
- Protection Agent log: все проверки, решения, блокировки

#### 5.3.7 Settings (`/settings`)

- Профиль и привязанные кошельки
- Стейкинг: stake/unstake $GEBRID, текущий тир
- Нотификации: каналы, пороги
- API keys (для Architect+ тиров)
- Тема интерфейса (dark by default)

### 5.4 Real-time коммуникация

| Канал | Технология | Данные |
|-------|-----------|--------|
| Agent Status | WebSocket | State changes, execution logs |
| Portfolio | WebSocket | Balance updates, P&L |
| Protection Agent | WebSocket | Risk scores, decisions |
| Alerts | WebSocket + Push | Critical events |
| Marketplace | SSE | New listings, sales |

---

## 6. AI / Agent Engine

### 6.1 Архитектура агентов

```
┌─────────────────────────────────────────────┐
│              Agent Orchestrator               │
│                                               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐     │
│  │ Signal  │  │ Risk    │  │Guardian │     │
│  │ Agents  │  │ Agents  │  │ Agents  │     │
│  └────┬────┘  └────┬────┘  └────┬────┘     │
│       │            │            │            │
│       ▼            ▼            ▼            │
│  ┌─────────────────────────────────────┐    │
│  │         Execution Layer              │    │
│  │  (Transaction building + signing)    │    │
│  └──────────────┬──────────────────────┘    │
│                 │                             │
│                 ▼                             │
│  ┌─────────────────────────────────────┐    │
│  │       Protection Agent Gate          │    │
│  │  Decode → Simulate → Score → Decide  │    │
│  └──────────────┬──────────────────────┘    │
│                 │ CLEAR only                 │
│                 ▼                             │
│  ┌─────────────────────────────────────┐    │
│  │       Blockchain Submission          │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### 6.2 AI-модели и задачи

| Задача | Модель / Подход | Описание |
|--------|----------------|----------|
| Торговые сигналы | LLM (Claude / GPT) + on-chain data | Анализ рыночных данных, генерация сигналов |
| Anomaly Detection | Custom ML (Isolation Forest, Autoencoders) | Обнаружение аномалий в транзакциях |
| Risk Scoring | Gradient Boosted Trees (XGBoost) | Composite risk score для Protection Agent |
| Strategy Optimization | Reinforcement Learning | Оптимизация параметров стратегий |
| RWA Sourcing | RAG (LLM + vector DB) | Поиск и скрининг реальных активов |
| NLP Signals | Fine-tuned LLM | Анализ новостей, social sentiment |

### 6.3 Agent SDK

Платформа предоставляет SDK для создания custom-агентов:

```typescript
// Пример: создание Yield Scout агента
import { GebridAgent, SignalSource, ExecutionAction } from '@gebrid/agent-sdk';

const yieldScout = new GebridAgent({
  name: 'Yield Scout Alpha',
  type: 'scout',
  chains: ['arbitrum', 'optimism', 'base'],
  
  signals: [
    SignalSource.defiYieldFeeds(),
    SignalSource.oraclePrice(['ETH', 'USDC']),
  ],
  
  strategy: async (context) => {
    const opportunities = await context.scanYieldPools();
    const best = opportunities
      .filter(p => p.apy > context.config.minApy)
      .filter(p => p.tvl > context.config.minTvl)
      .sort((a, b) => b.riskAdjustedApy - a.riskAdjustedApy);
    
    if (best.length > 0) {
      return ExecutionAction.rebalance({
        target: best[0],
        amount: context.config.allocationSize,
      });
    }
  },
  
  riskParams: {
    maxSlippage: 0.5,        // 0.5%
    maxAllocation: 25,       // 25% в один пул
    stopLoss: 5,             // 5% stop loss
  }
});
```

---

## 7. Безопасность

### 7.1 Smart Contract Security

| Мера | Описание |
|------|----------|
| **Аудит** | Минимум 2 независимых аудита (Trail of Bits, OpenZeppelin, Spearbit) |
| **Formal Verification** | Для ProtectionAgent и TreasuryVault |
| **Bug Bounty** | Immunefi программа (до $500K) |
| **Upgradability** | Proxy pattern (UUPS) с timelock (48ч) и multisig |
| **Access Control** | OpenZeppelin AccessControl с разделением ролей |
| **Reentrancy** | ReentrancyGuard на всех external calls |
| **Oracle Manipulation** | TWAP + multi-oracle fallback |
| **Fuzzing** | Foundry fuzzing + Echidna property-based testing |

### 7.2 Backend Security

| Мера | Описание |
|------|----------|
| **Auth** | SIWE + JWT (short-lived access, long-lived refresh) |
| **Rate Limiting** | Per-IP и per-user + tier-based limits |
| **Input Validation** | Zod schemas на всех endpoints |
| **SQL Injection** | Parameterized queries only (ORM: Prisma / Drizzle) |
| **Secrets** | HashiCorp Vault / AWS Secrets Manager |
| **Private Keys** | HSM (AWS CloudHSM) для signing агентов |
| **DDoS** | CloudFlare + WAF |
| **Monitoring** | Datadog / Grafana + PagerDuty для алертов |

### 7.3 Frontend Security

| Мера | Описание |
|------|----------|
| **CSP** | Строгая Content Security Policy |
| **XSS** | React escaping + DOMPurify для user content |
| **CSRF** | SameSite cookies + CSRF tokens |
| **Wallet Security** | Никогда не хранить private keys, только wallet connect |
| **Transaction Preview** | Показ decoded calldata перед подписанием |

---

## 8. Инфраструктура и DevOps

### 8.1 Инфраструктура

```
┌─────────────────────────────────────────────────────┐
│                    CloudFlare CDN                     │
│                  (DDoS + WAF + Edge)                  │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│              Kubernetes Cluster (EKS/GKE)            │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ Frontend │  │  API GW  │  │ Services │           │
│  │ (Vercel) │  │  (Kong)  │  │ (pods)   │           │
│  └──────────┘  └──────────┘  └──────────┘           │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │PostgreSQL│  │  Redis   │  │ClickHouse│           │
│  │ (RDS)    │  │(Elastic) │  │ (managed)│           │
│  └──────────┘  └──────────┘  └──────────┘           │
│                                                       │
│  ┌──────────┐  ┌──────────┐                          │
│  │  NATS    │  │  S3      │                          │
│  └──────────┘  └──────────┘                          │
└─────────────────────────────────────────────────────┘
```

### 8.2 CI/CD Pipeline

```
GitHub PR → Lint + Type Check → Unit Tests → Integration Tests
    → Contract Tests (Foundry) → Security Scan (Slither)
    → Build → Deploy to Staging → E2E Tests
    → Manual Approval → Deploy to Production
```

### 8.3 Мониторинг

| Инструмент | Назначение |
|-----------|-----------|
| **Grafana + Prometheus** | Метрики сервисов |
| **Datadog APM** | Distributed tracing |
| **Sentry** | Error tracking (frontend + backend) |
| **PagerDuty** | On-call алерты |
| **Forta** | On-chain мониторинг (anomaly detection) |
| **Tenderly** | Мониторинг smart contracts |

### 8.4 Environments

| Env | Назначение |
|-----|-----------|
| **local** | Docker Compose с Anvil (local EVM fork) |
| **testnet** | Sepolia + Mumbai + Arbitrum Goerli |
| **staging** | Mainnet fork + limited real execution |
| **production** | Full mainnet deployment |

---

## 9. Этапы разработки

### Phase 0 — Foundation (6-8 недель)

| Задача | Описание |
|--------|----------|
| Монорепо | Turborepo с packages: contracts, backend, frontend, sdk |
| Smart Contracts v1 | GebridToken, GebridStaking, AgentRegistry |
| Auth Service | SIWE + JWT + tier checking |
| Frontend Shell | Next.js + дизайн-система + wallet connect |
| DevOps | Docker, CI/CD, testnet deploy |

**Deliverable:** Можно подключить кошелёк, застейкать токены, увидеть dashboard-скелет.

### Phase 1 — MVP Core (8-12 недель)

| Задача | Описание |
|--------|----------|
| Agent Engine v1 | CRUD агентов, базовые типы (Signal, Executor) |
| Protection Agent v1 | Decode + Simulate + Score pipeline |
| Policy Registry v1 | Базовые политики (limits, whitelist) |
| Dashboard | Portfolio view, agent list, activity feed |
| Agent Detail Page | Metrics, logs, controls |
| Risk Engine v1 | Basic risk metrics, manual mode switch |
| WebSocket | Real-time updates |

**Deliverable:** Можно создать агента, он торгует, Protection Agent проверяет каждую транзакцию.

**KPI:** 500 агентов, $10M capital under management, 0 critical exploits.

### Phase 2 — Marketplace & Builder (8-10 недель)

| Задача | Описание |
|--------|----------|
| Marketplace Escrow | Smart contract + UI |
| Marketplace Service | Каталог, покупка, revenue |
| GEBRID Hive | No-code builder (React Flow) |
| 50+ Templates | Yield, arbitrage, hedging, RWA, treasury |
| Agent Orchestrator v2 | Swarms, multi-agent coordination |
| Treasury Vault | Smart contract + multisig UI |
| Agent SDK | TypeScript SDK для разработчиков |

**Deliverable:** Полноценный маркетплейс, no-code конструктор, мультисиг-казначейство.

**KPI:** 5,000 операторов, 200+ шаблонов, $100M TVL.

### Phase 3 — Institutional & RWA (10-12 недель)

| Задача | Описание |
|--------|----------|
| RWA Agents | Deal sourcing, screening, monitoring |
| Institutional API | Role-scoped access, rate controls, SLA |
| White-label | Branded operator environments |
| Advanced Risk Engine | ML-powered anomaly detection, scenario analysis |
| Multi-chain v2 | Solana integration, cross-chain routing |
| Governance | On-chain voting, proposal system |

**Deliverable:** Институциональные клиенты, RWA workflow, governance.

**KPI:** 10 институциональных клиентов, $1B assets in RWA workflows.

### Phase 4 — Scale (ongoing)

| Задача | Описание |
|--------|----------|
| AI Treasury Cards | On-chain execution через карты |
| DePC Talent Launchpad | Forge → Arena → Launchpad pipeline |
| Cross-chain Routing v3 | Autonomous rebalancing |
| Mobile App | React Native |
| Global Operator Network | 50K+ operators |

**KPI:** $10B cumulative capital, 50K operators, 100+ partnerships.

---

## 10. Стек технологий (итого)

### Frontend
| Категория | Технология |
|-----------|-----------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Animation | Framer Motion |
| State (server) | TanStack Query (React Query) |
| State (client) | Zustand |
| Web3 (EVM) | wagmi v2 + viem |
| Web3 (Solana) | @solana/wallet-adapter |
| Charts | Recharts + TradingView Lightweight Charts |
| No-code Builder | React Flow |
| Forms | React Hook Form + Zod |
| Testing | Vitest + Playwright |

### Backend
| Категория | Технология |
|-----------|-----------|
| Auth Service | Node.js + TypeScript + Express |
| Agent Engine | Python 3.12 + FastAPI |
| Protection Agent | Rust или Go |
| Marketplace Service | Node.js + TypeScript + NestJS |
| Treasury Service | Node.js + TypeScript + NestJS |
| Risk Engine | Python 3.12 + FastAPI |
| Notification | Node.js + Bull Queue |
| ORM | Prisma (Node) / SQLAlchemy (Python) |
| Validation | Zod (Node) / Pydantic (Python) |
| API | REST + WebSocket + GraphQL (optional) |

### Blockchain
| Категория | Технология |
|-----------|-----------|
| EVM Contracts | Solidity 0.8.x |
| Solana Programs | Rust + Anchor |
| Testing | Foundry (forge test + fuzz) |
| Deployment | Hardhat / Foundry (EVM) + Anchor (Solana) |
| Audit Tools | Slither, Mythril, Echidna |
| Indexing | The Graph / Goldsky |
| Oracle | Chainlink + Pyth |
| Bridge | LayerZero + Wormhole |
| Simulation | Tenderly + Anvil |

### Infrastructure
| Категория | Технология |
|-----------|-----------|
| Container Orchestration | Kubernetes (EKS / GKE) |
| CI/CD | GitHub Actions |
| CDN / WAF | CloudFlare |
| Frontend Hosting | Vercel |
| Database | PostgreSQL (RDS) |
| Cache | Redis (ElastiCache) |
| Analytics DB | ClickHouse |
| Message Bus | NATS |
| Object Storage | S3 |
| Secrets | HashiCorp Vault |
| HSM | AWS CloudHSM |
| Monitoring | Grafana + Prometheus + Datadog |
| Error Tracking | Sentry |
| Alerting | PagerDuty |
| On-chain Monitoring | Forta + Tenderly |

---

## Приложение A: Диаграмма данных (ER)

```
User ─────────┐
  │            │
  ├─ Wallet[]  │
  ├─ Tier      │
  │            │
  ▼            │
Agent ─────────┤
  │            │
  ├─ Config    │
  ├─ State     │
  ├─ Metrics   │
  │            │
  ▼            │
Swarm ─────────┤
  │            │
  ├─ Agent[]   │
  │            │
  ▼            │
Template ──────┤
  │            │
  ├─ Creator   │
  ├─ Pricing   │
  ├─ Stats     │
  │            │
  ▼            │
Transaction ───┤
  │            │
  ├─ RiskScore │
  ├─ Decision  │
  │            │
  ▼            │
Vault ─────────┘
  │
  ├─ SubAccount[]
  ├─ Proposal[]
  └─ AuditLog[]
```

---

## Приложение B: API Rate Limits

| Тир | Requests/min | WebSocket connections | Agent slots |
|-----|-------------|----------------------|-------------|
| Explorer | 30 | 1 | 0 |
| Operator | 120 | 3 | 5 |
| Builder | 300 | 10 | 20 |
| Architect | 600 | 25 | 50 |
| Sovereign | 1200 | 100 | Unlimited |
| Institutional API | Custom SLA | Custom | Custom |

---

*Конец технического задания GEBRID OS v1.0*
