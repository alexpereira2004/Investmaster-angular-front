import { Injectable } from "@angular/core";
import { differenceInDays } from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class DataUtilService {

  diferencaEmDias(
    dataInicio: any,
    dataFim: any,
    formato = 'dd/MM/yyyy'
  ): number {
    if (!dataInicio || !dataFim) return 0;

    const inicio =
      dataInicio instanceof Date
        ? dataInicio
        : new Date(dataInicio[0], dataInicio[1] - 1, dataInicio[2]);

    const fim =
      dataFim instanceof Date
        ? dataFim
        : new Date(dataFim[0], dataFim[1] - 1, dataFim[2]);

    return differenceInDays(fim, inicio);
  }
}
