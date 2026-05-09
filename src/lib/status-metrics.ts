import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const HOURS_PER_MONTH = 730;
export const CLOUD_MONTHLY_COST = 5.0;
export const LOCAL_MONTHLY_COST = 1.5;
export const CALCULATION_INTERVAL_MS = 24 * 60 * 60 * 1000;
export const WARMUP_INTERVAL_MS = 60 * 1000;
export const AVAILABILITY_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
export const EXPECTED_HEALTHCHECK_INTERVAL_MS = 30 * 1000;

const cacheDirectory = path.join(process.cwd(), ".status-cache");
const cacheFile = path.join(cacheDirectory, "self-hosted-status.json");

type SavingsState = {
  trackedStartedAt: string;
  lastCalculatedAt: string | null;
  estimatedSavings: number | null;
};

type HealthState = {
  checks: string[];
};

export type StatusCache = {
  savings: SavingsState;
  health: HealthState;
};

type LegacySavingsCache = {
  trackedStartedAt?: string;
  lastCalculatedAt?: string | null;
  estimatedSavings?: number | null;
};

function createDefaultCache(nowIso: string): StatusCache {
  return {
    savings: {
      trackedStartedAt: nowIso,
      lastCalculatedAt: null,
      estimatedSavings: null,
    },
    health: {
      checks: [],
    },
  };
}

function normalizeCheckHistory(checks: string[], nowMs: number) {
  const cutoffMs =
    nowMs - AVAILABILITY_WINDOW_MS - EXPECTED_HEALTHCHECK_INTERVAL_MS;

  return checks
    .filter((value) => Number.isFinite(new Date(value).getTime()))
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .filter((value) => new Date(value).getTime() >= cutoffMs);
}

export async function readStatusCache(nowIso: string): Promise<StatusCache> {
  try {
    const file = await readFile(cacheFile, "utf8");
    const parsed = JSON.parse(file) as Partial<StatusCache> & LegacySavingsCache;
    const nowMs = new Date(nowIso).getTime();

    if (parsed.savings && parsed.health) {
      return {
        savings: {
          trackedStartedAt:
            typeof parsed.savings.trackedStartedAt === "string"
              ? parsed.savings.trackedStartedAt
              : nowIso,
          lastCalculatedAt:
            typeof parsed.savings.lastCalculatedAt === "string"
              ? parsed.savings.lastCalculatedAt
              : null,
          estimatedSavings:
            typeof parsed.savings.estimatedSavings === "number"
              ? parsed.savings.estimatedSavings
              : null,
        },
        health: {
          checks: normalizeCheckHistory(parsed.health.checks ?? [], nowMs),
        },
      };
    }

    if (typeof parsed.trackedStartedAt === "string") {
      return {
        savings: {
          trackedStartedAt: parsed.trackedStartedAt,
          lastCalculatedAt:
            typeof parsed.lastCalculatedAt === "string" ? parsed.lastCalculatedAt : null,
          estimatedSavings:
            typeof parsed.estimatedSavings === "number" ? parsed.estimatedSavings : null,
        },
        health: {
          checks: [],
        },
      };
    }
  } catch {
    // Fall through to initialize the cache.
  }

  return createDefaultCache(nowIso);
}

export async function persistStatusCache(cache: StatusCache) {
  await mkdir(cacheDirectory, { recursive: true });
  await writeFile(cacheFile, JSON.stringify(cache, null, 2), "utf8");
}

export async function recordHealthCheck(now = new Date()) {
  const nowIso = now.toISOString();
  const nowMs = now.getTime();
  const cache = await readStatusCache(nowIso);

  cache.health.checks = normalizeCheckHistory(
    [...cache.health.checks, nowIso],
    nowMs,
  );

  await persistStatusCache(cache);
  return cache;
}

