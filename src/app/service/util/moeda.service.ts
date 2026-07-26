import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MoedaService {

  formatarParaReal(valor: number | null | undefined): string {
    if (valor === null || valor === undefined || isNaN(valor)) {
      return 'R$ 0,00';
    }

    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
