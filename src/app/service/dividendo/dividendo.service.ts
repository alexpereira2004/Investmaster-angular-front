import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { routes } from "../../constant/routes";
import { Dividendo } from "../../model/dividendo";
import { MediaDividendos } from "../../model/media-dividendos";
import { AtivoDividendoWrapper } from "../../model/ativo-dividendo-wrapper";

@Injectable({
  providedIn: 'root'
})
export class DividendoService {

  private baseUrl = environment.portalApi.baseUrl;
  private recursos = environment.portalApi.recurso;

  constructor(private httpClient: HttpClient) {}

  buscarDividendos(): Observable<Dividendo[]> {
    let url = this.baseUrl + routes.dividendo.listar;
    return this.httpClient.get<Dividendo[]>(url);
  }

  buscarMediaDividendos(): Observable<MediaDividendos> {
    let url = this.baseUrl + routes.dividendo.media;
    return this.httpClient.get<MediaDividendos>(url);
  }

  importarHtml(html: string) {
    let url = this.baseUrl + routes.dividendo.importacao;
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
    });
    return this.httpClient.post(url, html, { headers });
  }

  pesquisarExtrato(codigos: string, periodicidade: string) {
    const url = this.baseUrl
      + this.recursos.extratoDividendos
        .replace('{codigos}', codigos)
        .replace('{periodicidade}', periodicidade);
    return this.httpClient.get<AtivoDividendoWrapper>(url);
  }
}
