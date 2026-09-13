import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoGeralComponent } from "./resultado-geral/resultado-geral.component";
import { DraggableModalComponent } from "./draggable-modal/draggable-modal.component";


@NgModule({
  declarations: [
    ResultadoGeralComponent,
    DraggableModalComponent
  ],
  exports: [
    ResultadoGeralComponent,
    DraggableModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
