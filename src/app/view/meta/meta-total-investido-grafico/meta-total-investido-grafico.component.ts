import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from "echarts/types/dist/echarts";
import { MoedaService } from "../../../service/util/moeda.service";
import { CategoriaAnoFilter } from "../../../service/meta/filter/categoria-ano-filter";
import { DetalheInvestimentoAnualResponse } from "../../../model/dto/DetalheInvestimentoAnualResponse";
import { MetaService } from "../../../service/meta/meta.service";

@Component({
  standalone: false,
  selector: 'app-meta-total-investido-grafico',
  templateUrl: './meta-total-investido-grafico.component.html',
  styleUrls: ['./meta-total-investido-grafico.component.css',
              '../../dashboard/principal/principal.component.css']
})
export class MetaTotalInvestidoGraficoComponent implements OnInit {
  @Input() ano!: number;
  chartOption: EChartsOption = {};
  detalheInvestimentoAnualResponse : DetalheInvestimentoAnualResponse | undefined;

  constructor(private moedaService: MoedaService,
              private metaService: MetaService) {
  }



  ngOnInit(): void
  {
    this.pesquisarMetaAnualBruta();
  }


  pesquisarMetaAnualBruta() {
    let filter: CategoriaAnoFilter = {} as CategoriaAnoFilter;
    filter.ano = this.ano;
    this.metaService.pesquisarMetaAnualBrupoPorAno(filter).subscribe({
      next: (resultado: DetalheInvestimentoAnualResponse) => {
        this.detalheInvestimentoAnualResponse = resultado;
        this.montarGrafico();
      },
      error: (err) => {
        console.error('Erro ao buscar os dados para Gráfico Projeção de Investimentos Próprios', err);
      }
    });

  }

  montarGrafico() {
    const formatador = (val: number) => this.moedaService.formatarParaReal(val);

    const listaRendaFixaMensal: number[] = Array.from({ length: 12 }, (_, i) => {
      const mesKey = (i + 1).toString();
      return this.detalheInvestimentoAnualResponse.rendaFixaMensalMap[mesKey] ?? 0;
    });
n



    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        // Corrigido para exibir os nomes certos das suas séries na legenda
        data: ['Renda Fixa', 'Próprio', 'Total', 'Estimado', 'Alcançado', 'Projeção Futura'],
        bottom: 0 // Posiciona a legenda elegantemente no rodapé
      },
      xAxis: [
        {
          type: 'category',
          data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Valores',
          min: 0,
          max: 60000,
          interval: 10000,
          axisLabel: {
            // Formata os valores do eixo Y para a moeda brasileira simplificada
            formatter: function(value: number) {
              return formatador(value);
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed', // Linhas horizontais de fundo tracejadas (mais discreto)
              color: '#e5e7eb'
            }
          }
        }
      ],
      series: [
        {
          name: 'Renda Fixa',
          type: 'bar',
          itemStyle: {
            color: '#93c5fd'
          },
          tooltip: {
            valueFormatter: (value: any) => {
              const valorNumerico = Number(value);
              return this.moedaService.formatarParaReal(valorNumerico);
            }

          },
          data: listaRendaFixaMensal
        },
        {
          name: 'Próprio',
          type: 'bar',
          itemStyle: {
            color: '#fef08a'
          },
          tooltip: {
            valueFormatter: (value: any) => {
              const valorNumerico = Number(value);
              return this.moedaService.formatarParaReal(valorNumerico);
            }
          },
          data: [4000, 4000, 4000, 4000, 4000, 4000]
        },
        {
          name: 'Total',
          type: 'bar',
          itemStyle: {
            color: '#86efac'
          },
          tooltip: {
            valueFormatter: (value: any) => {
              const valorNumerico = Number(value);
              return this.moedaService.formatarParaReal(valorNumerico);
            }
          },
          data: [5000, 5000, 5000, 5000, 5000, 5000]
        },
        {
          name: 'Estimado',
          type: 'line',
          smooth: true,
          yAxisIndex: 0,
          lineStyle: {
            color: '#a8a29e',
            width: 2
          },
          itemStyle: {
            color: '#a8a29e'
          },
          tooltip: {
            valueFormatter: (value: any) => {
              const valorNumerico = Number(value);
              return this.moedaService.formatarParaReal(valorNumerico);
            }
          },
          data: [4000, 8000, 12000, 16000, 20000, 24000, 28000, 32000, 36000, 40000, 44000, 48000]
        },
        {
          name: 'Alcançado',
          type: 'line',
          smooth: true,
          yAxisIndex: 0,
          lineStyle: {
            color: '#2563eb',
            width: 3
          },
          itemStyle: {
            color: '#2563eb'
          },
          tooltip: {
            valueFormatter: (value: any) => {
              const valorNumerico = Number(value);
              return this.moedaService.formatarParaReal(valorNumerico);
            }
          },
          data: [4000, 8000, 12500, 16500, 20500, 25000, 29000]
        },
        {
          name: 'Projeção Futura',
          type: 'line',
          smooth: true,
          yAxisIndex: 0,
          lineStyle: {
            type: 'dashed',
            color: '#dc2626',
            width: 2
          },
          itemStyle: {
            color: '#dc2626'
          },
          tooltip: {
            valueFormatter: (value: any) => {
              const valorNumerico = Number(value);
              return this.moedaService.formatarParaReal(valorNumerico);
            }
          },
          data: [null, null, null, null, null, null, 29000, 33500, 38600, 42700, 46800, 51000]
        }
      ]
    };
  }
}
