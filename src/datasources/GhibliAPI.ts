import { RESTDataSource } from "@apollo/datasource-rest";
import { FilmModel, PeopleModel } from "../models.js";

export class GhibliAPI extends RESTDataSource {
  baseURL = "https://ghibliapi.dev/";

  getFilms() {
    return this.get<FilmModel[]>("films");
  }

  getFilmById(id: string) {
    return this.get<FilmModel>(`films/${id}`);
  }

  getPeople() {
    return this.get<PeopleModel[]>("people");
  }

  getPeopleById(id: string) {
    return this.get<PeopleModel>(`people/${id}`);
  }
}
