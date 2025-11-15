import { Component, Input, OnInit } from '@angular/core';
import { MovimentoVendaService } from "../../../service/movimento-venda/movimento-venda.service";
import { MovimentoVendaFilter } from "../../../model/filter/movimento-venda-filter";
import { PageSpring } from "../../../model/page-spring";
import { MovimentoVenda } from "../../../model/motimento-venda";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataUtilService } from "../../../service/util/data-util";
import { RegraCompraPorHistoricoVendaService } from "../../../service/monitor/regra-compra-por-historico-venda.service";
import Swal from "sweetalert2";

@Component({
  standalone: false,
  selector: 'app-regra-comprar-historico',
  templateUrl: './regra-comprar-historico-venda.component.html',
  styleUrl: './regra-comprar-historico-venda.component.css'
})
export class RegraComprarHistoricoVendaComponent implements OnInit {

  @Input() codigo: string;
  @Input() monitorId: number;
  public movimentoVendaLista: MovimentoVenda[];
  public FRMregraComprarHistorico!: FormGroup;


  constructor(private movimentoVendaService: MovimentoVendaService,
              private formBuilder: FormBuilder,
              private dataUtilService: DataUtilService,
              private service : RegraCompraPorHistoricoVendaService
  ) {
    this.FRMregraComprarHistorico = this.formBuilder.group({
      periodo: [null, Validators.required],
      codigoVenda: [{ value: null, disabled: true }, Validators.required],
      excluirPrejuizos: [false],
    });
  }

  ngOnInit(): void {
    let filter: MovimentoVendaFilter = {} as MovimentoVendaFilter;
    filter.ativoCodigo = this.codigo;
    filter.sort = 'dataVenda,desc';
    this.movimentoVendaService.pesquisarComFiltroPaginado(filter).subscribe({
      next: (result: PageSpring<MovimentoVenda>) => {
        this.movimentoVendaLista = result.content;
        this.movimentoVendaLista = result.content.map(d => ({
          ...d,
          diferencaDiasCompraVenda: this.dataUtilService.diferencaEmDias(d.dataAquisicao!, d.dataVenda!)
        }));

      },
      error: error => {
        let msgErro = 'Erro ao buscar dados do histórico de vendas';
        Swal.fire('Erro!', msgErro, 'error');
        console.error(msgErro, error);
      }
    });

    this.FRMregraComprarHistorico.get('periodo')!.valueChanges.subscribe(value => {
      const vendaControl = this.FRMregraComprarHistorico.get('codigoVenda')!;

      if (value === 'VENDA_ESPECIFICA') {
        vendaControl.setValidators(Validators.required);
        vendaControl.enable();
      } else {
        vendaControl.disable();
        vendaControl.reset();
        vendaControl.clearValidators();
      }
    });

  }

  onSubmit() {

    if (this.FRMregraComprarHistorico.invalid) {
      this.FRMregraComprarHistorico.markAllAsTouched();
      return;
    }

    const payload = this.montarPayload();
    this.service.salvar(payload).subscribe({
      next: () => {
        Swal.close();
        Swal.fire({
          title: "Atualização de indices realizada com sucesso",
          icon: "success"
        });
      },
      error:(err) => {
        Swal.close();
        Swal.fire('Erro!', err.error.mensagem, 'error');
      }
    });
  }

  private montarPayload() {
    const formValue = this.FRMregraComprarHistorico.getRawValue();
    return {
      monitorId: this.monitorId,
      excluirPrejuizos: formValue.excluirPrejuizos ? "SIM" : "NAO",
      periodo: formValue.periodo,
      movimentoVendaId: formValue.codigoVenda
    };
  }
}
