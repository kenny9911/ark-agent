import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { agentManagerConfig } from "@/lib/db/schema";
import {
  createInstance,
  getInstanceEvents,
  getChatHistory,
  sendChat,
  streamChat,
  chat,
  streamHandleToMessage,
  type PreprocessedInstance,
  type PreprocessedEvent,
  type PreprocessedChatHistory,
  type PreprocessedMessage,
  type StreamChatEvent,
  type StreamChatHandle,
  type StreamChatParams,
} from "@/app/lib/openclaw_manager_api";
import type { AgentManagerConfig } from "@/lib/db/schema";

const PROVIDER = "openclaw";

export interface CreateOpenclawInstanceInput {
  agentId: string;
  name: string;
  categoryId: number;
  targetUserId: string;
}

export interface CreateOpenclawInstanceResult {
  config: AgentManagerConfig;
  preprocessed: PreprocessedInstance;
}

/**
 * 调用 OpenClaw Manager 创建实例，并把完整响应存入 agent_manager_config。
 */
export async function createOpenclawInstance(
  input: CreateOpenclawInstanceInput
): Promise<CreateOpenclawInstanceResult> {
  const preprocessed = await createInstance({
    name: input.name,
    category_id: input.categoryId,
    target_user_id: input.targetUserId,
  });

  const [row] = await db
    .insert(agentManagerConfig)
    .values({
      agentId: input.agentId,
      provider: PROVIDER,
      externalId: preprocessed.uuid,
      status: preprocessed.provisioningStatus,
      lastError: preprocessed.provisioningError,
      config: preprocessed as unknown as Record<string, unknown>,
    })
    .returning();

  return { config: row, preprocessed };
}

/**
 * 获取指定 agent 的 openclaw provider 配置。
 */
export async function getOpenclawConfigByAgentId(
  agentId: string
): Promise<AgentManagerConfig | null> {
  const [row] = await db
    .select()
    .from(agentManagerConfig)
    .where(
      and(
        eq(agentManagerConfig.agentId, agentId),
        eq(agentManagerConfig.provider, PROVIDER)
      )
    )
    .limit(1);
  return row ?? null;
}

/**
 * 通过 provider 外部 ID 查找配置。
 */
export async function getOpenclawConfigByExternalId(
  externalId: string
): Promise<AgentManagerConfig | null> {
  const [row] = await db
    .select()
    .from(agentManagerConfig)
    .where(
      and(
        eq(agentManagerConfig.provider, PROVIDER),
        eq(agentManagerConfig.externalId, externalId)
      )
    )
    .limit(1);
  return row ?? null;
}

/**
 * 把最新状态写回配置行（status / lastError）。
 */
export async function syncOpenclawStatus(
  externalId: string,
  status: string,
  lastError: string | null = null
): Promise<AgentManagerConfig | null> {
  const [updated] = await db
    .update(agentManagerConfig)
    .set({ status, lastError, updatedAt: new Date() })
    .where(
      and(
        eq(agentManagerConfig.provider, PROVIDER),
        eq(agentManagerConfig.externalId, externalId)
      )
    )
    .returning();
  return updated ?? null;
}

/**
 * 拉取 OpenClaw 实例的最近事件（直接走上游 API，DB 不再单独存 events）。
 */
export async function getOpenclawInstanceEventsFromApi(
  externalId: string
): Promise<PreprocessedEvent[]> {
  return getInstanceEvents(externalId);
}

/**
 * 发送对话
 */
export async function sendOpenclawChat(
  externalId: string,
  agent: string,
  message: string
) {
  return sendChat(externalId, { agent, message });
}

/**
 * 获取对话历史
 */
export async function getOpenclawChatHistory(
  externalId: string,
  agent = "main"
): Promise<PreprocessedChatHistory> {
  return getChatHistory(externalId, agent);
}

/**
 * 流式对话（实时回调每个 SSE 事件）
 */
export async function streamOpenclawChat(
  externalId: string,
  params: StreamChatParams,
  options?: {
    signal?: AbortSignal;
    onEvent?: (event: StreamChatEvent) => void;
  }
): Promise<StreamChatHandle> {
  return streamChat(externalId, params, options);
}

/**
 * 流式对话便捷封装：等待完成后返回最终回复
 */
export async function chatOpenclaw(
  externalId: string,
  params: StreamChatParams,
  options?: {
    signal?: AbortSignal;
    onEvent?: (event: StreamChatEvent) => void;
  }
): Promise<PreprocessedMessage> {
  return chat(externalId, params, options);
}

export { streamHandleToMessage };
