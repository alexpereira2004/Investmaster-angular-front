import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoGeralComponent } from "./resultado-geral/resultado-geral.component";
import { DraggableModalComponent } from "./draggable-modal/draggable-modal.component";
import { CnpjPipe } from "./pipes/cnpj.pipe";


@NgModule({
    declarations: [
        ResultadoGeralComponent,
        DraggableModalComponent
    ],
    exports: [
        ResultadoGeralComponent,
        DraggableModalComponent,
        CnpjPipe
    ],
  imports: [
    CommonModule,
    CnpjPipe
  ]
})
export class SharedModule { }
