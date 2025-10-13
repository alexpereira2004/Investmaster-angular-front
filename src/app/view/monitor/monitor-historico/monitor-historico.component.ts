import { Component, Input, OnInit } from '@angular/core';
import { AtivoHistorico } from "../../../model/ativo-historico";
import { HistoricoService } from "../../../service/historico/historico.service";

@Component({
  standalone: false,
  selector: 'app-monitor-historico',
  templateUrl: './monitor-historico.component.html',
  styleUrl: './monitor-historico.component.css'
})
export class MonitorHistoricoComponent implements OnInit {

  @Input() historico: AtivoHistorico;

  constructor(private historicoService: HistoricoService) {
    console.log(this.historico);
  }

  ngOnInit(): void {
    console.log('ngOnInit -> historico:', this.historico);
  }

  ngOnChanges(): void {
    console.log('ngOnChanges -> historico:', this.historico);
  }

  atualizar() {
    if (!this.historico?.codigo) return;
    this.historicoService.pesquisar(this.historico.codigo).subscribe({
      next: (dados) => (this.historico = dados[0]),
      error: (err) => console.error('Erro ao atualizar histórico', err)
    });
  }

  pesquisarHistorico($event: Event) {
    // @TODO
    //ngx-slider com datas
    const input = $event.target as HTMLInputElement;
    console.log('Valor selecionado:', input.value);
  }
}
