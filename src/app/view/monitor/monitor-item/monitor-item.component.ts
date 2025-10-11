import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoricoService } from "../../../service/historico/historico.service";
import { AtivoHistorico } from "../../../model/ativo-historico";

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
          console.log(this.ativoHistorico);
        },
        error: (err) => console.error('Erro ao buscar histórico', err)
      });
      this.primeiroClique = false;
    }
  }
}
