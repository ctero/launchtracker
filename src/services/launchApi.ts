import type { PaginatedLaunchResponse } from "../types/launch";

const API_BASE_URL = "https://ll.thespacedevs.com/2.3.0/";
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const CACHE_KEY_PREFIX = "launchApi_cache_";

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
 * Fetches upcoming rocket launches from the API
 * @param page The page number to fetch (default: 1)
 * @param limit The number of results per page (default: 10)
 * @returns Promise resolving to PaginatedLaunchResponse
 */
export const getUpcomingLaunches = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedLaunchResponse> => {
  const offset = (page - 1) * limit;
  const url = new URL(`${API_BASE_URL}launches/upcoming/`);

  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("offset", offset.toString());
  url.searchParams.append("ordering", "window_start");

  return cachedFetch<PaginatedLaunchResponse>(
    url.toString(),
    "Failed to fetch upcoming launches"
  );
};

/**
 * Fetches previous rocket launches from the API
 * @param page The page number to fetch (default: 1)
 * @param limit The number of results per page (default: 10)
 * @returns Promise resolving to PaginatedLaunchResponse
 */
export const getPreviousLaunches = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedLaunchResponse> => {
  const offset = (page - 1) * limit;
  const url = new URL(`${API_BASE_URL}launches/previous/`);

  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("offset", offset.toString());
  url.searchParams.append("ordering", "-window_start");

  return cachedFetch<PaginatedLaunchResponse>(
    url.toString(),
    "Failed to fetch previous launches"
  );
};
