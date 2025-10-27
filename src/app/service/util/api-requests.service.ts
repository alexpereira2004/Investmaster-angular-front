import { Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  buildParams(filtro: any): HttpParams {
    let params = new HttpParams();
    Object.entries(filtro)
      .filter(([_, v]) => v !== null && v !== undefined && v !== '')
      .forEach(([k, v]) => params = params.set(k, v as string));
    return params;
  }
}
