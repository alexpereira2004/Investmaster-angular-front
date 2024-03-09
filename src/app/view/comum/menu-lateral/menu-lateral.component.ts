import { Component, OnInit } from '@angular/core';
import { MenuItem } from "../../../model/menu-item";

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  itens : MenuItem[];
  dashboard : MenuItem = new MenuItem();
  ativo : MenuItem = new MenuItem();
  dividendo : MenuItem = new MenuItem();

  constructor() { }

  ngOnInit(): void {


    this.montarMenuDashboard();
    this.montarMenuAtivo();
    this.montarMenuDividendo();

    this.itens = [
      this.dashboard, this.ativo, this.dividendo
    ]
  }

  private montarMenuDashboard() {
    this.dashboard.link = '';
    this.dashboard.titulo = 'Dashboard';
    this.dashboard.classeIcone = 'fa fa-desktop';

  }

  montarMenuAtivo() {
    let subItemAtivoAdicionar = new MenuItem();
    let subItemAtivoListar = new MenuItem();

    subItemAtivoAdicionar.titulo  = 'Adicionar';
    subItemAtivoAdicionar.link    = '/ativo/cadastro';
    subItemAtivoListar.titulo  = 'Listar';
    subItemAtivoListar.link    = '/ativo';
    this.ativo.classeIcone = 'fa fa fa-book';
    this.ativo.titulo = 'Ativo';
    this.ativo.itens = [subItemAtivoListar, subItemAtivoAdicionar];
  }

  private montarMenuDividendo() {
    let subItemDividendoAdicionar = new MenuItem();
    let subItemDividendoListar = new MenuItem();

    subItemDividendoAdicionar.titulo  = 'Adicionar';
    subItemDividendoAdicionar.link    = '/dividendo/cadastro';
    subItemDividendoListar.titulo  = 'Listar';
    subItemDividendoListar.link    = '/dividendo';
    this.dividendo.classeIcone = 'fa fa-dollar-sign';
    this.dividendo.titulo = 'Dividendo';
    this.dividendo.itens = [subItemDividendoListar, subItemDividendoAdicionar];

  }


}
