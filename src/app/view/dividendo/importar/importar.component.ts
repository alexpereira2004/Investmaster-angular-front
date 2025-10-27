import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DividendoService } from "../../../service/dividendo/dividendo.service";
import Swal from 'sweetalert2';
import { InformacoesDividendosImportados } from "../../../model/informacoes-dividendos-importados";
import { ProjecaoService } from "../../../service/projecao/projecao.service";

@Component({
  standalone: false,
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.css']
})
export class ImportarComponent implements OnInit {

  titulo: string;
  FRMnovoCadastro: FormGroup;
  info: InformacoesDividendosImportados;

  constructor(
    private formBuilder: FormBuilder,
    private dividendoService: DividendoService,
    private projecaoService: ProjecaoService
  ) {
    this.FRMnovoCadastro = this.formBuilder.group({
      html: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.titulo = "Importação de Dividendos por HTML";
    this.atualizarInformacoesDividendos();
  }

  onSubmit() {
    let html = this.FRMnovoCadastro.get('html')?.value;
    console.log('Submit');
    this.dividendoService.importarHtml(html).subscribe({
      next: () => {
        Swal.fire({
          title: "Sucesso ao importar dados dos dividendos",
          icon: "success"
        });
        this.atualizarInformacoesDividendos();
      },
      error: error => {
        console.error('Erro ao buscar dados dos Ativos com dividendo', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Erro ao importar o conteúdo referente aos dividendos",
          footer: ''
        });
      }
    });
  }

  atualizarInformacoesDividendos() {
    this.dividendoService.buscarInformacoesDividendosImportados().subscribe({
      next: (result: InformacoesDividendosImportados) => {
        this.info = result;
      }
    });
  }

  atualizarIndices() {
    Swal.fire({
      title: 'Carregando...',
      text: 'Aguarde enquanto atualizamos os índices.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Ativa o indicador de carregamento
      }
    });

    this.projecaoService.atualizarIndices().subscribe({
      next: () => {
        Swal.close();
        Swal.fire({
          title: "Atualização de indices realizada com sucesso",
          icon: "success"
        });
      },
      error: (err) => {
        Swal.close();
        Swal.fire('Erro!', 'Não foi possível atualizar os índices.', 'error');
      }
    })
  }

}
