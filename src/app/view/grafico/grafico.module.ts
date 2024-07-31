import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficoRoutingModule } from './grafico-routing.module';
import { DividendoEsperadoAlcancadoComponent } from './dividendo-esperado-alcancado/dividendo-esperado-alcancado.component';
import { Select2Module } from "ng-select2-component";


@NgModule({
  declarations: [
    DividendoEsperadoAlcancadoComponent
  ],
  imports: [
    CommonModule,
    GraficoRoutingModule,
    Select2Module
  ]
})
export class GraficoModule { }
