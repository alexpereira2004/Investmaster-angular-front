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
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DividendoMediaComponent } from './dividendo-media/dividendo-media.component';
import { ImportarComponent } from './importar/importar.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ComumDividendoListagemComponent } from "../comum/comum-dividendo-listagem/comum-dividendo-listagem.component";
import { NgxEchartsModule } from "ngx-echarts";


@NgModule({
  declarations: [
    DividendoListagemComponent,
    DividendoCadastroComponent,
    DividendoMediaComponent,
    ImportarComponent,
    ComumDividendoListagemComponent
  ],
  imports: [
    CommonModule,
    DividendoRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxEchartsModule
  ],
  exports: [
    DividendoMediaComponent
  ]
})
export class DividendoModule { }
