import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoGeralComponent } from "./resultado-geral/resultado-geral.component";


@NgModule({
  declarations: [
    ResultadoGeralComponent
  ],
  exports: [
    ResultadoGeralComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
