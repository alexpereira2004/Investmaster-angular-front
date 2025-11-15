import { Component, Input, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { MovimentoVendaService } from "../../../service/movimento-venda/movimento-venda.service";
import { MovimentoVendaFilter } from "../../../model/filter/movimento-venda-filter";
import { PageSpring } from "../../../model/page-spring";
import { MovimentoVenda } from "../../../model/motimento-venda";
import { lastValueFrom } from "rxjs";

@Component({
  standalone: false,
  selector: 'app-regra-cadastro',
  templateUrl: './regra-cadastro.component.html',
  styleUrl: './regra-cadastro.component.css'
})
export class RegraCadastroComponent implements OnInit {

  @Input() ativoCodigo: string;
  @Input() monitorId: number;
  componenteSelecionado: string | null = null;
  public bSemHistoricoDeVenda: boolean = false;

  constructor(private movimentoVendaService: MovimentoVendaService) {

  }

  ngOnInit(): void {
    this.componenteSelecionado = 'padrao';
  }

  async verificarDisponibilidadeDaRegraSelecionada() {
    let [title, text] = ['', ''];
    switch (this.componenteSelecionado) {
      case 'comprar-historico-vendas':
        [title, text] = await this.verificarSeAtivoPossuiVendas();
        break;
    }
    if (title !== '') {
      Swal.fire({
        title: title,
        text: text,
        icon: "warning"
      });
    }
  }

  private async verificarSeAtivoPossuiVendas(): Promise<[string, string]> {

    let filter: MovimentoVendaFilter = {} as MovimentoVendaFilter;
    filter.ativoCodigo = this.ativoCodigo;

    try {
      const result: PageSpring<MovimentoVenda> = await lastValueFrom(
        this.movimentoVendaService.pesquisarComFiltroPaginado(filter)
      );

      if (result.totalElements === 0) {
        this.bSemHistoricoDeVenda = true;
        this.resetarSelecao();
        return [
          "Problema com as Vendas!",
          "O ativo selecionado não possui histórico de vendas."
        ];
      }
      return ['', ''];

    } catch (err) {
      console.error("Erro ao pesquisar vendas:", err);
      return [
        "Erro na comunicação!",
        "Não foi possível verificar o histórico de vendas. Tente novamente."
      ];
    }
  }

  resetarSelecao(): void {
    this.componenteSelecionado = 'padrao';
  }
}
