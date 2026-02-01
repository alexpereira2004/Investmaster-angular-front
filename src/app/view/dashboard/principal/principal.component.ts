import { Component, OnInit } from '@angular/core';
import { RegraCompraPorHistoricoVendaService } from "../../../service/monitor/regra-compra-por-historico-venda.service";
import { RegraCompraPorHistoricoVenda } from "../../../model/regra-compra-por-historico-venda";
import { PageSpring } from "../../../model/page-spring";

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



}
