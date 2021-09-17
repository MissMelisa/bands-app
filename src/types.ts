export type Band = {
  id: number;
  name: string;
  genreCode: string;
  year: number;
  country: string;
  members: string[];
};

export type Album = {
  name: string;
  year: number;
  bandId: number;
};

export type User = {
  email: string | null;
  uid: string;
};
