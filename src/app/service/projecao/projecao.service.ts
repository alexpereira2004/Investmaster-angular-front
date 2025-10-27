import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { PageSpring } from "../../model/page-spring";
import { HttpClient } from "@angular/common/http";
import { ProjecaoResponse } from "../../model/dto/ProjecaoResponse";

@Injectable({
  providedIn: 'root'
})
export class ProjecaoService {

  constructor(private httpClient: HttpClient) { }

  buscarDados(anoLista: number [], tipoLista: string[]) {
    const url = environment.portalApi.baseUrl + environment.portalApi.recurso.projecao;
    const params: any = {};

      params['sort'] = ['ano,asc', 'mes,asc'];
      params['size'] = 1000;
      params['anoLista'] = anoLista;
      params['totalizador'] = 0;
      params['tipoLista'] = tipoLista;


    return this.httpClient.get<PageSpring<ProjecaoResponse>>(url, {params: params});

  }

  buscarAnosComProjecao() {
    const url = environment.portalApi.baseUrl + environment.portalApi.recurso.projecaoAnos;
    return this.httpClient.get<number[]>(url);
  }

  atualizarIndices() {
    const url = environment.portalApi.baseUrl + environment.portalApi.recurso.atualizarIndices;
    return this.httpClient.post(url, null);
  }
}
