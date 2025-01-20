export interface Credential {
  id: string;
  platform: string;
  link: string;
  email: string;
  password: string;
  apiKey: string;
}

export interface Project {
  id: string;
  name: string;
  credentials: Credential[];
}