export function deriveAvailability(
  checks: string[],
  now = new Date(),
): { availabilityPercent: number | null; availabilityLabel: string; observedDays: number } {
  if (checks.length === 0) {
    return {
      availabilityPercent: null,
      availabilityLabel: "Calculating...",
      observedDays: 0,
    };
  }

  const nowMs = now.getTime();
  const sortedChecks = normalizeCheckHistory(checks, nowMs).map((value) =>
    new Date(value).getTime(),
  );

  if (sortedChecks.length === 0) {
    return {
      availabilityPercent: null,
      availabilityLabel: "Calculating...",
      observedDays: 0,
    };
  }

  const observedStartMs = Math.max(nowMs - AVAILABILITY_WINDOW_MS, sortedChecks[0]);
  const observedDurationMs = Math.max(
    EXPECTED_HEALTHCHECK_INTERVAL_MS,
    nowMs - observedStartMs,
  );

  let downtimeMs = 0;

  for (let index = 1; index < sortedChecks.length; index += 1) {
    const gapMs = sortedChecks[index] - sortedChecks[index - 1];
    downtimeMs += Math.max(0, gapMs - EXPECTED_HEALTHCHECK_INTERVAL_MS);
  }

  const currentGapMs = nowMs - sortedChecks[sortedChecks.length - 1];
  downtimeMs += Math.max(0, currentGapMs - EXPECTED_HEALTHCHECK_INTERVAL_MS);

  const availabilityRatio = Math.max(
    0,
    Math.min(1, 1 - downtimeMs / observedDurationMs),
  );
  const availabilityPercent = availabilityRatio * 100;
  const observedDays = observedDurationMs / (24 * 60 * 60 * 1000);

  let periodLabel = "today";
  if (observedDays >= 30) {
    periodLabel = "30 days";
  } else if (observedDays >= 1) {
    const roundedDays = Math.max(1, Math.floor(observedDays));
    periodLabel = `${roundedDays} day${roundedDays === 1 ? "" : "s"}`;
  }

  return {
    availabilityPercent,
    availabilityLabel: `${availabilityPercent.toFixed(1)}% over ${periodLabel}`,
    observedDays,
  };
}

export async function getStatusSnapshot(now = new Date()) {
  const nowIso = now.toISOString();
  const cache = await readStatusCache(nowIso);
  const trackedStartedAtMs = new Date(cache.savings.trackedStartedAt).getTime();
  const elapsedMs = Math.max(0, now.getTime() - trackedStartedAtMs);
  const lastCalculatedAtMs = cache.savings.lastCalculatedAt
    ? new Date(cache.savings.lastCalculatedAt).getTime()
    : null;
  const isWarmupWindow = elapsedMs < CALCULATION_INTERVAL_MS;
  const nextCalculationAtMs =
    lastCalculatedAtMs === null
      ? trackedStartedAtMs
      : lastCalculatedAtMs +
        (isWarmupWindow ? WARMUP_INTERVAL_MS : CALCULATION_INTERVAL_MS);

  let updatedCache = cache;

  if (Number.isFinite(trackedStartedAtMs) && now.getTime() >= nextCalculationAtMs) {
    const elapsedHours = Math.max(0, (now.getTime() - trackedStartedAtMs) / 3_600_000);
    const estimatedSavings =
      (CLOUD_MONTHLY_COST - LOCAL_MONTHLY_COST) * (elapsedHours / HOURS_PER_MONTH);

    updatedCache = {
      ...cache,
      savings: {
        trackedStartedAt: cache.savings.trackedStartedAt,
        lastCalculatedAt: nowIso,
        estimatedSavings,
      },
    };

    await persistStatusCache(updatedCache);
  } else if (cache.savings.lastCalculatedAt === null && cache.savings.estimatedSavings === null) {
    await persistStatusCache(cache);
  }

  const availability = deriveAvailability(updatedCache.health.checks, now);

  return {
    cache: updatedCache,
    availability,
    nextCalculationAt: new Date(
      updatedCache.savings.lastCalculatedAt
        ? new Date(updatedCache.savings.lastCalculatedAt).getTime() +
            (isWarmupWindow ? WARMUP_INTERVAL_MS : CALCULATION_INTERVAL_MS)
        : nextCalculationAtMs,
    ).toISOString(),
  };
}
