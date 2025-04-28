import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DividendoService } from "../../../service/dividendo/dividendo.service";
import Swal from 'sweetalert2';
import { InformacoesDividendosImportados } from "../../../model/informacoes-dividendos-importados";
import { ProjecaoService } from "../../../service/projecao/projecao.service";
import { MatTableDataSource } from "@angular/material/table";
import { Pagination } from "../../../model/pagination";
import { Dividendo } from "../../../model/dividendo";

@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.css']
})
export class ImportarComponent implements OnInit {
  displayedColumns = ['id', 'dataRecebimento', 'codigo', 'nome', 'tipo', 'quantidade', 'dividendo', 'valorTotal'
    ];
  dataSource: MatTableDataSource<Dividendo>;
  public pagination: Pagination = new Pagination(0, 5, 0);

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
    this.montarDataTable();
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

  private montarDataTable(page: number = 0, size: number = 100) {
    this.dividendoService.pesquisarPaginado(page,size).subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource(result.content);
        this.pagination.totalElements = result.totalElements;
        this.pagination.pageSize = result.size;
        this.pagination.page = result.number;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    });
  }

  onPageChange(event: any) {
    this.pagination.page = event.pageIndex++;
    this.pagination.pageSize = event.pageSize;
    this.montarDataTable(this.pagination.page, this.pagination.pageSize);
  }

}
