import { Component, Input, OnInit } from '@angular/core';
import { MovimentoVendaService } from "../../../service/movimento-venda/movimento-venda.service";
import { MovimentoVendaFilter } from "../../../model/filter/movimento-venda-filter";
import { PageSpring } from "../../../model/page-spring";
import { MovimentoVenda } from "../../../model/motimento-venda";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataUtilService } from "../../../service/util/data-util";
import { RegraCompraPorHistoricoVendaService } from "../../../service/monitor/regra-compra-por-historico-venda.service";

@Component({
  standalone: false,
  selector: 'app-monitor-regra-comprar-historico',
  templateUrl: './regra-comprar-historico-venda.component.html',
  styleUrl: './regra-comprar-historico-venda.component.css'
})
export class RegraComprarHistoricoVendaComponent implements OnInit {

  @Input() codigo: string;
  public dados: MovimentoVenda[];
  public FRMregraComprarHistorico!: FormGroup;


  constructor(private movimentoVendaService: MovimentoVendaService,
              private formBuilder: FormBuilder,
              private dataUtilService: DataUtilService,
              private service : RegraCompraPorHistoricoVendaService
  ) {
    this.FRMregraComprarHistorico = this.formBuilder.group({
      periodo: ['', Validators.required],
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
    filter.sort = 'dataVenda,desc';
    this.movimentoVendaService.pesquisarComFiltroPaginado(filter).subscribe({
      next: (result: PageSpring<MovimentoVenda>) => {
        this.dados = result.content;
        this.dados = result.content.map(d => ({
          ...d,
          diferencaDiasCompraVenda: this.dataUtilService.diferencaEmDias(d.dataAquisicao!, d.dataVenda!)
        }));

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
    console.log(this.FRMregraComprarHistorico.valid);
    console.log(this.FRMregraComprarHistorico.value);
    console.log(this.codigo);

    const payload = this.montarPayload();
    this.service.salvar(payload).subscribe();

  }

  private montarPayload() {
    return {
      codigo: this.codigo, // Adiciona o código ao objeto
      ...this.FRMregraComprarHistorico.value // Desestrutura os dados do formulário
    };
  }
}
