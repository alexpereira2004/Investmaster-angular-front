import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DividendoRoutingModule } from './dividendo-routing.module';
import { ListagemDividendoComponent } from './listagem-dividendo/listagem-dividendo.component';


@NgModule({
  declarations: [
    ListagemDividendoComponent
  ],
  imports: [
    CommonModule,
    DividendoRoutingModule
  ]
})
export class DividendoModule { }
