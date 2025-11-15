import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AtivoService } from "../../../service/ativo/ativo.service";
import { Ativo } from "../../../model/ativo";
import { HistoricoService } from "../../../service/historico/historico.service";
import { AtivoHistorico } from "../../../model/ativo-historico";
import { MonitorService } from "../../../service/monitor/monitor.service";
import { MonitorFilter } from "../../../model/filter/monitor-filter";
import { PageSpring } from "../../../model/page-spring";
import { Monitor } from "../../../model/monitor";
import Swal from "sweetalert2";

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
  monitor: Monitor;

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
    this.descobrirMonitorOuCriarNovo(codigo);
    this.pesquisarDadosHistoricos(codigo);
  }

  private descobrirMonitorOuCriarNovo(codigo: string) {
    let filter: MonitorFilter = {} as MonitorFilter;
    filter.ativoCodigo = codigo;
    filter.status = "ATIVO";
    filter.sort = 'id,desc';

    this.monitorService.pesquisarComFiltroPaginado(filter).subscribe({
      next: (result: PageSpring<Monitor>) => {
        this.monitor = result.content[0];
        if (!this.monitor) {
          Swal.fire({
            title: 'Esse ativo ainda não possui um monitor, deseja criar?',
            text: "Para poder criar regras de monitoramento é preciso criar um monitor. Depois de criado é possível acessar a página específica para editar as configurações.",
            icon: 'warning',
            confirmButtonText: 'Sim, criar um novo monitor!',
            showCancelButton: true,
            cancelButtonText: 'Não, cancelar a ação',
          }).then((result) => {
            if (result.isConfirmed) {
              this.criarMonitor();
            }
          });
        }

      },
      error: (err) => console.error('Erro ao pesquisar Monitor Com Filtro Paginado', err)
    });
  }

  private criarMonitor() {
    let monitor: Monitor = {} as Monitor;
    monitor.status = 'ATIVO';
    monitor.ativoCodigo = this.codigoAtivoSelecionado;

    this.monitorService.criar(monitor).subscribe({
      next: () => {
        this.descobrirMonitorOuCriarNovo(this.codigoAtivoSelecionado);
      }
    });
  }

  private pesquisarDadosHistoricos(codigo: string) {
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
