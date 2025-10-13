import { Component, OnInit } from '@angular/core';
import { EChartsOption } from "echarts/types/dist/echarts";

@Component({
  standalone: false,
  selector: 'app-dividendo-cadastro',
  templateUrl: './dividendo-cadastro.component.html',
  styleUrls: ['./dividendo-cadastro.component.css']
})
export class DividendoCadastroComponent implements OnInit {

  chartOptionBarras: EChartsOption = {};
  chartOption: EChartsOption = {};

  ngOnInit() {
    this.criarDadosParaGraficoDeBarras();
    this.criarDadosParaTreMap();
  }

  private criarDadosParaTreMap() {
    this.chartOption = {
      title: {
        text: 'Exemplo de Gráfico Treemap: Uso de Disco',
        left: 'center'
      },
      tooltip: {
        formatter: function (info: any) {
          const value = info.value;
          const treePathInfo = info.treePathInfo;
          const treePath = [];
          for (let i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name);
          }
          return [
            '<div class="tooltip-title">' + treePath.join('/') + '</div>',
            'Tamanho: ' + value + 'MB'
          ].join('');
        }
      },
      series: [
        {
          type: 'treemap',
          id: 'disk-usage',
          name: 'Uso de Disco',
          data: [
            {
              name: 'Pasta A',
              value: 100,
              children: [
                {name: 'Subpasta A1', value: 30},
                {
                  name: 'Subpasta A2', value: 70, children: [
                    {name: 'Arquivo A2.1', value: 40},
                    {name: 'Arquivo A2.2', value: 30}
                  ]
                }
              ]
            },
            {
              name: 'Pasta B',
              value: 200,
              children: [
                {name: 'Subpasta B1', value: 120},
                {name: 'Subpasta B2', value: 80}
              ]
            },
            {
              name: 'Pasta C',
              value: 50,
              children: [
                {name: 'Arquivo C1', value: 20},
                {name: 'Arquivo C2', value: 30}
              ]
            }
          ],
          leafDepth: 1, // Exibe apenas o primeiro nível de folhas
          label: {
            show: true,
            formatter: '{b}' // Mostra o nome do nó
          },
          itemStyle: {
            borderColor: '#fff'
          },
          levels: [
            {
              itemStyle: {
                borderColor: '#777',
                borderWidth: 0,
                gapWidth: 1
              },
              upperLabel: {
                show: false
              }
            },
            {
              itemStyle: {
                borderColor: '#555',
                borderWidth: 5,
                gapWidth: 1
              },
              emphasis: {
                itemStyle: {
                  borderColor: '#ddd'
                }
              }
            },
            {
              itemStyle: {
                borderColor: '#555',
                borderWidth: 0,
                gapWidth: 1
              },
              emphasis: {
                itemStyle: {
                  borderColor: '#ddd'
                }
              }
            }
          ]
        }
      ]
    };
  }

  private criarDadosParaGraficoDeBarras() {
    this.chartOptionBarras = {
      title: {
        text: 'Gráfico de Barras'
      },
      tooltip: {},
      legend: {
        data: ['Vendas']
      },
      xAxis: {
        data: ['Camisa', 'Calça', 'Sapato', 'Meia', 'Cachecol']
      },
      yAxis: {},
      series: [{
        name: 'Vendas',
        type: 'bar',
        data: [5, 20, 36, 10, 10]
      }]
    };
  }
}
