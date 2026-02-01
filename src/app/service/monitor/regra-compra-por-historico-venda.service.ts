import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiRequestsService } from "../util/api-requests.service";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { RegraCompraPorHistoricoVenda } from "../../model/regra-compra-por-historico-venda";
import { PageSpring } from "../../model/page-spring";
import { RegraCompraPorHistoricoVendaFilter } from "../../model/filter/regra-compra-por-historico-venda-filter";


@Injectable({
  providedIn: 'root'
})
export class RegraCompraPorHistoricoVendaService {

  private baseUrl;
  private recursos;

  constructor(private httpClient: HttpClient,
              private util: ApiRequestsService
  ) {
    this.baseUrl = environment.portalApi.baseUrl;
    this.recursos = environment.portalApi.recurso;
  }


  salvar(payload: any): Observable<any> {
    const url = environment.portalApi.baseUrl
      + environment.portalApi.recurso.regraCompraPorHistoricoVenda;
    return this.httpClient.post(url, payload);
  }

  buscarTodosMonitoresComStatusAtivo() {
    const url = environment.portalApi.baseUrl
      + environment.portalApi.recurso.monitorRegrasCompraPorHistoricoVendaListagemPaginado;

    let filter: RegraCompraPorHistoricoVendaFilter = {} as RegraCompraPorHistoricoVendaFilter;
    filter.status = "ATIVO";
    filter.page = 0;
    filter.size = 200;
    filter.sort = 'id,desc';

    const params = this.util.buildParams(filter);

    return this.httpClient.get<PageSpring<RegraCompraPorHistoricoVenda>>(url, {params: params});
  }

}
