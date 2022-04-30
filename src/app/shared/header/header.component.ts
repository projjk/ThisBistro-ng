import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../core/customer.service";
import {Category} from "../../core/models/category";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories!: Category[];
  cartCount = 0;

  constructor(private customerService: CustomerService ) { }

  ngOnInit(): void {
    this.customerService.getAllCategories().subscribe(res => {
        this.categories = res;
      }
    );

    // Just to fetch total number of carts. Should be changed after implementing authentication.
    this.customerService.getAllCarts().subscribe();

    this.customerService.cartCount$.subscribe(res => {
      this.cartCount = res;
    })
  }

}
