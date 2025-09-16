export type Project = {
  title: string;
  description: string;
  tech?: string[];
  image?: string; // public path e.g., "/project-1.png"
  demo?: string;
  repo?: string;
};

export type Skill = {
  name: string;
  category?: string;
};
