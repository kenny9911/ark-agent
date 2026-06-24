import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { agentManagerConfig } from "@/lib/db/schema";
import { requireAuth, notFound, json } from "@/lib/api";
import { getAgentRow } from "@/lib/services/agents";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/**
 * GET /api/agents/:id/instance-info
 *
 * Returns the Agent Manager config blob for this agent (e.g. the OpenClaw
 * instance payload returned by `createInstance` at provision time). Right now
 * we only store the openclaw provider's config, but the response shape is
 * provider-generic so a second provider can be added without UI changes.
 */
export async function GET(_req: Request, { params }: Ctx) {
  const auth = await requireAuth();
  if (auth.res) return auth.res;
  const { id } = await params;
  const agent = await getAgentRow(id, auth.ctx.workspace.id);
  if (!agent) return notFound("Agent not found");

  const rows = await db
    .select()
    .from(agentManagerConfig)
    .where(eq(agentManagerConfig.agentId, id));

  return json({
    providers: rows.map((r) => ({
      provider: r.provider,
      externalId: r.externalId,
      status: r.status,
      lastError: r.lastError,
      config: r.config,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    })),
  });
}
