import { Component, OnInit } from '@angular/core';
import { Monitor } from "../../../model/monitor";
import { MonitorService } from "../../../service/monitor/monitor.service";
import { MonitorFilter } from "../../../model/filter/monitor-filter";
import { PageSpring } from "../../../model/page-spring";

@Component({
  standalone: false,
  selector: 'app-monitor-listagem',
  templateUrl: './monitor-listagem.component.html',
  styleUrl: './monitor-listagem.component.css'
})
export class MonitorListagemComponent implements OnInit {

  public ativosMonitorados: Monitor[];


  constructor(private monitorService: MonitorService) {}

  ngOnInit(): void {
    let filter: MonitorFilter = {} as MonitorFilter;
    filter.status = "ATIVO";
    filter.sort = 'id,desc';
    this.monitorService.pesquisarComFiltroPaginado(filter).subscribe({
      next: (result: PageSpring<Monitor>) => {
        this.ativosMonitorados = result.content;
      },
      error: error => {
        console.error('Erro ao buscar dados dos ativos monitorados', error);
      }
    });
  }

}
