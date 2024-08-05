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
      2020: 'rgb(255,0,0)',
      2021: 'rgb(255,102,0)',
      2022: 'rgb(255,204,0)',
      2023: 'rgb(204,255,0)',
      2024: 'rgb(102,255,0)',
      2025: 'rgb(0,255,102)',
      2026: 'rgb(0,255,204)',
      2027: 'rgb(0,204,255)',
      2028: 'rgb(0,102,255)',
      2029: 'rgb(102,0,255)',
      2030: 'rgb(204,0,255)'
    }

    let corForte = coresFortes[ano];

    console.log(alcancadoLista);

    let order = ano + 1;

    let alcancado :ChartDataset<'bar'> = {
      label: 'Mensal '+ano,
      data: alcancadoLista,
      borderColor: corForte,
      backgroundColor: corForte,
      order: ano
    };

    let projetado :ChartDataset<'bar'> = {
      label: 'Projetado',
      data: projetadoLista,
      borderColor: corForte,
      backgroundColor: corForte,
      order: 3
    };

    let totalAlcancado :ChartDataset<'line'> = {
      label: 'Total Acumulado '+ano,
      data: totalAlcancadoLista,
      borderColor: corForte,
      backgroundColor: corForte,
      type: 'line',
      order: ano  + 1
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

  update(event: Select2UpdateEvent<any>) {
    console.log('update', event.component.id, event.value);
    // this[key] = event.value;
    // this.lineChart.destroy();
    // this.createChart(event.value);
  }

  atualizarPorTipo(event: Event) {
    console.log('update', event);
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
