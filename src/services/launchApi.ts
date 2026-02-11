import type { PaginatedLaunchResponse } from "../types/launch";
import type { PaginatedRocketResponse } from "../types/rocket";
import type { PaginatedAgencyResponse } from "../types/agency";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const CACHE_KEY_PREFIX = "launchApi_cache_";

/** Maximum number of launches to fetch in a single bulk request. */
const BULK_FETCH_LIMIT = 200;

interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

/**
 * Fetches data from the given URL, returning a cached response from
 * localStorage if one exists and is less than 15 minutes old.
 */
const cachedFetch = async <T>(
  url: string,
  errorMessage: string
): Promise<T> => {
  const cacheKey = `${CACHE_KEY_PREFIX}${url}`;

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const entry: CacheEntry<T> = JSON.parse(cached);
      if (Date.now() - entry.timestamp < CACHE_TTL_MS) {
        return entry.data;
      }
    }
  } catch {
    // Corrupted cache entry — ignore and fetch fresh data
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${errorMessage}: ${response.statusText}`);
  }

  const data: T = await response.json();

  try {
    const entry: CacheEntry<T> = { timestamp: Date.now(), data };
    localStorage.setItem(cacheKey, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable — continue without caching
  }

  return data;
};

/**
 * Fetches a large batch of upcoming rocket launches from the API.
 * Returns up to BULK_FETCH_LIMIT results in a single request so that
 * pagination and filtering can be handled entirely on the client side.
 */
export const getUpcomingLaunches = async (): Promise<PaginatedLaunchResponse> => {
  const url = new URL(`${API_BASE_URL}launches/upcoming/`);

  url.searchParams.append("limit", BULK_FETCH_LIMIT.toString());
  url.searchParams.append("offset", "0");
  url.searchParams.append("ordering", "window_start");

  return cachedFetch<PaginatedLaunchResponse>(
    url.toString(),
    "Failed to fetch upcoming launches"
  );
};

/**
 * Fetches a large batch of previous rocket launches from the API.
 * Returns up to BULK_FETCH_LIMIT results in a single request so that
 * pagination can be handled entirely on the client side.
 */
export const getPreviousLaunches = async (): Promise<PaginatedLaunchResponse> => {
  const url = new URL(`${API_BASE_URL}launches/previous/`);

  url.searchParams.append("limit", BULK_FETCH_LIMIT.toString());
  url.searchParams.append("offset", "0");
  url.searchParams.append("ordering", "-window_start");

  return cachedFetch<PaginatedLaunchResponse>(
    url.toString(),
    "Failed to fetch previous launches"
  );
};

export const getActiveRockets = async (): Promise<PaginatedRocketResponse> => {
  const url = new URL(`${API_BASE_URL}launcher_configurations/`);

  url.searchParams.append("mode", "list");
  url.searchParams.append("active", "true");
  url.searchParams.append("pending_launches__gt", "3");
  url.searchParams.append("limit", "30");

  return cachedFetch<PaginatedRocketResponse>(
    url.toString(),
    "Failed to fetch active rockets"
  );
};

export const getActiveAgencies = async (): Promise<PaginatedAgencyResponse> => {
  const url = new URL(`${API_BASE_URL}agencies/`);

  url.searchParams.append("mode", "list");
  url.searchParams.append("limit", "30");
  url.searchParams.append("pending_launches__gt", "3");

  return cachedFetch<PaginatedAgencyResponse>(
    url.toString(),
    "Failed to fetch active agencies"
  );
};