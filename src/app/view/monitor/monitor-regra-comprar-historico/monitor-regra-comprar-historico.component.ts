import { Component, Input, OnInit } from '@angular/core';
import { MovimentoVendaService } from "../../../service/movimento-venda/movimento-venda.service";
import { MovimentoVendaFilter } from "../../../model/filter/movimento-venda-filter";
import { PageSpring } from "../../../model/page-spring";
import { MovimentoVenda } from "../../../model/motimento-venda";

@Component({
  standalone: false,
  selector: 'app-monitor-regra-comprar-historico',
  templateUrl: './monitor-regra-comprar-historico.component.html',
  styleUrl: './monitor-regra-comprar-historico.component.css'
})
export class MonitorRegraComprarHistoricoComponent implements OnInit {

  @Input() codigo: string;

  constructor(private movimentoVendaService: MovimentoVendaService) {
  }

  ngOnInit(): void {
    let filter: MovimentoVendaFilter = {} as MovimentoVendaFilter;
    filter.ativoCodigo = this.codigo;
    this.movimentoVendaService.pesquisarComFiltroPaginado(filter).subscribe({
      next: (result: PageSpring<MovimentoVenda>) => {
        const content = result.content;
      },
      error: error => {
        console.error('Erro ao buscar dados do histórico de vendas', error);
      }
    });
    console.log('MV');
  }



}
