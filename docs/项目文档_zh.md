# ArkAgent 项目文档

**ArkAgent** 是一个全栈平台，致力于让用户能够“雇佣”自主 AI 代理（Agent），而不是单纯使用另一个应用软件。这些 AI 代理运行在专属的虚拟机上，全天候为您处理销售、客户支持、招聘、写作等事务。
您可以像管理真实员工一样去指派代理（赋予角色、指令和规则），选择它们工作的渠道平台，并可以通过 Web 控制台或您现有的即时通讯软件（Telegram / WhatsApp / WeChat / LINE / Slack / Email）来管理它们。

## 一、 双引擎架构

每个 AI 代理都由两种开源的 Agent 运行时引擎之一驱动，并且通过一个统一的控制面进行集成：

- **OpenClaw**（开放式运行时）：拥有插件和技能系统（100+项技能），支持本地执行（Shell / 文件系统 / 浏览器 / Docker），并包含跨 12+ 种渠道的心跳调度。适用于外联、客服等重渠道交互的角色。
- **Hermes** (Nous Research)：模型无关的 LLM 供应商，拥有自我优化的学习循环（代理可自行整理记忆、自主创建技能）。适用于法律、金融、研究以及长周期的“一人公司”运营。

> **注**：ArkAgent 本身充当的是**控制面（Control Plane）**。它负责处理用户身份、工作空间、代理记录、计费系统以及操作界面。它**不直接运行**代理，而是通过 HTTP API 调用独立的 **Agent Manager（代理管理器）** 服务来为每个代理分配虚拟机、部署引擎、监控状态并桥接渠道。

## 二、 技术栈

- **框架**：Next.js 16 (App Router, Turbopack, React Compiler)
- **前端 UI**：React 19 + TypeScript 5 (Strict)
- **数据库**：Postgres + Drizzle ORM (`postgres-js`)，通过 `drizzle-kit` 进行迁移管理
- **认证**：自定义邮箱密码认证 + HTTP-only 会话 Cookie（采用 `node:crypto` scrypt；数据库仅存储 Token 的 SHA-256 哈希值）
- **数据验证**：每个请求边界统一使用 Zod 4
- **样式**：内联样式的设计系统 —— "Terminal Lime" 主题，支持响应式以及深/浅色模式
- **国际化**：支持英文、简体中文、繁体中文，跟随用户配置持久化
- **部署**：Vercel

## 三、 核心功能与模块

1. **用户认证**：真实邮箱注册 / 邮箱或用户名登录 / 登出 / Session 管理。
2. **雇佣向导**：选择角色 → 撰写工作简报（支持 AI 自动生成） → 选择引擎和渠道 → 审查并**启动**（通过 Agent Manager 配置代理）。
3. **仪表盘 (Dashboard)**：团队花名册、实时活动流、额度使用情况、待办审查数量。
4. **代理详情页面**：活动记录、任务列表、**聊天界面**、性能评估以及自我审查（可批准/驳回）、设置选项。
5. **设置项**：行为配置、自主度与审批设置、工作时间表、模型选择、OpenClaw 工具/技能、Hermes 学习循环、知识与记忆配置、通知以及消费上限等。
6. **生命周期管理**：支持暂停、恢复和终止（解雇）代理。
7. **渠道接入**：接入 Telegram / WhatsApp / WeChat / LINE / Slack / 邮件（读取时会脱敏敏感凭证）。
8. **计费系统**：积分额度、基于单个代理的使用量计费、发票管理；支持选择套餐周期并模拟通过 Stripe/Alipay 支付。
9. **多语言与主题**：多语言及深浅主题，与用户档案绑定。

---

## 四、 接口 API 功能大全

ArkAgent 的接口主要位于 `/api` 目录下，并以 REST API 的形式提供服务。所有认证均基于 **Cookie (`ark_session`)**。大部分业务接口都有工作空间（Workspace）的权限隔离。

### 1. 认证相关 (Authentication)
*负责处理用户的注册、登录、登出和会话状态。*

- `POST /api/auth/register`：**用户注册**
  - 创建新用户、分配拥有的工作空间，并开启 Session（下发 Cookie）。
- `POST /api/auth/login`：**用户登录**
  - 验证凭证并下发会话 Cookie。
