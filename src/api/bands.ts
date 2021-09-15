import axios from "axios";
import { Band } from "../types";

const URL = `${process.env.REACT_APP_BAND_API}`;

export function allBands(value: string): Promise<Band[]> {
  return axios({
    method: "get",
    url: `${URL}/${value}`,
  }).then((response) => {
    const bands = response.data.map((item: any) => ({
      key: item.id,
      id: item.id,
      name: item.name,
      genreCode: item.genreCode,
      year: item.year,
      country: item.country,
      members: item.members.map((member: any) => member.name),
    }));

    return bands;
  });
}
