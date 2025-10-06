import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { MonitorListagem } from "../../model/monitor-listagem";

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private ativosMonitorados: MonitorListagem[] = [
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

  constructor() { }

  getAtivosMonitorados(): Observable<MonitorListagem[]> {
    return of(this.ativosMonitorados);
  }
}
