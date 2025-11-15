import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Monitor } from "../../model/monitor";
import { environment } from "../../../environments/environment";
import { PageSpring } from "../../model/page-spring";
import { HttpClient } from "@angular/common/http";
import { ApiRequestsService } from "../util/api-requests.service";
import { MonitorFilter } from "../../model/filter/monitor-filter";

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private baseUrl;
  private recursos;

  private ativosMonitorados: Monitor[] = [
    { ativoCodigo: 'BBAS3', nome: 'Banco do Brasil', situacao: 'situacao-1' },
    { ativoCodigo: 'BBSE3', nome: 'BB Seguridade', situacao: 'situacao-2'},
    { ativoCodigo: 'VALE3', nome: 'Vale', situacao: 'situacao-3'},
    { ativoCodigo: 'PETR4', nome: 'Petrobrás', situacao: 'situacao-4'},
    { ativoCodigo: 'BRAP4', nome: 'Bradespar', situacao: 'situacao-5'},
    { ativoCodigo: 'VLID3', nome: 'Vallid', situacao: 'situacao-5'},
    { ativoCodigo: 'AGRO3', nome: 'MFII11', situacao: 'situacao-7'},
    { ativoCodigo: 'MTRE3', nome: 'MFII11', situacao: 'situacao-7'},
    { ativoCodigo: 'DCRA11', nome: 'DCRA11', situacao: 'situacao-8'},
    { ativoCodigo: 'GARE11', nome: 'GARE11', situacao: 'situacao-9'},
    { ativoCodigo: 'MXRF11', nome: 'FII MXRF11', situacao: 'situacao-10' },
    { ativoCodigo: 'VLID3', nome: 'VLID3', situacao: 'situacao-10' },
    { ativoCodigo: 'CXSE3', nome: 'Caixa Seguridade', situacao: 'situacao-6'}
  ];

  constructor(
    private httpClient: HttpClient,
    private util: ApiRequestsService
  ) {
    this.baseUrl = environment.portalApi.baseUrl;
    this.recursos = environment.portalApi.recurso;
  }

  criar(monitor: Monitor) {
    const url = environment.portalApi.baseUrl +
      environment.portalApi.recurso.monitor;
    return this.httpClient.post(url, monitor);
  }

  getAtivosMonitorados(): Observable<Monitor[]> {
    return of(this.ativosMonitorados);
  }

  pesquisarComFiltroPaginado(filter: MonitorFilter) {
    const url = environment.portalApi.baseUrl
      + environment.portalApi.recurso.monitorListagemPaginado;

    const params = this.util.buildParams(filter);

    return this.httpClient.get<PageSpring<Monitor>>(url, {params: params});
  }
}
