import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoricoService } from "../../../service/historico/historico.service";

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

  constructor(private historicoService: HistoricoService) {
  }

  atualizaDados() {
    if (this.primeiroClique) {
      this.historicoService.pesquisar({
        ativos: ['BBAS3'],
        dataInicio: '2025-01-01',
        dataFim: '2025-12-31'
      }).subscribe(dados => {
        console.log(dados);
      });

      this.primeiroClique = false;
    }
  }
}
