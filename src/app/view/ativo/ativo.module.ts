import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtivoRoutingModule } from './ativo-routing.module';
import { AtivoCadastroComponent } from "./ativo-cadastro/ativo-cadastro.component";
import { AtivoListagemComponent } from './ativo-listagem/ativo-listagem.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AtivoComparativoComponent } from "./ativo-comparativo/ativo-comparativo.component";
import { Select2Module } from "ng-select2-component";
import { NgxMaskDirective, provideEnvironmentNgxMask } from "ngx-mask";


@NgModule({
  declarations: [
    AtivoCadastroComponent,
    AtivoListagemComponent,
    AtivoComparativoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AtivoRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxMaskDirective,
    Select2Module
  ],
  providers: [provideEnvironmentNgxMask()]
})
export class AtivoModule { }
