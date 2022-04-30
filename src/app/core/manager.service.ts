import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Config} from "./models/config";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  rootUrl = "https://localhost:7016/api/manager"
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<Config>(`${this.rootUrl}/config`)
  }

  putConfig(configObj: any) {
    return this.http.put<Config>(`${this.rootUrl}/config`, configObj, {headers: this.headers});
  }
}
