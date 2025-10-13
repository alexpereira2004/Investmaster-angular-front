import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DividendoService } from "../../../service/dividendo/dividendo.service";
import { ResultadoGeral } from "../../../model/resultado-geral";

@Component({
  standalone: false,
  selector: 'app-resultado-geral',
  templateUrl: './resultado-geral.component.html',
  styleUrl: './resultado-geral.component.css'
})
export class ResultadoGeralComponent implements OnChanges {

  @Input() codigoAtivo: string;

  public dados: ResultadoGeral;

  constructor(private dividendoService: DividendoService ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['codigoAtivo'] && changes['codigoAtivo'].currentValue) {
      const novoCodigo = changes['codigoAtivo'].currentValue;
      this.dividendoService.pesquisarResultadoGeral(novoCodigo).subscribe(resultado => {
        this.dados = resultado;
      });
    }
  }
}
