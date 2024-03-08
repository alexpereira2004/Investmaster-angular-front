import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Ativo } from "../../../model/ativo";
import { AtivoService } from "../../../service/ativo/ativo.service";

@Component({
  selector: 'app-ativo-cadastro',
  templateUrl: './ativo-cadastro.component.html',
  styleUrls: ['./ativo-cadastro.component.css']
})
export class AtivoCadastroComponent implements OnInit {

  titulo: string;
  FRMnovoCadastro: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ativoService: AtivoService
  ) {
    this.FRMnovoCadastro = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      nome: ['', [Validators.required, Validators.maxLength(200)]],
      cnpj: ['', [Validators.required]],
      tipo: ['A', Validators.required],
      seguindo: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.titulo = "Cadastrar novo ativo";
  }

  onSubmit() {
    const ativo: Ativo = this.FRMnovoCadastro.value;

    // if (this.FRMnovoCadastro.invalid) {
    //   // this.contextService.openGenericDialog('warning', 'user-form.invalid-form');
    //   return;
    // }

    this.carregarFormulario()

    this.ativoService.salvar(this.carregarFormulario()).subscribe({
    //
    });

  }

  // Função para validar o formato do CNPJ
  cnpjValidator(control) {
    const cnpj = control.value;

    if (!cnpj) {
      return null;
    }

    const validCnpj = true;/* Lógica de validação do CNPJ */;

    return validCnpj ? null : { invalidCnpj: true };
  }

  private carregarFormulario() {
    console.log(this.FRMnovoCadastro.value);
    let ativo = new Ativo();
    ativo.nome = this.FRMnovoCadastro.get('nome')?.value;
    ativo.nomeCompleto = this.FRMnovoCadastro.get('nomeCompleto')?.value;
    ativo.codigo = this.FRMnovoCadastro.get('codigo')?.value;
    ativo.cnpj = this.FRMnovoCadastro.get('cnpj')?.value;
    ativo.tipo = this.FRMnovoCadastro.get('tipo')?.value;
    ativo.seguindo = this.FRMnovoCadastro.get('seguindo')?.value ? 'A' : 'I';
    ativo.pais = this.FRMnovoCadastro.get('pais')?.value;
    ativo.caminho = this.FRMnovoCadastro.get('caminho')?.value;
    return ativo;

  }
}
