import { Component, Input, OnInit } from '@angular/core';
import { RegraCompraPorHistoricoVenda } from "../../../../model/regra-compra-por-historico-venda";

@Component({
  standalone: false,
  selector: 'app-box-apresentacao',
  templateUrl: './box-apresentacao.component.html',
  styleUrl: './box-apresentacao.component.css'
})
export class BoxApresentacaoComponent implements OnInit {
  @Input() monitorDados!: RegraCompraPorHistoricoVenda;

  recomendacao: string;
  situacaoCss: string;
  private readonly MAPA_RECOMENDACAO: Record<string, string> = {
    'C': 'Compra',
    'N': 'Neutro',
    'V': 'Venda'
  };

  ngOnInit(): void {
    this.situacaoCss = 'situacao-'+this.monitorDados.recomendacaoEscala;
    this.recomendacao = this.MAPA_RECOMENDACAO[this.monitorDados.recomendacao];
  }


}
