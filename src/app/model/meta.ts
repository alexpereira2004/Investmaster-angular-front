
export interface MetaFinanceira {
  categoria: 'FINANCEIRA';
  ticker: string;
  valorAlvo: number;
  porcentagemCarteira: number;
}

export interface TotalInvestido {
  categoria: 'TOTAL_INVESTIDO';
  valorLimiteInicial?: number;
  valorLimiteFinal?: number;
}


export type MetaMetadata = MetaFinanceira | TotalInvestido;


export interface Meta {
  id?: number;
  titulo: string;
  descricao: string;
  categoria: 'FINANCEIRA' | 'TOTAL_INVESTIDO';
  valorMeta: number;
  ano: number;
  metadata: MetaMetadata; // O pulo do gato está aqui
  usuarioId?: number;
  dataCriacao?: string;
  dataAtualizacao?: string;
}
