export interface Launch {
  id: string;
  name: string;
  window_start: string;
  window_end: string;
  status: {
    name: string;
    abbrev: string;
    description: string;
  };
  mission: {
    name: string;
    description: string;
    type: string;
  } | null;
  pad: {
    name: string;
    location: {
      name: string;
      country_code: string;
    };
  };
  image: string | null;
  rocket: {
    configuration: {
      full_name: string;
    };
  };
}

export interface PaginatedLaunchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Launch[];
}
