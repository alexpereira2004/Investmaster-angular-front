import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtivoRoutingModule } from './ativo-routing.module';
import { AtivoCadastroComponent } from "./ativo-cadastro/ativo-cadastro.component";
import { AtivoListagemComponent } from './ativo-listagem/ativo-listagem.component';


@NgModule({
  declarations: [
    AtivoCadastroComponent,
    AtivoListagemComponent
  ],
  imports: [
    CommonModule,
    AtivoRoutingModule
  ]
})
export class AtivoModule { }
