import { Component, OnInit } from '@angular/core';
import { Select2Data } from "ng-select2-component";
import { AtivoService } from "../../../service/ativo/ativo.service";
import { Ativo } from "../../../model/ativo";

@Component({
  selector: 'app-ativo-comparativo',
  templateUrl: './ativo-comparativo.component.html',
  styleUrl: './ativo-comparativo.component.css'
})
export class AtivoComparativoComponent implements OnInit {
  model = {
    ativos: [],
    periodicidade: ''
  };
  listaDeAtivosExistentes: Select2Data = [];
  value: number[] = [];

  constructor(private ativoService: AtivoService) {}

  ngOnInit(): void {
    this.ativoService.pesquisarAtivosComDividendos().subscribe({
      next: (result: Ativo[]) => {
        this.listaDeAtivosExistentes = result.map(item => ({
          value: item.codigo,
          label: item.codigo
        }));
        this.value = [];
      },
      error: error => {
        console.error('Erro ao buscar dados dos anos das Projeções', error);
      }
    });
  }

}
