import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AtivoService } from "../../../service/ativo/ativo.service";
import { Ativo } from "../../../model/ativo";
import { Pagination } from "../../../model/Pagination";

@Component({
  selector: 'app-ativo-listagem',
  templateUrl: './ativo-listagem.component.html',
  styleUrls: ['./ativo-listagem.component.css']
})
export class AtivoListagemComponent implements AfterViewInit {
  displayedColumns = ['codigo', 'nome', 'tipoDescricao', 'seguindoDescricao', 'cnpj'];
  dataSource: MatTableDataSource<Ativo>;
  public pagination: Pagination = new Pagination(0, 5, 0);

  formData = {
    codigo: '',
    option: ''
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ativoService: AtivoService) {
    this.montarDataTable();
  }

  ngAfterViewInit(): void {
    this.montarDataTable();
  }

  private montarDataTable(page: number = 0, size: number = 10) {
    this.ativoService.pesquisarPaginado(page, size).subscribe({
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event: any) {
    this.pagination.page = event.pageIndex++;
    this.pagination.pageSize = event.pageSize;
    this.montarDataTable(this.pagination.page, this.pagination.pageSize);
  }

  submitForm() {
    console.log('Código:', this.formData.codigo);
    console.log('Opção:', this.formData.option);
  }

}
