import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficoRoutingModule } from './grafico-routing.module';
import { DividendoEsperadoAlcancadoComponent } from './dividendo-esperado-alcancado/dividendo-esperado-alcancado.component';


@NgModule({
  declarations: [
    DividendoEsperadoAlcancadoComponent
  ],
  imports: [
    CommonModule,
    GraficoRoutingModule
  ]
})
export class GraficoModule { }
