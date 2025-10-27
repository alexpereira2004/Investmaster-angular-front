import { Ativo } from "./ativo";

export class MovimentoVenda {
  id?: number;
  dataAquisicao?: string;     // LocalDate → string (formato ISO ou dd/MM/yyyy)
  precoPago?: number;
  quantidade?: number;
  totalInvestido?: number;
  diferencaDiasCompraVenda?: number;
  dataVenda?: string;         // LocalDate → string
  precoVenda?: number;
  totalFinal?: number;
  rendimento?: number;
  ativo?: Ativo;
}
