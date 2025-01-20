export interface Project {
  id: string;
  name: string;
  credentials: {
    platform?: string;
    link?: string;
    email?: string;
    password?: string;
    apiKey?: string;
  };
}