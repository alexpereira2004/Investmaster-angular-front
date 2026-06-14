import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetaRoutingModule } from './meta-routing.module';
import { MetaTotalInvestidoComponent } from "./meta-total-investido/meta-total-investido.component";


@NgModule({
  declarations: [
    MetaTotalInvestidoComponent
  ],
  exports: [
    MetaTotalInvestidoComponent
  ],
  imports: [
    CommonModule,
    MetaRoutingModule
  ]
})
export class MetaModule { }
