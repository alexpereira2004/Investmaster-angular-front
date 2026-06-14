import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrincipalComponent } from "./principal/principal.component";
import { DividendoDiarioComponent } from "../dividendo/dividendo-diario/dividendo-diario.component";
import { MonitorModule } from "../monitor/monitor.module";
import { MetaModule } from "../meta/meta.module";


@NgModule({
  declarations: [
    PrincipalComponent,
    DividendoDiarioComponent
  ],
  imports: [
    MetaModule,
    MonitorModule,
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
