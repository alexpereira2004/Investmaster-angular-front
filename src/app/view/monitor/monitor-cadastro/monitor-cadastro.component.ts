import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AtivoService } from "../../../service/ativo/ativo.service";
import { Ativo } from "../../../model/ativo";

@Component({
  standalone: false,
  selector: 'app-monitor-cadastro',
  templateUrl: './monitor-cadastro.component.html',
  styleUrl: './monitor-cadastro.component.css'
})
export class MonitorCadastroComponent implements OnInit {

  public FRMregraMonitoramento!: FormGroup;
  ativoLista!: Ativo[];

  constructor(private formBuilder: FormBuilder,
              private ativoService: AtivoService
  ) {
    this.FRMregraMonitoramento = this.formBuilder.group({
      ativo: [null, Validators.required],

    });
  }

  ngOnInit(): void {
    this.ativoService.pesquisarPaginado(0, 2000).subscribe({
      next: result => {
        this.ativoLista = result.content;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    });
  }


  onSubmit() {

  }
}
