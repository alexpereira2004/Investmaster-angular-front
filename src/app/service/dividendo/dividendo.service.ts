import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { routes } from "../../constant/routes";
import { MediaDividendos } from "../../model/media-dividendos";
import { AtivoDividendoWrapper } from "../../model/ativo-dividendo-wrapper";
import { InformacoesDividendosImportados } from "../../model/informacoes-dividendos-importados";
import { PageSpring } from "../../model/page-spring";

@Injectable({
  providedIn: 'root'
})
export class DividendoService {

  private baseUrl = environment.portalApi.baseUrl;
  private recursos = environment.portalApi.recurso;

  constructor(private httpClient: HttpClient) {}

  // pesquisarTodos(): Observable<Dividendo[]> {
  //   let url = this.baseUrl + routes.dividendo.listar;
  //   return this.httpClient.get<Dividendo[]>(url);
  // }

  pesquisarPaginado(page: number, size: number): Observable<PageSpring> {
    const url = environment.portalApi.baseUrl
      + environment.portalApi.recurso.dividendoPaginado;
    const params: any = {};

    if (page) {
      params['page'] = page;
    }

    if (size) {
      params['size'] = size;
    }
    params['sort'] = 'id,desc';

    return this.httpClient.get<PageSpring>(url, {params: params});
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

  pesquisarExtrato(valores: any) {
    var url = this.baseUrl
      + this.recursos.extratoDividendos
        .replace('{codigos}', valores.ativosSelecionados)
        .replace('{periodicidade}', valores.periodicidade);

    if (valores?.dataInicio) {
      url += '&dataInicio='+this.formatarData(valores.dataInicio, '01');
    }
    if (valores?.dataFim) {
      const mes = valores.dataFim.substring(0,2);
      const ano = valores.dataFim.substring(2);
      const dia = new Date(ano, mes, 0).getDate();
      url += '&dataFim='+this.formatarData(valores.dataFim, dia.toString());
    }
    return this.httpClient.get<AtivoDividendoWrapper>(url);
  }

  buscarInformacoesDividendosImportados() {
    var url = this.baseUrl
      + this.recursos.informacoesDividendosImportados;
    return this.httpClient.get<InformacoesDividendosImportados>(url);
  }

  formatarData(data: string, prefixo: string): string {
    if (!data) {
      return '';
    }
    const dia = prefixo;
    const mes = data.substring(0,2);
    const ano = data.substring(2);
    return `${ano}-${mes}-${dia}`;
  }
}
