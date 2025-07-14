import { ResultadoGeralDividendo } from "./resultado-geral-dividendo";

export class ResultadoGeral {
  codigoAtivo: string;
  precoMedio: number;
  cotacaoAtual: number;
  quantidadeCotas: number;
  investimentoTotal: number;
  investimentoTotalAtualizado: number;
  investimentoTotalAtualizadoComDividendos: number;
  proporcaoTotalInvestido: number;
  proporcaoTipoAtivoInvestido: number;
  resultado: number;
  resultadoPercentual: number;
  resultadoComDividendo: number;
  resultadoComDividendoPercentual: number;
  dividendYeld: number;
  totalDividendos: number;
  dividendos: ResultadoGeralDividendo[];
}
