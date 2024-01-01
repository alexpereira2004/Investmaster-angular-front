import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { AtivoModule } from "./view/ativo/ativo.module";
import { AtivoRoutingModule } from "./view/ativo/ativo-routing.module";
import { ListagemComponent } from './view/dividendo/listagem/listagem.component';


@NgModule({
  declarations: [
    AppComponent,
    ListagemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AtivoModule,
    AtivoRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
