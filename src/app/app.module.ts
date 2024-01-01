import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { AtivoModule } from "./view/ativo/ativo.module";
import { AtivoRoutingModule } from "./view/ativo/ativo-routing.module";
import { DividendoModule } from "./view/dividendo/dividendo.module";
import { DividendoRoutingModule } from "./view/dividendo/dividendo-routing.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AtivoModule,
    AtivoRoutingModule,
    DividendoModule,
    DividendoRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
