import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiRequestsService } from "../util/api-requests.service";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";


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

}
