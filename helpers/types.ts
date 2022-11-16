export type Settings = {
  projects: string[];
  threshold?: {
    pullRequests?: number;
    issues?: number;
    vulnerabilityAlerts?: number;
  };
};

type Stargazer = {
  id: string;
  name: string | null;
  avatarUrl: string;
};

export type Project = {
  id: string;
  url: string;
  name: string;
  pullRequests: {
    totalCount: number;
  };
  vulnerabilityAlerts: {
    totalCount: number;
  };
  issues: {
    totalCount: number;
  };
  stargazers: {
    totalCount: number;
    nodes: Stargazer[];
  };
};
