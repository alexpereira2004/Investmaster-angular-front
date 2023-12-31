import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtivoCadastroComponent } from "./components/ativo-cadastro/ativo-cadastro.component";

const routes: Routes = [
  {
    path: 'ativo',
    component: AtivoCadastroComponent,
    children: [
      {
        path: 'listagem',
        component: AtivoCadastroComponent
      },
      {
        path: 'cadastro',
        component: AtivoCadastroComponent
      },
      {
        path: 'editar/:id',
        component: AtivoCadastroComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtivoRoutingModule { }
