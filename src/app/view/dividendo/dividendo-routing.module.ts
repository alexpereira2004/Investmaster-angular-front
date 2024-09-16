import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DividendoListagemComponent } from "./dividendo-listagem/dividendo-listagem.component";
import { DividendoCadastroComponent } from "./dividendo-cadastro/dividendo-cadastro.component";
import { ImportarComponent } from "./importar/importar.component";

const DividendoRoutes: Routes = [
  {
    path: 'dividendo',
    children: [
      { path: '', component: DividendoListagemComponent },
      { path: 'cadastro', component: DividendoCadastroComponent },
      { path: 'importar', component: ImportarComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(DividendoRoutes)],
})
export class DividendoRoutingModule { }
