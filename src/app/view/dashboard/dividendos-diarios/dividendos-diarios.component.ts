import { Component, OnInit } from '@angular/core';
import { Config } from "datatables.net";

@Component({
  selector: 'app-dividendos-diarios',
  templateUrl: './dividendos-diarios.component.html',
  styleUrl: './dividendos-diarios.component.css'
})
export class DividendosDiariosComponent implements OnInit {
  dtOptions: Config = {};

  ngOnInit(): void {
    this.dtOptions = {
      scrollY: '200px',
      scrollCollapse: true,
      paging: false
    };
  }
}
