import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtivoRoutingModule } from './ativo-routing.module';
import { AtivoCadastroComponent } from "./ativo-cadastro/ativo-cadastro.component";
import { AtivoListagemComponent } from './ativo-listagem/ativo-listagem.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AtivoCadastroComponent,
    AtivoListagemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AtivoRoutingModule
  ]
})
export class AtivoModule { }
