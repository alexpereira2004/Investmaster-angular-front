import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { PageSpring } from "../../model/page-spring";
import { MovimentoVendaFilter } from "../../model/filter/movimento-venda-filter";
import { ApiRequestsService } from "../util/api-requests.service";
import { MovimentoVenda } from "../../model/motimento-venda";

@Injectable({
  providedIn: 'root'
})
export class MovimentoVendaService {

  private baseUrl;
  private recursos;

  constructor(private httpClient: HttpClient,
              private util: ApiRequestsService
  ) {
    this.baseUrl = environment.portalApi.baseUrl;
    this.recursos = environment.portalApi.recurso;
  }

  pesquisarComFiltroPaginado(filter: MovimentoVendaFilter) {
    const url = environment.portalApi.baseUrl
      + environment.portalApi.recurso.movimentoVendaListagemPaginado;

    const params = this.util.buildParams(filter);

    return this.httpClient.get<PageSpring<MovimentoVenda>>(url, {params: params});
  }

}
