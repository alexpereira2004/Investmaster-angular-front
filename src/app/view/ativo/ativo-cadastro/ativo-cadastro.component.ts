import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ativo } from '../../../model/ativo';
import { AtivoService } from '../../../service/ativo/ativo.service';
import { AlertaUtil } from "../../../service/util/alerta-util";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  standalone: false,
  selector: 'app-ativo-cadastro',
  templateUrl: './ativo-cadastro.component.html',
  styleUrls: ['./ativo-cadastro.component.css']
})
export class AtivoCadastroComponent implements OnInit {

  titulo = 'Cadastrar novo ativo';
  FRMnovoCadastro: FormGroup;
  salvando = false;
  ativoId: number | string | null = null;
  isEdicao = false;
  carregando = false;

  mensagemErro: string | null = null;
  mensagemSucesso: string | null = null;
  readonly opcoesSeguindo = [
    { codigo: '1', descricao: 'Não' },
    { codigo: '2', descricao: 'Mensalmente' },
    { codigo: '3', descricao: 'Quinzenalmente' },
    { codigo: '4', descricao: 'Semanalmente' },
    { codigo: '5', descricao: 'Diariamente' }
  ];

  private readonly valoresIniciais = {
    codigo: '',
    nome: '',
    cnpj: '',
    tipo: '',
    seguindo: '1'
  };

  constructor(
    private formBuilder: FormBuilder,
    private ativoService: AtivoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.FRMnovoCadastro = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      nome: ['', [Validators.required, Validators.maxLength(200)]],
      cnpj: ['', [Validators.required]],
      // cnpj: ['', [Validators.required, CnpjUtil.validator]],
      tipo: ['', Validators.required],
      seguindo: ['1', Validators.required]
    });
  }

  ngOnInit(): void {
    this.titulo = 'Cadastrar novo ativo';
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdicao = true;
      this.ativoId = id;
      this.titulo = 'Editar ativo';
      this.carregarAtivo(id);
    } else {
      this.isEdicao = false;
      this.titulo = 'Cadastrar novo ativo';
    }
  }

  onSubmit(): void {
    this.mensagemErro = null;
    this.mensagemSucesso = null;

    if (this.FRMnovoCadastro.invalid) {
      this.FRMnovoCadastro.markAllAsTouched();
      this.mensagemErro = 'Preencha todos os campos obrigatórios corretamente.';
      AlertaUtil.erro(this.mensagemErro);
      return;
    }

    this.salvando = true;
    const payload = this.carregarFormulario();

    this.ativoService.salvar(payload).subscribe({
      next: () => {
        this.salvando = false;
        this.mensagemSucesso = `Ativo ${payload.codigo} cadastrado com sucesso!`;

      },
      error: (err) => {
        this.salvando = false;
        this.mensagemErro = err?.error?.message || 'Erro ao salvar o ativo. Tente novamente.';
        AlertaUtil.erro(this.mensagemErro);
      },
      complete: () => {
        AlertaUtil.sucesso(this.mensagemSucesso);
        if (!this.isEdicao) {
          this.FRMnovoCadastro.reset(this.valoresIniciais);
        }
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/ativo']);
    return;
  }


  limparFormulario(): void {
    this.mensagemErro = null;
    this.mensagemSucesso = null;
    this.FRMnovoCadastro.reset(this.valoresIniciais);
  }


  private carregarFormulario(): Ativo {
    const formValue = this.FRMnovoCadastro.getRawValue();
    const ativo = new Ativo();

    ativo.id = this.route.snapshot.paramMap.get('id');
    ativo.codigo = (formValue.codigo || '').trim().toUpperCase();
    ativo.nome = (formValue.nome || '').trim();
    ativo.cnpj = (formValue.cnpj || '').trim();
    ativo.tipo = formValue.tipo;
    ativo.seguindo = formValue.seguindo;

    // Mantém compatibilidade caso o model Ativo espere esses campos
    ativo.nomeCompleto = ativo.nomeCompleto ?? ativo.nome;
    ativo.pais = ativo.pais ?? 'BR';
    ativo.caminho = ativo.caminho ?? '';

    return ativo;
  }

  isCampoInvalido(campo: string): boolean {
    const control = this.FRMnovoCadastro.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  private carregarAtivo(id: string): void {
    this.carregando = true;

    this.ativoService.pesquisarPorId(id).subscribe({
      next: (ativo: Ativo) => {
        this.carregando = false;

        this.FRMnovoCadastro.patchValue({
          codigo: ativo.codigo ?? '',
          nome: ativo.nome ?? '',
          cnpj: ativo.cnpj ?? '',
          tipo: ativo.tipo ?? '',
          seguindo: ativo.seguindo ? String(ativo.seguindo) : '1'
        });

        // Marca como intocado/limpo após carregar os dados iniciais
        this.FRMnovoCadastro.markAsPristine();
        this.FRMnovoCadastro.markAsUntouched();
      },
      error: (err) => {
        this.carregando = false;
        AlertaUtil.erro(err?.error?.message || 'Não foi possível carregar os dados do ativo.');
        this.router.navigate(['/ativo/listagem']);
      }
    });
  }
}
