import { recordHealthCheck } from "@/lib/status-metrics";

export const dynamic = "force-dynamic";

export async function GET() {
  await recordHealthCheck();

  return Response.json({
    status: "ok",
    service: "portfolio",
    timestamp: new Date().toISOString(),
  });
}
