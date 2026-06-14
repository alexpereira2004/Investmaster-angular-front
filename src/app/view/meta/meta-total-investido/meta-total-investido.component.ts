import { Component, OnInit } from '@angular/core';
import { MetaService } from "../../../service/meta/meta.service";
import { CategoriaAnoFilter } from "../../../service/meta/filter/categoria-ano-filter";

@Component({
  standalone: false,
  selector: 'app-meta-total-investido',
  templateUrl: './meta-total-investido.component.html',
  styleUrl: './meta-total-investido.component.css'
})
export class MetaTotalInvestidoComponent implements OnInit {

  constructor( private metaService: MetaService ) {
  }

  ngOnInit(): void {
    this.pesquisarTotalInvestidoDoAnoCorrente();
  }

  pesquisarTotalInvestidoDoAnoCorrente() {
    let filter: CategoriaAnoFilter = {} as CategoriaAnoFilter;
    filter.categoria = 'TOTAL_INVESTIDO';
    filter.ano = new Date().getFullYear();
    this.metaService.pesquisarPorCategoriaEAno(filter).subscribe(resultado => {
      console.log(resultado);
    });
  }

}
