import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resultado-geral',
  templateUrl: './resultado-geral.component.html',
  styleUrl: './resultado-geral.component.css'
})
export class ResultadoGeralComponent {

  @Input() codigoAtivo: string;
}
