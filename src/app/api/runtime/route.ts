export const dynamic = "force-dynamic";
import { getStatusSnapshot } from "@/lib/status-metrics";

export async function GET() {
  const now = new Date();
  const nowIso = now.toISOString();
  const runtimeSeconds = Math.max(0, Math.floor(process.uptime()));
  const runtimeHours = runtimeSeconds / 3600;
  const { cache, availability, nextCalculationAt } = await getStatusSnapshot(now);

  return Response.json({
    runtimeSeconds,
    runtimeHours,
    timestamp: nowIso,
    savingsStatus: cache.savings.estimatedSavings === null ? "calculating" : "ready",
    estimatedSavings: cache.savings.estimatedSavings,
    trackedStartedAt: cache.savings.trackedStartedAt,
    lastCalculatedAt: cache.savings.lastCalculatedAt,
    nextCalculationAt,
    availabilityPercent: availability.availabilityPercent,
    availabilityLabel: availability.availabilityLabel,
    availabilityObservedDays: availability.observedDays,
  });
}
