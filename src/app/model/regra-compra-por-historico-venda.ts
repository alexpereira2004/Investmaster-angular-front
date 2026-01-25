
export enum Status {
  ATIVO = 'A',
  INATIVO = 'I'
}

export enum TipoMovimento {
  ENTRADA = 'E',
  SAIDA = 'S'
}

export enum PeriodoVenda {
  ULTIMA_VENDA = 'U',
  ANO_ATUAL = 'A',
  ULTIMOS_12_MESES = 'D',
  TODO_HISTORICO = 'T'
}


export class RegraCompraPorHistoricoVenda {
  id?: number;
  nome?: string;
  status?: Status;
  tipo?: TipoMovimento;
  periodo?: PeriodoVenda;
  excluirPrejuizos?: 'S' | 'N'; // Mapeado como string conforme o Java
  validade?: Date | string;    // Pode vir como string ISO do backend
  recomendacao?: 'C' | 'V' | 'N'; // Compra, Venda ou Neutro
  recomendacaoEscala?: number;
  analise?: string;
  observacao?: string;
  idMonitor: number;
  idMovimentoVenda?: number;
  cotacaoAlvo?: number;
  cotacaoAtual?: number;
}
