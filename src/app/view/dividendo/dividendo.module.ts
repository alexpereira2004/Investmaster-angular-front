import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DividendoRoutingModule } from './dividendo-routing.module';
import { DividendoListagemComponent } from './dividendo-listagem/dividendo-listagem.component';
import { DividendoCadastroComponent } from './dividendo-cadastro/dividendo-cadastro.component';


@NgModule({
  declarations: [
    DividendoListagemComponent,
    DividendoCadastroComponent
  ],
  imports: [
    CommonModule,
    DividendoRoutingModule
  ]
})
export class DividendoModule { }
