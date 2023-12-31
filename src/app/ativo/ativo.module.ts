import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtivoRoutingModule } from './ativo-routing.module';
import { AtivoCadastroComponent } from "./components/ativo-cadastro/ativo-cadastro.component";


@NgModule({
  declarations: [
    AtivoCadastroComponent
  ],
  imports: [
    CommonModule,
    AtivoRoutingModule
  ]
})
export class AtivoModule { }
