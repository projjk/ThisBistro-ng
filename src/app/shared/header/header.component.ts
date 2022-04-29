import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../core/customer.service";
import {getAllCategoriesResponse} from "../../core/models/getAllCategoriesResponse";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories!: getAllCategoriesResponse[];

  constructor(private customerService: CustomerService ) { }

  ngOnInit(): void {
    this.customerService.getAllCategories().subscribe(res => {
        this.categories = res;
      }
    );

  }

}
