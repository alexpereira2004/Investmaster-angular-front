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

  coresAcao = {
    2020: 'rgb(255, 200, 200)', // vermelho bem claro
    2021: 'rgb(255, 40, 40)',
    2022: 'rgb(220, 0, 0)',
    2023: 'rgb(60, 0, 0)',       // vermelho mais escuro
    2024: 'rgb(255, 160, 160)',
    2025: 'rgb(255, 80, 80)',
    2026: 'rgb(255, 0, 0)',     // vermelho puro
    2027: 'rgb(120, 0, 0)',
    2028: 'rgb(255, 120, 120)',
    2029: 'rgb(180, 0, 0)',
    2030: 'rgb(150, 0, 0)',
    2031: 'rgb(90, 0, 0)'
  }
  coresFii = {
    2020: 'rgb(200, 200, 255)', // azul bem claro
    2021: 'rgb(80, 80, 255)',
    2022: 'rgb(0, 0, 220)',
    2023: 'rgb(0, 0, 90)',
    2024: 'rgb(160, 160, 255)',
    2025: 'rgb(120, 120, 255)',
    2026: 'rgb(0, 0, 255)',     // azul puro
    2027: 'rgb(0, 0, 60)',      // azul bem escuro
    2028: 'rgb(40, 40, 255)',
    2029: 'rgb(0, 0, 180)',
    2030: 'rgb(0, 0, 150)',
    2031: 'rgb(0, 0, 120)',
    2032: 'rgb(0, 0, 30)'       // quase preto azulado
  };

  coresBdr = {
    2020: 'rgb(200, 255, 200)', // verde bem claro
    2021: 'rgb(0, 255, 0)',     // verde puro
    2022: 'rgb(0, 150, 0)',
    2023: 'rgb(0, 70, 0)',      // verde bem escuro
    2024: 'rgb(160, 255, 160)',
    2025: 'rgb(120, 255, 120)',
    2026: 'rgb(80, 255, 80)',
    2027: 'rgb(0, 50, 0)',       // quase preto esverdeado
    2028: 'rgb(40, 255, 40)',
    2029: 'rgb(0, 180, 0)',
    2030: 'rgb(0, 90, 0)',
    2031: 'rgb(0, 120, 0)',
    2032: 'rgb(0, 220, 0)'
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
            lista[item.ano]['B'] = [];

            totalAcumuladoLista[item.ano] = [];
            totalAcumuladoLista[item.ano]['A'] = [];
            totalAcumuladoLista[item.ano]['F'] = [];
            totalAcumuladoLista[item.ano]['B'] = [];

            totalizador[item.ano] = [];
            totalizador[item.ano]['A'] = 0;
            totalizador[item.ano]['F'] = 0;
            totalizador[item.ano]['B'] = 0;

          }

            lista[item.ano][item.tipo].push(item.valorAlcancado);
            totalizador[item.ano][item.tipo] += item.valorAlcancado;
            const totalizadorElementElement = totalizador[item.ano][item.tipo];
            totalAcumuladoLista[item.ano][item.tipo].push(totalizadorElementElement);
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

          this.montarDados(
            ano,
            'B',
            newVar,
            lista[ano]['B'],
            totalAcumuladoLista[ano]['B']
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

    let corAcao = this.coresAcao[ano];
    let corFii = this.coresFii[ano];
    let corBdr = this.coresBdr[ano];

    if (tipo == 'A') {

      alcancado = {
        label: 'Mensal Ações '+ano,
        data: alcancadoLista,
        borderColor: corAcao,
        backgroundColor: corAcao,
        order: ano
      };

      totalAlcancado = {
        label: 'Total Acumulado Ações'+ano,
        data: totalAlcancadoLista,
        borderColor: corAcao,
        backgroundColor: corAcao,
        type: 'line',
        order: ano + 20
      };
    } else if (tipo == 'F') {
      alcancado = {
        label: 'Mensal FII '+ano,
        data: alcancadoLista,
        borderColor: corFii,
        backgroundColor: corFii,
        order: ano + 102
      };

      totalAlcancado = {
        label: 'Total Acumulado FII ' + ano,
        data: totalAlcancadoLista,
        borderColor: corFii,
        backgroundColor: corFii,
        type: 'line',
        order: ano + 1003
      };
    } else if (tipo == 'B') {
      alcancado = {
        label: 'Mensal BDR ' + ano,
        data: alcancadoLista,
        borderColor: corBdr,
        backgroundColor: corBdr,
        order: ano + 203
      };

      totalAlcancado = {
        label: 'Total Acumulado BDR ' + ano,
        data: totalAlcancadoLista,
        borderColor: corBdr,
        backgroundColor: corBdr,
        type: 'line',
        order: ano + 2004
      };
    }

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
