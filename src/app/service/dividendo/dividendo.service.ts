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

  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  buscarDividendos(): Observable<Dividendo[]> {
    const url = this.baseUrl + routes.dividendo.listar;
    return this.httpClient.get<Dividendo[]>(url);
  }
}
