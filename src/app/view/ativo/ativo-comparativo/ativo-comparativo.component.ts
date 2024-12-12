import { Component, OnInit } from '@angular/core';
import { Select2Data } from "ng-select2-component";
import { AtivoService } from "../../../service/ativo/ativo.service";
import { Ativo } from "../../../model/ativo";
import { Chart } from "chart.js";
import { ChartConfiguration } from "chart.js/auto";

@Component({
  selector: 'app-ativo-comparativo',
  templateUrl: './ativo-comparativo.component.html',
  styleUrl: './ativo-comparativo.component.css'
})
export class AtivoComparativoComponent implements OnInit {
  model = {
    ativos: [],
    periodicidade: ''
  };
  listaDeAtivosExistentes: Select2Data = [];
  value: number[] = [];

  public barChart: any;

  constructor(private ativoService: AtivoService) {}

  ngOnInit(): void {

    this.createChart();

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

  createChart() {

    let newVar: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
        datasets: [{
          label: 'BBAS3',
          data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 20, 25],
          backgroundColor: 'green',
          maxBarThickness: 40
        },{
          label: 'MXRF11',
          backgroundColor: 'yellow',
          borderWidth: 1,
          borderColor: 'black',
          maxBarThickness: 40,
          data: [10, 20, 30, 40, 50, 60, 70]
        }]
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

    let ativoNovo = {
      label: 'VALE3',
      data: [0, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 20, 25],
      backgroundColor: 'rgb(0,255,215)',
      maxBarThickness: 40
    };

    newVar.data.datasets.push( ativoNovo );

    this.barChart = new Chart("barChart", newVar);
  }

}
