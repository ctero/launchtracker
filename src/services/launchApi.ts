import type { Launch, PaginatedLaunchResponse } from "../types/launch";

const API_BASE_URL = "https://ll.thespacedevs.com/2.2.0/";

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
  const url = new URL(`${API_BASE_URL}launch/upcoming/`);

  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("offset", offset.toString());
  url.searchParams.append("ordering", "window_start");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(
      `Failed to fetch upcoming launches: ${response.statusText}`
    );
  }

  return response.json();
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
  const url = new URL(`${API_BASE_URL}launch/previous/`);

  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("offset", offset.toString());
  url.searchParams.append("ordering", "-window_start");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(
      `Failed to fetch previous launches: ${response.statusText}`
    );
  }

  return response.json();
};
