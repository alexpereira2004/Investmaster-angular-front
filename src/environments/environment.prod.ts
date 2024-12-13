export const environment = {
  production: true,
  portalApi: {
    baseUrl: 'http://localhost:8501',
    recurso: {
      ativo: "v2/ativo",
      ativoId: "v2/ativo/{id}",
      ativoPaginado: "v2/ativo/listagem-paginado",
      projecao: "v2/projecao/listagem-paginado",
      projecaoAnos: "v2/projecao/anos",
      ativosComDividendos: "v2/ativo/com-dividendos",
      extratoDividendos: "/v2/dividendo/extrato-dividendos?codigos={codigos}&periodicidade={periodicidade}",
    }
  }
};
