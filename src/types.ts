export type Band = {
  id: number;
  name: string;
  genreCode: string;
  year: number;
  country: string;
  members: Members;
};
type Members = {
  name: string;
};
