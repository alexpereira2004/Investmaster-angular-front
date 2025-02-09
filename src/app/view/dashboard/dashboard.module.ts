import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrincipalComponent } from "./principal/principal.component";
import { DividendosDiariosComponent } from "./dividendos-diarios/dividendos-diarios.component";
import { DataTablesModule } from "angular-datatables";


@NgModule({
  declarations: [
    PrincipalComponent,
    DividendosDiariosComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DataTablesModule
  ]
})
export class DashboardModule { }
