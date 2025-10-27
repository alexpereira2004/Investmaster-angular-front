import { Component, Input, OnInit } from '@angular/core';
import { MovimentoVendaService } from "../../../service/movimento-venda/movimento-venda.service";
import { MovimentoVendaFilter } from "../../../model/filter/movimento-venda-filter";
import { PageSpring } from "../../../model/page-spring";
import { MovimentoVenda } from "../../../model/motimento-venda";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  standalone: false,
  selector: 'app-monitor-regra-comprar-historico',
  templateUrl: './monitor-regra-comprar-historico.component.html',
  styleUrl: './monitor-regra-comprar-historico.component.css'
})
export class MonitorRegraComprarHistoricoComponent implements OnInit {

  @Input() codigo: string;
  public dados: MovimentoVenda[];
  FRMregraComprarHistorico!: FormGroup;


  constructor(private movimentoVendaService: MovimentoVendaService,
              private formBuilder: FormBuilder
  ) {
    this.FRMregraComprarHistorico = this.formBuilder.group({
      periodo: ['padrao'],
      codigoVenda: [{ value: null, disabled: true }],
      excluirPrejuizo: [{ value: 'S' }],

      // codigo: ['padrao', [Validators.required, Validators.maxLength(10)]],
      // nome: ['', [Validators.required, Validators.maxLength(200)]],
      // cnpj: ['', [Validators.required]],
      // tipo: ['A', Validators.required],
      // seguindo: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    let filter: MovimentoVendaFilter = {} as MovimentoVendaFilter;
    filter.ativoCodigo = this.codigo;
    this.movimentoVendaService.pesquisarComFiltroPaginado(filter).subscribe({
      next: (result: PageSpring<MovimentoVenda>) => {
        this.dados = result.content;
      },
      error: error => {
        console.error('Erro ao buscar dados do histórico de vendas', error);
      }
    });

    this.FRMregraComprarHistorico.get('periodo')!.valueChanges.subscribe(value => {
      const vendaControl = this.FRMregraComprarHistorico.get('codigoVenda')!;

      if (value === 'venda-especifica') {
        vendaControl.enable();  // ✅ habilita os radios
      } else {
        vendaControl.disable(); // 🚫 desabilita os radios
        vendaControl.reset();   // limpa a seleção anterior
      }
    });

  }


  onSubmit() {
    console.log(this.FRMregraComprarHistorico.value);
    console.log(this.codigo);

  }
}
