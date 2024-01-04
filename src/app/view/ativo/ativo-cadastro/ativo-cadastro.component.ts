import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Ativo } from "../../../model/ativo";

@Component({
  selector: 'app-ativo-cadastro',
  templateUrl: './ativo-cadastro.component.html',
  styleUrls: ['./ativo-cadastro.component.css']
})
export class AtivoCadastroComponent implements OnInit {

  FRMnovoCadastro: FormGroup;

  constructor(private fb: FormBuilder) {
    this.FRMnovoCadastro = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      nome: ['', [Validators.required, Validators.maxLength(200)]],
      cnpj: ['', [Validators.required]],
      tipo: ['A', Validators.required],
      seguindo: [false, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const ativo: Ativo = this.FRMnovoCadastro.value;
    console.log(ativo);
    // Lógica para lidar com o envio do formulário
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

}
