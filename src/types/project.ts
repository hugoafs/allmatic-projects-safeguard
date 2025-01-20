export interface Project {
  id: string;
  name: string;
  credentials: {
    link?: string;
    email?: string;
    password?: string;
    apiKey?: string;
  };
}