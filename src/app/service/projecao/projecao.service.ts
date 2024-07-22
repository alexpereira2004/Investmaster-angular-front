import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { PageSpring } from "../../model/page-spring";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjecaoService {

  constructor(private httpClient: HttpClient) { }

  buscarDados() {
    const url = environment.portalApi.baseUrl + environment.portalApi.recurso.projecao;
    console.log(url);

    const params: any = {};

      params['sort'] = 'mes,asc';
      params['size'] = 100;
      params['ano'] = 2024;
      params['totalizador'] = 0;
      params['tipo'] = 'A';


    return this.httpClient.get<PageSpring>(url, {params: params});

  }
}
