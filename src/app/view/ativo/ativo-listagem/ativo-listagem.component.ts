import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AtivoService } from "../../../service/ativo/ativo.service";
import { Ativo } from "../../../model/ativo";
import { Pagination } from "../../../model/pagination";
import { AtivoFiltro } from "../../../model/filter/ativo-filter";

@Component({
  standalone: false,
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
    seguindo: null as number | null,
    exclusivo: true
  };

  opcoesSeguindo = [
    { valor: 1, label: 'Não' },
    { valor: 2, label: 'Mensalmente' },
    { valor: 3, label: 'Quinzenalmente' },
    { valor: 4, label: 'Semanalmente' },
    { valor: 5, label: 'Diariamente' } // ajuste para os nomes exatos do seu enum
  ];

  ativoFiltro: AtivoFiltro = {
    codigo: null,
    seguindo: null,
    exclusivo: false,
    page: 0,
    size: 100
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ativoService: AtivoService) {
  }

  ngAfterViewInit(): void {
    this.montarDataTable();
  }

  private montarDataTable(page: number = 0, size: number = 100) {
    this.ativoService.pesquisarListagem(this.ativoFiltro).subscribe({
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
    // this.pagination.page = event.pageIndex++;
    // this.pagination.pageSize = event.pageSize;
    this.ativoFiltro.page = event.pageIndex++;
    this.ativoFiltro.size = event.pageSize;
    this.montarDataTable();
  }

  pesquisar(): void {

    this.ativoFiltro.codigo = this.formData.codigo?.trim() || null,
    this.ativoFiltro.seguindo = this.formData.seguindo ?? null,
    this.ativoFiltro.exclusivo = this.formData.seguindo ? this.formData.exclusivo : false
    this.ativoFiltro.page = 0;

    this.ativoService
      .pesquisarListagem(this.ativoFiltro)
      .subscribe({
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

}
