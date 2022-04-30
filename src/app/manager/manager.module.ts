import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoryComponent } from './pages/category/category.component';
import { MenuComponent } from './pages/menu/menu.component';
import { GeneralComponent } from './pages/general/general.component';
import { OrderComponent } from './pages/order/order.component';
import { CustomerComponent } from './pages/customer/customer.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CategoryComponent,
    MenuComponent,
    GeneralComponent,
    OrderComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
