import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DividendoListagemComponent } from "./dividendo-listagem/dividendo-listagem.component";
import { DividendoCadastroComponent } from "./dividendo-cadastro/dividendo-cadastro.component";

const routes: Routes = [
  {
    path: 'dividendo',
    component: DividendoListagemComponent,
    children: [
      {
        path: 'cadastro',
        component: DividendoCadastroComponent
      },
      {
        path: 'editar/:id',
        component: DividendoCadastroComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DividendoRoutingModule { }
