import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrincipalComponent } from "./principal/principal.component";
import { DividendosDiariosComponent } from "./dividendos-diarios/dividendos-diarios.component";


@NgModule({
  declarations: [
    PrincipalComponent,
    DividendosDiariosComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
