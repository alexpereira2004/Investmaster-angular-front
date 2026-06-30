import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetaRoutingModule } from './meta-routing.module';
import { MetaTotalInvestidoComponent } from "./meta-total-investido/meta-total-investido.component";
import { MetaTotalInvestidoGraficoComponent } from "./meta-total-investido-grafico/meta-total-investido-grafico.component";
import { NgxEchartsModule } from "ngx-echarts";


@NgModule({
  declarations: [
    MetaTotalInvestidoComponent,
    MetaTotalInvestidoGraficoComponent
  ],
  exports: [
    MetaTotalInvestidoComponent,
    MetaTotalInvestidoGraficoComponent
  ],
  imports: [
    CommonModule,
    MetaRoutingModule,
    NgxEchartsModule
  ]
})
export class MetaModule { }
