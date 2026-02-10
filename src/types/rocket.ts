export interface Rocket {
    url: string;
    name: string;
}

export interface PaginatedRocketResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Rocket[];
}