import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {getAllMenusResponse} from "./models/getAllMenusResponse";
import {getAllCategoriesResponse } from "./models/getAllCategoriesResponse";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  rootUrl = "https://localhost:7016/api"

  constructor(private http: HttpClient) { }

  getAllMenus() {
    return this.http.get<getAllMenusResponse[]>(`${this.rootUrl}/menu`)
      .pipe(
        filter(a => a.length > 0)
      );
  }

  getAllCategories() {
    return this.http.get<getAllCategoriesResponse[]>(`${this.rootUrl}/category`)
      .pipe(
        filter(a => a.length > 0)
      );
  }
}

