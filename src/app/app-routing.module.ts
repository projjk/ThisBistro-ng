import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from "./menu/pages/home/home.component";

const routes: Routes = [
  { path: 'manager', loadChildren: () => import('./manager/manager.module').then((m) => m.ManagerModule) },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
