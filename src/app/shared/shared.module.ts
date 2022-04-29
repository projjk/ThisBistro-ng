import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {AppRoutingModule} from "../app-routing.module";
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent
    ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        AppRoutingModule
    ]
})
export class SharedModule { }
