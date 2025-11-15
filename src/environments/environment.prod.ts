export const environment = {
  production: true,
  portalApi: {
    baseUrl: 'http://localhost:8501/',
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
      primeiraE_Ultima: "v1/cotacao/primeira-e-ultima",
      monitor: "v2/monitor",
      monitorListagemPaginado: "v2/monitor/listagem-paginado",
      movimentoVendaListagemPaginado: "v1/movimento-venda/listagem-paginado",
      regraCompraPorHistoricoVenda: "v1/monitor/regras/compra-por-historico-venda",
    }
  }
};
