import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuComponent} from "./menu/pages/menu/menu.component";

const routes: Routes = [
  { path: 'manager', loadChildren: () => import('./manager/manager.module').then((m) => m.ManagerModule) },
  { path: '', component: MenuComponent },
  { path: '**', redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
