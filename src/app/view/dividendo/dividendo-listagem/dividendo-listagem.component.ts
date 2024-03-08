import { Component, OnInit } from '@angular/core';
import { DividendoService } from "../../../service/dividendo/dividendo.service";

@Component({
  selector: 'app-listagem-dividendo',
  templateUrl: './dividendo-listagem.component.html',
  styleUrls: ['./dividendo-listagem.component.css']
})
export class DividendoListagemComponent implements OnInit {

  constructor(private service: DividendoService) { }

  ngOnInit(): void {
    this.service.buscarDividendos().subscribe({
      next: (result) => {


      },
      error: (result: any) => {
        // this.contextService.openGenericDialog('warning', 'user-form.failed-operation', result);
      },
      complete: () => {
        // this.spinner.hide();
      }
    });
  }

}
