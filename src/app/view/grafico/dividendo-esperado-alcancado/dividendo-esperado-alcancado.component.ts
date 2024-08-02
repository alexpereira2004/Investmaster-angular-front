import { Component, OnInit } from '@angular/core';
import Chart, { ChartConfiguration, ChartDataset } from 'chart.js/auto';
import { ProjecaoService } from "../../../service/projecao/projecao.service";
import { Select2Data, Select2UpdateEvent } from "ng-select2-component";

@Component({
  selector: 'app-dividendo-esperado-alcancado',
  templateUrl: './dividendo-esperado-alcancado.component.html',
  styleUrls: ['./dividendo-esperado-alcancado.component.css']
})
export class DividendoEsperadoAlcancadoComponent implements OnInit {
  constructor(private projecaoService: ProjecaoService) {}

  listaDeAnosComProjecao: Select2Data = [];
  value: number[] = [];

  ngOnInit(): void {
    this.createChart();
    this.projecaoService.buscarAnosComProjecao().subscribe({
        next: (result: number[]) => {
          this.listaDeAnosComProjecao = result.map(item => ({
            value: item,
            label: item.toString()
          }));
          this.value = [2024]; // @Config
        },
        error: error => {
          console.error('Erro ao buscar dados dos anos das Projeções', error);
        }
    });
  }

  public lineChart: any;
  public teste: any;

  update(key: string, event: Select2UpdateEvent<any>) {
    console.log('update', event.component.id, event.value);
    this[key] = event.value;
  }

  createChart() {
    this.projecaoService.buscarDados().subscribe({
      next: (result) => {

        console.log(result.content);

        let newVar: ChartConfiguration<'bar' | 'line'> = {
          type: 'bar',
          data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [],
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
          },
        };

        let alcancadoLista: number[][] = [];
        let projetadoLista: number[][] = [];
        let totalAlcancadoLista: number[][] = [];
        let totalizadorAlcancado: { [key: number]: number } = {};
        let totalProjetadoLista: number[][] = [];
        let totalizadorProjetado: { [key: number]: number } = {};

        result.content.forEach(item => {
          if (!alcancadoLista[item.ano]) {
            alcancadoLista[item.ano] = [];
            projetadoLista[item.ano] = [];
            totalAlcancadoLista[item.ano] = [];
            totalProjetadoLista[item.ano] = [];
            totalizadorAlcancado[item.ano] = 0;
            totalizadorProjetado[item.ano] = 0;
          }

          if (item.tipo == 'A') {
            alcancadoLista[item.ano].push(item.valorAlcancado);
            totalizadorAlcancado[item.ano] += item.valorAlcancado;
            if (item.valorAlcancado > 0 ) {
              totalAlcancadoLista[item.ano].push(totalizadorAlcancado[item.ano]);
            }

            projetadoLista[item.ano].push(item.valor);
            totalizadorProjetado[item.ano] += item.valor;
            totalProjetadoLista[item.ano].push(totalizadorProjetado[item.ano]);
          }

        });

        alcancadoLista.forEach((item, ano) => {
          this.montarDados(
            ano,
            newVar,
            alcancadoLista[ano], projetadoLista[ano],
            totalAlcancadoLista[ano], totalProjetadoLista[ano]
          );
        })


        // newVar.data.datasets.push( projetado, alcancadoTotal, totalProjetado, alcancado);




        // result.content.forEach(item => {
        //
        // });

        this.lineChart = new Chart('lineChart', newVar );
        // this.lineChart2 = new Chart('lineChart');
      },
    // this.teste = new Chart('lineChart', {});
    });


  }

  montarDados(ano, newVar, alcancadoLista: number[], projetadoLista: number[], totalAlcancadoLista: number[], totalProjetadoLista: number[]) {
    let coresFracas: { [key: number]: string };
    let coresFortes: { [key: number]: string };
    coresFortes = {
      2022: 'rgb(255,200,0)',
      2023: 'rgb(255,111,0)',
      2024: 'rgb(68,255,0)',
      2025: 'rgb(0,64,255)'
    };
    coresFracas = {
      2022: 'rgb(255,255,80)',
      2023: 'rgb(255,150,80)',
      2024: 'rgb(112,255,80)',
      2025: 'rgb(80,89,255)',
    };

    let corFraca = coresFracas[ano];
    let corForte = coresFortes[ano];

    console.log(alcancadoLista);

    let alcancado :ChartDataset<'bar'> = {
      label: 'Alcançado '+ano,
      data: alcancadoLista,
      borderColor: corFraca,
      backgroundColor: corFraca,
      order: 2
    };

    let projetado :ChartDataset<'bar'> = {
      label: 'Projetado',
      data: projetadoLista,
      borderColor: corForte,
      backgroundColor: corForte,
      order: 3
    };

    let totalAlcancado :ChartDataset<'line'> = {
      label: 'Total Alcançado '+ano,
      data: totalAlcancadoLista,
      borderColor: corFraca,
      backgroundColor: corFraca,
      type: 'line',
      order: 0
    };

    let totalProjetado :ChartDataset<'line'> = {
      label: 'Total Projetado',
      data: totalProjetadoLista,
      borderColor: corForte,
      backgroundColor: corForte,
      type: 'line',
      order: 1
    }


    newVar.data.datasets.push( totalAlcancado, alcancado);

  }

  atualiza() {
    console.log('Teste Update');
    this.lineChart.data.datasets[0].data = [28, 48, 40, 19, 86, 27];
    this.lineChart.update();
  }
}
