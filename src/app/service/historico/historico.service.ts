import { Injectable } from '@angular/core';
import { AtivoDividendoWrapper } from "../../model/ativo-dividendo-wrapper";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private baseUrl = environment.portalApi.baseUrl;
  private recursos = environment.portalApi.recurso;

  constructor(private httpClient: HttpClient) {}

  pesquisar(valores: any) {
    var url = this.baseUrl
      + this.recursos.cotacaoHistorico;

    let params = new HttpParams();

    if (valores?.ativos && valores.ativos.length > 0) {
      params = params.set('ativos', valores.ativos.join(','));
    }

    if (valores?.dataInicio) {
      params = params.set('dataInicio', valores.dataInicio);
    }

    if (valores?.dataFim) {
      params = params.set('dataFim', valores.dataFim);
    }

    return this.httpClient.get<AtivoDividendoWrapper>(url, { params });
  }
}
