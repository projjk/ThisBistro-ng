import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Config} from "./models/config";
import {Category} from "./models/category";
import {ManagerMenu} from "./models/managerMenu";
import {ManagerMenuDto} from "./models/managerMenuDto";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  rootUrl = "https://localhost:7016/api/manager"
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // General
  getConfig() {
    return this.http.get<Config>(`${this.rootUrl}/config`)
  }

  putConfig(dto: any) {
    return this.http.put<Config>(`${this.rootUrl}/config`, dto, {headers: this.headers});
  }

  // Category
  getAllCategories() {
    return this.http.get<Category[]>(`${this.rootUrl}/category`);
  }

  postCategory(dto: Category) {
    return this.http.post<Category>(`${this.rootUrl}/category`, dto, {headers: this.headers});
  }

  putCategory(dto: Category) {
    return this.http.put<Category>(`${this.rootUrl}/category/${dto.id}`, dto, {headers: this.headers});
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.rootUrl}/category/${id}`, {headers: this.headers});
  }

  // Menu
  getAllMenus() {
    return this.http.get<ManagerMenu[]>(`${this.rootUrl}/menu`);
  }

  postMenu(dto: ManagerMenuDto) {
    return this.http.post<ManagerMenu>(`${this.rootUrl}/menu`, dto, {headers: this.headers});
  }

  putMenu(dto: ManagerMenuDto) {
    return this.http.put<ManagerMenu>(`${this.rootUrl}/menu/${dto.id}`, dto, {headers: this.headers});
  }

  deleteMenu(id: number) {
    return this.http.delete(`${this.rootUrl}/menu/${id}`, {headers: this.headers});
  }

}
