import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {filter, tap} from "rxjs/operators";

import {Menu} from "./models/menu";
import {Category} from "./models/category";
import {Cart} from "./models/cart";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  rootUrl = "https://localhost:7016/api"
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  cartCount$ = new BehaviorSubject(0);

  constructor(private http: HttpClient) {
  }

  getAllMenus() {
    return this.http.get<Menu[]>(`${this.rootUrl}/menu`)
      .pipe(
        filter(a => a.length > 0)
      );
  }

  getAllCategories() {
    return this.http.get<Category[]>(`${this.rootUrl}/category`)
      .pipe(
        filter(a => a.length > 0)
      );
  }

  getAllCarts() {
    return this.http.get<Cart[]>(`${this.rootUrl}/cart`)
      .pipe(
        tap(res => {
          let i = 0;
          res.forEach(r => {
            i += r.quantity;
            }
          )
          this.cartCount$.next(i);
        })
      );
  }

  putCart(id: number, quantity: number) {
    return this.http.put<Cart>(`${this.rootUrl}/cart/${id}`, {
      id,
      quantity
    }, {headers: this.headers});
  }

  deleteCart(id: number) {
    return this.http.delete(`${this.rootUrl}/cart/${id}`, {headers: this.headers})
      .pipe(
        tap(res => {
          this.cartCount$.next(this.cartCount$.value - 1);
        })
      );
  }

  postCart(id: number) {
    return this.http.post<Cart>(`${this.rootUrl}/cart`, {
      menuId: id
    }, {headers: this.headers, observe: 'response'})
      .pipe(
        tap(res => {
          this.cartCount$.next(this.cartCount$.value + 1);
        })
      );
  }

  postOrder(){
    return this.http.post<any>(`${this.rootUrl}/order`, {}, {headers: this.headers});
  }
}
