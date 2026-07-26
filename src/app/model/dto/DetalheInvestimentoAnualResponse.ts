export interface DetalheInvestimentoAnualResponse {
  rendaFixaMensalMap: Record<string, number>;
  totalRendaFixa: number;

  aporteProprioMensalMap: Record<string, number>;
  totalAporteProprio: number;

  projecaoInicialAportes: Record<string, number>;
  projecaoFuturaAportes: Record<string, number>;
}
