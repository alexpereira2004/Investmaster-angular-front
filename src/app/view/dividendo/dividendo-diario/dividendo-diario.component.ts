import { Component, OnInit } from '@angular/core';
import { Config } from "datatables.net";

@Component({
  selector: 'app-dividendo-diario',
  templateUrl: './dividendo-diario.component.html',
  styleUrl: './dividendo-diario.component.css'
})
export class DividendoDiarioComponent implements OnInit {
  dtOptions: Config = {};

  ngOnInit(): void {
    this.dtOptions = {
      scrollY: '200px',
      scrollCollapse: true,
      paging: false
    };
  }
}
