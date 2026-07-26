import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiRequestsService } from "../util/api-requests.service";
import { environment } from "../../../environments/environment";
import { CategoriaAnoFilter } from "./filter/categoria-ano-filter";
import { Meta } from "../../model/meta";
import { DetalheInvestimentoAnualResponse } from "../../model/dto/DetalheInvestimentoAnualResponse";

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  private baseUrl;
  private recursos;

  constructor(
    private httpClient: HttpClient,
    private util: ApiRequestsService
  ) {
    this.baseUrl = environment.portalApi.baseUrl;
    this.recursos = environment.portalApi.recurso;
  }

  pesquisarPorCategoriaEAno(filter: CategoriaAnoFilter) {
    const url = environment.portalApi.baseUrl
      + environment.portalApi.recurso.metaCategoriaAno
        .replace('{categoria}', filter.categoria)
        .replace('{ano}', `${filter.ano}`);
    return this.httpClient.get<Meta>(url);
  }

  pesquisarMetaAnualBrupoPorAno(filter: CategoriaAnoFilter) {
    const url = environment.portalApi.baseUrl
      + environment.portalApi.recurso.metaAnualBruto
        .replace('{ano}', `${filter.ano}`);
    return this.httpClient.get<DetalheInvestimentoAnualResponse>(url);
  }

}
