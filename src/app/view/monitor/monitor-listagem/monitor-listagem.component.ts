import { Component } from '@angular/core';
import { MonitorListagem } from "../../../model/monitor-listagem";

@Component({
  selector: 'app-monitor-listagem',
  templateUrl: './monitor-listagem.component.html',
  styleUrl: './monitor-listagem.component.css'
})
export class MonitorListagemComponent {
  ativosMonitorados: MonitorListagem[] = [
    { codigo: 'BBAS3', nome: 'Banco do Brasil', situacao: 'situacao-1' },
    { codigo: 'PETR4', nome: 'Petrobrás', situacao: 'situacao-2'},
    { codigo: 'PETR4', nome: 'Petrobrás', situacao: 'situacao-3'},
    { codigo: 'PETR4', nome: 'Petrobrás', situacao: 'situacao-4'},
    { codigo: 'PETR4', nome: 'Petrobrás', situacao: 'situacao-5'},
    { codigo: 'PETR4', nome: 'Petrobrás', situacao: 'situacao-6'},
    { codigo: 'PETR4', nome: 'Petrobrás', situacao: 'situacao-7'},
    { codigo: 'PETR4', nome: 'Petrobrás', situacao: 'situacao-8'},
    { codigo: 'PETR4', nome: 'Petrobrás', situacao: 'situacao-9'},
    { codigo: 'MXRF11', nome: 'FII MXRF11', situacao: 'situacao-10' }
  ];

}
