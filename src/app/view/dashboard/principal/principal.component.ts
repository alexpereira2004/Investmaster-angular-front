import { Component, OnInit } from '@angular/core';
import { RegraCompraPorHistoricoVendaService } from "../../../service/monitor/regra-compra-por-historico-venda.service";
import { RegraCompraPorHistoricoVenda } from "../../../model/regra-compra-por-historico-venda";
import { PageSpring } from "../../../model/page-spring";
import { ModalItem } from "../../../model/modal-item";


@Component({
  standalone: false,
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {

  titulo: string;
  lista: RegraCompraPorHistoricoVenda[] = [];

  ngOnInit(): void {
    this.titulo = "Dashboard";
    this.regraCompraPorHistoricoVendaService.buscarTodosMonitoresComStatusAtivo().subscribe({
      next: (result: PageSpring<RegraCompraPorHistoricoVenda> ) => {
        this.lista = result.content;
      },
      error: (err) => console.error('Erro ao pesquisar Dados para expor RegraCompraPorHistoricoVenda', err)
    });
  }

  constructor(private regraCompraPorHistoricoVendaService: RegraCompraPorHistoricoVendaService
  ) { }

// Array que armazena todas as janelas abertas
  modaisAbertos: ModalItem[] = [];

  // Método chamado pelos botões da tela
  abrirModal(simbolo: string) {
    const total = this.modaisAbertos.length;

    // Calcula a posição inicial em cascata para não empilhar exatamente no mesmo lugar
    const offsetTop = 100 + (total * 30);
    const offsetLeft = 120 + (total * 30);

    this.modaisAbertos.push({
      id: Date.now(), // ID único baseado no timestamp
      titulo: `Análise de Ativo - ${simbolo}`,
      top: offsetTop,
      left: offsetLeft,
      dadosAtivo: { codigo: simbolo }
    });
  }

  fecharModal(index: number) {
    this.modaisAbertos.splice(index, 1);
  }

}
