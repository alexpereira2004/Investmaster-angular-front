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

    const listaAporteProprioMensal: number[] = Array.from({ length: 12 }, (_, i) => {
      const mesKey = (i + 1).toString();
      return this.detalheInvestimentoAnualResponse.aporteProprioMensalMap[mesKey] ?? 0;
    });

    const listaTotalizadorMensal: number[] = listaRendaFixaMensal.map(
      (rendaFixa, index) => rendaFixa + listaAporteProprioMensal[index]
    );

    const listaProjecaoInicialAportesAcumulada     = this.calcularValoresAcumulados(this.detalheInvestimentoAnualResponse?.projecaoInicialAportes);
    const listaAporteProprioMensalAcumulada        = this.calcularValoresAcumulados(this.detalheInvestimentoAnualResponse?.aporteProprioMensalMap);
    let listaprojecaoFuturaAportesAcumulada        = this.calcularProjecaoFutura(this.detalheInvestimentoAnualResponse?.projecaoFuturaAportes, listaAporteProprioMensalAcumulada);

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
          data: listaAporteProprioMensal
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
          data: listaTotalizadorMensal
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
          data: listaProjecaoInicialAportesAcumulada
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
          data: listaAporteProprioMensalAcumulada
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
          data: listaprojecaoFuturaAportesAcumulada
        }
      ]
    };
  }

  private calcularValoresAcumulados(mapa: Record<string, number> | undefined, offset: number = 0 ): (number | null)[] {
    let acumulado = 0;

    return Array.from({ length: 12 }, (_, i) => {
      const mesKey = (i + 1).toString();
      const valorMes = mapa?.[mesKey];

      if (valorMes !== undefined && valorMes !== null && valorMes > 0) {
        acumulado += valorMes + offset;
        return acumulado;
      }

      return null;
    });
  }

  private calcularProjecaoFutura(
    mapaProjecao: Record<string, number> | undefined,
    listaAlcançado: (number | null)[]
  ): (number | null)[] {

    let ultimoIndiceAlcançado = -1;
    for (let i = listaAlcançado.length - 1; i >= 0; i--) {
      if (listaAlcançado[i] !== null && listaAlcançado[i] !== undefined) {
        ultimoIndiceAlcançado = i;
        break;
      }
    }

    if (ultimoIndiceAlcançado === -1) {
      return Array(12).fill(null);
    }

    const valorInicialReal = listaAlcançado[ultimoIndiceAlcançado]!;
    let acumuladoFuturo = valorInicialReal;

    return Array.from({ length: 12 }, (_, i) => {
      // Para os meses ANTERIORES ao último mês realizado, fica null
      if (i < ultimoIndiceAlcançado) {
        return null;
      }

      if (i === ultimoIndiceAlcançado) {
        return valorInicialReal;
      }

      const mesKey = (i + 1).toString();
      const projecaoMes = mapaProjecao?.[mesKey] ?? 0;

      acumuladoFuturo += projecaoMes;
      return acumuladoFuturo;
    });
  }

}
