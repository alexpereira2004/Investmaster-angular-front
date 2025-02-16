import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrincipalComponent } from "./principal/principal.component";
import { DividendoDiarioComponent } from "../dividendo/dividendo-diario/dividendo-diario.component";
import { DataTablesModule } from "angular-datatables";


@NgModule({
  declarations: [
    PrincipalComponent,
    DividendoDiarioComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DataTablesModule
  ]
})
export class DashboardModule { }
