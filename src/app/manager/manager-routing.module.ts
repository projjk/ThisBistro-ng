import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {GeneralComponent} from "./pages/general/general.component";
import {MenuComponent} from "./pages/menu/menu.component";
import {CategoryComponent} from "./pages/category/category.component";
import {OrderComponent} from "./pages/order/order.component";
import {CustomerComponent} from "./pages/customer/customer.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: GeneralComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'order', component: OrderComponent },
      { path: 'customer', component: CustomerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
