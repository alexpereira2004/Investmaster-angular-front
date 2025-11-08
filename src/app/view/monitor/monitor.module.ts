import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorListagemComponent } from "./monitor-listagem/monitor-listagem.component";
import { MonitorItemComponent } from "./monitor-item/monitor-item.component";
import { MonitorHistoricoComponent } from "./monitor-historico/monitor-historico.component";
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegraComprarHistoricoVendaComponent } from "./regra-comprar-historico-venda/regra-comprar-historico-venda.component";
import { MonitorCadastroComponent } from "./monitor-cadastro/monitor-cadastro.component";


@NgModule({
  declarations: [
    MonitorListagemComponent,
    MonitorItemComponent,
    MonitorHistoricoComponent,
    MonitorCadastroComponent,
    RegraComprarHistoricoVendaComponent
  ],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    NgxSliderModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MonitorModule { }
