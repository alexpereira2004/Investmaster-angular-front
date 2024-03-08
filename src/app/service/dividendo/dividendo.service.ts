import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { routes } from "../../constant/routes";
import { Dividendo } from "../../model/dividendo";

@Injectable({
  providedIn: 'root'
})
export class DividendoService {

  private baseUrl = environment.portalApi.baseUrl;

  constructor(private httpClient: HttpClient) {}

  buscarDividendos(): Observable<Dividendo[]> {
    let url = this.baseUrl + routes.dividendo.listar;
    url = url+'v2/dividendo/listagem-paginado';
    console.log(url);
    return this.httpClient.get<Dividendo[]>(url);
  }
}
