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
    { codigoAtivo: 'BBAS3', nome: 'Banco do Brasil', situacao: 'situacao-1' },
    { codigoAtivo: 'BBSE3', nome: 'BB Seguridade', situacao: 'situacao-2'},
    { codigoAtivo: 'VALE3', nome: 'Vale', situacao: 'situacao-3'},
    { codigoAtivo: 'PETR4', nome: 'Petrobrás', situacao: 'situacao-4'},
    { codigoAtivo: 'BRAP4', nome: 'Bradespar', situacao: 'situacao-5'},
    { codigoAtivo: 'VLID3', nome: 'Vallid', situacao: 'situacao-5'},
    { codigoAtivo: 'AGRO3', nome: 'MFII11', situacao: 'situacao-7'},
    { codigoAtivo: 'MTRE3', nome: 'MFII11', situacao: 'situacao-7'},
    { codigoAtivo: 'DCRA11', nome: 'DCRA11', situacao: 'situacao-8'},
    { codigoAtivo: 'GARE11', nome: 'GARE11', situacao: 'situacao-9'},
    { codigoAtivo: 'MXRF11', nome: 'FII MXRF11', situacao: 'situacao-10' },
    { codigoAtivo: 'VLID3', nome: 'VLID3', situacao: 'situacao-10' },
    { codigoAtivo: 'CXSE3', nome: 'Caixa Seguridade', situacao: 'situacao-6'}
  ];

  constructor(
    private httpClient: HttpClient,
    private util: ApiRequestsService
  ) {
    this.baseUrl = environment.portalApi.baseUrl;
    this.recursos = environment.portalApi.recurso;
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
