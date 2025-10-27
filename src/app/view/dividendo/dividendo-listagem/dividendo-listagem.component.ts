import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

interface Cricketer {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
const cktr1 = {id: '1',name: 'Teste',progress: '50',fruit: 'Laranja'}

const myArr: Cricketer[] = [
  {id: '1',name: 'Teste',progress: '10',fruit: 'Loco'},
  {id: '1',name: 'Teste',progress: '20',fruit: 'Laranja'},
  {id: '1',name: 'Teste',progress: '30',fruit: 'Laranja'},
  {id: '1',name: 'Teste',progress: '40',fruit: 'Laranja'},
  {id: '1',name: 'Teste',progress: '50',fruit: 'Laranja'},
  {id: '1',name: 'Teste',progress: '60',fruit: 'Laranja'},
  {id: '1',name: 'Teste',progress: '70',fruit: 'Laranja'},
  {id: '1',name: 'Loco',progress: '80',fruit: 'Laranja'},
];


@Component({
  standalone: false,
  selector: 'app-listagem-dividendo',
  templateUrl: './dividendo-listagem.component.html',
  styleUrls: ['./dividendo-listagem.component.css']
})
export class DividendoListagemComponent  implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<Cricketer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(myArr);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

