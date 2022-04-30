import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MenuModule} from "./menu/menu.module";
import { CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {ManagerModule} from "./manager/manager.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    MenuModule,
    AppRoutingModule,
    ManagerModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
