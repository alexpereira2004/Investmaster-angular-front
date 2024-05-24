import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DividendoRoutingModule } from './dividendo-routing.module';
import { DividendoListagemComponent } from './dividendo-listagem/dividendo-listagem.component';
import { DividendoCadastroComponent } from './dividendo-cadastro/dividendo-cadastro.component';
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";


@NgModule({
  declarations: [
    DividendoListagemComponent,
    DividendoCadastroComponent
  ],
  imports: [
    CommonModule,
    DividendoRoutingModule,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule
  ]
})
export class DividendoModule { }
