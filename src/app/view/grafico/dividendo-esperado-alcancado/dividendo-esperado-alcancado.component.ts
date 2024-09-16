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
  model = {
    ano: [],
    tipoAcao: '',
    tipoFii: '',
    tipoBdr: ''
  };




  coresFortes = {
    2020: 'rgb(139,0,0)',
    2021: 'rgb(165,42,42)',
    2022: 'rgb(250,128,114)',
    2023: 'rgb(240,230,140)',
    2024: 'rgb(255,255,0)',
    2025: 'rgb(255,127,80)',
    2026: 'rgb(255,99,71)',
    2027: 'rgb(255,0,0)',
    2028: 'rgb(255,69,0)',
    2029: 'rgb(255,140,0)',
    2030: 'rgb(255,165,0)',
    2031: 'rgb(255,215,0)'
  }
  coresFracas = {
    2020: 'rgb(0,255,255)',
    2021: 'rgb(0,139,139)',
    2022: 'rgb(127,255,212)',
    2023: 'rgb(95,158,160)',
    2024: 'rgb(0,250,154)',
    2025: 'rgb(0,100,0)',
    2026: 'rgb(0,255,0)',
    2027: 'rgb(173,255,47)',
    2028: 'rgb(128,128,0)',
    2029: 'rgb(47,79,79)',
    2030: 'rgb(152,251,152)',
    2031: 'rgb(32,178,170)',
    2032: 'rgb(135,206,250)'
  };

  constructor(private projecaoService: ProjecaoService) {}

  listaDeAnosComProjecao: Select2Data = [];
  value: number[] = [];

  ngOnInit(): void {
    this.createChart([2024], ['A']); //@Config



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

  createChart(anoLista: number [], tipoLista: string[]) {
    this.projecaoService.buscarDados(anoLista, tipoLista).subscribe({
      next: (result) => {

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

        let lista: number[][][] = [];
        let totalAcumuladoLista: number[][][] = [];
        let totalizador: { [key: number]: { [key: number] : number }  } = {};


        result.content.forEach(item => {
          if (!lista[item.ano]) {
            lista[item.ano] = [];
            lista[item.ano]['A'] = [];
            lista[item.ano]['F'] = [];

            totalAcumuladoLista[item.ano] = [];
            totalAcumuladoLista[item.ano]['A'] = [];
            totalAcumuladoLista[item.ano]['F'] = [];

            totalizador[item.ano] = [];
            totalizador[item.ano]['A'] = 0;
            totalizador[item.ano]['F'] = 0;

          }

            lista[item.ano][item.tipo].push(item.valorAlcancado);
            totalizador[item.ano][item.tipo] += item.valorAlcancado;
            if (item.valorAlcancado > 0 ) {
              const totalizadorElementElement = totalizador[item.ano][item.tipo];
              totalAcumuladoLista[item.ano][item.tipo].push(totalizadorElementElement);
            }
        });

        lista.forEach((item, ano) => {
          this.montarDados(
            ano,
            'F',
            newVar,
            lista[ano]['F'],
            totalAcumuladoLista[ano]['F']
          );

          this.montarDados(
            ano,
            'A',
            newVar,
            lista[ano]['A'],
            totalAcumuladoLista[ano]['A']
          );
        })


        this.lineChart = new Chart('lineChart', newVar );
        // this.lineChart2 = new Chart('lineChart');
      },
    });


  }

  montarDados(ano, tipo, newVar, alcancadoLista: number[], totalAlcancadoLista: number[]) {

    let alcancado :ChartDataset<'bar'>;
    let totalAlcancado :ChartDataset<'line'>;

    let corForte = this.coresFortes[ano];
    let corFraca = this.coresFracas[ano];

    if (tipo == 'A') {

      alcancado = {
        label: 'Mensal Ações '+ano,
        data: alcancadoLista,
        borderColor: corForte,
        backgroundColor: corForte,
        order: ano
      };

      totalAlcancado = {
        label: 'Total Acumulado Ações'+ano,
        data: totalAlcancadoLista,
        borderColor: corForte,
        backgroundColor: corForte,
        type: 'line',
        order: ano + 20
      };
    } else {
      alcancado = {
        label: 'Mensal FII '+ano,
        data: alcancadoLista,
        borderColor: corFraca,
        backgroundColor: corFraca,
        order: ano + 102
      };

      totalAlcancado = {
        label: 'Total Acumulado FII ' + ano,
        data: totalAlcancadoLista,
        borderColor: corFraca,
        backgroundColor: corFraca,
        type: 'line',
        order: ano + 1003
      };
    }

    // let projetado :ChartDataset<'bar'> = {
    //   label: 'Projetado',
    //   data: projetadoLista,
    //   borderColor: corForte,
    //   backgroundColor: corForte,
    //   order: 3
    // };



    // let totalProjetado :ChartDataset<'line'> = {
    //   label: 'Total Projetado',
    //   data: totalProjetadoLista,
    //   borderColor: corForte,
    //   backgroundColor: corForte,
    //   type: 'line',
    //   order: 1
    // }


    newVar.data.datasets.push( totalAlcancado, alcancado);

  }

  update(event: Select2UpdateEvent<any>) {
    // console.log('update', event.component.id, event.value);
    // this[key] = event.value;
    // this.lineChart.destroy();
    // this.createChart(event.value);
  }

  atualizarPorTipo(event: Event) {
    // console.log('update', event);
    // console.log(event.target.checked);
    // this[key] = event.value;
    // this.lineChart.destroy();
    // this.createChart(event.value);
  }

  atualizar(form: any) {
    let tipoLista: string[] = [];
    if (form.value.tipoAcao) { tipoLista.push('A'); }
    if (form.value.tipoFii) { tipoLista.push('F'); }
    if (form.value.tipoBdr) { tipoLista.push('B'); }

    // this.lineChart.update();
    this.lineChart.destroy();
    this.createChart(form.value.ano, tipoLista);
  }
}
