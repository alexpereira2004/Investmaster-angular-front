import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { MonitorListagem } from "../../model/monitor-listagem";

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private ativosMonitorados: MonitorListagem[] = [
    { codigo: 'BBAS3', nome: 'Banco do Brasil', situacao: 'situacao-1' },
    { codigo: 'BBSE3', nome: 'BB Seguridade', situacao: 'situacao-2'},
    { codigo: 'VALE3', nome: 'Vale', situacao: 'situacao-3'},
    { codigo: 'PETR4', nome: 'Petrobrás', situacao: 'situacao-4'},
    { codigo: 'BRAP4', nome: 'Bradespar', situacao: 'situacao-5'},
    { codigo: 'VLID3', nome: 'Vallid', situacao: 'situacao-5'},
    { codigo: 'CXSE3', nome: 'Caixa Seguridade', situacao: 'situacao-6'},
    { codigo: 'AGRO3', nome: 'MFII11', situacao: 'situacao-7'},
    { codigo: 'MTRE3', nome: 'MFII11', situacao: 'situacao-7'},
    { codigo: 'DCRA11', nome: 'DCRA11', situacao: 'situacao-8'},
    { codigo: 'GARE11', nome: 'GARE11', situacao: 'situacao-9'},
    { codigo: 'MXRF11', nome: 'FII MXRF11', situacao: 'situacao-10' }
  ];

  constructor() { }

  getAtivosMonitorados(): Observable<MonitorListagem[]> {
    return of(this.ativosMonitorados);
  }
}
