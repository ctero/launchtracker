export interface Agency {
    id: number;
    url: string;
    name: string;
    abbrev: string;
    type: {
        id: number;
        name: string;
    };
}

export interface PaginatedAgencyResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Agency[];
}