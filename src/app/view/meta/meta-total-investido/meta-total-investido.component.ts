import { Component, Input, OnInit } from '@angular/core';
import { MetaService } from "../../../service/meta/meta.service";
import { CategoriaAnoFilter } from "../../../service/meta/filter/categoria-ano-filter";
import { Meta } from "../../../model/meta";

@Component({
  standalone: false,
  selector: 'app-meta-total-investido',
  templateUrl: './meta-total-investido.component.html',
  styleUrls: [
    './meta-total-investido.component.css',
    '../../dashboard/principal/principal.component.css'
    ]
})
export class MetaTotalInvestidoComponent implements OnInit {
  @Input() ano!: number;
  dados : Meta | undefined;

  constructor( private metaService: MetaService ) {
  }

  ngOnInit(): void {
    this.pesquisarTotalInvestidoDoAnoCorrente();
  }

  pesquisarTotalInvestidoDoAnoCorrente() {
    let filter: CategoriaAnoFilter = {} as CategoriaAnoFilter;
    filter.categoria = 'TOTAL_INVESTIDO';
    filter.ano = this.ano;
    this.metaService.pesquisarPorCategoriaEAno(filter).subscribe({
      next: (resultado: Meta) => {
        this.dados = resultado;
      },
      error: (err) => {
        console.error('Erro ao buscar as metas', err);
      }
    });


  }

}
