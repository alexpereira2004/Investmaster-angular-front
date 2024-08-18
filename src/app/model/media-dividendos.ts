class MediaDividendosValor {
  ano: string;
  valorTotal: number;
  media: number;
  meses: number;
}

export class MediaDividendos {
  total: MediaDividendosValor[];
  acoes: MediaDividendosValor[];
  fundos: MediaDividendosValor[];
  outros: MediaDividendosValor[];
}
