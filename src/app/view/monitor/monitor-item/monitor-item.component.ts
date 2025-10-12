import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoricoService } from "../../../service/historico/historico.service";
import { AtivoHistorico } from "../../../model/ativo-historico";
import { DataMinimaMaxima } from "../../../model/dto/data-minima-maxima";

@Component({
  selector: 'app-monitor-item',
  templateUrl: './monitor-item.component.html',
  styleUrl: './monitor-item.component.css'
})
export class MonitorItemComponent {

  @Input() codigo!: string;
  @Input() nome!: string;
  @Input() situacao!: string;

  @Output() nomeMudou = new EventEmitter<string>();

  primeiroClique = true;
  ativoHistorico: AtivoHistorico;
  dataMinimaMaxima: DataMinimaMaxima;


  constructor(private historicoService: HistoricoService) {
  }

  atualizaDados() {
    if (this.primeiroClique) {
      this.historicoService.pesquisar({
        ativos: [this.codigo],
        dataInicio: '2025-01-01',
        dataFim: '2025-12-31'
      }).subscribe({
        next: (dados) => {
          this.ativoHistorico = dados[0];
        },
        error: (err) => console.error('Erro ao buscar histórico', err)
      });

      this.historicoService.dataMinimaMaxima(this.codigo).subscribe({
        next: (dados) => {
          this.dataMinimaMaxima = dados;
          console.log(this.dataMinimaMaxima);
        },
        error: (err) => console.error('Erro ao buscar Data Mínima e Máxima', err)
      });
      this.primeiroClique = false;
    }
  }
}
