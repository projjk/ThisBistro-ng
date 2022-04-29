import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuComponent} from "./pages/menu/menu.component";
import {CartComponent} from "./pages/cart/cart.component";

const routes: Routes = [
   {path: 'menu', component: MenuComponent},
   {path: 'menu/:id', component: MenuComponent},
   {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
