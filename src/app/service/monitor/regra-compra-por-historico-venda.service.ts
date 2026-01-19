import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiRequestsService } from "../util/api-requests.service";
import { environment } from "../../../environments/environment";
import { delay, Observable, of } from "rxjs";
import {
  PeriodoVenda,
  RegraCompraPorHistoricoVenda,
  Status,
  TipoMovimento
} from "../../model/regra-compra-por-historico-venda";


@Injectable({
  providedIn: 'root'
})
export class RegraCompraPorHistoricoVendaService {

  private baseUrl;
  private recursos;

  constructor(private httpClient: HttpClient,
              private util: ApiRequestsService
  ) {
    this.baseUrl = environment.portalApi.baseUrl;
    this.recursos = environment.portalApi.recurso;
  }


  salvar(payload: any): Observable<any> {
    const url = environment.portalApi.baseUrl
      + environment.portalApi.recurso.regraCompraPorHistoricoVenda;
    return this.httpClient.post(url, payload);
  }

  buscarTodosMonitoresComStatusAtivo(): Observable<RegraCompraPorHistoricoVenda[]> {
    const dados: RegraCompraPorHistoricoVenda[] = [
      {
        id: 15,
        nome: 'ABCB4',
        idMovimentoVenda: 122,
        tipo: TipoMovimento.ENTRADA, // Representado por 'E' no resultset
        status: Status.ATIVO,        // Representado por 'A'
        periodo: PeriodoVenda.ULTIMOS_12_MESES, // 'D' (pelo mapeamento Java) ou 'E' conforme o dado bruto
        excluirPrejuizos: 'N',
        recomendacao: 'N',
        recomendacaoEscala: 0,
        analise: 'O preço atual considerado para o calculo foi de R$ 23.65. O valor da aquisição na única venda foi de R$ 19.07. A relação entre os preços está 24.02% mais cara',
        idMonitor: 12
      },
      {
        id: 16,
        nome: 'PETR4',
        status: Status.ATIVO,
        tipo: TipoMovimento.ENTRADA,
        periodo: PeriodoVenda.ULTIMA_VENDA, // 'U'
        excluirPrejuizos: 'N',
        recomendacao: 'C',
        recomendacaoEscala: 10,
        analise: 'O preço atual considerado para o calculo foi de R$ 30.71. O valor da aquisição na única venda foi de R$ 35.58. A relação entre os preços está -13.69% mais barata',
        idMonitor: 3
      },
      {
        id: 19,
        nome: 'MELK3',
        idMovimentoVenda: 329,
        status: Status.ATIVO,
        tipo: TipoMovimento.ENTRADA,
        periodo: PeriodoVenda.ULTIMOS_12_MESES,
        excluirPrejuizos: 'N',
        recomendacao: 'C',
        recomendacaoEscala: 0,
        analise: 'O preço atual considerado para o calculo foi de R$ 3.8. O valor da aquisição na única venda foi de R$ 3.8. A relação entre os preços está 0.00% mais barata',
        idMonitor: 37
      },
      {
        id: 21,
        nome: 'BBSE3',
        status: Status.ATIVO,
        tipo: TipoMovimento.SAIDA, // 'T' no contexto de movimento/período
        periodo: PeriodoVenda.TODO_HISTORICO,
        excluirPrejuizos: 'N',
        recomendacao: 'N',
        recomendacaoEscala: 0,
        analise: 'O preço atual considerado para o calculo foi de R$ 35.74. O valor da aquisição na única venda foi de R$ 33.83. A relação entre os preços está 5.65% mais cara',
        idMonitor: 38
      },
      {
        id: 22,
        nome: 'BEES4',
        status: Status.ATIVO,
        tipo: TipoMovimento.SAIDA,
        periodo: PeriodoVenda.TODO_HISTORICO,
        excluirPrejuizos: 'S',
        recomendacao: 'N',
        recomendacaoEscala: 0,
        analise: 'O preço atual considerado para o cálculo foi de R$ 8.14. O valor atual está maior que todas as 2 aquisições anteriores.',
        observacao: 'R$ 5.13 em 2022-05-09, R$ 5.13 em 2022-05-09',
        idMonitor: 39
      },
      {
        id: 35,
        nome: 'RANI3',
        status: Status.ATIVO,
        tipo: TipoMovimento.SAIDA,
        periodo: PeriodoVenda.TODO_HISTORICO,
        excluirPrejuizos: 'N',
        recomendacao: 'C',
        recomendacaoEscala: 4,
        analise: 'O preço atual considerado para o cálculo foi de R$ 8.69. O valor atual está menor ou igual que 1 das 3 aquisições anteriores.',
        idMonitor: 41
      },
      {
        id: 39,
        nome: 'GOAU4',
        idMonitor: 6,
        idMovimentoVenda: 246,
        status: Status.ATIVO,
        tipo: TipoMovimento.ENTRADA,
        periodo: PeriodoVenda.ULTIMOS_12_MESES,
        excluirPrejuizos: 'N',
        recomendacao: 'C',
        recomendacaoEscala: 10,
        analise: 'O preço atual considerado para o calculo foi de R$ 8.91. O valor da aquisição na única venda foi de R$ 10.5. A relação entre os preços está -15.14% mais barata'
      }
    ];
    return of(dados).pipe(delay(800));
  }

}
