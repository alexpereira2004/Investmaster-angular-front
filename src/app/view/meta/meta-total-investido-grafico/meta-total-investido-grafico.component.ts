import { Component, OnInit } from '@angular/core';
import { EChartsOption } from "echarts/types/dist/echarts";

@Component({
  standalone: false,
  selector: 'app-meta-total-investido-grafico',
  templateUrl: './meta-total-investido-grafico.component.html',
  styleUrl: './meta-total-investido-grafico.component.css'
})
export class MetaTotalInvestidoGraficoComponent implements OnInit {
  chartOption: EChartsOption = {};

  ngOnInit(): void {
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
            formatter: function(value) {
              return 'R$ ' + value;
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
            color: '#93c5fd' // Azul pastel discreto
          },
          tooltip: {
            valueFormatter: function (value) {
              return 'R$ ' + value;
            }
          },
          data: [1000, 1000, 1000, 1000, 1000, 1000]
        },
        {
          name: 'Próprio',
          type: 'bar',
          itemStyle: {
            color: '#fef08a' // Amarelo pastel suave
          },
          tooltip: {
            valueFormatter: function (value) {
              return 'R$ ' + value;
            }
          },
          data: [4000, 4000, 4000, 4000, 4000, 4000]
        },
        {
          name: 'Total',
          type: 'bar',
          itemStyle: {
            color: '#86efac' // Verde pastel suave
          },
          tooltip: {
            valueFormatter: function (value) {
              return 'R$ ' + value;
            }
          },
          data: [5000, 5000, 5000, 5000, 5000, 5000]
        },
        {
          name: 'Estimado',
          type: 'line',
          smooth: true, // Curva suave para visual moderno
          yAxisIndex: 0,
          lineStyle: {
            color: '#a8a29e', // Cinza neutro elegante para a meta base
            width: 2
          },
          itemStyle: {
            color: '#a8a29e'
          },
          tooltip: {
            valueFormatter: function (value) {
              return 'R$ ' + value;
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
            color: '#2563eb', // Azul royal marcante para o dinheiro real alcançado
            width: 3
          },
          itemStyle: {
            color: '#2563eb'
          },
          tooltip: {
            valueFormatter: function (value) {
              return 'R$ ' + value;
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
            color: '#dc2626', // Vermelho/Coral corporativo destacado para o futuro estimado
            width: 2
          },
          itemStyle: {
            color: '#dc2626'
          },
          tooltip: {
            valueFormatter: function (value) {
              return 'R$ ' + value;
            }
          },
          data: [null, null, null, null, null, null, 29000, 33500, 38600, 42700, 46800, 51000]
        }
      ]
    };
  }
}
