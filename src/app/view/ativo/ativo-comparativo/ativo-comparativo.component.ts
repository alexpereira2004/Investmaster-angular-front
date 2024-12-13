import { Component, OnInit } from '@angular/core';
import { Select2Data } from "ng-select2-component";
import { AtivoService } from "../../../service/ativo/ativo.service";
import { Ativo } from "../../../model/ativo";
import { Chart } from "chart.js";
import { ChartConfiguration } from "chart.js/auto";
import { DividendoService } from "../../../service/dividendo/dividendo.service";
import { AtivoDividendoWrapper } from "../../../model/ativo-dividendo-wrapper";
import { CoresAleatoriasService } from "../../../service/util/cores-aleatorias.service";

@Component({
  selector: 'app-ativo-comparativo',
  templateUrl: './ativo-comparativo.component.html',
  styleUrl: './ativo-comparativo.component.css'
})
export class AtivoComparativoComponent implements OnInit {
  model = {
    ativos: [],
    periodicidadeTeste: '',
    ativosSelecionados: []
  };
  listaDeAtivosExistentes: Select2Data = [];
  value: number[] = [];

  public barChart: any;


  constructor(private ativoService: AtivoService,
              private dividendoService: DividendoService,
              private corAleatoriaService: CoresAleatoriasService ) {}

  ngOnInit(): void {

    this.ativoService.pesquisarAtivosComDividendos().subscribe({
      next: (result: Ativo[]) => {
        this.listaDeAtivosExistentes = result.map(item => ({
          value: item.codigo,
          label: item.codigo
        }));
        this.value = [];
      },
      error: error => {
        console.error('Erro ao buscar dados dos Ativos com dividendo', error);
      }
    });
  }

  pesquisar(form: any) {
    console.log('oooi', form.value);
    this.dividendoService
      .pesquisarExtrato(form.value.ativosSelecionados, form.value.periodicidade)
      .subscribe({
        next: (result: AtivoDividendoWrapper) => {
          const valoresTotais: number[] = result
            .dividendos
            .map(fundo => fundo.valorTotal);
          this.createChart(valoresTotais, result.label, result);
        }
      });
  }

  createChart(valoresTotais: number[], label: string[], wrapper: AtivoDividendoWrapper ) {

    if (this.barChart) {
      this.destroyChart(); // Destrói o gráfico anterior, se existir
    }

    let newVar: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: label,
        datasets: []
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Dividendos Esperados x Alcançados'
          }
        }
      }
    };


    const resultado = this.processarAtivos(wrapper);

    console.log(resultado);

    let cor: { [key: string]: any } = {};

    resultado.map((item : any) => {
      if (!(item.codigo in cor)) {
        cor[item.codigo] = this.corAleatoriaService.get();
      }
      let ativoNovo = {
        label: item.codigo,
        data: item.valores,
        backgroundColor: cor[item.codigo],
        maxBarThickness: 40
      };
      newVar.data.datasets.push( ativoNovo );
    })

    // newVar.data.datasets.push( ativoNovo );


    this.barChart = new Chart("barChart", newVar);
  }

  destroyChart(): void {
    if (this.barChart) {
      this.barChart.destroy();
      this.barChart = undefined;
    }
  }

  processarAtivos(wrapper: AtivoDividendoWrapper) {
    const { dividendos, label } = wrapper;

    // 1. Identificar códigos distintos
    const ativos = Array.from(new Set(dividendos.map((d) => d.codigo)));

    // 2. Processar dados
    const resultado = ativos.map((codigo) => {
      const valores = label.map((data) => {
        const dividendo = dividendos.find((d) => {
          if (d.codigo === codigo && d.primeiroDividendo) {
            const [ano, mes, dia] = d.primeiroDividendo;
            const dataFormatada = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
            return dataFormatada.startsWith(data);
          }
          return false;
        });
        return dividendo ? dividendo.valorTotal : 0;
      });

      return {
        codigo,
        valores, // Lista de valores para cada mês
      };
    });

    return resultado;
  }

}
