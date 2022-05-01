import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../core/customer.service";
import {Menu} from "../../../core/models/menu";
import {Category} from "../../../core/models/category";
import {ActivatedRoute} from '@angular/router';
import {delay, Subscription} from "rxjs";


interface mergedCategory {
  id: number,
  name: string,
  menus: Menu[]
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  id: string | null = null;
  sub?: Subscription;
  menus: Menu[] = [];
  categories: Category[] | mergedCategory[] = [];
  categoryHash: { [key: number]: number } = {};

  constructor(private customerService: CustomerService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.customerService.getAllMenus().subscribe(res => {
        this.menus = res;
        this.addMenuToCategory();
      }
    );

    this.customerService.getAllCategories().subscribe(res => {
        this.categories = res;
        this.addMenuToCategory();
      }
    );
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Routing for categories
    this.sub = this.route.paramMap
      .pipe(delay(100))
      .subscribe(params => {
        this.id = params.get('id');

        if (this.id != null) {
          this.toSection(this.id)
        }
      });
  }

  // Appends menus to the existing categories[] instead of creating a new object for less memory usage
  private addMenuToCategory() {
    if (this.menus.length === 0 || this.categories.length === 0) {
      return;
    }

    // To avoid iterating the categories[] for searching for the right category each time from the menus.forEach,
    // made a hashmap so that iteration of categories[] happens just once.
    this.categories.forEach((category: any) => {
      this.categoryHash[category.id] = this.categories.indexOf(category);
      category['menus'] = [];
    });

    // Insert the menu to the corresponding category item, as in a menus array.
    this.menus.forEach((menu: Menu) => {
      (this.categories[this.categoryHash[menu.categoryId]] as mergedCategory)?.['menus'].push(menu);
    });

  }

  addToCart(id: number) {
    this.customerService.postCart(id).subscribe();
  }

  toSection(section: string) {
    const elem = document.querySelector('#category' + section);
    if (elem != null) {
      elem.scrollIntoView();
    } else {
      // DOM wasn't rendered yet because of slow connection. Retry in 500ms
      setTimeout(() => {
        this.toSection(section)
      }, 500);
    }
  }
}
