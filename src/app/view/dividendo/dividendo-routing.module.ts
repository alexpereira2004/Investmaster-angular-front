import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemDividendoComponent } from "./listagem-dividendo/listagem-dividendo.component";

const routes: Routes = [
  {
    path: 'dividendo',
    component: ListagemDividendoComponent,
    children: [
      {
        path: 'cadastro',
        component: ListagemDividendoComponent
      },
      {
        path: 'editar/:id',
        component: ListagemDividendoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DividendoRoutingModule { }
