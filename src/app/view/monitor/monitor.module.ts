import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorListagemComponent } from "./monitor-listagem/monitor-listagem.component";
import { MonitorItemComponent } from "./monitor-item/monitor-item.component";


@NgModule({
  declarations: [
    MonitorListagemComponent,
    MonitorItemComponent
  ],
  imports: [
    CommonModule,
    MonitorRoutingModule
  ]
})
export class MonitorModule { }
