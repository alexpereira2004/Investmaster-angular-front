import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrincipalComponent } from "./principal/principal.component";
import { DividendoDiarioComponent } from "../dividendo/dividendo-diario/dividendo-diario.component";
import { MonitorModule } from "../monitor/monitor.module";


@NgModule({
  declarations: [
    PrincipalComponent,
    DividendoDiarioComponent
  ],
  imports: [
    MonitorModule,
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
