import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AppRoutingModule} from "../app-routing.module";
import {SidebarComponent} from './sidebar/sidebar.component';
import {InputComponent} from './input/input.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    InputComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
