import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Ativo } from "../../model/ativo";
import { PageSpring } from "../../model/page-spring";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AtivoService {

  constructor(private httpClient: HttpClient) { }

  salvar(ativo: Ativo) {
    if (ativo.id) {
      return this.atualizar(ativo);
    } else {
      return this.criar(ativo);
    }
  }

  criar(ativo: Ativo) {
    const url = environment.portalApi.baseUrl + environment.portalApi.recurso.ativo;
    console.log(url);
    return this.httpClient.post(url, ativo);
  }

  atualizar(ativo: Ativo) {
    const url = environment.portalApi.baseUrl;
    return this.httpClient.put(url, ativo);
  }

  pesquisarTodos() {
    const url = environment.portalApi.baseUrl
      + environment.portalApi.recurso.ativo;
    return this.httpClient.get<Ativo[]>(url);
  }

  pesquisarPaginado(page: number, size: number): Observable<PageSpring> {
    const url = environment.portalApi.baseUrl
      + environment.portalApi.recurso.ativoPaginado;
    const params: any = {};

    if (page) {
      params['page'] = page;
    }

    if (size) {
      params['size'] = size;
    }

    return this.httpClient.get<PageSpring>(url, {params: params});
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
}
