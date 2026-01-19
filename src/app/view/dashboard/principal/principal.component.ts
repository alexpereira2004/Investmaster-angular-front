import { Component, OnInit } from '@angular/core';
import { RegraCompraPorHistoricoVendaService } from "../../../service/monitor/regra-compra-por-historico-venda.service";
import { RegraCompraPorHistoricoVenda } from "../../../model/regra-compra-por-historico-venda";

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

      next: (result: RegraCompraPorHistoricoVenda[] ) => {
        this.lista = result;
      }
    });
    console.log(this.lista);
  }

  constructor(private regraCompraPorHistoricoVendaService: RegraCompraPorHistoricoVendaService
  ) { }



}
