import axios from "axios";
import { Band } from "../types";

const URL = `${process.env.REACT_APP_BAND_API}/bands`;

function mapBand(item: any): Band {
  return {
    id: item.id,
    name: item.name,
    genreCode: item.genreCode,
    year: item.year,
    country: item.country,
    members: item.members.map((member: any) => member.name),
  };
}

export function getAllBands(): Promise<Band[]> {
  return axios({
    method: "get",
    url: `${URL}`,
  }).then((response) => {
    const bands = response.data.map((item: any) => mapBand(item));
    return bands;
  });
}

export function getBandAlbums(id: number): Promise<any> {
  return axios({
    method: "get",
    url: `${URL}/${id}/albums`,
  }).then((response) => {
    const albums = response.data.map((item: any) => ({
      key: item.id,
      id: item.id,
      name: item.name,
      year: item.year,
    }));

    return albums;
  });
}

export function getBandById(id: number): Promise<Band> {
  return axios({
    method: "get",
    url: `${URL}/${id}`,
  }).then((response) => {
    const band = mapBand(response.data);

    return band;
  });
}
