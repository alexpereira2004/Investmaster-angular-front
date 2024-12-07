import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtivoCadastroComponent } from "./ativo-cadastro/ativo-cadastro.component";
import { AtivoListagemComponent } from "./ativo-listagem/ativo-listagem.component";
import { AtivoComparativoComponent } from "./ativo-comparativo/ativo-comparativo.component";


const AtivoRoutes: Routes = [
  {
    path: 'ativo',
    children: [
      {
        path: '',
        component: AtivoListagemComponent
      },
      {
        path: 'cadastro',
        component: AtivoCadastroComponent
      },
      {
        path: 'editar/:id',
        component: AtivoCadastroComponent
      },
      {
        path: 'comparativo',
        component: AtivoComparativoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(AtivoRoutes)]
})
export class AtivoRoutingModule { }