- `POST /api/auth/logout`：**用户登出**
  - 清除当前会话。
- `GET /api/auth/me`：**获取当前用户**
  - 返回已登录的用户信息及其拥有的工作空间信息。

### 2. 账户设置 (Account)
- `PATCH /api/me/preferences`：**更新偏好设置**
  - 修改当前用户的语言偏好 (`locale`) 或显示名称 (`name`)。

### 3. 系统参考数据 (Catalog)
- `GET /api/roles`：**获取角色列表**
  - 获取系统中所有可供雇佣的 AI 代理角色列表。
- `GET /api/plans`：**获取计费套餐列表**
  - 获取所有可用的计费订阅套餐详情。

### 4. AI 代理管理 (Agents)
*处理代理的雇佣、配置、对话、任务和生命周期控制。*

- `GET /api/agents`：**获取代理列表**
  - 查询当前工作空间下所有的代理（摘要信息）。
- `POST /api/agents`：**雇佣/创建代理**
  - 插入代理数据并调用外部 Agent Manager 开始初始化部署虚拟机。
- `GET /api/agents/{id}`：**获取代理详情**
  - 返回代理的完整详情，包含任务列表、活动流、性能指标和待审查的改进建议。
- `PATCH /api/agents/{id}`：**更新代理配置**
  - 修改代理的指令、规则、计费层级或绑定的通信渠道，并同步给 Agent Manager。
- `DELETE /api/agents/{id}`：**终止/解雇代理**
  - 将代理状态标记为 `terminated`（等同于生命周期中的 terminate 操作）。
- `POST /api/agents/{id}/lifecycle`：**生命周期控制**
  - 对代理执行 `pause`（暂停）、`resume`（恢复）或 `terminate`（终止）操作。
- `GET /api/agents/{id}/messages`：**获取对话记录**
  - 获取代理最近一次对话的聊天消息列表。
- `POST /api/agents/{id}/messages`：**发送消息**
  - 通过 Web 渠道向代理发送消息，并由 Agent Manager 转发以获取回复，消耗消息积分额度。
- `POST /api/agents/{id}/improvements/{improvementId}`：**审核改进建议**
  - 批准 (`approve`) 或驳回 (`dismiss`) AI 代理自己提出的自我改进建议。

### 5. 仪表盘 (Dashboard)
- `GET /api/dashboard`：**获取仪表盘概览**
  - 返回工作空间概览、统计数据（活跃代理数、积分消耗、待办审查等），以及近期代理活动信息流。

### 6. 通信渠道管理 (Channels)
*负责绑定外部即时通讯软件的 Token 和密钥。*

- `GET /api/channels`：**获取已接入渠道**
  - 列表展示当前工作空间配置的渠道，返回时自动脱敏 (`••••••••`) 密钥信息。
- `POST /api/channels`：**连接或更新渠道**
  - 为指定类型（如 Telegram, WeChat）新增或更新配置和密钥。
- `DELETE /api/channels/{id}`：**断开渠道连接**
  - 将指定渠道状态设为 `disconnected` 并清除密钥配置。

### 7. 计费系统 (Billing)
- `GET /api/billing`：**获取账单总览**
  - 返回积分余额、各个代理的坐席使用情况、历史账单记录、订阅数量以及可用套餐。
- `POST /api/billing/checkout`：**模拟结账支付**
  - 提交指定套餐、结算周期（月付/年付）及支付提供商（Stripe/Alipay），模拟支付并生成相关账单和订阅记录。

### 8. 内部集成与 Webhooks
- `POST /api/webhooks/agent-manager`：**Agent Manager 回调接收点**
  - 接收外部 Agent Manager 推送的 Webhook 事件。该接口不需要 Session 认证，而是通过 `x-arkagent-signature` 头部基于 HMAC-SHA256 签名校验合法性。
  - **支持的事件类别**：
    - `agent.status`：更新虚拟机部署状态及运行错误。
    - `agent.heartbeat`：代理心跳打卡及运行时间统计。
    - `agent.activity`：代理执行活动的事件流记录。
    - `agent.message`：接收代理回复的消息内容。
    - `agent.metric`：汇报代理性能数据指标。
    - `agent.improvement`：生成新的待处理的自我审查优化建议。
    - `agent.usage`：汇报算力及积分消耗。
