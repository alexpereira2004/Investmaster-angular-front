import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DividendoService } from "../../../service/dividendo/dividendo.service";

@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.css']
})
export class ImportarComponent implements OnInit {

  titulo: string;
  FRMnovoCadastro: FormGroup;

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
  }

  onSubmit() {
    let html = this.FRMnovoCadastro.get('html')?.value;

    this.dividendoService.importarHtml(html).subscribe({
      //
    });
  }

}
