import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AtivoService } from "../../../service/ativo/ativo.service";
import { Ativo } from "../../../model/ativo";
import { HistoricoService } from "../../../service/historico/historico.service";
import { AtivoHistorico } from "../../../model/ativo-historico";
import { MonitorService } from "../../../service/monitor/monitor.service";

@Component({
  standalone: false,
  selector: 'app-monitor-cadastro',
  templateUrl: './monitor-cadastro.component.html',
  styleUrl: './monitor-cadastro.component.css'
})
export class MonitorCadastroComponent implements OnInit {

  public FRMregraMonitoramento!: FormGroup;
  ativoLista!: Ativo[];
  ativoHistorico: AtivoHistorico;
  codigoAtivoSelecionado: string;

  constructor(private formBuilder: FormBuilder,
              private ativoService: AtivoService,
              private historicoService: HistoricoService,
              private monitorService: MonitorService
  ) {
    this.FRMregraMonitoramento = this.formBuilder.group({
      ativo: [null, Validators.required],
      ativoSelecionado: [null, Validators.required],

    });
  }

  ngOnInit(): void {

    this.ativoService.pesquisarPaginado(0, 2000).subscribe({
      next: result => {
        this.ativoLista = result.content;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    });
  }


  onAtivoSelecionado(codigo: string) {
    this.codigoAtivoSelecionado = codigo;
    this.historicoService.pesquisar({
      ativos: [codigo],
      dataInicio: '2025-01-01',
      dataFim: '2025-12-31'
    }).subscribe({
      next: (dados) => {
        this.ativoHistorico = dados[0];
      },
      error: (err) => console.error('Erro ao buscar histórico', err)
    });
  }

  onSubmit() {
    const formValue = this.FRMregraMonitoramento.getRawValue();
    console.log(this.FRMregraMonitoramento.get('ativoSelecionado').value);
  }
}
