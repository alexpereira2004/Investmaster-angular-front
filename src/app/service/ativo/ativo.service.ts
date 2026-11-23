import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Ativo } from "../../model/ativo";
import { PageSpring } from "../../model/page-spring";
import { Observable } from "rxjs";
import { AtivoFiltro } from "../../model/filter/ativo-filter";

@Injectable({
  providedIn: 'root'
})
export class AtivoService {

  private baseUrl;
  private recursos;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.portalApi.baseUrl;
    this.recursos = environment.portalApi.recurso;
  }

  salvar(ativo: Ativo) {
    if (ativo.id) {
      return this.atualizar(ativo);
    } else {
      return this.criar(ativo);
    }
  }

  criar(ativo: Ativo) {
    const url = environment.portalApi.baseUrl + environment.portalApi.recurso.ativo;
    return this.httpClient.post(url, ativo);
  }

  atualizar(ativo: Ativo) {
    const url = environment.portalApi.baseUrl + environment.portalApi.recurso.ativo;
    return this.httpClient.put(url, ativo);
  }

  pesquisarTodos() {
    const url = environment.portalApi.baseUrl
      + environment.portalApi.recurso.ativo;
    return this.httpClient.get<Ativo[]>(url);
  }

  pesquisarPaginado(page: number, size: number): Observable<PageSpring<Ativo>> {
    const url = environment.portalApi.baseUrl
      + environment.portalApi.recurso.ativoPaginado;
    const params: any = {};

    if (page) {
      params['page'] = page;
    }

    if (size) {
      params['size'] = size;
    }

    return this.httpClient.get<PageSpring<Ativo>>(url, {params: params});
  }

  pesquisarPorId(id: string) {
    const url = environment.portalApi.baseUrl
      + environment.portalApi.recurso.ativoId.replace('{id}', id);
    return this.httpClient.get<Ativo>(url);
  }

  remover() {
    const url = environment.portalApi.baseUrl
    return this.httpClient.delete<Ativo[]>(url);
  }

  pesquisarAtivosComDividendos() {
    const url = this.baseUrl + this.recursos.ativosComDividendos;
    return this.httpClient.get<Ativo[]>(url);
  }

  pesquisarListagem(filtro: AtivoFiltro): Observable<PageSpring<Ativo>> {
    const url = environment.portalApi.baseUrl
      + environment.portalApi.recurso.ativoPaginado;
    let params = new HttpParams();

    if (filtro.page) {
      params = params.set('page', filtro.page);
    }

    if (filtro.size) {
      params = params.set('size', filtro.size);
    }

    if (filtro.codigo) {
      params = params.set('codigo', filtro.codigo.trim());
    }

    if (filtro.seguindo !== null && filtro.seguindo !== undefined) {
      params = params.set('seguindo', String(filtro.seguindo));
      params = params.set('exclusivo', String(Boolean(filtro.exclusivo)));
    }

    return this.httpClient.get<PageSpring<Ativo>>(url, {params: params});
  }
}
