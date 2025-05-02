import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Dividendo } from "../../../model/dividendo";
import { Pagination } from "../../../model/pagination";
import { DividendoService } from "../../../service/dividendo/dividendo.service";

@Component({
  selector: 'app-comum-dividendo-listagem',
  templateUrl: './comum-dividendo-listagem.component.html',
  styleUrl: './comum-dividendo-listagem.component.css'
})
export class ComumDividendoListagemComponent implements OnInit {
  @Input() quantidadeItensListados: number;

  @Input() displayedColumns : string[] = ['id', 'dataRecebimento', 'codigo', 'nome', 'tipo', 'quantidade', 'dividendo', 'valorTotal'];

  dataSource: MatTableDataSource<Dividendo>;
  public pagination: Pagination = new Pagination(0, 5, 0);

  constructor(private dividendoService: DividendoService) {

  }


  ngOnInit(): void {
    this.montarDataTable(0, this.quantidadeItensListados);
  }

  private montarDataTable(page: number = 0, size: number = 200) {
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
