import { Component, OnInit } from '@angular/core';
import Chart, { ChartConfiguration, ChartDataset } from 'chart.js/auto';
import { ProjecaoService } from "../../../service/projecao/projecao.service";

@Component({
  selector: 'app-dividendo-esperado-alcancado',
  templateUrl: './dividendo-esperado-alcancado.component.html',
  styleUrls: ['./dividendo-esperado-alcancado.component.css']
})
export class DividendoEsperadoAlcancadoComponent implements OnInit {
  constructor(private projecaoService: ProjecaoService) {}

  ngOnInit(): void {
    this.createChart();
  }

  public lineChart: any;
  public teste: any;

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

        let alcancadoLista: number[] = [];
        let projetadoLista: number[] = [];
        let totalAlcancadoLista: number[] = [];
        let totalizadorAlcancado: number = 0;
        let totalProjetadoLista: number[] = [];
        let totalizadorProjetado: number = 0;
        result.content.forEach(item => {

          if (item.tipo == 'A') {
            alcancadoLista.push(item.valorAlcancado);
            totalizadorAlcancado += item.valorAlcancado;
            if (item.valorAlcancado > 0 ) {
              totalAlcancadoLista.push(totalizadorAlcancado);
            }

            projetadoLista.push(item.valor);
            totalizadorProjetado += item.valor;
            totalProjetadoLista.push(totalizadorProjetado);
          }

        });

        let alcancado :ChartDataset<'bar'> = {
          label: 'Alcançado',
          data: alcancadoLista,
          borderColor: 'rgb(201,191,129)',
          backgroundColor: 'rgb(201,191,129)',
          order: 2
        };

        let projetado :ChartDataset<'bar'> = {
          label: 'Projetado',
          data: projetadoLista,
          borderColor: 'rgb(206,125,125)',
          backgroundColor: 'rgb(200, 150, 150)',
          order: 3
        };

        let total :ChartDataset<'line'> = {
          label: 'Total Alcançado',
          data: totalAlcancadoLista,
          borderColor: 'rgb(255,202,0)',
          backgroundColor: 'rgb(255,195,0)',
          type: 'line',
          order: 0
        };

        let totalProjetado :ChartDataset<'line'> = {
          label: 'Total Projetado',
          data: totalProjetadoLista,
          borderColor: 'rgb(250,0,0)',
          backgroundColor: 'rgb(255,0,0)',
          type: 'line',
          order: 1
        }
        newVar.data.datasets.push(alcancado, projetado, total, totalProjetado);

        this.lineChart = new Chart('lineChart', newVar );
        // this.lineChart2 = new Chart('lineChart');
      },
    // this.teste = new Chart('lineChart', {});
    });


  }
}
