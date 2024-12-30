import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DividendoService } from "../../../service/dividendo/dividendo.service";
import Swal from 'sweetalert2';
import { InformacoesDividendosImportados } from "../../../model/informacoes-dividendos-importados";

@Component({
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
    private dividendoService: DividendoService
  ) {
    this.FRMnovoCadastro = this.formBuilder.group({
      html: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.titulo = "Importação de Dividendos por HTML";
    this.dividendoService.buscarInformacoesDividendosImportados().subscribe({
      next: (result: InformacoesDividendosImportados) => {
        this.info = result;
      }
    });
  }

  onSubmit() {
    let html = this.FRMnovoCadastro.get('html')?.value;

    this.dividendoService.importarHtml(html).subscribe({
      next: () => {
        Swal.fire({
          title: "Sucesso ao importar dados dos dividendos",
          icon: "success"
        }
      );
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

}
