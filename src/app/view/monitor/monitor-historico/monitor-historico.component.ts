import { Component, Input, OnInit } from '@angular/core';
import { AtivoHistorico } from "../../../model/ativo-historico";
import { HistoricoService } from "../../../service/historico/historico.service";
import { Options } from "@angular-slider/ngx-slider";
import { DataMinimaMaxima } from "../../../model/dto/data-minima-maxima";

@Component({
  standalone: false,
  selector: 'app-monitor-historico',
  templateUrl: './monitor-historico.component.html',
  styleUrl: './monitor-historico.component.css'
})
export class MonitorHistoricoComponent implements OnInit {

  @Input() historico: AtivoHistorico;

  componenteSelecionado: string | null = null;

  inicioTimestamp: number = 0;
  fimTimestamp: number = 1;
  opcoes: Options = {
    floor: 0,
    ceil: 1,
    step: 1,
    translate: (value: number) => value.toString()
  };
  carregando = true;

  constructor(private historicoService: HistoricoService) {}

  ngOnInit(): void {
    this.historicoService.dataMinimaMaxima(this.historico.codigo).subscribe({
      next: (dados) => {
        this.atualizarRange(dados);
      },
      error: (err) => console.error('Erro ao buscar Data Mínima e Máxima', err)
    });
  }

  atualizar(dataInicio: Date, dataFim: Date) {
    if (!this.historico?.codigo) return;

    const formatar = (d: Date): string => {
      const ano = d.getFullYear();
      const mes = String(d.getMonth() + 1).padStart(2, '0');
      const dia = String(d.getDate()).padStart(2, '0');
      return `${ano}-${mes}-${dia}`;
    };

    const valores = {
      ativos: [this.historico.codigo],
      dataInicio: formatar(dataInicio),
      dataFim: formatar(dataFim)
    };

    this.historicoService.pesquisar(valores).subscribe({
      next: (dados) => (this.historico = dados[0]),
      error: (err) => console.error('Erro ao atualizar histórico', err)
    });
  }

  pesquisarHistorico() {
    const dataInicio = new Date(this.inicioTimestamp);
    const dataFim = new Date(this.fimTimestamp);
    this.atualizar(dataInicio, dataFim);
  }

  private atualizarRange(dados: DataMinimaMaxima) {

    let dataInicial;
    dataInicial = new Date(dados.minima);
    this.inicioTimestamp = dataInicial.getTime();

    let dataFim;
    dataFim = new Date(dados.maxima);
    this.fimTimestamp = dataFim.getTime();

    this.opcoes = {
      floor: this.inicioTimestamp,
      ceil: this.fimTimestamp,
      step: 24 * 60 * 60 * 1000, // 1 dia em milissegundos
      translate: (value: number): string => {
        const data = new Date(value);
        return data.toLocaleDateString('pt-BR');
      }
    }
  }
}
