export interface NanoLeader {
  name: string;
  title: string;
  photoUrl: string;
  bio: string;
  email: string;
  education: string[];
  interests: string[];
  experience: string[];
}

export interface NanoMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
  email: string;
  project: string;
}

export interface Collaborator {
  id: string;
  name: string;
  logoText: string;
  location: string;
  jointProject: string;
  type?: 'Indian' | 'Foreign';
}

export interface Alumnus {
  id: string;
  name: string;
  gradYear: string;
  roleInLab: string;
  currentPosition: string;
  currentAffiliation: string;
  photoUrl?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  category: 'Nanomaterials' | 'Biosensors' | 'Energy Storage';
  description: string;
  status: 'Ongoing' | 'Completed';
  tools: string[];
  imageUrl: string;
}

export interface NanoResource {
  id: string;
  name: string;
  description: string;
  specs: string[];
  imageUrl: string;
  glowColor: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Team' | 'Events' | 'Lab Activities';
  imageUrl: string;
}
