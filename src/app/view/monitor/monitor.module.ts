import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorListagemComponent } from "./monitor-listagem/monitor-listagem.component";
import { MonitorItemComponent } from "./monitor-item/monitor-item.component";
import { MonitorHistoricoComponent } from "./monitor-historico/monitor-historico.component";
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    MonitorListagemComponent,
    MonitorItemComponent,
    MonitorHistoricoComponent
  ],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    NgxSliderModule,
    FormsModule
  ]
})
export class MonitorModule { }
