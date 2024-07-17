import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dividendo-esperado-alcancado',
  templateUrl: './dividendo-esperado-alcancado.component.html',
  styleUrls: ['./dividendo-esperado-alcancado.component.css']
})
export class DividendoEsperadoAlcancadoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  public lineChart: any;

  createChart() {
    this.lineChart = new Chart('lineChart', {
      type: 'bar',
      data: {
        labels: ['jan', 'feb', 'mar', 'april', 'may', 'june', 'july', 'aug'],
        datasets: [
          {
            label: 'Barra 1',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: 'rgb(201,191,129)',
            backgroundColor: 'rgb(201,191,129)',
            order: 2
          },
          {
            label: 'Barra 2',
            data: [50, 40, 30, 20, 10, 5, 1],
            borderColor: 'rgb(206,125,125)',
            backgroundColor: 'rgb(200, 150, 150)',
            order: 3
          },
          {
            label: 'Linha 1',
            data:  [50, 51, 54, 59, 65, 69, 70],
            borderColor: 'rgb(255,202,0)',
            backgroundColor: 'rgb(255,195,0)',
            type: 'line',
            order: 0
          },
          {
            label: 'Linha 2',
            data:  [40, 55, 40, 60, 30, 70, 20],
            borderColor: 'rgb(250,0,0)',
            backgroundColor: 'rgb(255,0,0)',
            type: 'line',
            order: 1
          }
        ],
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
    });
  }
}
