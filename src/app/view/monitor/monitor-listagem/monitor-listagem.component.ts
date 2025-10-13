import { Component, OnInit } from '@angular/core';
import { MonitorListagem } from "../../../model/monitor-listagem";
import { MonitorService } from "../../../service/monitor/monitor.service";

@Component({
  standalone: false,
  selector: 'app-monitor-listagem',
  templateUrl: './monitor-listagem.component.html',
  styleUrl: './monitor-listagem.component.css'
})
export class MonitorListagemComponent implements OnInit {

  ativosMonitorados: MonitorListagem[];

  constructor(private monitorService: MonitorService) {}

  ngOnInit(): void {
    this.monitorService.getAtivosMonitorados().subscribe(dados => {
      this.ativosMonitorados = dados;
    });
  }

}
