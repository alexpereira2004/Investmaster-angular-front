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
      type: 'line',
      data: {
        labels: ['jan', 'feb', 'mar', 'april', 'may', 'june', 'july', 'aug'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });
  }
}
