export const environment = {
  production: false,
  portalApi: {
    baseUrl: 'http://localhost:12001/',
    recurso: {
      ativo: "v2/ativo",
      ativoId: "v2/ativo/{id}",
      ativoPaginado: "v2/ativo/listagem-paginado",
      projecao: "v2/projecao/listagem-paginado",
      projecaoAnos: "v2/projecao/anos",
      ativosComDividendos: "v2/ativo/com-dividendos",
      extratoDividendos: "/v2/dividendo/extrato-dividendos?codigos={codigos}&periodicidade={periodicidade}",
      informacoesDividendosImportados: "/v2/dividendo/informacoes-dividendos-importados",
      atualizarIndices: "/v2/projecao/atualizar-indices",
      dividendoPaginado: "v2/dividendo/listagem-paginado",
      resultadoGeral: "v2/dividendo/{ativo}/resultado-geral",
      cotacaoHistorico: "v1/cotacao/historico",
    }
  }
};

